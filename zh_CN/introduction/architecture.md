# 架构

EMQX Neuron 运行在工业现场：南向驱动按协议读写设备，北向应用将数据上报至外部系统，中间由独立的流式计算引擎做处理，整体由系统管理模块统一配置和监控。

<style>
.nxa            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxa .t         { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif; fill: #1f2d3d; }
.nxa .h         { font-size: 16px; font-weight: 600; }
.nxa .m         { font-size: 15px; font-weight: 600; }
.nxa .sub       { font-size: 12.5px; fill: #4a5b6e; }
.nxa .tiny      { font-size: 11.5px; fill: #6b7c8f; }
.nxa .lbl       { font-size: 12.5px; font-weight: 600; }
.nxa .blue      { fill: #2a6ebb; }
.nxa .ptitle    { fill: #1b4f89; }
.nxa .bg        { fill: #f7fafd; }
.nxa .box       { fill: #ffffff; stroke: #ccd8e4; stroke-width: 1.5; }
.nxa .mod       { fill: #ffffff; stroke: #2a6ebb; stroke-width: 1.5; }
.nxa .proc      { fill: #ffffff; stroke: #2a6ebb; stroke-width: 1.5; stroke-dasharray: 6 4; }
.nxa .mgmt      { fill: #ffffff; stroke: #9fb4c9; stroke-width: 1.5; }
.nxa .prod      { fill: #eaf2fb; stroke: #2a6ebb; stroke-width: 2; }
.nxa .rule      { stroke: #e4ecf3; stroke-width: 1.5; }
.nxa .flow      { stroke: #2a6ebb; stroke-width: 2; }
.nxa .ah        { fill: #2a6ebb; }

html.dark .nxa .t      { fill: #d7dee6; }
html.dark .nxa .sub    { fill: #9db0c4; }
html.dark .nxa .tiny   { fill: #8496a8; }
html.dark .nxa .blue   { fill: #7fb4ea; }
html.dark .nxa .ptitle { fill: #8ec1f0; }
html.dark .nxa .bg     { fill: #161c24; }
html.dark .nxa .box    { fill: #1d2631; stroke: #3b4857; }
html.dark .nxa .mod    { fill: #1d2631; stroke: #5a9fe0; }
html.dark .nxa .proc   { fill: #1d2631; stroke: #5a9fe0; }
html.dark .nxa .mgmt   { fill: #1d2631; stroke: #55677c; }
html.dark .nxa .prod   { fill: #1a2938; stroke: #5a9fe0; }
html.dark .nxa .rule   { stroke: #2f3b49; }
html.dark .nxa .flow   { stroke: #7fb4ea; }
html.dark .nxa .ah     { fill: #7fb4ea; }
</style>

<svg class="nxa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" role="img" aria-label="EMQX Neuron 架构图：左侧是现场设备与其他数据源，中间 EMQX Neuron 由系统管理，以及数据采集、数据处理（独立进程）、数据转发三个模块组成，右侧是 IoT 平台、SCADA、数据库等目标系统；各层之间为双向通信">
  <defs>
    <marker id="nxaA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1200" height="500" rx="10"/>

  <rect class="box" x="24" y="120" width="178" height="264" rx="8"/>
  <text class="t h" x="113" y="148" text-anchor="middle">现场设备与数据源</text>
  <line class="rule" x1="44" y1="162" x2="182" y2="162"/>
  <text class="t sub" x="113" y="188" text-anchor="middle">PLC · CNC 机床</text>
  <text class="t sub" x="113" y="214" text-anchor="middle">机器人 · 智能仪表</text>
  <text class="t sub" x="113" y="240" text-anchor="middle">DCS · SCADA</text>
  <line class="rule" x1="44" y1="290" x2="182" y2="290"/>
  <text class="t sub" x="113" y="318" text-anchor="middle">HTTP 接口 · 数据库</text>
  <text class="t sub" x="113" y="344" text-anchor="middle">文件与日志 · 视频流</text>

  <line class="flow" x1="210" y1="252" x2="242" y2="252" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <rect class="prod" x="250" y="56" width="700" height="392" rx="10"/>
  <text class="t h ptitle" x="600" y="86" text-anchor="middle">EMQX Neuron</text>

  <rect class="mgmt" x="274" y="102" width="652" height="62" rx="6"/>
  <text class="t m" x="600" y="126" text-anchor="middle">系统管理</text>
  <text class="t sub" x="600" y="150" text-anchor="middle">配置管理 · 用户与权限 · 认证 · 日志 · 监控 · 告警</text>

  <rect class="mod" x="274" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="376" y="212" text-anchor="middle">数据采集</text>
  <line class="rule" x1="294" y1="226" x2="458" y2="226"/>
  <text class="t sub" x="376" y="252" text-anchor="middle">Modbus · OPC UA</text>
  <text class="t sub" x="376" y="278" text-anchor="middle">EtherNet/IP · IEC 60870</text>
  <text class="t sub" x="376" y="304" text-anchor="middle">BACnet · KNX · DL/T645</text>
  <text class="t sub" x="376" y="330" text-anchor="middle">西门子 / 三菱 PLC</text>
  <text class="t sub" x="376" y="356" text-anchor="middle">FANUC / 马扎克 CNC</text>
  <text class="t tiny" x="376" y="396" text-anchor="middle">共 50 个南向驱动</text>

  <rect class="proc" x="498" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="600" y="212" text-anchor="middle">数据处理</text>
  <text class="t tiny blue" x="600" y="230" text-anchor="middle">独立进程 · NNG 通道</text>
  <line class="rule" x1="518" y1="244" x2="682" y2="244"/>
  <text class="t sub" x="600" y="270" text-anchor="middle">标准化 · 清洗</text>
  <text class="t sub" x="600" y="296" text-anchor="middle">转换 · 过滤 · 聚合</text>
  <text class="t sub" x="600" y="322" text-anchor="middle">时间窗口计算</text>
  <text class="t sub" x="600" y="348" text-anchor="middle">自定义函数 (Python/C++)</text>
  <text class="t sub" x="600" y="374" text-anchor="middle">AI/ML 推理</text>

  <rect class="mod" x="722" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="824" y="212" text-anchor="middle">数据转发</text>
  <line class="rule" x1="742" y1="226" x2="906" y2="226"/>
  <text class="t sub" x="824" y="252" text-anchor="middle">MQTT · Sparkplug B</text>
  <text class="t sub" x="824" y="278" text-anchor="middle">AWS IoT · Azure IoT</text>
  <text class="t sub" x="824" y="304" text-anchor="middle">Kafka · HTTP · WebSocket</text>
  <text class="t sub" x="824" y="330" text-anchor="middle">数据库 · 文件 · S3</text>
  <text class="t sub" x="824" y="356" text-anchor="middle">OPC UA Server</text>

  <line class="flow" x1="478" y1="304" x2="496" y2="304" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>
  <line class="flow" x1="704" y1="304" x2="720" y2="304" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <line class="flow" x1="958" y1="252" x2="990" y2="252" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <rect class="box" x="998" y="120" width="178" height="264" rx="8"/>
  <text class="t h" x="1087" y="148" text-anchor="middle">目标系统</text>
  <line class="rule" x1="1018" y1="162" x2="1156" y2="162"/>
  <text class="t sub" x="1087" y="192" text-anchor="middle">EMQX · IoT 平台</text>
  <text class="t sub" x="1087" y="222" text-anchor="middle">SCADA · HMI</text>
  <text class="t sub" x="1087" y="252" text-anchor="middle">MES · ERP</text>
  <text class="t sub" x="1087" y="282" text-anchor="middle">数据库 · 历史库</text>
  <text class="t sub" x="1087" y="312" text-anchor="middle">数据分析 · 可视化</text>
  <text class="t sub" x="1087" y="342" text-anchor="middle">企业应用</text>
</svg>

## 核心数据模型

理解 EMQX Neuron 的配置，先理解这三层：

| 概念 | 是什么 |
| --- | --- |
| **节点 (Node)** | 一个南向驱动或北向应用的运行实例。同一种驱动可以建多个节点，分别连不同设备 |
| **组 (Group)** | 节点下的采集单元，有独立的采集频率。**组是采集、上报和订阅的最小粒度** |
| **点位 (Tag)** | 设备里的一个地址，带读写属性、数据类型和精度 |

一个 EMQX Neuron 进程里可以同时运行多个南向和北向节点，彼此隔离，由核心框架负责它们之间的消息路由。

详细配置见[数据采集、处理与转发](../configuration/introduction.md)，名称长度、单节点组数、最快采集周期等限制见该页的[配置规范](../configuration/introduction.md#配置规范)。

## 南向到北向的数据路由

南向采到的数据不是直接交给北向应用的，而是经核心框架的消息总线转发：

1. 每个节点在启动时建立两条 UNIX 域套接字（`AF_UNIX` / `SOCK_DGRAM`）——一条走控制指令，一条走数据，控制面和数据面分开。
2. 北向应用按 **(驱动, 组)** 建立订阅，订阅关系记录在核心框架里，同时记下该应用的套接字地址。
3. 某个组采集完成后，核心框架查出订阅了这个组的所有应用，把数据投递到各自的数据面套接字。

因为订阅按组、不按节点，所以同一个南向设备的不同组可以分发给不同的北向应用——比如高频组只发给本地 SCADA，低频组才上云。订阅操作见[订阅南向数据](../configuration/subscription.md)。

## 数据处理引擎

流式计算引擎是**独立进程**，不在 EMQX Neuron 主进程内，两者通过 NNG 通道通信：

- EMQX Neuron 侧由 **规则引擎应用**（一个北向应用）监听 `0.0.0.0:7081`（端口可配置，范围 1024–65535），使用 NNG 的 `pair0` 协议。
- 引擎进程作为客户端连入这条通道，接收订阅到的南向数据。

这个设计的结果是：**采集与处理互不阻塞**——处理引擎重启、规则出错或负载升高，都不会影响南向采集；反过来，引擎也能独立扩展。代价是数据要跨进程传一次。

引擎侧还能接入设备之外的数据源（[HTTP Pull](../streaming-processing/http_pull.md)、[HTTP Push](../streaming-processing/http_push.md)、[SQL 数据库](../streaming-processing/sql.md)、[文件](../streaming-processing/file.md)、[视频流](../streaming-processing/video.md)），与设备数据在同一个引擎里融合。处理后的结果经 [Sink](../streaming-processing/sink/sink.md) 写出。

## 断网缓存

工业现场网络不稳定，北向连接断开时数据不会丢。以 MQTT 应用为例，开启**离线缓存**后：

| 参数 | 说明 | 取值范围 |
| --- | --- | --- |
| 内存缓存大小 | 断连后先缓存在内存 | 1–1024 MB |
| 磁盘缓存大小 | 内存缓存写满后转入磁盘，应大于内存缓存 | 1–10240 MB |
| 同步间隔 | 重连后回传缓存消息的间隔，单位毫秒 | 10–120000，默认 100 |

内存和磁盘两级缓存要么都配、要么都不配。连接恢复后，缓存的消息按同步间隔逐批回传。

## 系统管理

- **配置管理**：Web 控制台统一管理南向驱动、北向应用和处理规则；配置持久化在数据目录，升级不丢。
- **安全**：用户名密码访问控制、基于 JWT 的 API 认证、TLS/SSL 加密传输。
- **可观测**：运行日志、节点级性能指标、连接状态监控与告警。
- **高可用**：支持[主备模式](../best-practise/master-backup.md)部署。

详见[运维](../admin/introduction.md)。
