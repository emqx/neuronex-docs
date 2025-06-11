# Websocket 数据源

<span style="background:green;color:white;">流</span> <span style="background:green;color:white;">扫描表</span>

NeuronEX 数据处理模块通过 Websocket 数据源获取数据。

## 创建流

登录 NeuronEX，点击**数据处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：不勾选。
- **流类型**：选择 Websocket
- **数据源**：Websocket 申请连接的 URL 路径
- **配置组**：可编辑使用默认配置组，或点击添加配置组，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：

  - **名称**：输入配置组名称。
  - **Websocket 地址**：Websocket 服务端地址，将会向该地址申请 Websocket 请求。如果未填写，则 NeuronEX 将作为 Websocket 服务端 。
  - **客户端证书**：输入客户端 ssl 验证的 crt 文件路径。
  - **客户端私钥**：输入客户端 ssl 验证的 key 文件路径。
  - **CA 证书**：输入客户端 ssl 验证的 ca 证书文件路径。
  - **跳过证书验证**：是否跳过 SSL 验证。
- **流格式**：支持 json、binary、protobuf、delimited、custom。
- **共享**：勾选确认是否共享源。



## 作为 Websocket 客户端

Websocket 数据源可以作为 Websocket 客户端，向远端的 Websocket 服务器发起 Websocket 连接，并在 Websocket 连接上接收数据作为消息源。

当作为 websocket 客户端时，你需要指定该 `Websocket 地址`，例如：127.0.0.1:8080；并在创建数据源页面的`数据源`配置项中填入如下:/api/data；

此时，Websocket 数据源将作为 Websocket 的客户端，向 `127.0.0.1:8080/api/data` 建立 Websocket 连接，并以该连接接收数据作为消息源。

## 作为 Websocket 服务端

Websocket 数据源还可以作为 Websocket 服务端，此时远端的 websocket 客户端可以主动向 NeuronEX 发起 Websocket 连接，NeuronEX 会在该 Websocket 连接上接收消息作为消息源。

当作为 Websocket 服务端时 `Websocket 地址`可以留空，并在创建数据源页面的`数据源`配置项配置如下:/api/data；

此时，NeuronEX 将作为 Websocket 的服务端，以自身为 host,并在 /api/data 的 url 处等待 Websocket 连接建立，并以该连接接收数据作为消息源。

Websocket 默认端口为 10081,若要修改该端口，需要在配置文件`/opt/neuronex/software/ekuiper/etc` 中的 `source` 部分进行修改：

```yaml
source:
  ## Configurations for the global websocket server for websocket source
  # HTTP data service ip
  httpServerIp: 0.0.0.0
  # HTTP data service port
  httpServerPort: 10081
  # httpServerTls:
  #    certfile: /var/https-server.crt
  #    keyfile: /var/https-server.key
```

用户可以指定以下属性：

- `httpServerIp`：用于绑定 Websocket 数据服务器的 IP。
- `httpServerPort`：用于绑定 Websocket 数据服务器的端口。
- `httpServerTls`：Websocket 服务器 TLS 的配置。

当任何需要 Websocket 源的规则被启动时，全局服务器的设置会初始化。所有关联的规则被关闭后，它就会终止。


