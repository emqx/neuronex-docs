# 北向应用

南向驱动完成数据采集后，数据的去向决定北向应用的选型。EMQX Neuron 提供四类去向，各自对应一种典型的工厂场景。

| 使用场景 | 对应应用 |
| --- | --- |
| [数据上云](./cloud.md)<br />总部或云平台要汇总多个工厂的数据 | [MQTT](./mqtt/overview.md) · [AWS IoT](./aws-iot/overview.md) · [Azure IoT](./azure-iot/overview.md) |
| [对接工业物联网平台（统一命名空间）](./uns.md)<br />让平台自动认出设备，新增设备不用改平台配置 | [Sparkplug B](./sparkplugb/overview.md) |
| [对接上位系统](./scada.md)<br />SCADA、MES、组态软件要从网关取数，且不改造这些系统 | [OPC UA Server](./opcua-server/overview.md) · [WebSocket](./websocket/websocket.md) |
| [接入大数据与边缘计算](./analytics.md)<br />进数据湖做长期分析，或先在边缘过滤聚合 | [Kafka](./kafka/overview.md) · [规则引擎应用](./ekuiper/overview.md) |

前三类由 EMQX Neuron 主动上报数据；**对接上位系统**方向相反，由厂内系统作为客户端接入读取。各类别对反向控制的支持情况见下表。

## 通用步骤

所有北向应用的配置流程一致：

1. [创建北向应用](./north-apps.md)：选择应用类型并填写连接参数
2. [订阅南向数据](../subscription.md)：将需要上报的采集组关联至该应用

数据以**组**为单位上报。一个应用可订阅多个采集组，同一采集组亦可被多个应用订阅，即同一份数据可同时上报至云平台、供上位系统读取并写入数据平台。

## 能力对比

| <div style="width:100pt">应用</div> | <div style="width:60pt">数据方向</div> | <div style="width:50pt">反控设备</div> | <div style="width:50pt">断网缓存</div> | 安全 |
| --- | --- | --- | --- | --- |
| [MQTT](./mqtt/overview.md) | 主动上报 | 写请求 / 写响应主题 | 支持 | TLS、双向认证 |
| [Sparkplug B](./sparkplugb/overview.md) | 主动上报 | NCMD / DCMD 命令 | 支持 | TLS、双向认证 |
| [AWS IoT](./aws-iot/overview.md) | 主动上报 | 写请求 / 写响应主题 | 支持 | 设备证书 |
| [Azure IoT](./azure-iot/overview.md) | 主动上报 | 云到设备（C2D）消息 | 支持 | SAS 令牌、X.509 证书 |
| [OPC UA Server](./opcua-server/overview.md) | 被动取数 | 客户端直接写变量节点 | — | 安全策略、证书、用户名密码 |
| [WebSocket](./websocket/websocket.md) | 主动上报 | 不支持 | — | wss、双向认证 |
| [Kafka](./kafka/overview.md) | 主动上报 | 不支持（仅生产者） | — | SASL、TLS |
| [规则引擎应用](./ekuiper/overview.md) | 内部 | Neuron Sink 写回 | — | — |

::: tip
除北向应用外，EMQX Neuron 还提供 RESTful API 读写点位，见 [HTTP API](../../api/api.md)。
:::
