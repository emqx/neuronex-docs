# Source

Source is used to read data from external systems. NeuronEX supports loading data sources into three modes: `Stream`, `Scan Table`, and `Lookup Table`.

General data sources can be loaded as `Stream`. Tables (including `Scan table` and `Lookup table`) are methods of retaining a large amount of data status, and are generally used in combination with `Stream` , to cope with complex processing scenarios.

:::tip Tips
When using `Rule`, at least one source must be a `Stream`.
:::


## Data source type

Currently NeuronEX has the following built-in data source types and the loading modes they support:

| source type               | Description                        | Stream   | Scan Table | Lookup Table |
| --------------------------- | ---------------------------------- | ---- | ------ | ------ |
| [Neuron](./neuron.md)       | Read data from NeuronEX's data collection module           | ✅    | ✅      |❌ |
| [MQTT](./mqtt.md)           | Read data from MQTT topic                       | ✅    | ✅    | ❌    |
| [HTTP pull](./http_pull.md) | Pull data from HTTP server                   | ✅    | ✅    | ❌    |
| [HTTP push](./http_push.md) | Push data to NeuronEX via HTTP             | ✅    | ✅   | ❌     |
| [Memory](./memory.md)         | Read data from the NeuronEX memory to form a rule pipeline | ✅    | ✅      | ✅     |
| [SQL](./sql.md)         | Query data from the database                        | ✅    | ✅      | ✅|
| [File](./file.md)           | Read data from a file                           | ✅    | ✅    | ❌    |
| [Video](./video.md)         | Query data from video stream                        | ✅    | ✅   | ❌    |
| [Simulator](./simulator.md)         | Generate simulated data for testing                       | ✅    | ✅   | ❌    |
| [Redis](./redis.md)         | Read data from Redis                     | ❌    | ❌   |  ✅   |
| [CAN](./can.md)         | Read data from CAN bus                      | ✅    | ✅   | ❌  |

## Define and run

In NeuronEX, after creating a stream or table on the **Sources** page, it actually only creates a logical definition of a data source rather than a real data input for physical operation. The data flow will not actually run until a rule using that data source is started.

:::tip Tips
Streams or tables created on the **Sources** page can be used in the `from` clause of SQL in multiple rules.
:::

Users can define whether to share the data source by specifying the SHARED field when creating a **Sources**.


## Data source decoding

Users can define the decoding method by specifying the `stream format` field when creating a **data source (Source)**. Currently supports `json`, `binary`, `protobuf`, `delimited`. If you want to use a custom format, you can also choose `custom`.
:::tip Tips
Before the data source enters rule processing, it will be decoded first, and the decoded data will be used as the input of the rule.
:::

## data structure

NeuronEX supports structured/unstructured streams, with the default being unstructured. That is, when **Sources** -> **Create Stream**, the `Whether it is a stream with structure` option is not checked. For details, see [Stream Parameter Configuration](./stream.md#Stream Parameter Configuration).