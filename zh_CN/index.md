# 产品概览

NeuronEX 是一款功能强大的工业边缘网关软件，提供一站式的设备数据连接、边缘智能分析、数据存储与可视化服务。

它主要部署在工业现场，高效实现工业设备通信及总线协议采集（支持 100+ 种协议）、工业系统数据集成、边缘端数据过滤与流式计算分析、AI/ML 算法集成与 AI 数据分析，以及与各类工业互联网平台的无缝对接。

NeuronEX 旨在为复杂的工业场景提供低延迟的数据接入管理、持久化存储、强大的智能分析及直观的可视化看板，帮助用户快速洞悉业务趋势，提升运营效率和可持续性。

## 产品优势

- 丰富的协议接入

    丰富的协议插件满足工业各类场景下，PLC、CNC、机器人、Scada以及智能仪表等设备数据的实时采集及统一接入。内置多种插件模块，例如 Modbus，OPC UA，Ethernet/IP，IEC104，BACnet，Siemens，Mitsubishi 等。这些插件某块被广泛应用于楼宇自动化、数控机床、机器人、电力以及各种 PLC 通信中。

- 低延迟数据处理

    专为工业现场设计，提供低延迟的数据接入和处理，能够更快速地将数据在多系统间传递，实现实时监控和决策。

- 轻量及灵活部署

    NeuronEX具有轻量化、低内存占用，支持多种CPU架构部署，并且支持 Docker、Kubernetes容器化部署。

- 完整的数据分析能力

    内置强大的流式计算引擎（160+ 函数）和集成的时序数据库 (Datalayers)，支持数据抽取、转换、过滤、聚合等操作。提供图形化的 SQL 查询界面，方便用户对存储的边缘数据进行深度分析与探索。

- AI/ML分析

    支持用户自定义函数扩展及 AI/ML 算法集成。全新引入AI 数据分析助手，可通过自然语言交互生成 SQL 查询，并基于执行反馈进行智能修正，降低数据分析门槛，加速洞察获取。

- 平台集成

    通过对接 MQTT、SparkplugB、HTTP 等方式，将数据集成到本地数据中心、工业互联网平台或云服务中。

## 功能一览

| <div style="width:40pt">功能</div> | 描述     | <div style="width:80pt">功能清单</div>   |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 数据采集                           | NeuronEX 支持超百种工业协议的一站式设备连接、数据采集、设备反控、MQTT 协议转换及南向数采监控，赋予工业设备关键的互联互通能力。| [创建南向驱动](./configuration/south-devices/south-devices.md)<br /><br />[连接南向设备](./configuration/south-devices/south-devices.md) <br /><br />[南向数采监控](./admin/monitoring.md)|
| 数据上报                           | 完成设备数据的采集后，NeuronEX 支持用户通过北向应用将数据转发到云平台或外部处理引擎 | [创建北向应用](./configuration/north-apps/north-apps.md)<br /><br />[订阅南向数据](./configuration/subscription.md) |
| 边缘数据处理                         | NeuronEX 集成了强大的边缘流式数据处理引擎，提供低延迟的数据清洗、转换、计算和分析能力，结合 AI/ML 算法，可以实现智能决策与控制，并优化云边通讯负载。 | [数据源](./streaming-processing/source.md)<br /><br />[规则](./streaming-processing/rules.md)<br /><br />[Sink 连接](./streaming-processing/sink/sink.md)<br /><br />[扩展功能](./streaming-processing/extension.md) |
| 数据存储与查询                         |  NeuronEX 集成 Datalayers 时序数据库，支持边缘数据的持久化存储。提供图形化的 SQL 查询界面，方便用户对历史数据进行即时分析和探索。 | [数据存储配置](./streaming-processing/source.md)<br /><br />[数据分析与SQL查询](./streaming-processing/rules.md)|
| AI 数据分析助手                         |  通过自然语言与 AI 助手交互，自动生成 SQL 查询语句。AI 能够理解用户意图，并基于数据库 Schema 和执行反馈进行智能调整和修正，简化数据分析过程。 | [AI 数据分析](./streaming-processing/source.md)|
| 可视化仪表盘                         |  提供可定制的可视化仪表盘功能。用户可以轻松创建和配置图表 (折线图、柱状图、表格、统计值等)，将存储的或实时的数据以直观的方式展示出来，支持动态时间范围和自动刷新。 | [仪表盘管理](./streaming-processing/source.md)<br /><br />[创建与配置面板](./streaming-processing/rules.md)|
| 系统管理与运维                           | NeuronEX 提供一站式的运维与管理平台，您可通过 Web 页面进行系统配置、日志下载、查看系统信息、License 管理等操作。 | [日志管理](./admin/log-management.md)<br /><br />[数据统计](./admin/data-statistics.md)<br /><br />[配置管理](./admin/conf-management.md) |
