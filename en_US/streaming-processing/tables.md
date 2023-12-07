# Table

Tables are a method of retaining a relatively large amount of state. NeuronEX currently supports two types of tables: `Scan Table` and `Lookup Table`. Both types of tables are suitable for streaming batch synthesis calculations.

- Scan Table

     The `Scan table` holds state data in memory. It works well for smaller data sets where the contents of the table do not need to be shared between rules. `Scan table` acts like an event-driven stream, loading data events one by one. Most data sources can be configured as either a stream or a scan table.
- Lookup Table

     A `Lookup table` binds external data (such as data in a SQL database) and queries references to the external data when needed. It works with larger data sets and shares the contents of the table between rules.

:::tip Tips
With a streaming data source, any new data is appended to the current stream for processing. **Table** is used to represent the current state of the stream. It can be thought of as a snapshot of the stream. Users can use tables to retain a batch of data for processing.
:::

## Table data source

| Table type                        | Description                                    | Scan Table | Lookup Table |
| --------------------------- | ----------------------------------  | ------ | ------ |
| [Neuron](./neuron.md)       | Read data from NeuronEX's data collection module           | ✅      |❌    |
| [MQTT](./mqtt.md)           | Read data from MQTT topic                         | ✅    | ❌    |
| [HTTP pull](./http_pull.md) | Pull data from HTTP server                       | ✅    | ❌    |
| [HTTP push](./http_push.md) | Push data to NeuronEX via HTTP        | ✅   | ❌     |
| [Memory](./memory.md)         | Read data from the NeuronEX memory to form a rule pipeline   | ✅      | ✅     |
| [SQL](./sql.md)         | Query data from the database                            | ✅      | ✅|
| [File](./file.md)           | Read data from a file                            | ✅    | ❌    |
| [Video](./video.md)         | Query data from video stream                      | ✅   | ❌    |

## Create table

On the NeuronEX page, click **Data Processing** -> **Sources**, on the **Scan Table**/**Lookup Table** tab, click **Create Scan Table/Create Lookup Table** button to create the table.

The data type and attributes of the table are consistent with the stream. For details, please refer to the [Stream Management](./stream.md) page.

Therefore, tables also support all source types. Many sources are not batched, they have one event at any given point in time, meaning the table will always have only one event.

When creating a `scan table`, you can specify the size of the table snapshot through `RETAIN_SIZE`, which is used to store historical data.

When creating a `lookup table`, you can set the `key` of the table. For example, for a SQL source, specifies the key in the SQL table.


## Application scenarios

Tables are a way to retain relatively large amounts of state. Scan tables keep states in memory, while lookup tables keep them externally, possibly persistently. Scan tables are easier to set up, while lookup tables can be easily connected to existing persistent state. Both types are suitable for streaming batch synthesis calculations.

Check out the links below for some typical scenarios.

- [Scan table usage scenario](scan.md)
- [Lookup table usage scenario](lookup.md)