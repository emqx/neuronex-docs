# 产品概览

EMQX Neuron 是一款功能强大的工业边缘网关软件，专为工业领域的数字化转型而设计。它部署在制造、能源、楼宇等工业现场，其核心任务是打通物理世界与数字世界的连接，实现：

- **海量设备连接与数据接入：** 通过丰富的协议支持，统一采集 PLC、CNC、机器人、仪器仪表等OT设备及各类工业系统的数据。
- **边缘智能处理与分析：** 在靠近数据源的边缘端，进行实时的数据过滤、清洗、聚合、计算与 AI 智能分析，将原始数据转化为有价值的信息。
- **多系统无缝集成与联动：** 将处理后的数据高效、安全地对接到工业互联网平台、云服务及企业应用（如 MES、SCADA）中，实现数据的流动与业务的协同。

EMQX Neuron 打破了 OT 与 IT 之间的技术壁垒，为工业场景提供了从数据采集、处理、分析到集成的端到-端解决方案，是企业构建稳定、高效、智能的边缘数据基础设施的核心组件。

## 产品优势

- 丰富的协议接入

    丰富的协议插件满足工业各类场景下，PLC、CNC、机器人、Scada以及智能仪表等设备数据的实时采集及统一接入。内置多种插件模块，例如 Modbus，OPC UA，Ethernet/IP，IEC104，BACnet，Siemens，Mitsubishi 等。这些插件某块被广泛应用于楼宇自动化、数控机床、机器人、电力以及各种 PLC 通信中。

- 低延迟数据处理

    专为工业现场设计，提供低延迟的数据接入和处理，能够更快速地将数据在多系统间传递，实现实时监控和决策。

- 轻量及灵活部署

    EMQX Neuron具有轻量化、低内存占用，支持多种CPU架构部署，并且支持 Docker、Kubernetes容器化部署。

- 完整的数据分析能力

    内置强大的流式计算引擎，提供超过 160 个函数，支持对实时数据流进行抽取、转换、过滤和聚合。

- AI/ML分析

    支持用户自定义函数扩展及 AI/ML 算法集成，可通过自然语言生成 Python 便携插件，在边缘端执行复杂计算与智能推理。

- 平台集成

    通过对接 MQTT、SparkplugB、HTTP 等方式，将数据集成到本地数据中心、工业互联网平台或云服务中。

## 功能一览

| <div style="width:40pt">功能</div> | 描述     | <div style="width:80pt">功能清单</div>   |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 数据采集                           | EMQX Neuron 支持超百种工业协议的一站式设备连接、数据采集、设备反控、MQTT 协议转换及南向数采监控，赋予工业设备关键的互联互通能力。| [添加南向驱动](./configuration/south-devices/south-devices.md) <br /><br />[南向驱动协议](./introduction/plugin-list/plugin-list.md)<br /><br />[数据监控](./admin/monitoring.md)|
| 数据上报                           | 完成设备数据的采集后，EMQX Neuron 支持用户通过北向应用将数据转发到云平台或外部处理引擎 | [创建北向应用](./configuration/north-apps/north-apps.md)<br /><br />[订阅南向数据](./configuration/subscription.md) |
| 边缘数据处理                         | EMQX Neuron 集成了强大的边缘流式数据处理引擎，提供低延迟的数据清洗、转换、计算和分析能力，结合 AI/ML 算法，可以实现智能决策与控制，并优化云边通讯负载。 | [数据源](./streaming-processing/source.md)<br /><br />[规则](./streaming-processing/rules.md)<br /><br />[SQL 参考](./streaming-processing/sqls/overview.md)<br /><br />[Sink 连接](./streaming-processing/sink/sink.md)<br /><br />[扩展功能](./streaming-processing/extension.md) |
| AI 生成 Python 插件                         |  通过自然语言描述业务逻辑，由大模型生成 eKuiper Python 便携插件并部署到边缘端，用于 SQL 难以表达的复杂计算。 | [AI 生成 Python 插件最佳实践指南](./best-practise/llm-portable-plugin.md)<br /><br />[AI 模型配置](./admin/sys-configuration.md#ai-模型配置)|
| 系统管理与运维                           | EMQX Neuron 提供一站式的运维与管理平台，您可通过 Web 页面进行系统配置、日志下载、查看系统信息、License 管理等操作。 | [日志管理](./admin/log-management.md)<br /><br />[数据统计](./admin/data-statistics.md)<br /><br />[系统配置](./admin/sys-configuration.md) |
