# 规则


在 NeuronEX 中通过 **规则(Rule)** 处理所有计算逻辑。规则以数据源作为输入，通过 **SQL** 定义计算逻辑，将结果输出到 **动作(Sink)** 中。规则定义提交后，它将持续运行。它将不断从源获取数据，根据 SQL 逻辑进行计算，并根据结果实时触发 **动作(Sink)**。

NeuronEX 支持同时运行多个规则。这些规则在同一个内存空间中运行，共享相同的硬件资源。多条并行规则在运行时上是分开的，某条规则的错误不会影响其他规则。

::: tip

NeuronEX 规则 SQL 中至少有一个数据源应该是`流(Stream)`类型。关于如何创建流，可参考 [数据流 - Stream](./stream.md)。

:::


## 创建规则

在 NeuronEX Web 端界面，点击**数据流处理** -> **规则**。点击**创建规则**按钮：

- 规则 ID：输入规则 ID，规则 id 在同一 NeuronEX 实例中必须唯一。

- 名称：输入规则名称

- 输入规则 SQL，例如

  ```sql
  SELECT demo.temperature, demo1.temp
  FROM demo
  LEFT JOIN demo1 ON demo.timestamp = demo1.timestamp
  WHERE demo.temperature > demo1.temp
  GROUP BY demo.temperature, HOPPINGWINDOW(ss, 20, 10)
  ```

## 规则 SQL

规则`sql` 中定义了要处理的流或表，以及如何处理。规则 SQL 是，并将处理结果发送到一个或多个动作(Sink)。规则`sql` 中可以使用内置函数和运算符，也可以使用自定义函数和算法。

最简单的规则 SQL 如 `SELECT * FROM neuronStream`，这条规则会从 `neuronStream` 数据流中获取所有数据。 NeuronEX 提供的丰富的运算符和函数，更多用法请参见 [SQL](./sqls/overview.md)章节 。

## 添加 动作(Sink)

动作(Sink)部分定义了一个规则的输出行为。每个规则可以有多个动作。

在**动作**区域，点击**添加**按钮。

1. 选择动作。动作用来向外部系统写入数据，您可前往 [动作(Sink)](./sink/sink.md) 页面获取详细的配置信息。
   目前 NeuronEX 内置的 Sink 列表：
   - [MQTT sink](./sink/mqtt.md)：输出到外部 MQTT 服务。
   - [Neuron sink](./sink/neuron.md)：输出到 NeuronEX 数采模块。
   - [Rest sink](./sink/rest.md)：输出到外部 HTTP 服务器。
   - [内存 sink](./sink/memory.md)：输出到内存主题以形成规则流水线。
   - [Log sink](./sink/log.md)：写入日志，通常只用于调试。
   - [SQL sink](./sink/file.md)： 写入关系型数据库Mysql、Sqlserver、Sqlite等。
   - [InfluxDB sink](./sink/memory.md)：写入InfluxDB数据库。
   - [InfluxDB V2 sink](./sink/log.md)：写入InfluxDB数据库。
   - [文件 sink](./sink/file.md)： 写入文件。
   - [Nop sink](./sink/nop.md)：不输出，用于性能测试。
   <!-- - [Redis sink](./sink/redis.md): 写入 Redis。 -->
   <!-- - [Kafka sink](./sink/nop.md)：写入Kafka。   -->


完成设置后，点击**测试连接**，确认设置后，点击**提交**完成动作的创建。

## 规则选项 (可选)

点开**选项**部分，可继续对当前规则进行配置：

