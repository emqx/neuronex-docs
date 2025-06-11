# NeuronEX 架构

NeuronEX 是一款面向工业领域的设备数据采集和边缘智能分析的软件，主要部署在工业现场，实现工业设备通信及工业总线协议采集、工业系统数据集成、边端数据过滤分析和AI集成，以及工业互联网平台对接集成等功能，为工业场景提供低延迟的数据接入管理及智能分析服务。

<img src="./_assets/architect.png" alt="架构" style="zoom:100%;" />

如上图所示，NeuronEX 主要分为`数据采集接入`、`数据处理分析`、`数据转发存储`以及`系统管理`等模块。

## 数据采集接入模块

在数据采集接入方面，NeuronEX 支持**工业设备数据采集**，还支持工业现场**多源数据接入集成**。

### 工业设备数据采集

NeuronEX 通过插件的方式实现对各类 **100+** 工业协议的支持，包括 Modbus、OPC UA、EtherNet/IP、IEC104、BACnet、Siemens PLC、Mitsubishi PLC等。满足智能制造、石油石化、钢铁冶金、能源电力以及楼宇自动化等各个行业的数据采集接入需求。

### 多源数据接入集成

除了设备层，NeuronEX 还能从多种信息系统中获取数据，实现全面的数据融合:

- **业务系统对接**： 通过 [HTTP Pull](../streaming-processing/http_pull.md) 及 [HTTP Push](../streaming-processing/http_push.md) 等方式与 MES、WMS、ERP 系统及企业服务总线 (ESB) 进行双向数据交互。
- **数据库对接**： 支持从 [SQL 类数据库](../streaming-processing/sql.md)（如 MySQL, SQL Server, PostgreSQL）中读取数据，作为数据处理的补充源。
- **文件与视频流**： 支持对本地[文件](../streaming-processing/file.md)进行数据采集，以及对[视频流](../streaming-processing/video.md)进行接入分析。

## 数据处理分析模块

NeuronEX 的核心价值在于其强大的边缘数据处理与分析能力，它能将原始、混乱的数据转化为标准化、有价值的洞察。

- **数据标准化与清洗**： 内置超过 160+ 各类[函数](../streaming-processing/sqls/functions/overview.md)，支持对数据进行类型转换、单位统一、格式重构、过滤、排序、聚合等操作，满足各种数据预处理需求。
- **实时流式计算**： 强大的流式计算引擎能够对数据流进行毫秒级的实时处理，满足多系统数据实时协同、闭环控制等低延迟场景。
- **AI/ML 算法集成**： 支持用户集成 Python、C/C++ 等语言编写的[自定义函数](../streaming-processing/extension.md)和 [AI/ML 算法模型](../streaming-processing/portable_python.md)，在边缘端进行低延迟的智能推理。3.6.0 版本引入了「AI 数据分析助手」，允许用户通过自然语言生成 SQL 查询，并能智能迭代修正，极大地降低了数据分析门槛。
- **数据探索与可视化**：
  - **内置时序存储**： 内置 Datalayers 时序数据库，提供开箱即用的边缘数据持久化能力。
  - **交互式数据分析**： 提供统一的[数据分析界面](../datainsights/data_analysis.md)，用户可通过智能 SQL 编辑器或 AI 助手，对存储的历史数据进行深度查询与探索。
  - **自定义仪表盘**： 全新的[「仪表盘」功能](../datainsights/dashboards.md)，允许用户通过简单的拖拽配置，将关键数据以图表形式直观展示，打造定制化的边缘监控中心。

## 数据转发存储模块

NeuronEX 是连接边缘与云/端的强大桥梁，提供灵活的数据转发与存储选项。

- **数据转发**： 支持通过 MQTT、SparkplugB、HTTP、WebSocket 等标准协议，将处理后的数据无缝对接到公有云物联网平台、私有云或本地数据中心。此外，通过集成的 [Node-RED](../application/nodered.md)，可以轻松构建复杂的转发和自动化工作流。
- **数据存储**： 除了内置的 Datalayers 数据库，NeuronEX 也支持将数据写入到 MySQL、InfluxDB、Kafka 等多种外部数据库及消息队列中，满足不同的数据落地需求。



## 系统管理模块

NeuronEX 提供了一套完整、易用的系统管理功能，确保其在工业环境下的稳定、安全、可靠运行。

- **系统配置**： 提供简洁的 Web UI，方便用户对驱动、数据处理规则、北向应用等所有模块进行配置管理。
- **安全认证**： 支持基于用户名/密码的访问控制及 TLS/SSL 加密传输，保障系统和数据安全。
- **日志与监控**： 提供详尽的运行日志、性能指标和状态监控，包括对数据存储、AI 服务等核心组件的实时状态监控， 方便用户进行运维和故障诊断。

如何使用NeuronEX 系统管理模块，请参考 [运维指南](../admin/introduction.md)。