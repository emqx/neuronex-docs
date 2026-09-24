# Databricks

Collected tag data can also land in a lakehouse for long-term storage and analysis. EMQX has no direct Databricks sink. The path runs through **Amazon S3**: EMQX writes messages into S3 and Databricks reads them through an external location.

```
Field devices → EMQX Neuron → EMQX Cloud / EMQX Enterprise → Amazon S3 → Databricks
```

The edge maintains one MQTT path and nothing more. How the data lands and how it is modelled are configured on the EMQX and Databricks sides, leaving EMQX Neuron untouched.

## Prerequisites

- A working EMQX Cloud deployment or self-hosted EMQX Enterprise, with EMQX Neuron connected and publishing — see [EMQX Cloud](./overview.md)
- A Databricks account with permission to create workspaces and external locations
- AWS access credentials with read and write permission on the target S3 bucket

::: tip
Data integration is a feature of EMQX Enterprise and EMQX Cloud. Open-source EMQX does not include it.
:::

## What EMQX Neuron publishes

The default **values-format** message has a fixed shape. The whole message lands in S3 as-is, and the query in Databricks parses it against this structure:

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

## On the Databricks side

1. Create a workspace and note the S3 bucket it is associated with.
2. Under **Catalog → External locations**, create an external location pointing at the path the data will land in, such as `s3://<bucket>/neuron-data`.
3. Prepare AWS access credentials with read and write permission on that bucket.

## Create the connector and sink in EMQX

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

## Query from Databricks

The data lands in S3 as JSON files and is queried through the external location:

```sql
SELECT
  payload:node        AS node,
  payload:group       AS group_name,
  payload:timestamp   AS ts,
  payload:values      AS tag_values
FROM json.`s3://<bucket>/neuron-data/`;
```

Tag values sit one level down under `values`, keyed by tag name, so new tags simply appear in the JSON and this query needs no change. Load it into a Delta table when you move on to sustained analysis.

## Further reading

- EMQX documentation: [Databricks data integration](https://docs.emqx.com/en/emqx/latest/data-integration/databricks.html)
- When the set of tags is stable and feeds reports directly, see [Snowflake](./snowflake.md)
- For every available downstream system, see [EMQX data integration](https://docs.emqx.com/en/emqx/latest/data-integration/data-bridges.html)
- When the volume is high, filter and aggregate at the edge before publishing — see [Processing Data Before Delivery](../../processing.md)
