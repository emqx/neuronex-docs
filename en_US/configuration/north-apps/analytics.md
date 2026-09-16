# Feed Analytics and Edge Computing

Use this class of northbound application when data has to land in a data lake for long-term analysis, or when the volume is high enough that it should be filtered and aggregated at the edge first.

## Two paths

EMQX Neuron can reach a big-data platform two ways, and both can run at the same time:

| Path | How it works | When it applies |
| --- | --- | --- |
| **Northbound Kafka application** | The Kafka node acts as a producer, sending subscribed southbound data straight to a broker and topic | The collection layer is already aligned with the subscription model, and publish rate and topic routing are to be controlled independently |
| **Data processing → sink** | Southbound data enters the [data processing](../../streaming-processing/overview.md) engine first and is filtered, mapped, and aggregated with SQL before being written out | Fields have to be dropped, data downsampled, or publishing made conditional at the edge |

## When to process at the edge

Publishing high-rate raw data to the cloud concentrates cost in three places: uplink bandwidth, cloud storage, and cloud compute. Processing at the edge first is advisable when:

- **The polling rate far exceeds what the business needs.** Polling every 100 ms avoids missing transients, but a report only needs a per-minute average. Aggregating over a time window before publishing cuts volume by two orders of magnitude.
- **Values stay unchanged for long periods.** During steady-state operation tag values barely move. A conditional filter publishes only when a value moves beyond a threshold.
- **Alarms need sub-second response.** Keeping the decision at the edge avoids a cloud round trip and remains effective while the link is down.
- **Units or field names must be normalized before publishing.** Doing it once at the edge beats doing it in every downstream system.

The rules engine offers 160+ SQL functions covering filtering, type conversion, aggregation, and time-window computation; logic that SQL cannot express can be written as a Python or C/C++ extension.

## Available destinations

Besides Kafka, a data processing [sink](../../streaming-processing/sink/sink.md) can write directly to:

| Category | Destination |
| --- | --- |
| Databases | MySQL, PostgreSQL, SQL Server, Oracle (SQL sink) |
| Time series | InfluxDB V1 / V2 |
| Cache and messaging | Redis, MQTT, Kafka |
| Object storage and files | AWS S3, local files, images |
| APIs | REST calls |

## Selecting an application

| Application | When it applies |
| --- | --- |
| [Kafka](./kafka/overview.md) | Acts as a Kafka producer writing to a topic, feeding a big-data platform. Supports SASL authentication and SSL/TLS, and works with Microsoft Fabric Eventstream |
| [Rules Engine Application](./ekuiper/overview.md) | An internal EMQX Neuron node that feeds southbound data into the engine's `neuronStream` stream. The application exists by default and only needs a subscription |

::: tip
Rule results can be written back to devices through the Neuron sink, closing a collect → decide → control loop at the edge. See [Neuron Sink](../../streaming-processing/sink/neuron.md).
:::
