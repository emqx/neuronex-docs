# 规则

::: danger
【attention】数据模版引用到 ekuiper？
SQL 部分是搬过来还是链接到 ekuiper？
:::

在 ECP Edge，计算工作以规则的形式呈现。规则以流的数据源为输入，通过 SQL 定义计算逻辑，将结果输出到动作/sink 中。规则定义提交后，它将持续运行。它将不断从源获取数据，根据 SQL 逻辑进行计算，并根据结果触发行动。

::: tip

目前，ECP Edge 只支持流处理规则，因此至少有一个规则源应该是连续流。关于如何创建流，可参考[数据流 - Stream](./stream.md)。

:::

此外，ECP Edge 支持同时运行多个规则。这些规则在同一个内存空间中运行，共享相同的硬件资源。多条并行规则在运行时上是分开的，某条规则的错误不会影响其他规则。

## [规则管道](./rule_pipeline.md)

多个规则可以通过指定 sink /源的联合点形成一个处理管道。例如，第一条规则在内存 sink 中产生结果，其他规则在其内存源中订阅该主题。

ECP Edge 支持通过批量导入规则，或通过 Web 界面创建规则。

## 可视化创建规则

在 ECP Edge Web 端界面，点击**数据流处理** -> **规则**。点击**创建规则**按钮，即可通过图形化的方式创建规则：

- 规则 ID：输入规则 ID，规则 id 在同一 ECP Edge 实例中必须唯一。

- 名称：输入规则名称

- 输入规则 SQL，例如

  ```sql
  SELECT demo.temperature, demo1.temp
  FROM demo
  LEFT JOIN demo1 ON demo.timestamp = demo1.timestamp
  WHERE demo.temperature > demo1.temp
  GROUP BY demo.temperature, HOPPINGWINDOW(ss, 20, 10)
  ```

## 添加 Sink

动作部分定义了一个规则的输出行为。每个规则可以有多个动作。一个动作是一个 sink 连接器的实例。当定义动作时，键是 sink 连接器的类型名称，而值是其属性。

在**动作**区域，点击**添加**按钮。

1. 选择 Sink。Sink 用来向外部系统写入数据，分为内置动作和扩展动作两类。您可前往 [Sink](./sink/sink.md) 页面获取 ECP Edge 支持的 Sink 列表。
   目前 ECP Edge 内置的 Sink 列表：
   - [Mqtt sink](./sink/mqtt.md)：输出到外部 mqtt 服务。
   - [Neuron sink](./sink/neuron.md)：输出到本地的 Neuron 实例。
   - [EdgeX sink](./sink/edgex.md)：输出到 EdgeX Foundry。此动作仅在启用 edgex 编译标签时存在。
   - [Rest sink](./sink/rest.md)：输出到外部 http 服务器。
   - [Redis sink](./sink/redis.md): 写入 Redis 。
   - [File sink](./sink/file.md)： 写入文件。
   - [Memory sink](./sink/memory.md)：输出到 eKuiper 内存主题以形成规则管道。
   - [Log sink](./sink/log.md)：写入日志，通常只用于调试。
   - [Nop sink](./sink/nop.md)：不输出，用于性能测试。
2. Resource ID：选择资源 ID 以实现配置的复用。
3. 是否忽略输出：可选值 True、False，默认为 False，则忽略输出。
4. 将结果数据按条发送：
   - 默认为 false，输出格式为 `{"result":"${the string of received message}"}`， 例如，`{"result":"[{"count":30},""count":20}]"}`
   - 如设为 true，结果消息将与实际字段名称一一对应发送。 对于上述示例，它将先发送 `{"count":30}`，再发送 `{"count":20}`