| 选项名                | 类型和默认值     | 说明                                                                                             |
|--------------------|------------|------------------------------------------------------------------------------------------------|
| 是否开启Debug日志              | bool:false | 指定该条规则是否开启 Debug Level 的日志水平，缺省情况下会继承全局配置中的 Debug 配置参数。                                        |
| 线程数        | int: 1     | 一条规则运行时会根据 sql 语句分解成多个 plan 运行。该参数设置每个 plan 运行的线程数。该参数值大于1时，消息处理顺序可能无法保证。                      |
| 缓存大小       | int: 1024  | 指定每个 plan 可缓存消息数。若缓存消息数超过此限制，plan 将阻塞消息接收，直到缓存消息被消费使得缓存消息数目小于限制为止。此选项值越大，则消息吞吐能力越强，但是内存占用也会越多。 |
| 是否发送元数据     | bool:false | 指定是否将事件的元数据发送到目标。 如果为 true，则目标可以获取元数据信息。                                                       |
| 是否使用事件时间        | bool:false | 使用事件时间还是将时间用作事件的时间戳。 如果使用事件时间，则将从有效负载中提取时间戳。 必须通过**数据流**定义指定时间戳。    |
| 事件时间延迟      | int64:0    | 在使用事件时间窗口时，可能会出现元素延迟到达的情况。 LateTolerance 可以指定在删除元素之前可以延迟多少时间（单位为 ms）。 默认情况下，该值为0，表示后期元素将被删除。   |
| 流的QoS                | int:0      | 指定流的 qos。 值为0对应最多一次； 1对应至少一次，2对应恰好一次。 如果 qos 大于0，将激活检查点机制以定期保存状态，以便可以从错误中恢复规则。                 |
| 检查点间隔 | int:300000 | 指定触发检查点的时间间隔（单位为 ms）。 仅当 qos 大于0时才有效。                                                          |
| 最大重试次数     | int: 0     | 最大重试次数。如果设置为0，该规则将立即失败，不会进行重试。                              |
| 重试间隔时间        | int: 1000  | 默认的重试间隔时间，以毫秒为单位。如果没有设置 `multiplier`，重试的时间间隔将固定为这个值。        |
| 重试最大间隔时间     | int: 30000 | 重试的最大间隔时间，单位是毫秒。只有当 `multiplier` 有设置时，从而使得每次重试的延迟都会增加时才会生效。 |
| 重试间隔时间乘数   | float: 2   | 重试间隔时间的乘数。                                                  |
| 随机值系数 | float: 0.1 | 添加或减去延迟的随机值系数，防止在同一时间重新启动多个规则。                              |


:::tip 提示
大多数场景下，规则选项采用默认值即可。
:::

完成设置后，点击**提交**，完成当前规则的创建。新建规则将出现在规则列表中。您可在此查看规则状态、编辑规则、停止规则、刷新规则、查看规则拓扑图，复制规则或删除规则。



## 导入导出规则

在 NeuronEX Web 端界面，点击**数据流处理** -> **规则**。点击**导入规则**按钮。在弹出的窗口中，您可选择：

- 直接贴入文件内容
- 通过上传文件的形式导入文件内容

点击**提交**后，新建规则将出现在规则列表中。您可在此查看规则状态、编辑规则、停止规则、刷新规则、查看规则拓扑图，复制规则或删除规则。

::: tip

导入规则时，如果有相同 ID 的规则存在，将会覆盖原有规则。

:::

在 NeuronEX Web 端界面，点击**数据流处理** -> **规则**，点击**导出规则**按钮，将会导出当前规则的 JSON 文件。

## [规则状态](./rule_status.md)

当一条规则在 NeuronEX 中运行后，我们可以通过规则指标来了解到当前的规则运行状态。详情请参见[规则状态](./rule_status.md)。

## [规则流水线](./rule_pipeline.md)

多个规则可以通过指定 sink /源的联合点形成一个处理管道。例如，第一条规则在内存 sink 中产生结果，其他规则在其内存源中订阅该主题。更多用法请参见[规则流水线](./rule_pipeline.md)章节 。


<!-- ## 文本创建规则

在 NeuronEX Web 端界面，点击**数据流处理** -> **规则**。点击**创建规则**按钮，点击右上角切换至文本模式。

规则由 JSON 定义，示例如下：

```json
{
  "id": "rule1",
  "name": "Test Condition",
  "graph": {
    "nodes": {
      "demo": {
        "type": "source",
        "nodeType": "mqtt",
        "props": {
          "datasource": "devices/+/messages"
        }
      },
      "humidityFilter": {
        "type": "operator",
        "nodeType": "filter",
        "props": {
          "expr": "humidity > 30"
        }
      },
      "logfunc": {
        "type": "operator",
        "nodeType": "function",
        "props": {
          "expr": "log(temperature) as log_temperature"
        }
      },
      "tempFilter": {
        "type": "operator",
        "nodeType": "filter",
        "props": {
          "expr": "log_temperature < 1.6"
        }
      },
      "pick": {
        "type": "operator",
        "nodeType": "pick",
        "props": {
          "fields": ["log_temperature as temp", "humidity"]
        }
      },
      "mqttout": {
        "type": "sink",
        "nodeType": "mqtt",
        "props": {
          "server": "tcp://${mqtt_srv}:1883",
          "topic": "devices/result"
        }
      }
    },
    "topo": {
      "sources": ["demo"],
      "edges": {
        "demo": ["humidityFilter"],
        "humidityFilter": ["logfunc"],
        "logfunc": ["tempFilter"],
        "tempFilter": ["pick"],
        "pick": ["mqttout"]
      }
    }
  }
}
``` -->