# 发版历史

## v3.8.0

发布日期：2026-02-07

### **增强**

- **新增 SNMP 驱动：** 通过 SNMP 协议可以监控和管理网络设备的状态和性能，如路由器、交换机、服务器等。目前 SNMP 插件支持 SNMP v2c 版本。
    
- **新增 Ge Historian 驱动：** 通过 NeuronHUB 访问运行于 Windows 操作系统的 GE Historian 服务器。GE Historian 是一款工业历史数据库，用于存储和检索工业过程数据。
    
- **新增 OPC AE 驱动：** 通过 NeuronHUB 访问运行于 Windows 操作系统的 OPC AE（Alarms and Events）服务器，支持 Simple，Conditional 和 Tracking。OPC AE 主要用于获取设备的报警和事件信息。
    
- **OPC UA 驱动增强：**
    
    - **数据类型扩展：** 新增支持 **String Array** 数据类型。
        
    - **浏览性能优化：** 调整 OPC UA 点位浏览页面布局，扩展 OPC UA 命名空间节点显示；OPC UA 点位浏览增加选中点位计数；点位导出到点表的上限改为 **10,000 点**，点位添加到采集组的上限改为 **1,000 点**。
        
- **Modbus 驱动增强：** 增加了配置点位时，对 Modbus 地址范围（0~65535）的强制校验，确保配置准确性。
    
- **Modbus TCP Simulator：** 内置 Modbus TCP 模拟器，方便用户在无硬件环境下进行开发测试。
    
- **CODESYS V3 驱动增强：** Codesys 协议支持中文标签。
    
- **MQTT 驱动增强**：当北向 MQTT 驱动节点删除，或者离线缓存功能关闭时，离线缓存数据将被清除。
    
- **数采功能增强**
    
    - **北向应用导入导出：** 支持北向应用配置的一键导入与导出。
        
    - **标签管理系统：** 南向驱动与北向应用现在均支持添加“标签”，支持基于标签搜索查询设备。
        
    - **南向驱动跨页筛选：** 南向驱动根据“工作状态”和“连接状态”进行驱动筛选时，支持跨页筛选。
        
    - **北向添加订阅弹出框页面：** 当南向驱动节点较多时，支持滚动条滚动显示。
        
    - **点位写入增加日志：** 通过 MQTT 或 HTTP API 执行**点位写入操作**时，在日志中新增**接口执行状态（成功 / 失败）及报错详情（若有）**。执行如果成功，则为 INFO 日志，执行如果失败，则为 ERROR 日志。
        
- **规则调试功能:** 规则调试功能的后端通信协议由 **WebSocket** 优化为 **SSE（ECP 暂不支持规则调试SSE功能）**。
    
- **创建规则页面集成 AI 问答：** AI 助手现已深度集成 eKuiper 相关知识库，支持通过自然语言咨询 SQL 规则编写及数据流处理问题。
    
- **RBAC功能：** 完善 Viewer 角色在数据分析、仪表盘及应用等页面的权限管控。
    
- **内置 AI 功能：** 新增支持 Qwen 大模型。
    
- **内置数据库：** 内置时序数据库 Datalayers 版本更新为2.3.16。
    
- **UI 风格调整：** 调整并优化了 Dashboard 页面布局及 UI 风格，页面Logo调整为 EMQX Neuron。
    

### 修复

- 修复 InfluxDB V1 Sink 功能，标签字段写入不成功的问题。
    
- 修复南向设备采集组页面，跳转到数据监控页面，设备与分组为空的问题。
    
- 修复 Video Source 报错 exit status 1: Conversion failed! 的问题
    
- 修复 WinCC OPCUA/DA Server 扫描点位重复问题
    
- 修复 SparkPlugB 驱动异常崩溃的问题

## v3.5.5

发布日期：2026-01-07

### 增强

- **OPCUA** 驱动新增支持复杂嵌套 `struct` 类型

- 增强 **BACnet BBMD** 功能

- 升级 **OPCUA** 点位浏览功能，支持自动过滤不兼容类型的点位

- **IEC 61850** 驱动新增支持 `mmstring` 数据类型

- **S7 300/400** 驱动新增支持 `char array` 数据类型

### 修复

- 修复 **OPCUA** 驱动订阅模式下，驱动断连后无法收到数据的问题

- 修复 **OPCUA** 节点修改 `group name` 导致崩溃的问题

- 修复连接文件描述符（`connection fd`）异常泄漏的问题


## v3.7.1

发布日期：2025-12-24

### 增强

- 增强 **BACnet BBMD** 功能

- 优化 **OPCUA** 点位浏览功能：针对 **OPCUA Server** 存在大量点位的场景，新增缓存机制，实现数据高效加载

- 升级 **OPCUA** 点位浏览功能，支持自动过滤不兼容类型的点位

- **IEC 61850** 驱动新增支持 `unicodestring255` 数据类型

- **S7 300/400** 驱动新增支持 `char array` 数据类型

- 优化 **NeuronEX** 安装配置：默认将操作系统参数 `net.unix.max_dgram_qlen` 调整为 1024，提升高设备接入量场景下的系统性能（该功能只针对安装包部署方式，容器方式部署的 **NeuronEX**，可在宿主机手动修改该参数）

- 优化规则操作交互：规则处于停止状态时，操作按钮新增 **Loading** 状态，避免重复连续操作

- 配置项中上传的证书，支持清除操作

### 修复

- 修复 **ADS** 协议偶发出现的 **NNG Bug** 导致的崩溃问题

- 修复 **OPCUA** 驱动订阅模式下，驱动断连后无法收到数据的问题

- 修复 **Docker** 镜像安全漏洞：将 **NeuronEX** 镜像 `neuronex:3.7.1` 的基础镜像从 `python:3.13.2-slim` 升级至 `python:3.13.9-slim`，解决基础镜像内置库引发的安全扫描漏洞；将 **NeuronEX** 的 **Golang** 标准库从 `1.23.3` 升级到 `1.23.8`

