# MQTT Sink

::: danger
证书路径需要看下
:::

该操作用于将输出消息发布到 MQTT 服务器中。
如希望使用 MQTT Sink 连接器，点击 **数据流处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **MQTT**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据流处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称
- **MQTT 服务器地址**：MQTT 消息代理的服务器，如 `tcp://127.0.0.1:1883`
- **MQTT 主题**：将要订阅的 MQTT 主题， 例如 topic1。
- **MQTT 客户端标志符（ClientID）**：MQTT 连接的客户端 ID。 如果未指定，将使用一个 uuid。
- **MQTT 协议版本**：MQTT 协议版本，支持 3.1 或者 3.1.1 ，默认为 3.1。
- **QoS 级别**：默认订阅 QoS 级别，可选值：0、1、2  
- **用户名**：MQTT 连接用户名。
- **密码**：MQTT 连接密码。
- **证书路径**：可以为绝对路径，也可以为相对路径。如果指定的是相对路径，那么父目录为执行 kuiperd 命令的路径。比如，如果你在 `/var/kuiper` 中运行 `bin/kuiperd`，那么父目录为 `/var/kuiper`; 如果运行从 `/var/kuiper/bin` 中运行 `./kuiperd`，那么父目录为 `/var/kuiper/bin`
- **私钥路径**：私钥路径。可以为绝对路径，也可以为相对路径。
- **根证书路径**：根证书路径，用以验证服务器证书。可以为绝对路径，也可以为相对路径。
- **跳过证书验证**：控制是否跳过证书认证。如设置为 True，将跳过证书认证；否则进行证书验证。
- **压缩**：使用指定的方法压缩 MQTT Payload，可选值：zlib、gzip、flate。
- **是否忽略输出**：可选值 True、False，默认为 False，则忽略输出。
- **将结果数据按条发送**：
  
  - 默认为 false，输出格式为 `{"result":"${the string of received message}"}`， 例如，`{"result":"[{"count":30},""count":20}]"}`
  - 如设为 true，结果消息将与实际字段名称一一对应发送。 对于上述示例，它将先发送 `{"count":30}`，再发送 `{"count":20}`
  
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](../config.md)
  - 如选择 delimited，还应配置分隔符，如 ","

- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)

## 高级配置

您可点击展开**高级**部分实现更加定制化的设置。

- **连接器**：重用到 MQTT Broker 的连接，具体可参考 [MQTT 源](../mqtt.md)。
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


## 示例

以下为使用 SAS 连接到 Azure IoT Hub 的样例。

```json
    {
      "mqtt": {
        "server": "ssl://xyz.azure-devices.net:8883",
        "topic": "devices/demo_001/messages/events/",
        "protocolVersion": "3.1.1",
        "qos": 1,
        "clientId": "demo_001",
        "username": "xyz.azure-devices.net/demo_001/?api-version=2018-06-30",
        "password": "SharedAccessSignature sr=*******************",
        "retained": false
      }
    }
```

以下为使用证书和私钥连接到 AWS IoT的另一个样例。

```json
    {
      "mqtt": {
        "server": "ssl://xyz-ats.iot.us-east-1.amazonaws.com:8883",
        "topic": "devices/result",
        "qos": 1,
        "clientId": "demo_001",
        "certificationPath": "keys/d3807d9fa5-certificate.pem",
        "privateKeyPath": "keys/d3807d9fa5-private.pem.key",
        "retained": false
      }
    }
```

## 动态主题

若结果数据中包含主题内容，可以将其作为主题属性，从而实现动态主题的需求。假设 SQL 选出的数据包含 `mytopic`, 则可以使用数据模板的语法将其设置为 `topic` 属性的值，如下所示：

```json
    {
      "mqtt": {
        "server": "ssl://xyz-ats.iot.us-east-1.amazonaws.com:8883",
        "topic": "{{.mytopic}}",
        "qos": 1,
        "clientId": "demo_001",
        "certificationPath": "keys/d3807d9fa5-certificate.pem",
        "privateKeyPath": "keys/d3807d9fa5-private.pem.key",
        "retained": false
      }
    }
```
