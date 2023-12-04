# Neuron 源

<span style="background:green;color:white;">流</span>        <span style="background:green;color:white">扫描表</span>

::: danger

【attention】这一段需要看下

:::

ECP Edge 为 Neuron 源流提供了内置支持，流可以订阅来自本地 Neuron 的消息并输入 ECP Edge  处理。

:::tip

该源仅可用于本地的 neuron，因为与 neuron 的通信基于 nanomsg ipc 协议，无法通过网络进行。在 ECP Edge 端，所有 neuron 源和动作共享同一个 neuron 连接。

由于拨号到 Neuron 是异步的，因此即使 Neuron 停机，Neuron sink 的规则也不会看到报错。用户可通过消息流入数量判断连接是否正常。

:::

## 消息格式

Neuron 发过来的消息为固定的 json 格式，如下所示： 

```json
{
  "timestamp": 1646125996000,
  "node_name": "node1", 
  "group_name": "group1",
  "values": {
    "tag_name1": 11.22,
    "tag_name2": "string"
  },
  "errors": {
    "tag_name3": 122
  }
}
```



## 创建流

登录 ECP Edge，点击**数据流处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段

  - **名称**：字段名称
  - **类型**：支持 bigint、float、string、datetime、boolean、array、struct、bytea
- **流类型**：选择 neuron。
- **数据源**（MQTT 主题）：将要订阅的 MQTT 主题， 例如 topic1。
- **配置组**：可使用默认配置组，如希望自定义配置组，可点击添加配置组按钮，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：

  - **名称**：输入配置组名称。
  - **路径**：连接 Neuron 的 nng url
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](./config.md#模式)
  - 如选择 delimited，还应配置分隔符，如 ","

- **时间戳字段**：指定代表时间的字段。
- **时间戳格式**：指定时间戳格式。
- **共享**：勾选确认是否共享源。

## 创建扫描表

MQTT 源支持查询表。登录 ECP Edge，点击**数据流处理** -> **源管理**。在**扫描表**页签，点击**创建扫描表**。

- **表名称**：输入表名称
- **是否为带结构的表**：勾选确认是否为带结构的表，如为带结构的表，则需进一步添加表字段
  - **名称**：字段名称
  - **类型**：支持 bigint、float、string、datetime、boolean、array、struct、bytea
- **表类型**：选择 neuron。
- **配置组**：可使用默认配置组，如希望自定义配置组，可参考[创建流](#创建流)部分
- **表格式**：支持 json、binary、delimited、custom。
  - 如选择 custom，还应配置对应的[模式和模式消息](./config.md#模式)
  - 如选择 delimited，还应配置分隔符，如 ","

- **保留大小**：指定保留大小。