- 修复规则调试功能，无结果输出的问题

- 修复 **REST sink** 配置项中 **OAuth** 认证时，`access token` 和 `refresh token` 的问题

- 内置默认 **JWT** 的密钥对改为了每次 **NeuronEX** 启动时动态生成，这个在使用用户名和密码登录成功后用于生成 `token` 有使用。同时项目使用的 **JWT Golang** 库从 `v3.2` 升级到 `v5`

## v3.6.3

发布日期：2025-12-9

### 增强

- 增强 **BACnet BBMD** 功能

- 升级 **OPCUA** 点位浏览功能，支持自动过滤不兼容类型的点位

- **IEC 61850** 驱动新增支持 `unicodestring255` 数据类型

- **SparkplugB** 驱动：支持 **Tag**、**Alias** 两种数据上报格式

- **Siemens S7 ISOTCP for 300/400** 驱动：新增支持 `Char Array` 数据类型

### 修复

- 修复 **ADS** 协议偶发出现的 NNG Bug 导致的崩溃问题

- 修复 **OPCUA** 驱动订阅模式下，驱动断连后无法收到数据的问题

- 修复 OPCUA 驱动订阅模式下，点位采集值错误时，错误信息未正常上报的问题。如要关闭该错误上报，可在环境变量中设置 `NEURON_SUB_FILTER_ERROR = 1`

## v3.7.0

发布日期：2025-10-29

### 增强

- 新增北向 OPC UA Server 插件
    - 该插件支持将南向采集的点位映射到 OPC UA 的地址空间，并提供灵活的安全策略配置、用户名/密码认证以及完善的证书管理功能。

- 驱动能力增强
    - Beckhoff ADS 驱动: 支持通过导入 TPY 文件的方式批量创建数据点位，简化配置过程。

    - CNC 驱动: 新增导入内置点表的功能，帮助用户快速配置和启动 CNC 设备的数据采集。

    - SparkplugB 驱动：支持 Tag、Alias 两种数据上报格式。

- 北向应用订阅

    - 优化了北向应用订阅南向分组的交互，已订阅的组会被明确标识，并防止重复订阅。

- 多源数据接入

    - Httppull Source 支持类似 SQL Source 的状态 

    - MQTT Source 支持订阅多个 Topic，使用逗号分隔 topic1,topic2

- 插件及文件下载

    - 算法集成->便捷插件页面，新增支持便捷插件的下载。

    - 配置->文件管理页面，新增支持文件下载。

- 仪表盘功能

    - 导入与导出: 新增仪表盘导入导出功能。用户可将整个仪表盘的配置（包含所有 Panel 和查询）导出为 JSON 文件，方便在不同 NeuronEX 实例间进行迁移、备份和共享。

    - 新增图表类型: 为满足多样化的监控需求，仪表盘新增了三种图表类型：

        - Gauge（仪表盘图）: 用于直观展示单个指标的瞬时值。

        - Stat（统计值趋势图）: 用于展示单个指标的最新值及其简洁趋势。

        - Pie（饼图）: 用于展示不同分类数据的占比情况。

    - 表格合并功能: 在 Table（表格）类型的 Panel 中，现已支持添加多个 SQL 查询，并可将结果合并显示在同一个表格中，便于进行跨数据源的对比分析。

- AI 运维助手 

    - 新增 AI 问答助手，内置 NeuronEX 运维知识库。它能够通过自然语言交互，为用户提供关于产品配置、功能使用和故障排查的专业指导和解答，帮助用户快速定位问题、获取解决方案，提升运维效率。

- 日志系统优化

    - 新增 Neuron 全局日志级别配置项，默认为Notice，降低整体日志输出量。

    - 单个南向驱动仍保持设置独立日志级别的能力，该设置将覆盖全局配置，使得用户既在不影响系统整体日志输出的情况下，对特定驱动进行精细化的诊断。

- 其他

    - 优化系统信息页面的内容展示样式。

    - 升级内置 Datalayers 版本到2.3.11。

## v3.6.2

发布日期：2025-09-26

### 增强

- 调整 NeuronEX 所需的glic版本，支持以下操作系统：CentOS 8.0 及以上版本，Ubuntu 20.04 及以上版本，Debian 11 及以上版本。（对比 3.6.1 新增支持 CentOS 8.0）。
- OPC UA 驱动支持复杂嵌套 extend object和extend object数组类型的采集。
- 代理纳管功能，使用 MQTT 通道作为管理通道，上报 NeuronEX 状态信息。
- 优化规则标签功能，添加修改标签的交互逻辑更加简单。
- Sink 动作前端增加 requireAck 配置项，为 Python Sink 插件引入同步 Ack 机制。

### 修复

- 修复了 AI 数据分析功能，会卡在 解析用户意图步骤的问题。

## v3.6.1

发布日期：2025-07-31

### 增强

- 在 File Sink 中新增支持文件滚动到 AWS S3 。
- 规则支持绑定标签，规则页面支持通过搜索标签，进行规则过滤。
- `emqx/neuronex:3.6.1-ai` 镜像支持x86和arm64两种系统架构，arm架构系统无需单独使用`emqx/neuronex:3.6.1-ai-arm64`镜像。
- 对 AI 数据分析功能的 UI 进行了优化。
- 便携插件创建的自定义流，类型将显示类型名称，原显示为空。
- 便携插件安装时，配置文件同步安装到 `/opt/neuronex/data/` 目录。
- 规则退出新增 Timeout，关闭包含便捷插件的规则时，如果便捷插件未能完成关闭，规则将会强制退出以确保程序不会卡住。
- 优化了数据处理模块，SQL执行错误后，Datalayers 数据库未正常反馈错误信息的问题。
- 对 UI 上的一些名称描述进行了优化。

