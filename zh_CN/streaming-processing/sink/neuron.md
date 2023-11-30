# Neuron Sink

该动作用于将结果发送到 NeuronEX 实例的数采引擎模块中以实现设备反控。

如希望使用 Neuron Sink 连接器，点击 **数据流处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **Neuron**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据流处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称
- **路径**：连接 NeuronEX 实例的数采引擎模块的 URL，默认为 `tcp://127.0.0.1:7081`
- **节点名称**：发送到 neuron 的节点名，值可以为动态参数模板。使用非 raw 模式时必须配置此选项。
- **分组名称**：发送到 neuron 的组名，值可以为动态参数模板。使用非 raw 模式时必须配置此选项。

- **是否忽略输出**：默认为 False。
- **将结果数据按条发送**：默认为 True。
- **流格式**：默认为 `json`。
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)

完成设置后，可点击**测试连接**确认连接情况。最后点击**提交**，完成设置。

## 示例

假设接收到的结果如下所示：

```json
{
  "temperature": 25.2,
  "humidity": 72,
  "status": "green",
  "node": "myNode"
}
```

### 发送选定的标签

以下的示例 neuron 配置中，`raw` 参数为空，因此该动作将根据用户配置的其他参数将结果转换为 neuron 的默认格式。`tags` 参数指定了需要发送的标签的名字。

```json
{
  "neuron": {
    "groupName": "group1",
    "nodeName": "node1",
    "tags": ["temperature","humidity"]
  }
}
```

这个配置将发送两个标签 temperature 和 humidity 到 group1 组 node1 节点。

### 发送所有列

以下的配置中没有指定 `tags` 参数，因此所有结果中的列将作为标签发送。

```json
{
  "neuron": {
    "groupName": "group1",
    "nodeName": "node1"
  }
}
```

这个配置将发送四个标签 temperature， humidity， status 和 node 到 group1 组 node1 节点。

### 发送到动态的节点

在此配置中，`nodeName` 设置为一个数据模板，从结果里提取 `node` 列的值作为发送的节点名。

```json
{
  "neuron": {
    "groupName": "group1",
    "nodeName": "{{.node}}",
    "tags": ["temperature","humidity"]
  }
}
```

这个配置将发送两个标签 temperature 和 humidity 到 group1 组 myNode 节点。

### 发送原始字符串数据

以下配置中，数据模板转换后的字符串数据将直接发送到 neuron 中。

```json
{
  "neuron": {
    "raw": true,
    "dataTemplate": "your template here"
  }
}
```