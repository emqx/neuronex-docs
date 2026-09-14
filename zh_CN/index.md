# 产品概览

EMQX Neuron 是一款功能强大的工业边缘网关软件，专为工业领域的数字化转型而设计。它部署在制造、能源、楼宇等工业现场，其核心任务是打通物理世界与数字世界的连接，实现：

- **海量设备连接与数据接入：** 通过丰富的协议支持，统一采集 PLC、CNC、机器人、仪器仪表等OT设备及各类工业系统的数据。
- **边缘智能处理与分析：** 在靠近数据源的边缘端，进行实时的数据过滤、清洗、聚合、计算与 AI 智能分析，将原始数据转化为有价值的信息。
- **多系统无缝集成与联动：** 将处理后的数据高效、安全地对接到工业互联网平台、云服务及企业应用（如 MES、SCADA）中，实现数据的流动与业务的协同。

EMQX Neuron 打破了 OT 与 IT 之间的技术壁垒，为工业场景提供了从数据采集、处理、分析到集成的端到-端解决方案，是企业构建稳定、高效、智能的边缘数据基础设施的核心组件。

## 产品优势

<img src="./introduction/_assets/architect.png" alt="架构" style="zoom:100%;" />

- 丰富的协议接入

    丰富的协议驱动满足工业各类场景下，PLC、CNC、机器人、Scada以及智能仪表等设备数据的实时采集及统一接入。内置多种驱动模块，例如 Modbus，OPC UA，Ethernet/IP，IEC104，BACnet，Siemens，Mitsubishi 等。这些驱动模块被广泛应用于楼宇自动化、数控机床、机器人、电力以及各种 PLC 通信中。

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

## 产品架构

如上图所示，EMQX Neuron 主要分为`数据采集接入`、`数据处理分析`、`数据转发存储`以及`系统管理`等模块。

### 数据采集接入模块

在数据采集接入方面，EMQX Neuron 支持**工业设备数据采集**，还支持工业现场**多源数据接入集成**。

#### 工业设备数据采集

EMQX Neuron 通过驱动的方式实现对各类 **100+** 工业协议的支持，包括 Modbus、OPC UA、EtherNet/IP、IEC104、BACnet、Siemens PLC、Mitsubishi PLC等。满足智能制造、石油石化、钢铁冶金、能源电力以及楼宇自动化等各个行业的数据采集接入需求。

#### 多源数据接入集成

除了设备层，EMQX Neuron 还能从多种信息系统中获取数据，实现全面的数据融合:

- **业务系统对接**： 通过 [HTTP Pull](./streaming-processing/http_pull.md) 及 [HTTP Push](./streaming-processing/http_push.md) 等方式与 MES、WMS、ERP 系统及企业服务总线 (ESB) 进行双向数据交互。
- **数据库对接**： 支持从 [SQL 类数据库](./streaming-processing/sql.md)（如 MySQL, SQL Server, PostgreSQL）中读取数据，作为数据处理的补充源。
- **文件与视频流**： 支持对本地[文件](./streaming-processing/file.md)进行数据采集，以及对[视频流](./streaming-processing/video.md)进行接入分析。

### 数据处理分析模块

EMQX Neuron 的核心价值在于其强大的边缘数据处理与分析能力，它能将原始、混乱的数据转化为标准化、有价值的洞察。

- **数据标准化与清洗**： 内置超过 160+ 各类[函数](./streaming-processing/sqls/functions/overview.md)，支持对数据进行类型转换、单位统一、格式重构、过滤、排序、聚合等操作，满足各种数据预处理需求。
- **实时流式计算**： 强大的流式计算引擎能够对数据流进行毫秒级的实时处理，满足多系统数据实时协同、闭环控制等低延迟场景。
- **AI/ML 算法集成**： 支持用户集成 Python、C/C++ 等语言编写的[自定义函数](./streaming-processing/extension.md)和 [AI/ML 算法模型](./streaming-processing/portable_python.md)，在边缘端进行低延迟的智能推理。也可通过[自然语言生成 Python 便携插件](./best-practise/llm-portable-plugin.md)，降低扩展开发门槛。

### 数据转发存储模块

EMQX Neuron 是连接边缘与云/端的强大桥梁，提供灵活的数据转发与存储选项。

- **数据转发**： 支持通过 MQTT、SparkplugB、HTTP、WebSocket 等标准协议，将处理后的数据无缝对接到公有云物联网平台、私有云或本地数据中心。
- **数据存储**： EMQX Neuron 支持将数据写入到 MySQL、InfluxDB、Kafka、Datalayers 等多种外部数据库及消息队列中，满足不同的数据落地需求。



### 系统管理模块

EMQX Neuron 提供了一套完整、易用的系统管理功能，确保其在工业环境下的稳定、安全、可靠运行。

- **系统配置**： 提供简洁的 Web UI，方便用户对驱动、数据处理规则、北向应用等所有模块进行配置管理。
- **安全认证**： 支持基于用户名/密码的访问控制及 TLS/SSL 加密传输，保障系统和数据安全。
- **日志与监控**： 提供详尽的运行日志、性能指标和状态监控，方便用户进行运维和故障诊断。

如何使用EMQX Neuron 系统管理模块，请参考 [运维指南](./admin/introduction.md)。
