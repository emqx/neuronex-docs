# Kafka 源

<span style="background:green;color:white;padding:1px;margin:2px">流</span>

NeuronEX 数据处理模块通过 Kafka 消息源从而获取 Kafka 中的数据。

## 创建流

登录 NeuronEX，点击**数据处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：不勾选。
- **流类型**：选择 Kafka
- **配置组**：可编辑使用默认配置组，或点击添加配置组，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：

  - **名称**：输入配置组名称。
  - **Brokers**：输入 Kafka 地址,用 "," 分割 。
  - **Kafka 消费组名**：消费 kafka 消息时所使用的 group ID。
  - **Partition**：输入 Kafka 分区。
  - **SASL 认证类型**：选择 sasl 认证类型。
  - **SASL 用户名**：输入 sasl 用户名。
  - **SASL 密码**：输入 sasl 密码。
  - **客户端证书**：输入 Kafka 客户端 ssl 验证的 crt 文件路径。
  - **客户端私钥**：输入 Kafka 客户端 ssl 验证的 key 文件路径。
  - **CA 证书**：输入 Kafka 客户端 ssl 验证的 ca 证书文件路径。
  - **跳过证书验证**：是否跳过 SSL 验证。
  - **Max Bytes**：单个 kafka 消息批次最大所能携带的 bytes 数，默认为 1MB。
- **流格式**：支持 json、binary、protobuf、delimited、custom。
- **共享**：勾选确认是否共享源。