### 修复

- 修复了北向 Websocket 插件 cpu 占用异常的问题。
- 修复了数采引擎 Neuron 进程退出后，NeuronEX未正常退出的问题。
- 修复了系统配置页面开启数据存储功能后，立即设置TTL报错的问题。
- 修复了 SQL Source 对规则 QoS 的支持。

## v3.6.0

发布日期：2025-06-11

### 增强

- **集成时序数据存储**

  - 打包集成： NeuronEX 现已打包集成 Datalayers 时序数据库，支持 deb、rpm、zip、docker 等多种安装包形式。Datalayers 默认不随 NeuronEX 启动，用户可按需在系统配置中开启。

  - 自动初始化： 首次开启 Datalayers 服务后，NeuronEX 会自动创建所需的 neuronex 数据库及对应数据类型的表 (neuron_int, neuron_float, neuron_bool, neuron_string)。

  - 配置与管理： 用户可在系统配置页面配置开启或关闭 Datalayers 存储以及 TTL (数据保留时长) 及，并在系统信息页面查看其运行状态（运行中/已停止）、运行时长、存储空间占用等信息。

  - DataStorage北向插件

    - 支持 gRPC 批量写入数据至 Datalayers。

    - 应用配置（如 IP、端口）可修改，可用于外置Datalayers存储模式。

    - 数组类型的数采点位，以字符串方式进行存储。

    - 对数据吞吐量较高情况时，提供数据缓存及丢弃机制。

  - 数据统计与日志： 提供数据存储场景下的数据统计详情页，显示写入报错信息，并支持下载数据存储的日志。

- [**数据查询与分析**](../datainsights/data_analysis.md)

  - 统一入口： 全新的“数据分析”页面整合了数据浏览、SQL 查询和结果展示功能。

  - 树形目录结构： 左侧以树形结构清晰展示已开启存储的驱动、采集组及点位信息，并显示点位在数据库中存储的数据类型 (Int, Float,Bool,String)。

    - 支持刷新、点位名称搜索。

    - 对数据点位默认提供 Query Column 、Query Period、Query Max 等SQL查询示例。

    - 支持结合 LLM 进行 AI Query，通过自然语言输入查询需求，由 LLM 提供复杂的 SQL 查询结果。

  - 智能 SQL 输入区

    - 提供 SQL 关键字提示、语法高亮、行号显示。

    - 支持单条 SQL 查询。

    - 仅接收查询类 SQL，不支持 create、insert 、delete等操作。

  - 结果展示区

    - 每个 SQL 查询结果在该区域以表格 (Table) 或图表 (Chart) 形式展示。

    - 表格 (Table) 显示： 默认展示查询结果。

    - 图表 (Chart) 显示： 如果结果包含时间戳，支持图表展示数据。

      - 支持折线图 (line)和柱状图 (bar)两种图表类型。

      - 支持图表缩放、保存下载。

