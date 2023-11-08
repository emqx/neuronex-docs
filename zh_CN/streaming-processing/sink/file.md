# 文件 Sink

文件 Sink 将分析结果保存到指定文件中。指定的文件已存在，结果将会覆盖写入。[数据源 - 文件](../file.md)是反向的连接器，可以读取文件 sink 的输出。

## 文件类型

文件 Sink 可以将数据写入不同类型的文件，例如：

- lines：这是默认类型。它写入由流定义中的格式参数解码的行分隔文件。例如，要写入行分隔的 JSON 字符串，请将文件类型设置为 lines，格式设置为 json。
- json：此类型写入标准 JSON 数组格式文件。
- csv：此类型写入逗号分隔的 csv 文件。您也可以使用自定义分隔符。要使用此文件类型，请将格式设置为 delimited。

如希望使用 File Sink 连接器，点击 **数据流处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **file**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据流处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称

- **Resource ID**：选择已有的传输与存储模版，或自行配置。
- **文件路径**：保存结果的文件路径
- **间隔时间**：写入分析结果的时间间隔（毫秒）。
- **是否忽略输出**：可选值 True、False，默认为 False，则忽略输出。
- **将结果数据按条发送**：
  - 默认为 false，输出格式为 `{"result":"${the string of received message}"}`， 例如，`{"result":"[{"count":30},""count":20}]"}`
  - 如设为 true，结果消息将与实际字段名称一一对应发送。 对于上述示例，它将先发送 `{"count":30}`，再发送 `{"count":20}`
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](../config.md)
  - 如选择 delimited，还应配置分隔符，如 ","
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)。注意：如使用 **Key 字段**配置 Redis 的键值（key），则无需配置数据模版。

## 通用配置

您可点击展开**高级**部分实现更加定制化的设置。

- **线程数**：设置运行的线程数。该参数值大于 1 时，消息发出的顺序可能无法保证。
- **缓存大小**：设置可缓存消息数目。若缓存消息数超过此限制，sink 将阻塞消息接收，直到缓存消息数目小于限制为止。
- **是否启用缓存**：设置是否启用缓存，可选值 True、False
- **停止时是否清理缓存**：设置停止时是否清理缓存，可选值 True、False
- **内存缓存阈值**：内存中缓存的最大消息数。
- **最大磁盘缓存**：缓存在磁盘中的最大消息数。
- **缓冲区页面大小**：缓冲区页的消息数，单位为批量读/写磁盘，防止频繁 IO。
- **重发间隔**：重新发送缓存消息的时间间隔（毫秒）。
- **是否异步运行**：设置是否异步运行输出操作以提升性能。请注意，异步运行时，将无法保证输出结果的顺序。

完成设置后，可点击**测试连接**确认连接情况。最后点击**提交**，完成设置。

## Rolling 策略

文件 Sink 支持配置滚动（Rolling）策略，以控制文件的大小和文件的数量。滚动策略由以下属性控制：rollingInterval、checkInterval、rollingCount 和 rollingNamePattern。

文件滚动可以基于时间或基于消息数或两者。

1. 基于时间的滚动： rollingInterval 和 checkInterval 属性用来控制基于时间的滚动。rollingInterval 是滚动到一个新文件的最小时间间隔。checkInterval 是检查基于时间的滚动策略的时间间隔。这控制了检查一个文件是否应该滚动的频率。

   例如，如果 checkInterval 是 1 小时，rollingInterval 是 1 天，那么文件 Sink 将在每小时检查每个打开的文件，如果文件打开超过 1 小时，文件将被滚动。所以实际的滚动间隔可能比rollingInterval 属性大。要使用基于时间的滚动，请将 rollingInterval 属性设置为正值，并将 rollingCount 设置为 0。

   组合示例：rollingInterval=1天，checkInterval=1小时，rollingCount=0。

2. 基于消息计数的滚动： rollingCount 属性用于控制基于消息数的滚动。文件 sink 将检查每个打开的文件的消息数，如果消息数大于 rollingCount，文件将滚动。要使用基于消息数的滚动，请将 rollingCount 属性设置为正值，并将 rollingInterval 设置为 0。 

   示例组合：rollingInterval=0, rollingCount=1000。

3. 同时基于时间和消息数的滚动： 文件 sink 将同时检查每个打开的文件的时间和消息数，如果其中一个被满足，文件将被滚存。要同时使用基于时间和消息数的滚动，请将 rollingInterval 和 rollingCount 属性设置为正值。

   组合示例：rollingInterval=1天，checkInterval=1小时，rollingCount=1000。

## 使用示例

下面是一个选择温度大于50度的示例，每5秒将结果保存到文件 `/tmp/result.txt`  中。

```json
{
  "sql": "SELECT * from demo where temperature>50",
  "actions": [
    {
      "file": {
        "path": "/tmp/result.txt",
        "interval": 5000,
        "fileType": "lines",
        "format": "json"
      }
    }
  ]
}
```

下面是另一个例子，根据 paylaod 中的 `device` 字段，将结果写入多个文件。每个文件将每1小时或有超过 10000条信息时滚动一次。滚动文件名将有一个创建时间戳的前缀，如`16998888_deviceName.csv`。

```json
{
  "sql": "SELECT * from demo where temperature>50",
  "actions": [
    {
      "file": {
        "path": "{{.device}}.csv",
        "fileType": "csv",
        "format": "delimited",
        "hasHeader": true,
        "delimiter": ",",
        "rollingInterval": 3600000,
        "checkInterval": 600000,
        "rollingCount": 10000,
        "rollingNamePattern": "prefix"
      }
    }
  ]
}
```