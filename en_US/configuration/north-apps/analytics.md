# Feed Analytics and Edge Computing

Use this class of northbound application when data needs to land in a data lake for long-term analysis, or when the volume is high enough that it should be filtered and aggregated at the edge first.

## Two paths

EMQX Neuron can reach a big-data platform two ways, and both can run at once:

| Path | How it works | Suits |
| --- | --- | --- |
| **Northbound Kafka application** | The Kafka node acts as a producer, sending subscribed southbound data straight to a broker and topic | A collection layer already aligned with the subscription model, where you want independent control over publish rate and topic routing |
| **Data processing → sink** | Southbound data enters the [data processing](../../streaming-processing/overview.md) engine first, and SQL filters, maps, and aggregates before writing out | Cases that need fields dropped, data downsampled, or conditional publishing at the edge |

## When to compute at the edge

Sending high-rate raw data to the cloud costs money in three places: **uplink bandwidth**, **cloud storage**, and **cloud compute**. Processing at the edge is worth it when:

- **The polling rate far exceeds what the business needs.** Polling every 100 ms catches transients, but the report only needs a per-minute average. Window aggregation before publishing cuts volume by two orders of magnitude.
- **Values rarely change.** During steady-state operation tag values barely move. A conditional filter publishes only when a value moves beyond a threshold.
- **Alarms need sub-second response.** Keeping the decision at the edge avoids a cloud round trip and keeps working while the link is down.
- **Units or field names need normalizing.** Better to do it once at the edge than in every downstream system.

The rules engine offers 160+ SQL functions covering filtering, type conversion, aggregation, and time windows, and what SQL cannot express can be extended in Python or C/C++.

## Where it can write

Besides Kafka, a data processing [sink](../../streaming-processing/sink/sink.md) can write directly to:

- **Databases**: MySQL, PostgreSQL, SQL Server, Oracle (SQL sink)
- **Time series**: InfluxDB V1 / V2
- **Cache and messaging**: Redis, MQTT, Kafka
- **Object storage and files**: AWS S3, local files, images
- **APIs**: REST calls

## Which application

| Application | When |
| --- | --- |
| [Kafka](./kafka/overview.md) | Acts as a Kafka producer writing to a topic, feeding a big-data platform. Supports SASL authentication and SSL/TLS, and works with Microsoft Fabric Eventstream |
| [Rules Engine Application](./ekuiper/overview.md) | An internal EMQX Neuron node that feeds southbound data into the engine's `neuronStream`. It exists by default — just add a subscription |

::: tip
Rule results can also be written back to devices through the Neuron sink, closing a collect → decide → control loop at the edge. See [Neuron Sink](../../streaming-processing/sink/neuron.md).
:::
