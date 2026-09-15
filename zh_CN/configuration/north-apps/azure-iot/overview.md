# Azure IoT

[Azure IoT Hub] 实现了可靠、安全的双向通信，将物联网设备与基于云的服务连接起来。作为通信的中心消息枢纽，它允许开发人员从物联网设备接收消息，并向其发送消息。

EMQX Neuron 的 Azure IoT 应用基于 [MQTT 应用]，预置了 Azure IoT Hub 的接入方式：填入 IoT 中心域名和设备 ID，选择 Shared Access Signature 或 X.509 证书认证即可连接，上报和反控主题由设备 ID 自动生成。

[MQTT 应用]: ../mqtt/overview.md
[Azure IoT Hub]: https://learn.microsoft.com/en-us/azure/iot/

## 添加应用

在**北向应用**标签页，点击 **添加应用** 添加节点。

## 应用配置

以下是使用 Azure IoT 应用配置节点时可用的参数：

| 字段               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| **设备 ID**        | Azure IoT Hub 的设备 ID，必填。                              |
| **QoS 等级**       | MQTT 通信的服务质量等级，可选，默认为 QoS 0 。               |
| **上报数据格式**   | 上报数据的 JSON 格式：<br />· *values-format*：数据被分成 `values` 和 `errors` 的子对象。<br />· *tags-format*：数据被放在一个数组中。关于通信数据格式，见 [数据上下行格式](../mqtt/api.md#数据上报) |
| **IoT 中心域名**   | Azure IoT 中心域名。                                         |
| **身份验证**       | 设备身份验证方式，使用 Shared Access Signature 或者 X.509 证书。|
| **SAS 令牌**       | 使用 Shared Access Signature 身份验证方式时，需要提供 SAS 令牌。|
| **CA 证书**        | 使用 X.509 证书身份验证方式时，需要提供 CA 证书。               |
| **设备证书**       | 使用 X.509 证书身份验证方式时，需要提供设备证书。               |
| **设备私钥**       | 使用 X.509 证书身份验证方式时，需要提供设备私钥。               |
| **离线缓存**       | 离线缓存开关。连接断开时缓存 MQTT 消息，连接重建时同步缓存的消息到MQTT服务器。|
| **缓存内存大小**   | 通信失败时内存消息缓存大小 (MB) 限制，必填；范围：[0, 1024]，不能大于缓存磁盘大小。 |
| **缓存磁盘大小**   | 通信失败时磁盘消息缓存大小 (MB) 限制，必填，范围：[0, 10240]。<br />设为非零值时，缓存内存大小 也须为非零值。 |
| **缓存消息重传间隔** | 通信恢复、消息重传时每条消息之间的时间间隔 (MS)，必填；范围：[10, 120000] |

## 添加订阅

完成应用配置后，通过订阅南向设备实现数据转发。在**北向应用**页，点击设备卡片/设备列进入**组列表**页。点击**添加订阅**，并进行如下设置：

- **南向设备**：选择要订阅的南向设备，例如，modbus-tcp-1；

- **组**：选择南向设备下的某个组，例如，group-1。

在 Azure IoT 应用成功连接后，它将通过 MQTT 主题 `devices/{device-id}/messages/events/` 向 Azure IoT Hub 发送数据，其中 `{device-id}` 是设备的**设备 ID**。

上报数据的确切格式由**上报数据格式**参数控制，行为与 MQTT 应用一样。更多详细信息，请参阅 [数据上下行格式](../mqtt/api.md#数据上报)。

## 通过云到设备消息反控

Azure IoT 应用订阅 MQTT 主题 `devices/{device-id}/messages/devicebound/#`，接收来自 Azure IoT Hub 的云到设备（C2D）写入请求；写入结果发布到上行主题 `devices/{device-id}/messages/events/`。其中 `{device-id}` 是设备的**设备 ID**。

写入请求的数据格式与 MQTT 应用一致，见[数据上下行格式](../mqtt/api.md#写-tag)。

## 教程

[使用 EMQX Neuron 将数据桥接到 Azure IoT Hub](./example.md) 教程演示了如何使用 Azure IoT 应用连接 Azure IoT Hub 。
