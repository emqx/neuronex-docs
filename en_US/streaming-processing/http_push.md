# HTTP Push 源

<span style="background:green;color:white;">流</span>        <span style="background:green;color:white">扫描表</span>

::: danger
【attention】这里的路径需要明确
:::

ECP Edge 默认支持 HTTP Push 源，它作为一个 HTTP 服务器，可以接收来自 HTTP 客户端的消息。所有的 HTTP 推送源共用单一的全局 HTTP 数据服务器。每个源可以有自己的 URL，这样就可以支持多个端点。该类型可以作为流、扫描表的数据源。

配置分成两个部分：全局服务器配置和源配置。

## 服务器配置

服务器配置在 `etc/kuiper.yaml` 中的 `source` 部分。

```yaml
source:
  ## Configurations for the global http data server for httppush source
  # HTTP data service ip
  httpServerIp: 0.0.0.0
  # HTTP data service port
  httpServerPort: 10081
  # httpServerTls:
  #    certfile: /var/https-server.crt
  #    keyfile: /var/https-server.key
```

用户可以指定以下属性：

- httpServerIp：用于绑定 http 数据服务器的IP。
- httpServerPort：用于绑定 http 数据服务器的端口。
- httpServerTls: http 服务器 TLS 的配置。

一旦有任何需要 httppush 源的规则启动，全局服务器就会启动。一旦所有引用的规则都关闭，它就会关闭。

## 创建流（源配置）

登录 ECP Edge，点击**数据流处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段
  - **名称**：字段名称
  - **类型**：支持 bigint、float、string、datetime、boolean、array、struct、bytea
- **流类型**：选择 httppush
- **数据源**：指定URL 的路径部分，与 URL 属性拼接成最终 URL， 例如 /api/data。
- **配置组**：可使用默认配置组，如希望自定义配置组，可点击添加配置组按钮，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：
  - **名称**：输入配置组名称。
  - **请求方法**：HTTP 请求方法，可以是 POST 或 PUT。
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](./config.md#模式)
  - 如选择 delimited，还应配置分隔符，如 ","

- **时间戳字段**：指定代表时间的字段。
- **时间戳格式**：指定时间戳格式。
- **共享**：勾选确认是否共享源。

## 创建扫描表（源配置）

HTTP Push 源支持查询表。登录 ECP Edge，点击**数据流处理** -> **源管理**。在**扫描表**页签，点击**创建扫描表**。

- **表名称**：输入表名称
- **是否为带结构的表**：勾选确认是否为带结构的表，如为带结构的表，则需进一步添加表字段
  - **名称**：字段名称
  - **类型**：支持 bigint、float、string、datetime、boolean、array、struct、bytea
- **表类型**：选择 httppush。
- **数据源**：指定 URL 的路径部分，与 URL 属性拼接成最终 URL， 例如 /api/data。
- **配置组**：可使用默认配置组，如希望自定义配置组，可参考[创建流](#创建流)部分
- **表格式**：支持 json、binary、delimited、custom。
  - 如选择 custom，还应配置对应的[模式和模式消息](./config.md#模式)
  - 如选择 delimited，还应配置分隔符，如 ","

- **保留大小**：指定保留大小。

