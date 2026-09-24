# Bridging Data to Snowflake and Databricks

Collected tag data usually ends up in a data warehouse or lakehouse for long-term storage and analysis. EMQX Neuron does not connect to those platforms directly — it publishes to EMQX, and EMQX data integration writes downstream:

```
Field devices → EMQX Neuron → EMQX Cloud / EMQX Enterprise → Snowflake / Databricks
```

The edge then maintains one MQTT path and nothing more. Swapping the warehouse downstream, or writing to several at once, is configured on the EMQX side and leaves EMQX Neuron untouched.

This page covers how the two ends line up: what EMQX Neuron publishes, and how the rule on the EMQX side maps that into table columns. For the cloud platforms themselves, the EMQX documentation is authoritative and is linked throughout.

## Prerequisites

- A working EMQX Cloud deployment or self-hosted EMQX Enterprise, with EMQX Neuron connected and publishing — see [EMQX Cloud](./overview.md)
- A Snowflake or Databricks account with permission to create databases, tables, and storage locations

::: tip
Data integration is a feature of EMQX Enterprise and EMQX Cloud. Open-source EMQX does not include it.
:::

## What EMQX Neuron publishes

The default **values-format** message has a fixed shape, and every mapping below follows from it:

```json
{
  "node": "modbus-tcp",
  "group": "group-1",
  "timestamp": 1790219933821,
  "values": { "temperature": 23.5, "pressure": 1013 },
  "errors": {},
  "metas": {}
}
```

The default topic is `/neuron/{application}/{driver}/{group}`, and each subscription can override it. With several plants or lines, name topics hierarchically — `factory-a/line-1/modbus-tcp`, for example — so one wildcard subscription on the EMQX side covers them all. See [Send Data to the Cloud · Upload topic](../cloud.md#upload-topic).

Tag values sit one level down under `values`, and **the key is the tag name**. That is what shapes the rule SQL below.

## Bridging to Snowflake

Snowflake offers two write modes. **Aggregated** batches messages into a CSV file, uploads it to a stage, and lets Snowpipe load it into the table. **Streaming** writes row by row through the Snowpipe Streaming API. Aggregated costs less when volume is high and minute-level latency is acceptable; streaming is for when the data has to be visible within seconds.

### On the Snowflake side

Create the database, schema, and target table. Its columns must correspond one-to-one with the fields the rule selects:

```sql
CREATE DATABASE IF NOT EXISTS neuron_data;
CREATE SCHEMA   IF NOT EXISTS neuron_data.public;

CREATE TABLE IF NOT EXISTS neuron_data.public.telemetry (
  node                STRING,
  group_name          STRING,
  publish_received_at TIMESTAMP_NTZ,
  temperature         DOUBLE,
  pressure            DOUBLE
);
```

Then create the stage, the pipe, and a user and role with pipe permissions. Streaming mode also needs RSA key-pair authentication for that user:

```shell
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out snowflake_rsa_key.private.pem -nocrypt
openssl rsa -in snowflake_rsa_key.private.pem -pubout -out snowflake_rsa_key.public.pem
```

For the full set of object and grant statements, see [Snowflake data integration](https://docs.emqx.com/en/emqx/latest/data-integration/snowflake.html) in the EMQX documentation.

### Create the connector in EMQX

Choose **Snowflake (ODBC)** for aggregated mode, **Snowflake (Streaming API)** for streaming. The main fields:

| Field | Value |
| --- | --- |
| Server address | `org-account.snowflakecomputing.com` |
| Account | `org-account` — the organization ID and account name |
| Username | The pipe user created above |
| Password or private key path | Either one in aggregated mode; **streaming requires the private key** |
| Enable TLS | Required for streaming |

### Create the rule

The rule SQL flattens the nested EMQX Neuron message into table columns.

::: warning
**Do not use `SELECT *`.** The Snowflake sink requires the selected field names and their count to match the target table's columns exactly; one column too many or too few and the write fails.
:::

```sql
SELECT
  payload.node                                          as node,
  payload.group                                         as group_name,
  unix_ts_to_rfc3339(publish_received_at, 'millisecond') as publish_received_at,
  payload.values.temperature                            as temperature,
  payload.values.pressure                               as pressure
FROM
  "/neuron/#"
```

`payload.values.<tag name>` reads a tag value out of the EMQX Neuron message. **List the tags you want stored**, and make sure the table has columns with the same names. When tags are added or removed, the table definition and this statement have to change together.

### Add the sink

For aggregated mode, choose the **Snowflake** sink type and fill in the database, schema, stage, pipe, pipe user, and private key. Two more parameters set the upload rhythm:

| Parameter | Meaning |
| --- | --- |
| Max records | Upload once this many messages have accumulated |
| Time interval | Upload once this many seconds have passed since the last upload |

Whichever comes first triggers the upload. At a one-second collection interval with 20 tags in a group, the default of 1000 records works out to roughly one file per 50 seconds.

For streaming mode, choose the **Snowflake-Streaming** sink type and give the database, schema, and streaming pipe name. There are no batching parameters.

## Bridging to Databricks

EMQX has no direct Databricks sink. The path runs through **Amazon S3**: EMQX writes messages into S3 and Databricks reads them through an external location.

### On the Databricks side

1. Create a workspace and note the S3 bucket it is associated with.
2. Under **Catalog → External locations**, create an external location pointing at the path the data will land in, such as `s3://<bucket>/neuron-data`.
3. Prepare AWS access credentials with read and write permission on that bucket.

### Create the connector and sink in EMQX

The connector type is **Amazon S3**:

| Field | Value |
| --- | --- |
| Host | `s3.{region}.amazonaws.com` |
| Port | `443` |
| Access key ID, secret access key | The AWS credentials from the previous step |

What matters in the sink is that the object key lands under the path the external location points at:

| Field | Value |
| --- | --- |
| Bucket | The bucket associated with the Databricks workspace |
| Object key | `neuron-data/${clientid}_${timestamp}.json` |
| Object content | `${payload}` |

The rule SQL can take the whole message here — no flattening needed:

```sql
SELECT * FROM "/neuron/#"
```

### Query from Databricks

The data lands in S3 as JSON files and is queried through the external location:

```sql
SELECT
  payload:node        AS node,
  payload:group       AS group_name,
  payload:timestamp   AS ts,
  payload:values      AS tag_values
FROM json.`s3://<bucket>/neuron-data/`;
```

Load it into a Delta table when you move on to sustained analysis.

## Choosing between the two

| | Snowflake | Databricks |
| --- | --- | --- |
| Integration | Native connector | Through Amazon S3 |
| Data shape | Structured table, columns defined in the rule | Raw JSON files, parsed at query time |
| Adding or removing tags | Change the table definition and the rule SQL together | No change; new tags simply appear in the JSON |
| Suits | A stable set of tags feeding reports directly | Tags that change often, landed first and modelled later |

## Further reading

- EMQX documentation: [Snowflake data integration](https://docs.emqx.com/en/emqx/latest/data-integration/snowflake.html), [Databricks data integration](https://docs.emqx.com/en/emqx/latest/data-integration/databricks.html)
- For every available downstream system, see [EMQX data integration](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridges.html)
- When the volume is high, filter and aggregate at the edge before publishing — see [Processing Data Before Delivery](../../processing.md)