- [**AI 数据分析助手**](../datainsights/data_analysis.md#5-ai-数据分析助手集成)

  - UI 入口: 集成在“数据分析”页面的AI数据分析按钮，以及点位操作项中的AI Query。

  - AI 交互框

    - 默认页面: 提供引导性提示，告知用户 NeuronEX 按数据类型分表存储 (neuron_float, neuron_int, neuron_bool, neuron_string)，并建议用户提供点位名和数据类型。提供可点击的查询示例，快速开始分析。

    - 点位 AI Query 查询: 从 UI 上下文自动获取点位名称和对应的数据表 (如 neuron_float, tag='tag1')，预填充到 AI 对话框中。

  - AI 数据分析输出

    - 主要目标是帮助用户进行复杂的数据分析时，生成正确的 SQL。

    - 当 SQL 执行出错时，LLM 能够智能分析错误，并利用工具进行多轮迭代修正，直至生成可成功执行的 SQL 查询。

    - 由于 LLM 上下文 Token 的限制，目前暂不会将所有 SQL 查询结果发送给 LLM，进行完整数据分析。

  - 配置与管理

    - 用户可在系统配置页面配置开启或关闭 AI Agent 服务，并在系统信息页面查看 AI Agent 运行状态（运行中/已停止）、运行时长等信息。

    - 在系统配置->AI模型配置页面，需要配置并开启 AI 模型，以使用 AI 数据分析以及 AI 写插件功能。

  - NeuronEX 3.6.0版本，在 Docker 镜像 emqx/neuronex:3.6.0-ai 和  emqx/neuronex:3.6.0-ai-arm64  版本中，默认集成了LLM运行所需的 Python依赖库，用户可直接使用该功能。当使用deb、rpm、zip或其他 Docker 镜像时，用户需要手动配置好Python依赖库后，方可使用 NeuronEX AI 功能。详细依赖库配置请参考[AI 功能环境配置指南](../admin/sys-configuration.md#ai-功能环境配置指南)。

- [**仪表盘**](../datainsights/dashboards.md)

  - 主页面: 列表展示已有仪表盘，支持搜索、分页、创建、编辑、复制、删除、进入等操作。

  - 仪表盘内部

    - 时间段选择器: 支持预设时间范围 (Last 1 minute, 1 hour, 1 day等) 和自定义时间段。

    - 刷新机制: 支持手动刷新和设置自动刷新间隔 (例如 30s, 1m等)。

    - 添加 Panel 

      - 支持添加 Panel，可配置 Panel 名称、图表类型 (Line, Bar, Stat, Table)、语义类型/单位 (例如 °C，显示在图表上)。

      - SQL 查询

        - 每个 Panel 可包含一个或多个 Query。注意：Table类型只支持一个 Query。

        - 支持启用/禁用“SQL 查询使用 $timeFilter 变量”。

        - 启用时 : 用户 SQL 中必须包含 $timeFilter 字段，后端会将其替换为当前仪表盘选择的时间范围，实现高效查询。

        - 禁用时：NeuronEX 会在当前用户输入SQL语句的基础上，自动拼接仪表盘时间范围，再执行 SQL 查询。

        - 若启用 $timeFilter 但 SQL 中缺失，会报错提示。

      - Alias By: 为每个 Query 的结果曲线指定别名显示。指定别名需要当前 SQL 查询结果中仅包含时间戳及一个值（value）列。

      - 支持在一个 Panel 中添加多个 Query，每个 Query 对应图表中的一条曲线。

    - Panel 配置

      - 支持对 Panel进行编辑、复制、删除等操作。

      - 支持在仪表盘上拖动 Panel 调整大小及位置。

      - 支持曲线筛选（点击图例显示/隐藏对应曲线）。

      - 仪表盘使用网格系统进行对齐。

- [**NodeRED 集成**](../application/nodered.md)

  - NeuronEX 3.6.0版本，在 Docker 镜像 `emqx/neuronex:3.6.0-ai` 和  `emqx/neuronex:3.6.0-ai-arm64` 版本中，默认集成了NodeRED v4.0.9，用户可按需在应用列表中开启 NodeRED 服务（默认为关闭）。

  - 支持通过北向 Websocket 应用、数据处理模块 REST Sink 将数据推送到 NodeRED，进行数据处理。

- NeuronHUB 软件 (原 NeuOPC 升级版): NeuronHUB 整合了多个依赖 Windows 环境进行转换采集的数采插件（包括 OPCDA、新代 CNC和三菱 CNC），并对 OPCDA 插件引入了 License 管理功能。

- SparkplugB 应用新增支持静态点位。

- 南向设备支持基于工作状态、连接状态对驱动节点进行筛选，支持基于工作状态、连接状态、延时对驱动节点进行排序。

- 北向应用页面支持基于工作状态、连接状态对应用节点进行筛选，支持基于工作状态、连接状态对应用节点进行排序。

- 北向应用添加订阅页面，支持输入关键字搜索南向驱动及采集组。

- BACnet/IP 驱动支持点位扫描功能。

- OPCUA 、DNP3 、Siemens S7驱动支持链路追踪功能。

- 数据处理模块新增 Kafka Source

- 数据处理模块新增 Web Socket Source

### 变更

- 从 NeuronEX v3.6.0 开始，SparkplugB 插件只在 NBIRTH 和 DBIRTH 消息中设置 metric 的 name 属性，在后续的 NDATA、DDATA、NCMD 和 DCMD 消息中不会再携带 name 属性，只使用 alias 标识 metric，这可能会影响现有的系统和集成。

## v3.5.4

发布日期：2025-07-16

### 增强

- **北向订阅**：

  - 新增支持**全选**和**取消全选**所有采集组。

  - 当通过关键字筛选部分采集组后，"全选"现在将只选择筛选后的采集组。

- **南向驱动页面**：

  - 支持翻页后**仍保留选中上一页的驱动**。

  - 当已选中部分驱动后，在南向驱动页面通过插件类型或关键字过滤驱动时，即使被过滤掉的驱动，**仍将保持勾选状态**。

  - 此时导出驱动的 JSON 配置时，会**一并导出所有已选中的驱动**，包括那些被过滤掉的驱动。

  - 南向设备**组列表页面**及**点位列表页面**，同**南向驱动页面**，也做了相同的“翻页保留选中”及“过滤保持选中”的优化。

- **数采模块 Neuron 核心代码优化**：

  - 优化了数采模块中 Neuron 核心代码，当单个采集组点位较多时，以**提升采集性能并优化内存使用量**。

### 修复

- 修复了 lag 函数在使用四个参数时，默认值不生效的问题。
- 修复了使用 lag 函数的规则设置 QoS 后运行报错的问题。
- 修复了共享流检查点在配置 QoS（服务质量）时，共享流的源端不参与检查点的问题。
- 修复了共享流在多规则下发送特殊数据时出现的错误。
- 修复了在存在两个共享流规则且其中一个选择更多数据时，可能随机出现空数据的问题。
- 修复了共享流规则更新后可能出现的随机状态异常问题，尤其是在同时更新两个共享流规则时更容易触发此问题。
- 修复了规则状态管理，尝试启动一个正在停止的规则时，导致规则陷入无限循环的问题。
- 修复了特定时间格式解析失败的问题
- 修复了 Portable source 插件热更新后，正在运行的规则无法接收到数据的问题。
- 修复了增量窗口相关指标（metrics）的显示和计算问题。
- 修复缺少 pynng.so 导致便携插件启动不了的问题

### 变更

- 下载驱动日志的接口变为/api/log/neuron?node=node_name

## v3.5.3

发布日期：2025-06-24

### 增强

- Modbus TCP/RTU 驱动 Double/Int64/Uint64 数据类型支持配置完整字节序
- Allen-Bradley 5000 EtherNet/IP 驱动适配其他 AB PLC 型号的单点读服务
- 将 Monitor 进程日志打印到 NeuronEX 日志文件

### 修复

- 修复多个北向驱动同时订阅一个南向驱动时异常退出的问题
- 修复 Neuron 进程退出时，NeuronEX 未正常退出的问题

## v3.5.2

发布日期：2025-05-22

### 增强

- OPCUA 驱动支持订阅模式，新增配置项：**更新模式**，通过配置**Subscribe**模式，支持通过 OPCUA 标准的订阅接口获取 Server 数据，通过该模式可实时获取 Server 端点位数据。
- SparkplugB 应用新增配置项：Group Path，支持配置点位是否拼接采集组(group)名称。
- SparkplugB 应用支持离线缓存功能。
- 规则较多时，优化减少创建规则时的内存占用
- 对链路追踪缓存数据进行限流和优化

### 修复

- 修复驱动节点名称为中文时，下载驱动日志报错的问题
- 修复共享流规则更新导致无数据问题
- 修复 Portable 插件偶发热更新失败问题
- 修复 File Source 监控写事件中的问题并忽略空文件
- 修复 Dataprocessing 节点手动关闭后，链路追踪报错误的问题
- 修复开启链路追踪后，规则报错 cannot parse JSON 的问题
- 修复链路追踪北向 MQTT 和 DataProcessing 同时追踪时，Span 拼接错误的问题

### 变更

- 下载驱动日志的接口变为/api/log/neuron?node=node_name

## v3.5.1

发布日期：2025-04-18

### 增强

- 新增 AI 生成 Python 便捷插件功能（仅 Docker 镜像 `emqx/neuronex:3.5.1-ai` 和 `emqx/neuronex:3.5.1-ai-amd64` 支持），详细使用请参考[文档](https://docs.emqx.com/zh/neuronex/latest/best-practise/llm-portable-plugin.html )。
- 数据处理引擎配置支持开启指标采集，并支持下载自定义日志指标文件，详细使用请参考[文档](https://docs.emqx.com/zh/neuronex/latest/admin/sys-configuration.html#开启指标采集)。
- DLT645-2007 新增支持有符号整型数据类型
- Mitsubishi 3E 扩展支持字符串长度到 256
- Siemens S7 新增支持 WSTRING 数据类型

### 修复

- 修复 OPCUA 驱动某些第三方 OPC Server 数据写入成功，但返回错误码的问题
- 修复 OPCUA 驱动某些情况下，执行操作会卡死的问题
- SparkplugB write tag 适配核心新加入的 is_value_in_range 系列规则
- 修复 get_keyed_state 函数默认值未传时总是返回nil的问题
- 修复规则重启后属性错误问题 
- 修复 Kafka sink batch 为0时不发送问题
- 修复规则手动关闭运行两次状态变更的问题
- 修复 MQTT v5 动态属性不变化的问题 
- 修复 Portable 插件出错时 Panic 问题


## v3.5.0

发布日期: 2025-02-25

### 增强

- 新增南向驱动凯恩帝 CNC 驱动
- 新增南向驱动 Mitsubishi 4E
- MQTT 驱动支持国密（需由 EMQ 单独提供安装包）
- MQTT 驱动支持自定义数据上报格式
- MQTT 驱动支持新的数据上报格式（对接Datalayers存储）
- MQTT 驱动支持参数配置，是否上报点位错误码
- IEC61850 驱动功能更新
  - 支持总召唤上报、采集组定时上报、数据变化上报三种模式
  - 支持 CID 文件导入（自动将sp,sg类型点位生成为点表）
  - 调整数据上报格式，每个点位包含 timestamp 和 quality 字段
- 北向应用支持配置静态数据点位
- OPCUA 驱动支持扩展对象类型（Object Extension）采集
- OPCUA 驱动支持 BIT 数据类型
- OPCUA 驱动优化点位浏览功能，支持直接将扫描到的 OPCUA Server 点位添加到采集组
- ModbusTCP 驱动支持配置主备双 ModbusTCP Server
- FINS TCP/UDP 驱动新增参数，可配置一次读取最大字节数
- Video 数据源新增视频格式及视频编码配置项
- 数据处理功能支持 ONNX 插件集成
- SQL 编辑器支持关键词提示
- MQTT Sink支持 MQTT 5 版本，并支持链路追踪功能
- File 数据源新增支持raw类型数据
- 规则功能新增支持增量窗口计算
- 规则通用配置项支持 SendNilField 配置项
- 规则调用外部函数超时时间可配置
- 许可证页面支持重置 License

### 修复

- 修复许可证页面 CNC License 显示错误
- 修复备份功能导出异常

## v3.4.5

发布日期：2025-03-20

### 修复

- 修复通过 NeuronEX API 向 OPCUA Server 写入浮点数值（如 "121.0"）失败，而像 120.9 或 121.1 这样的值则可以正常写入。

## v3.4.4

发布日期: 2025-03-12

### 增强

- FINS TCP/UDP 新增优化读大小
- Modbus 驱动数据处理优化
- SparkplugB 写点位适配核心新加入的is_value_in_range规则
- 数据处理模块新增 sync cache 指标

### 修复

- 修复 CNC License显示异常
- 修复 SparkplugB 节点启动后DBIRTH触发不正确的问题
- 修复  SparkplugB NDEATH 和 DDEATH触发不正确的问题
- 修复 DLT645 驱动crash问题
- 修复 FINS TCP/UDP驱动crash问题
- 修复 sink bufferLength 配置不生效
- 修复 last_agg_hit_time() 单独在 having 里使用时未能有效更新值
- 修复更改删除连接规则失败文本，明确指出有规则使用
- 修复 sink omitEmpty 属性 send single 时，非nil但无数据不生效问题

## v3.4.3

发布日期: 2025-01-02

### 增强

- 优化 OPCUA 驱动错误码 10007-10027，表示点位质量为 bad 状态
- Mitsubishi 3E 和 Mewtocol 驱动支持链路追踪功能

### 修复

- 修复导入点位超出license限制导致的超时错误
- 修复 OPCUA 驱动 maxAge 参数设置较大，导致的个别 OPCUA Server 不刷新数据。
- 修复 OPCUA 驱动 Array 类型点位写入空数组，报错点位类型不匹配的问题
- 修复 Modbus 驱动响应重复的问题
- 修复 Mewtocol 驱动点位合并错误
- 修复安全扫描相关的漏洞问题
- 修复 file sink ignoreEndline 较大时易导致读取混乱的问题 
- 解决共享流停止一部分规则导致其余运行规则 buffer full 的问题
- 解决 slidingWindow(ss, 5, 10) 触发获取前后数据时，往后计时器单位错误导致很难触发的问题
- 删除 SQL source 热路径上的 log，防止高吞吐时 CPU 过高
- 修复 sink cache 初始化问题，防止 disk cache 未正确加载
- 配置关闭 log 后，不再输出控制台等任何的 log
- TLS 证书初始化，配置 skip secure verify 仍然进行证书解析
- 解决并行节点（编解码，加密等属性）错误处理问题，错误体现在 metrics 上并打印 log
- 解决 REST sink 动态 headers 仅解析一次的问题
- REST sink “No connection" 错误认定为可恢复错误（若配置重发会进入重发流程）
- 调整sqlite版本，修复 arm v7 部署错误


## v3.4.2

发布日期: 2024-12-03

### 增强

- OPCUA 驱动支持读取 BIT 类型
- OPCUA 支持数组点位读写
- MQTT 驱动放开端口限制
- Modbus RTU/TCP 驱动支持链路追踪
- SRTP 驱动优化超时处理
- Siemens S7 驱动支持字符串数组读写
- SparkplugB 支持南向驱动断连的ddeath，和重新连接后的dbirth
- 点位列表页面显示分组名称
- Kafka sink 支持压缩配置
- Httppull source 支持配置 access header
- Neuron 连接中间断开后不再连续发送错误。仅连接到断开发送一次，重连失败不发送，防止log/exception过多
- Duration 相关配置启动时迁移，例如cacheTTL 数字自动迁移为 duration string
- Conf 配置 key 验证，防止 XSS 攻击
- Neuron Sink底层支持调用多点位写入API

### 修复

- 乘系数 Decimal 校验失败
- OPCUA 驱动读取 Kepserver 出现间歇性的数据过期
- MQTT上报tags-format格式数据时，误出现transferPrecision字段的错误
- 修复String类型的点位配置乘系数的写入问题
- SQL Source 支持读取 Null 字段 
- 数据源页面英语翻译错误
- 偶发连接状态获取锁问题，可能出现 NPE
- 共享流配置失败后清除状态
- 修复 Kafka sink，key/headers 动态模板属性不生效问题


## v3.4.1

发布日期: 2024-10-31

### 修复

- 修复 neuronStream buffer 溢出错误
- 修复规则调试获取不到 neuronStream 数据的错误
- 规则选项中支持参数 sendError
- 修复 ECP 代理纳管开启 https 接口的 NeuronEX 时的错误

## v3.4.0

发布日期: 2024-10-24

### 增强

- 新增南向驱动 DNP 3.0
- 新增南向驱动 HollySys Modbus TCP
- 新增南向驱动 HollySys Modbus RTU
- 新增南向驱动 Allen-Bradley 5000 EtherNet/IP
- 新增南向驱动 Allen-Bradley DF1
- MQTT 驱动支持上报南向驱动状态到 MQTT 主题 
- MQTT 驱动支持 MQTT 5.0 版本
- Focas 驱动 PMC 读取优化
- DLT645 驱动支持读取 05 地址区数据
- ModbusTCP、Inovance Modbus TCP 驱动增加参数`是否开启报文头校验`
- ModbusTCP、ModbusRTU 驱动支持设备降级
- 南向驱动和北向应用页面，支持分页显示节点信息
- 新增环境变量 NEURON_SUB_FILTER_ERROR 和配置参数sub_filter_error，可配置 `Subscribe` 属性的点位仅检测正常上报的值
- 数据处理模块新增连接管理功能，支持配置 MQTT、SQL 连接器，连接器支持自动重连
- File 数据源支持读取电力行业CIME文件
- source/sink算子拆分
- 增加规则统计指标
- 规则停止后仍然可以查看规则运行指标
- Portable插件增加状态和错误信息显示
- 支持 NeuronEX 完整备份和恢复
- UI 支持密码隐藏 
- 支持启动 NeuronEX 时，可选择配置是否启动数据处理引擎
- NeuronEX 支持 https API
- 支持在配置文件`neuronex.yaml`中修改启动 admin 密码和 Viewer账号
- 配置文件`neuronex.yaml`中的参数，支持映射为环境变量使用
- 新增链路追踪功能，支持以下功能：
  - API 及下行 MQTT 控制指令追踪
  - 数据采集链路追踪
  - 规则计算链路追踪
- 支持通过环境变量将日志输出到 console
- 数据处理模块时间相关配置项，现在均使用 go duration 字符串格式
- 删除 Source 时增加判断条件，被规则引用的 Source 不能删除
- SQL Source 不再支持读取 null 数据

### 修复

- 修复 Panasonic Mewtocol 驱动，读取数据错误的问题
- 调整docker安装包系统参数`net.unix.max_dgram_qlen` = 1024
- 修复 SQL 源扫描表针对不同数据库的某些列类型错误
- 窗口适应时间向后移位
- 修复 batch 算子的指标信息
- 修复 csv 格式输出以避免浮点数 e-notation
- 操作中的操作数 nil 始终返回 nil（例如 a + b，如果 a == nil，结果为 nil）
- 修复重新启动规则时随机内存源故障
- 修复日志轮换过多时的日志轮换计数
- Neuron 连接移除大小限制（当有效载荷大于 1MB 时可能会下降）

## v3.3.3

发布日期: 2024-10-22

### 增强

- DLT645 驱动支持读取 05 地址区数据
- SparkplugB 支持南向驱动断连的ddeath，和重新连接后的dbirth
- SparkplugB 支持设备断电的ndeath

### 修复

- 修复 Panasonic Mewtocol 驱动，读取数据错误的问题
- 修复读取sqlserver "Decimal" 数据类型错误的问题

## v3.3.2

发布日期: 2024-09-02

### 增强
- 南向设备及北向应用页面，支持驱动分页和总数显示。
- 源管理和规则动作支持便携插件中自定义的 source 和 sink 类型。
- 删除 MQTT 节点时删除离线缓存数据。
- 优化 NeuronEX Docker image的磁盘使用量。

### 修复
- 修复三菱 3E 插件读取位标签值不正确的问题。
- 修复三菱插件过滤器意外响应的问题。
- 修复规则绑定动作 fields 字段重名问题。
- 修复 Modbus TCP 插件校验报文头参数的前端提示错误。
- 修复 File source 字段列表参数项提示信息未显示全的问题。
- 修复源配置组页面源类型筛选功能无效。
- 修复便携插件自定义 source，配置组页面展示信息不全的问题。
- 修复了 BatchOp 指标：计算时间批量输出
- 修复了 BatchOp 指标：不计算空时间批量输出

## v3.3.1

发布日期: 2024-07-31

### 增强
- Focas 驱动 PMC 读取优化
- 数据监控分页功能优化
- 第一次登录 NeuronEX，以浏览器语言作为默认语言
- 点位 `subscribe` 属性，核心缓存数据将正常数据和错误码分开存储，正常数据发生变化时才触发`subscribe`上报数据。
- 优化数采模块核心部分日志
- Action 公共配置项增加 dataField 和 Field 字段
- File source 支持 cime 文件类型

### 修复
- NeuronEX 启动后 Dataprocessing 节点通讯报错
- 南向驱动导入 API ，导入点位超出 License 限制引起的错误
- 北向应用含有中文时，下载日志文件出现乱码
- Action 页面下拉多选输入框样式错乱
- 修复ECP 下发更新便携插件包无效
- 修复单点登录功能的一些问题
- 修复 REST Sink 在 Content-type 内容为 application/vnd.microsoft.servicebus.json 时出现的问题

## v3.3.0

发布日期: 2024-06-24

### 增强
- 新增 Modbus ASCII 南向驱动
- 新增 XINJE Modbus RTU 南向驱动
- 新增 Codesys V3 南向驱动
- 新增 IEC 60870-5-101 南向驱动
- 新增 IEC 60870-5-102 南向驱动
- 新增 IEC 60870-5-103 南向驱动
- 新增 AWS IOT 北向应用
- 新增 Azure IOT 北向应用
- OPCUA 驱动支持点位发现
- OPCUA 驱动支持 localizedtext 数据类型
- IEC 61850 驱动支持异步读写
- IEC 60870-5-104 驱动调整为标准版，并支持提供私有定制版
- DLT645 支持多数据读取
- 支持上传 CNC 文件
- 点位新增支持配置偏移量
- 南向设备点位配置时，支持点位测试（目前仅支持 Modbus TCP 驱动）
- 数据监控页面支持过滤只显示错误点位
- 数据监控页面支持点位分页显示
- 驱动数据采集的浮点数点位，优化小数位显示
- 新增 CAN 总线数据采集
- 新增支持 Javascript 自定义函数
- 新增 Image Sink
- Neuron Sink 支持数据模板中一次多点位写入
- 数据源 Redis、 InfluxDB v1/v2 支持资源测试连接
- 新增 RBAC 用户管理，支持管理员和查看者两种角色
- 支持网络连接测试
- 支持显示系统 CPU及内存负载
- 优化 SQL Source的参数配置
- 优化规则状态页面的时间显示
- 优化单点登录功能
- 优化 MQTT 北向应用，生成默认 clientid 和 topic
- 规则默认配置中，重试间隔时间改为5000ms，重试间隔时间乘数改为1
- 新增一些规则 SQL使用示例
- 支持自定义隐藏左侧和顶部菜单栏

### 修复
- 修复NeuronEX Log Level设为debug后，ekuiper日志无限增长
- 修复南向驱动中文名称命名，导致导出配置报错
- 修复添加多个点位时，点位描述全部变为最后一次编辑的内容
- 修复南向驱动节点统计信息不准确的问题
- 修复modbus批量写入点位时引起的驱动异常

## v3.2.2

发布日期: 2024-06-28

### 增强
- 汇川 modbus 支持线圈区域合并读写
- 优化Siemens S7 采集性能
- 优化数据采集模块核心功能日志
- 浮点类型数据的显示，去除无效后缀
- 规则默认配置中，重试间隔时间改为5000ms，重试间隔时间乘数改为1

### 修复
- opc ua无法正确连接第三方opc server
- 驱动统计信息中group点位数显示不准确
- 下发错误配置导致neuron退出
- ”tag not changed“日志过多的问题
- 规则导入后规则状态与导入配置不一致的问题
- 使用不存在的httppull  lookuptable地址，规则仍正常运行
- kafka sink 相同的 key pub 时写到了多个分区
- 一次性添加多点位，添加描述时，全部变为最后一次编辑的内容。
- 北向应用停止后，trans_data_message统计指标未归0
- 数据监控页面，浮点数显示不正确


## v3.2.1

发布日期: 2024-04-26

### 增强
- Focas 驱动支持更多函数采集
- SECS/GEM 驱动点位解析到具体值
- 汇川 Modbus 驱动支持采集 TIME 与 DATA_AND_TIME 数据类型
- S7 驱动支持采集 DATA_AND_TIME 数据类型
- Modbus 驱动配置项中支持配置字节序
- Modbus 驱动配置项中支持配置起始地址位 0 或 1
- 新增文件上传功能
- 优化创建北向节点页面
- 优化 源管理、算法集成以及配置页面
- 默认日志采集级别调整为error
- 增加部分 SQL 示例
- 创建规则时，生成随机的Rule ID
- 驱动及规则复制时，生成默认名称
- 调整规则状态统计信息的操作位置
- 南向驱动数据统计页，采集错误信息时间戳显示为本地时间
- 移除试用License的时钟校验
- NeuronEX server 优化 100-continue 响应
- MQTT sink 密码隐藏不显示

### 修复
- 修复规则导入后，需要刷新页面才能看到新的规则的问题
- 修复便携插件列表展示为空，列表接口返回有数据的问题
- 修复规则调试中 data template 多行显示错误
- 修复便携插件重新上传功能无效
- 修复influxdb v2行协议选择true，提交sink报错的问题
- 修复OPCUA 驱动bool量，写入false会失败的问题
- 修复OPCUA 驱动，内存增长问题
- 修复reset-password 重置密码功能不能使用
- 修复 ECP 纳管-代理的 NeuronEX 无法使用日志监控功能


## v3.2.0

发布日期: 2024-03-18

### 增强
- 新增 MTConnect 南向驱动
- 新增 Siemens MPI 南向驱动
- 新增海德汉 CNC 南向驱动
- 新增南向驱动节点导入导出功能
- 新增数据处理功能 Kafka Sink
- 新增支持调用第三方 AI 算法服务
- 新增南向驱动复制功能
- 新增 SSO 单点登录支持
- 新增 代理连接到 ECP 平台
- OPCUA 驱动新增支持 Array 类型数据采集
- OPCUA 异步读写性能优化
- Inovance Modbus TCP 驱动支持配置汇川 AM 系列，AC 系列中型 PLC
- Focas 驱动新增函数功能
- S7 驱动新增支持 wstring 类型
- 增强数采插件更新替换删除功能
- MQTT、SQL、Kafka Source/Sink 支持测试连接
- Source、Sink 配置支持证书文件直接导入
- 重新设计并优化 UI 页面
- 优化南向驱动创建页面
- 优化规则调试页面
- 优化驱动及规则的数据统计页面
- 优化数据处理 Sink 配置页面
- 增强多个 UI 页面的搜索查询功能
- UI 支持便携插件示例下载
- 优化 Dump 文件生成
- 自带License功能调整，数据处理功能可用，规则会在60分钟后停止
- 修改了 docker 安装包命名规范，`neuronex:latest` 和 `neuronex:3.2.0` 版安装包默认带有 Python 基础环境，`neuronex:3.2.0-slim`版不带有 Python 基础环境 
- 移除了南向驱动模板功能


### 修复
- 修复三菱驱动默认超时较短，数据量大时，异常断开的问题
- 修复插件上传时，so文件和json文件不匹配的问题
- 修复三菱PLC 3E 连接状态不准确的问题
- 修复规则调试，数据模板向后端传空格和回车的问题

## v3.1.2

发布日期: 2024-03-06

### 增强
- 将数据点名称长度限制提升至 128 位。
- 新增对汇川驱动 Inovance Modbus TCP I 地址区域单点位和多点位读写的支持。
- 调整了汇川驱动 Inovance Modbus TCP 的默认字节顺序，使其与设备匹配。
- 提高了 OPC UA 异步读写性能。
- S7 驱动现在支持 Q/M 命名的地址输入规范。

### 修复
- 修复了在处理大量数据时，三菱驱动异常断开的问题。
- 修复了 104 协议中的 3008 异常错误问题。
- 解决了生成过多 dump 文件的问题。


## v3.1.1

发布日期: 2024-01-12

### 增强
- 添加了 Redis 数据源。
- 优化了日志监控页面。
- 优化了密码更改验证，确保旧密码和新密码不相同。
- 在北向应用页面和北向应用组列表页面，添加了筛选搜索和分页功能。
- 将 ECP 相关数据（探活、系统日志、密码）存储到 SQLite 数据库中。
- 在创建规则时，默认将 `立即运行` 选项默认设置为 `开启` 。

### 修复
- 修复了 SQL Source 数据库密码验证错误。
- 修复了数据监控页面中`节点`和`组`显示错误的问题。
- 修复了在规则调试进行中创建规则时出现错误的问题。
- 修复了十六进制格式下，写入数据标签出现错误的问题。
- 修复了 TLS 证书验证错误。
- 修复了多个 Operator 算子时的规则异常问题。
- 修复了 syslog 日志正文验证问题。
- 修复了设置日志级别时 eKuiper 探活检查的问题。
- 修复了除重新启动 NeuronEX 外，向 ECP 发送探活信息无效的问题。


## v3.1.0

发布日期: 2023-12-22

### 增强

- 新增支持 Centos 7, Ubuntu 18.04 and Debian-10 操作系统

- 新增支持 ARM v7架构

- 新增支持 RPM、DEB 方式安装

- 新增 Inovance Modbus TCP南向驱动

- 新增 HOSTLINK 南向驱动

- 支持新增及替换数采驱动

- 驱动模板导入，新增采集组的 ”采集间隔“ 字段

- 数据处理模块新增数据源：HTTP Pull、HTTP Push、SQL、File、Video、Simulator

- 数据处理模块新增动作Sink：REST、SQL、InfluxDB V1、InfluxDB V2 、File

- 新增规则调试功能

- 优化数据处理模块动作 Sink 页面

- 优化数据处理模块规则选项 UI 级动作 Sink 高级配置项UI

- 优化数据采集与数据处理模块之间的配置过程

- 新增日志监控功能

- 支持下载单个数采驱动日志

- 支持下载数据处理模块日志

- 支持启停数据处理模块

- UI 显示系统架构信息

- 支持命令行重置登录密码

- 优化 NeuronEX 存储目录

- NeuronEX 日志、指标数据、告警支持与 ECP 对接


## v3.0.1

发布日期: 2023-11-3

### 增强

- 新增限制日志文件限制大小及数量的配置功能

- 新增修改日志等级的功能，页面增加日志配置功能

- UI 页面中修改密码时增加密码限制


### 修复

- 修复日志乱码、格式错误等日志相关的问题



## v3.0.0

发布日期: 2023-10-24

### 增强

- 实现数据采集和数据处理的功能集成

- 新增统一认证服务

- 新增统一API

- 新增支持 syslog 服务（Support syslog server）

- 新增支持 yaml 格式的配置文件

- 新增支持环境变量和命令行设置运行

- 新增支持大规模硬件绑定的许可证分发

- 新增浮动许可证

- 优化前端显示



