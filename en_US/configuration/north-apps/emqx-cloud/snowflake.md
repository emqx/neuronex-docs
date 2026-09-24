# Snowflake

Collected tag data usually ends up in a data warehouse for long-term storage and analysis. EMQX Neuron does not connect to Snowflake directly — it publishes to EMQX, and EMQX data integration writes downstream:

```
Field devices → EMQX Neuron → EMQX Cloud / EMQX Enterprise → Snowflake
```

The edge then maintains one MQTT path and nothing more. Swapping the warehouse downstream, or writing to several at once, is configured on the EMQX side and leaves EMQX Neuron untouched.

This page covers how the two ends line up: what EMQX Neuron publishes, and how the rule on the EMQX side maps that into table columns. For Snowflake itself, the EMQX documentation is authoritative and is linked throughout.

## Prerequisites

- A working EMQX Cloud deployment or self-hosted EMQX Enterprise, with EMQX Neuron connected and publishing — see [EMQX Cloud](./overview.md)
- A Snowflake account with permission to create databases, tables, stages, and pipes

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

## Two write modes

Snowflake offers two write modes. **Aggregated** batches messages into a CSV file, uploads it to a stage, and lets Snowpipe load it into the table. **Streaming** writes row by row through the Snowpipe Streaming API. Aggregated costs less when volume is high and minute-level latency is acceptable; streaming is for when the data has to be visible within seconds.

## On the Snowflake side

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

## Create the connector in EMQX

Choose **Snowflake (ODBC)** for aggregated mode, **Snowflake (Streaming API)** for streaming. The main fields:

| Field | Value |
| --- | --- |
| Server address | `org-account.snowflakecomputing.com` |
| Account | `org-account` — the organization ID and account name |
| Username | The pipe user created above |
| Password or private key path | Either one in aggregated mode; **streaming requires the private key** |
| Enable TLS | Required for streaming |

## Create the rule

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

## Add the sink

For aggregated mode, choose the **Snowflake** sink type and fill in the database, schema, stage, pipe, pipe user, and private key. Two more parameters set the upload rhythm:

| Parameter | Meaning |
| --- | --- |
| Max records | Upload once this many messages have accumulated |
| Time interval | Upload once this many seconds have passed since the last upload |

Whichever comes first triggers the upload. At a one-second collection interval with 20 tags in a group, the default of 1000 records works out to roughly one file per 50 seconds.

For streaming mode, choose the **Snowflake-Streaming** sink type and give the database, schema, and streaming pipe name. There are no batching parameters.

## Further reading

- EMQX documentation: [Snowflake data integration](https://docs.emqx.com/en/emqx/latest/data-integration/snowflake.html)
- When tags change often and you would rather land the data first and model it later, see [Databricks](./databricks.md)
- For every available downstream system, see [EMQX data integration](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridges.html)
- When the volume is high, filter and aggregate at the edge before publishing — see [Processing Data Before Delivery](../../processing.md)
