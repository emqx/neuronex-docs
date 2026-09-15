# 产品概览

EMQX Neuron 是一款工业边缘网关软件，部署在制造、能源、楼宇等工业现场。设备侧协议繁杂、数据格式不统一，而 MES、SCADA 和云平台需要标准化的实时数据——EMQX Neuron 把 PLC、CNC、机器人、仪表等 OT 设备的数据采集上来，在边缘完成清洗和计算，再按上层系统需要的形式交付。

<style>
.nxd            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxd .t         { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif; fill: #1f2d3d; }
.nxd .h         { font-size: 16px; font-weight: 600; }
.nxd .m         { font-size: 15px; font-weight: 600; }
.nxd .sub       { font-size: 12.5px; fill: #4a5b6e; }
.nxd .lbl       { font-size: 12.5px; font-weight: 600; }
.nxd .blue      { fill: #2a6ebb; }
.nxd .green     { fill: #00b173; }
.nxd .ptitle    { fill: #1b4f89; }
.nxd .bg        { fill: #f7fafd; }
.nxd .box       { fill: #ffffff; stroke: #ccd8e4; stroke-width: 1.5; }
.nxd .mod       { fill: #ffffff; stroke: #2a6ebb; stroke-width: 1.5; }
.nxd .prod      { fill: #eaf2fb; stroke: #2a6ebb; stroke-width: 2; }
.nxd .rule      { stroke: #e4ecf3; stroke-width: 1.5; }
.nxd .flow      { stroke: #2a6ebb; stroke-width: 2; }
.nxd .back      { stroke: #00b173; stroke-width: 2; }
.nxd .ah        { fill: #2a6ebb; }
.nxd .ah-g      { fill: #00b173; }

html.dark .nxd .t      { fill: #d7dee6; }
html.dark .nxd .sub    { fill: #9db0c4; }
html.dark .nxd .blue   { fill: #7fb4ea; }
html.dark .nxd .green  { fill: #3ecf9a; }
html.dark .nxd .ptitle { fill: #8ec1f0; }
html.dark .nxd .bg     { fill: #161c24; }
html.dark .nxd .box    { fill: #1d2631; stroke: #3b4857; }
html.dark .nxd .mod    { fill: #1d2631; stroke: #5a9fe0; }
html.dark .nxd .prod   { fill: #1a2938; stroke: #5a9fe0; }
html.dark .nxd .rule   { stroke: #2f3b49; }
html.dark .nxd .flow   { stroke: #7fb4ea; }
html.dark .nxd .back   { stroke: #3ecf9a; }
html.dark .nxd .ah     { fill: #7fb4ea; }
html.dark .nxd .ah-g   { fill: #3ecf9a; }
</style>

<svg class="nxd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 490" role="img" aria-label="EMQX Neuron 数据流向图：左侧现场设备与 HTTP、SQL 数据库、文件日志、视频流等其他数据源接入 EMQX Neuron，依次经数据采集、数据处理、数据转发；向右与 IoT 平台及企业系统双向通信（上报数据、接收反控指令），并写入 MySQL、InfluxDB、AWS S3 等数据库与存储；同时以 OPC UA Server 在现场对外开放，供厂内 SCADA、HMI、MES 反向取数与下发控制">
  <defs>
    <marker id="nxdA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
    <marker id="nxdB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah-g" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1200" height="490" rx="10"/>

  <rect class="box" x="24" y="76" width="196" height="180" rx="8"/>
  <text class="t h" x="122" y="104" text-anchor="middle">现场设备</text>
  <line class="rule" x1="46" y1="118" x2="198" y2="118"/>
  <text class="t sub" x="122" y="144" text-anchor="middle">PLC</text>
  <text class="t sub" x="122" y="172" text-anchor="middle">CNC 机床</text>
  <text class="t sub" x="122" y="200" text-anchor="middle">机器人</text>
  <text class="t sub" x="122" y="228" text-anchor="middle">智能仪表 · DCS · SCADA</text>

  <rect class="box" x="24" y="276" width="196" height="140" rx="8"/>
  <text class="t h" x="122" y="304" text-anchor="middle">其他数据源</text>
  <line class="rule" x1="46" y1="318" x2="198" y2="318"/>
  <text class="t sub" x="122" y="344" text-anchor="middle">HTTP 接口 · SQL 数据库</text>
  <text class="t sub" x="122" y="370" text-anchor="middle">文件与日志 · 视频流</text>
  <text class="t sub" x="122" y="396" text-anchor="middle">Kafka · Redis · CAN</text>

  <line class="flow" x1="228" y1="166" x2="292" y2="166" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="260" y="154" text-anchor="middle">采集</text>
  <line class="flow" x1="228" y1="346" x2="292" y2="346" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="260" y="334" text-anchor="middle">接入</text>

  <rect class="prod" x="300" y="76" width="320" height="340" rx="10"/>
  <text class="t h ptitle" x="460" y="106" text-anchor="middle">EMQX Neuron</text>

  <rect class="mod" x="326" y="126" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="154" text-anchor="middle">数据采集</text>
  <text class="t sub" x="460" y="178" text-anchor="middle">100+ 工业协议 · 50 个南向驱动</text>

  <rect class="mod" x="326" y="222" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="250" text-anchor="middle">数据处理</text>
  <text class="t sub" x="460" y="274" text-anchor="middle">160+ 函数 · 流式计算 · AI/ML</text>

  <rect class="mod" x="326" y="318" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="346" text-anchor="middle">数据转发</text>
  <text class="t sub" x="460" y="370" text-anchor="middle">上报平台 · 对外开放服务</text>

  <line class="flow" x1="628" y1="98" x2="692" y2="98" marker-start="url(#nxdA)" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="660" y="86" text-anchor="middle">转发上报</text>
  <text class="t lbl blue" x="660" y="116" text-anchor="middle">反控下发</text>
  <line class="flow" x1="628" y1="234" x2="692" y2="234" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="660" y="222" text-anchor="middle">写入存储</text>
  <line class="back" x1="692" y1="382" x2="628" y2="382" marker-end="url(#nxdB)"/>
  <text class="t lbl green" x="660" y="370" text-anchor="middle">取数 / 反控</text>

  <rect class="box" x="700" y="40" width="476" height="116" rx="8"/>
  <text class="t h" x="938" y="68" text-anchor="middle">IoT 平台与企业系统</text>
  <line class="rule" x1="726" y1="82" x2="1150" y2="82"/>
  <text class="t sub" x="938" y="108" text-anchor="middle">MQTT · AWS IoT Core · Azure IoT Hub</text>
  <text class="t sub" x="938" y="134" text-anchor="middle">Sparkplug B (UNS) · Kafka · HTTP</text>

  <rect class="box" x="700" y="176" width="476" height="116" rx="8"/>
  <text class="t h" x="938" y="204" text-anchor="middle">数据库与存储</text>
  <line class="rule" x1="726" y1="218" x2="1150" y2="218"/>
  <text class="t sub" x="938" y="244" text-anchor="middle">MySQL · PostgreSQL · SQL Server · Oracle</text>
  <text class="t sub" x="938" y="270" text-anchor="middle">InfluxDB · Redis · 文件 · AWS S3</text>

  <rect class="box" x="700" y="312" width="476" height="140" rx="8"/>
  <text class="t h" x="938" y="340" text-anchor="middle">厂内系统</text>
  <text class="t lbl green" x="938" y="362" text-anchor="middle">经 OPC UA Server 主动连入</text>
  <line class="rule" x1="726" y1="376" x2="1150" y2="376"/>
  <text class="t sub" x="938" y="402" text-anchor="middle">SCADA · HMI · MES</text>
  <text class="t sub" x="938" y="428" text-anchor="middle">历史库 · 组态软件</text>
</svg>

## 能做什么

| <div style="width:60pt">能力</div> | 说明 | <div style="width:70pt">详见</div> |
| --- | --- | --- |
| **数据采集** | 通过南向驱动接入 100+ 工业协议，覆盖 Modbus、OPC UA、EtherNet/IP、IEC 60870、BACnet、西门子与三菱 PLC、各类 CNC | [南向驱动](./introduction/driver-list/driver-list.md) |
| **数据处理** | 内置流式计算引擎，160+ 函数支持过滤、转换、聚合与时间窗口计算；可集成 Python / C++ 自定义函数和 AI/ML 模型 | [数据处理](./streaming-processing/overview.md) |
| **数据转发** | 上报到 IoT 平台与企业系统、写入数据库，或在现场以 OPC UA Server 对外开放数据 | [北向应用](./configuration/north-apps/catalog.md) |
| **运维管理** | Web 控制台完成配置、用户与权限、日志下载、运行监控与告警，支持主备部署 | [运维](./admin/introduction.md) |

## 从这里开始

- **想先跑通一条链路** —— [快速入门](./quick-start/quick-start.md)，用 Docker 起一个实例，从模拟设备采集数据并转发到 MQTT。
- **要装到生产环境** —— [安装与部署](./installation/introduction.md)，支持 tar.gz、rpm、deb、Docker，以及主备部署。
- **先确认设备协议支不支持** —— [南向驱动](./introduction/driver-list/driver-list.md)，按协议和 CNC 型号查对照表。
- **想了解内部怎么组成** —— [架构](./introduction/architecture.md)。

## 数据往哪送

如上图，采集和处理后的数据有四个去向：

| <div style="width:100pt">去向</div> | 方式 | 说明 |
| --- | --- | --- |
| 推到 IoT 平台 | [MQTT](./configuration/north-apps/mqtt/overview.md)、[AWS IoT Core](./configuration/north-apps/aws-iot/overview.md)、[Azure IoT Hub](./configuration/north-apps/azure-iot/overview.md)、[Sparkplug B](./configuration/north-apps/sparkplugb/overview.md) | **双向**：上报点位值，也可由平台下发写入指令反控设备。Sparkplug B 用于构建 UNS 统一命名空间，文档提供 [Ignition](./configuration/north-apps/sparkplugb/ignition.md)、[Cogent DataHub](./configuration/north-apps/sparkplugb/cogent.md) 的实测连接示例 |
| 推到企业系统 | [Kafka](./configuration/north-apps/kafka/overview.md)、HTTP、[WebSocket](./configuration/north-apps/websocket/websocket.md) | 写入企业消息总线，供 MES、数据中台消费 |
| 写入数据库与存储 | MySQL、PostgreSQL、SQL Server、Oracle、InfluxDB、Redis、AWS S3 | 由数据处理的 [Sink](./streaming-processing/sink/sink.md) 写出，可先聚合降采样再落库 |
| 在现场对外开放 | [OPC UA Server](./configuration/north-apps/opcua-server/overview.md) | 厂内 SCADA、HMI、MES、历史库作为客户端连入取数，也可下发控制指令 |

### 在现场对外开放 OPC UA 服务

前三种是 EMQX Neuron 主动把数据送出去，[OPC UA Server](./configuration/north-apps/opcua-server/overview.md) 是反过来的一条通道：EMQX Neuron 以 OPC UA 标准对外提供服务，厂内既有的 SCADA、HMI、MES 和历史库作为客户端直接连上来，订阅点位变化、读取实时值，也可以反向下发控制指令。

对已经建成的产线，价值在于**不用改造上位机系统**——SCADA 本来就会说 OPC UA，接上之后，南向接入的上百种设备统一成一个 OPC UA 数据源，原本各说各话的 Modbus、西门子 S7、三菱、CNC 设备不再需要逐个对接。安全方面支持 Basic256Sha256 等安全策略、用户名密码认证，以及服务端证书与受信任客户端证书的双向校验。

## 部署与性能

- **低延迟**：采集周期最快 100 毫秒，数据在边缘侧完成处理，不必往返云端。
- **部署轻量**：内存占用低，支持 x86 与 ARM，可运行在工控机、网关设备上，也支持 Docker 与 Kubernetes 部署。
