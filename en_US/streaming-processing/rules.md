# rule

All calculation logic is handled through **Rules** in NeuronEX. The rules take the data source as input, define the calculation logic through **SQL**, and output the results to **Action (Sink)**. Once a rule definition is submitted, it will continue to run. It will continuously obtain data from the source, perform calculations based on SQL logic, and trigger **Action (Sink)** in real time based on the results.

NeuronEX supports running multiple rules simultaneously. These rules run in the same memory space and share the same hardware resources. Multiple parallel rules are separated at run time, and an error in one rule will not affect other rules.

::: tip

NeuronEX rules that at least one data source in SQL should be of type `Stream`. For information on how to create a stream, please refer to [Stream](./stream.md).

:::


## Create rules

In the NeuronEX web interface, click **Data Processing** -> **Rules**. Click the **Create Rule** button:

- Rule ID: Enter the rule ID, which must be unique within the same NeuronEX instance.

- Name: Enter the rule name

- Enter rule SQL,for example:

   ```sql
   SELECT demo.temperature, demo1.temp
   FROM demo
   LEFT JOIN demo1 ON demo.timestamp = demo1.timestamp
   WHERE demo.temperature > demo1.temp
   GROUP BY demo.temperature, HOPPINGWINDOW(ss, 20, 10)
   ```

## Rules SQL

Rules `sql` define the streams or tables to be processed and how to process them. The rule SQL is and sends the processing results to one or more actions (Sink). You can use built-in functions and operators in rules `sql`, or you can use custom functions and algorithms.

The simplest rule SQL is `SELECT * FROM neuronStream`. This rule will get all the data from the `neuronStream` data stream. NeuronEX provides a wealth of operators and functions. For more usage, please see the [SQL](./sqls/overview.md) chapter.

## Add action (Sink)

The action (Sink) part defines the output behavior of a rule. Each rule can have multiple actions.

In the **Actions** area, click the **Add** button.

1. Select an action. Actions are used to write data to external systems. You can go to the [Action(Sink)](./sink/sink.md) page to get detailed configuration information.
    Currently the built-in Sink list of NeuronEX:
    - [MQTT sink](./sink/mqtt.md): Output to external MQTT service.
    - [Neuron sink](./sink/neuron.md): Output to NeuronEX data collection module.
    - [Rest sink](./sink/rest.md): Output to external HTTP server.
    - [Memory sink](./sink/memory.md): Output to the memory topic to form a rule pipeline.
    - [Log sink](./sink/log.md): Write logs, usually only used for debugging.
    - [SQL sink](./sink/file.md): Write to relational database Mysql, Sqlserver, Sqlite, etc.
    - [InfluxDB sink](./sink/memory.md): Write to the InfluxDB database.
    - [InfluxDB V2 sink](./sink/log.md): Write to the InfluxDB database.
    - [File sink](./sink/file.md): Write to file.
    - [Nop sink](./sink/nop.md): No output, used for performance testing.
    <!-- - [Redis sink](./sink/redis.md): Write to Redis. -->
    <!-- - [Kafka sink](./sink/nop.md): Write to Kafka. -->


After completing the settings, click **Test Connection**. After confirming the settings, click **Submit** to complete the creation of the action.

## Rule options (optional)

Click the **Options** section to continue configuring the current rules:

| Option name        | Type & Default Value | Description                                                  |
| ------------------ | -------------------- | ------------------------------------------------------------ |
| debug              | bool: false          | Specify whether to enable the debug level for this rule. By default, it will inherit the Debug configuration parameters in the global configuration. |
| logFilename        | string: ""           | Specify the name of a separate log file for this rule, and the log will be saved in the global log folder. By default, the log configuration parameters in the global configuration will be used. |
| isEventTime        | boolean: false       | Whether to use event time or processing time as the timestamp for an event. If event time is used, the timestamp will be extracted from the payload. |
| lateTolerance      | int64:0              | When working with event-time windowing, it can happen that elements arrive late. LateTolerance can specify by how much time(unit is millisecond) elements can be late before they are dropped. By default, the value is 0 which means late elements are dropped. |
| concurrency        | int: 1               | A rule is processed by several phases of plans according to the sql statement. This option will specify how many instances will be run for each plan. If the value is bigger than 1, the order of the messages may not be retained. |
| bufferLength       | int: 1024            | Specify how many messages can be buffered in memory for each plan. If the buffered messages exceed the limit, the plan will block message receiving until the buffered messages have been sent out so that the buffered size is less than the limit. A bigger value will accommodate more throughput but will also take up more memory footprint. |
| sendMetaToSink     | bool:false           | Specify whether the meta data of an event will be sent to the sink. If true, the sink can get te meta data information. |
| sendError          | bool: true           | Whether to send the error to sink. If true, any runtime error will be sent through the whole rule into sinks. Otherwise, the error will only be printed out in the log. |
| qos                | int:0                | Specify the qos of the stream. The options are 0: At most once; 1: At least once and 2: Exactly once. If qos is bigger than 0, the checkpoint mechanism will be activated to save states periodically so that the rule can be resumed from errors. |
| checkpointInterval | int:300000           | Specify the time interval in milliseconds to trigger a checkpoint. This is only effective when qos is bigger than 0. |
| restartStrategy    | struct               | Specify the strategy to automatic restarting rule after failures. This can help to get over recoverable failures without manual operations. Please check [Rule Restart Strategy](#rule-restart-strategy) for detail configuration items. |
| cron               | string: ""           | Specify the periodic trigger strategy of the rule, which is described by [cron expression](https://en.wikipedia.org/wiki/Cron) |
| duration           | string: ""           | Specifies the running duration of the rule, only valid when cron is specified. The duration should not exceed the time interval between two cron cycles, otherwise it will cause unexpected behavior. |
| cronDatetimeRange  | lists of struct      | Specify the effective time period of the Scheduled Rule, which is only valid when `cron` is specified. When this `cronDatetimeRange` is specified, the Scheduled Rule will only take effect within the time range specified. Please see [Scheduled Rule](#Scheduled Rule) for detailed configuration items |


:::tip Tips
In most scenarios, the default values for rule options are sufficient.
:::

After completing the settings, click **Submit** to complete the creation of the current rules. The new rule will appear in the rules list. Here you can view rule status, edit rules, stop rules, refresh rules, view rule topology map, copy rules or delete rules.



## Import and export rules

In the NeuronEX web UI, click **Data Processing** -> **Rules**. Click the **Import Rules** button. In the pop-up window, you can choose:

- Paste file content directly
- Import file contents by uploading files

After clicking **Submit**, the new rule will appear in the rules list. Here you can view rule status, edit rules, stop rules, refresh rules, view rule topology map, copy rules or delete rules.

::: tip

When importing rules, if there are rules with the same ID, the original rules will be overwritten.

:::

In the NeuronEX web UI, click **Data Processing** -> **Rules**, click the **Export Rules** button, and the JSON file of the current rules will be exported.

## [Rule Status](./rule_status.md)

When a rule is run in NeuronEX, we can understand the current rule running status through the rule indicators. See [Rule Status](./rule_status.md) for details.

## [Rule Pipeline](./rule_pipeline.md)

Multiple rules can form a processing pipeline by specifying sink/source union points. For example, the first rule produces results in an memory sink, and other rules subscribe to the topic in their memory sources. For more usage, please see the [Rule Pipeline](./rule_pipeline.md) chapter.