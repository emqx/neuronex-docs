# 发版历史

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



