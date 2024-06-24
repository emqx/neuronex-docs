# 文件 Sink

文件 Sink 将分析结果保存到指定文件中。指定的文件已存在，结果将会覆盖写入。[数据源 - 文件](../file.md)是反向的连接器，可以读取文件 sink 的输出。

## 文件类型

文件 Sink 可以将数据写入不同类型的文件，例如：

- lines：这是默认类型。它写入由流定义中的格式参数解码的行分隔文件。例如，要写入行分隔的 JSON 字符串，请将文件类型设置为 lines，格式设置为 json。
- json：此类型写入标准 JSON 数组格式文件。
- csv：此类型写入逗号分隔的 csv 文件。您也可以使用自定义分隔符。要使用此文件类型，请将格式设置为 delimited。

如希望使用 File Sink 连接器，点击 **数据处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **file**。

## Sink 配置

在规则页面，点击**添加动作**，进行如下设置：

- **文件路径**：保存结果的文件路径，例如  `/tmp/result.txt`。
- **文件类型**：文件类型，支持 json， csv 或者 lines，其中默认值为 lines。
- **是否包含头文件**：指定是否生成文件头。当前仅在文件类型为 csv 时生效。文件头由收到的第一条数据推断得来，推断的 key 采用字母排序。
- **Rolling间隔**：定义 [rolling 策略](#rolling-策略)的属性之一。滚动到新文件的最小时间间隔（以毫秒为单位）。检查频率由checkInterval 控制。
- **检查间隔**：定义 [rolling 策略](#rolling-策略)的属性之一。检查基于时间的滚动策略的间隔（以毫秒为单位），用于控制检查文件是否应该翻转的频率。
- **Rolling计数**：定义 [rolling 策略](#rolling-策略)的属性之一。文件翻转前的最大消息计数。
- **Rolling文件名模式**：定义 [rolling 策略](#rolling-策略)的属性之一。指定滚动文件创建时如何放置时间戳。时间戳可为“前缀”，“后缀”或“无”。
- **是否忽略输出**：默认为 False。
- **将结果数据按条发送**：默认为 True。
- **流格式**：默认为 `json`。
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)


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