5. 流格式：支持 json、binary、protobuf、delimited、custom。
   - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](./config.md#模式)
   - 如选择 delimited，还应配置分隔符，如 ","
6. 数据模版：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [eKuiper - 数据模版](https://ekuiper.org/docs/zh/latest/guide/sinks/data_template.html)
7. 此外，您可点击展开**高级**部分实现更加定制化的设置。
   - 线程数：设置运行的线程数。该参数值大于 1 时，消息发出的顺序可能无法保证。
   - 缓存大小：设置可缓存消息数目。若缓存消息数超过此限制，sink 将阻塞消息接收，直到缓存消息数目小于限制为止。
   - 是否启用缓存：设置是否启用缓存，可选值 True、False
   - 停止时是否清理缓存：设置停止时是否清理缓存，可选值 True、False
   - 内存缓存阈值：内存中缓存的最大消息数。
   - 最大磁盘缓存：缓存在磁盘中的最大消息数。
   - 缓冲区页面大小：缓冲区页的消息数，单位为批量读/写磁盘，防止频繁 IO。
   - 重发间隔：重新发送缓存消息的时间间隔（毫秒）。
   - 是否异步运行：设置是否异步运行输出操作以提升性能。请注意，异步运行时，将无法保证输出结果的顺序。

完成设置后，点击**测试连接**，确认设置后，点击**提交**完成动作的创建。

## 规则选项

点开**选项**部分，可继续对当前规则进行配置：

- 是否使用事件时间：是否使用事件时间作为的时间戳。 如使用事件时间，则将从有效负载中提取时间戳。有关时间戳的配置，见 [流 - 时间戳](./stream.md#时间戳与时间戳格式)。
- 是否发送元数据：指定是否将事件的元数据发送到目标，可选值 True、False
- 延迟多少毫秒：在元素延迟到达的情况，指定在删除元素之前可以延迟多少时间（单位为 ms）。 默认为 0，表示后期元素将被删除。
- 线程数：一条规则运行时会根据 sql 语句分解成多个 plan 运行。该参数设置每个 plan 运行的线程数。该参数值大于 1 时，消息处理顺序可能无法保证。
- 缓存大小：指定每个 plan 可缓存消息数。若缓存消息数超过此限制，plan 将阻塞消息接收，直到缓存消息数目小于限制为止。此选项值越大，消息吞吐能力越强，但内存占用也会越多。
- 流的 QoS：指定流的 QoS。 值：0、1、2
- 检查点间隔毫秒数：指定触发检查点的时间间隔（单位为 ms）。 该设置仅在 qos 大于 0 时发挥作用。
- 最大重试次数：最大重试次数。如果设置为 0，该规则将立即失败，不会进行重试
- 重试间隔时间：默认的重试间隔时间，单位为毫秒。如果没有设置**重试间隔时间系数**（`multiplier`），重试的时间间隔将固定为这个值。
- 重试的最大间隔时间：重试的最大间隔时间，单位为毫秒。仅在同时设置**重试间隔时间系数**（`multiplier`）时生效。
- 重试间隔时间系数：重试间隔时间的乘数。
- 随机值系数：添加或减去延迟的随机值系数，防止在同一时间重新启动多个规则。

完成设置后，点击提交，完成当前规则的创建。新建规则将出现在规则列表中。您可在此查看规则状态、编辑规则、停止规则、刷新规则、查看规则拓扑图，复制规则或删除规则。

## 文本创建规则

在 ECP Edge Web 端界面，点击**数据流处理** -> **规则**。点击**创建规则**按钮，点击右上角切换至文本模式。

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
```

## 导入规则

在 ECP Edge Web 端界面，点击**数据流处理** -> **规则**。点击**导入规则**按钮。在弹出的窗口中，您可选择：

- 直接贴入文件内容，或通过上传文件的形式导入文件内容。
- 点击文件 URL 页签，在文件 URL下拉列表中，上传预定义的规则文件。

点击**提交**后，新建规则将出现在规则列表中。您可在此查看规则状态、编辑规则、停止规则、刷新规则、查看规则拓扑图，复制规则或删除规则。

::: tip

导入规则前，需提前上传预定义的规则文件，具体可参考[配置 - 文件管理](./config.md#文件管理)。

:::

## 规则 SQL

通过指定 `sql` 和 `actions` 属性，以声明的方式定义规则的业务逻辑。其中，`sql` 定义了针对预定义流运行的 SQL 查询，这将转换数据。然后，输出的数据可以通过 `action` 路由到多个位置。

最简单的规则 SQL 如 `SELECT * FROM demo`。它有类似于 ANSI SQL 的语法，并且可以利用 ECP Edge 运行时提供的丰富的运算符和函数。参见 [SQL](https://ekuiper.org/docs/zh/latest/sqls/functions/overview.html) 获取更多 SQL 信息。

大部分的 SQL 子句都是定义逻辑的，除了负责指定流的 `FROM` 子句。在这个例子中，`demo` 是一个流。通过使用连接子句，可以有多个流或流/表。作为一个流引擎，一个规则中必须至少有一个流。

因此，这里的 SQL 查询语句实际上定义了两个部分。

- 要处理的流或表。
- 如何处理。
