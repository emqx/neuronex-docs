# Product Overview

EMQX Neuron (formerly NeuronEX) is an industrial edge gateway that runs on the plant floor — in manufacturing, energy, and building automation. Device-side protocols are fragmented and data formats are inconsistent, while MES, SCADA, and cloud platforms need standardized real-time data. EMQX Neuron collects from PLCs, CNC machines, robots, and meters, cleans and computes on that data at the edge, and delivers it in the shape the systems above expect.

<style>
.nxd            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxd .t         { font-family: -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #1f2d3d; }
.nxd .h         { font-size: 16px; font-weight: 600; }
.nxd .m         { font-size: 15px; font-weight: 600; }
.nxd .sub       { font-size: 12px; fill: #4a5b6e; }
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

<svg class="nxd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 490" role="img" aria-label="EMQX Neuron data flow: field devices plus other sources such as HTTP APIs, SQL databases, files and logs, and video streams feed into EMQX Neuron, passing through data collection, data processing, and data forwarding; it exchanges data with IoT platforms and enterprise systems in both directions (publishing values and receiving write commands), writes into databases and storage such as MySQL, InfluxDB, and AWS S3, and serves an OPC UA Server on the plant floor so on-site SCADA, HMI, and MES connect in to read tags and write control commands">
  <defs>
    <marker id="nxdA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
    <marker id="nxdB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah-g" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1200" height="490" rx="10"/>

  <rect class="box" x="24" y="76" width="196" height="180" rx="8"/>
  <text class="t h" x="122" y="104" text-anchor="middle">Field devices</text>
  <line class="rule" x1="46" y1="118" x2="198" y2="118"/>
  <text class="t sub" x="122" y="144" text-anchor="middle">PLC</text>
  <text class="t sub" x="122" y="172" text-anchor="middle">CNC machines</text>
  <text class="t sub" x="122" y="200" text-anchor="middle">Robots</text>
  <text class="t sub" x="122" y="228" text-anchor="middle">Smart meters · DCS · SCADA</text>

  <rect class="box" x="24" y="276" width="196" height="140" rx="8"/>
  <text class="t h" x="122" y="304" text-anchor="middle">Other data sources</text>
  <line class="rule" x1="46" y1="318" x2="198" y2="318"/>
  <text class="t sub" x="122" y="344" text-anchor="middle">HTTP APIs · SQL databases</text>
  <text class="t sub" x="122" y="370" text-anchor="middle">Files and logs · Video streams</text>
  <text class="t sub" x="122" y="396" text-anchor="middle">Kafka · Redis · CAN</text>

  <line class="flow" x1="228" y1="166" x2="292" y2="166" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="260" y="154" text-anchor="middle">Collect</text>
  <line class="flow" x1="228" y1="346" x2="292" y2="346" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="260" y="334" text-anchor="middle">Ingest</text>

  <rect class="prod" x="300" y="76" width="320" height="340" rx="10"/>
  <text class="t h ptitle" x="460" y="106" text-anchor="middle">EMQX Neuron</text>

  <rect class="mod" x="326" y="126" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="154" text-anchor="middle">Data collection</text>
  <text class="t sub" x="460" y="178" text-anchor="middle">100+ protocols · 50 southbound drivers</text>

  <rect class="mod" x="326" y="222" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="250" text-anchor="middle">Data processing</text>
  <text class="t sub" x="460" y="274" text-anchor="middle">160+ functions · streaming · AI/ML</text>

  <rect class="mod" x="326" y="318" width="268" height="72" rx="6"/>
  <text class="t m" x="460" y="346" text-anchor="middle">Data forwarding</text>
  <text class="t sub" x="460" y="370" text-anchor="middle">publish out · serve on site</text>

  <line class="flow" x1="628" y1="98" x2="692" y2="98" marker-start="url(#nxdA)" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="660" y="86" text-anchor="middle">Publish</text>
  <text class="t lbl blue" x="660" y="116" text-anchor="middle">Write back</text>
  <line class="flow" x1="628" y1="234" x2="692" y2="234" marker-end="url(#nxdA)"/>
  <text class="t lbl blue" x="660" y="222" text-anchor="middle">Store</text>
  <line class="back" x1="692" y1="382" x2="628" y2="382" marker-end="url(#nxdB)"/>
  <text class="t lbl green" x="660" y="370" text-anchor="middle">Read / write</text>

  <rect class="box" x="700" y="40" width="476" height="116" rx="8"/>
  <text class="t h" x="938" y="68" text-anchor="middle">IoT platforms &amp; enterprise systems</text>
  <line class="rule" x1="726" y1="82" x2="1150" y2="82"/>
  <text class="t sub" x="938" y="108" text-anchor="middle">MQTT · AWS IoT Core · Azure IoT Hub</text>
  <text class="t sub" x="938" y="134" text-anchor="middle">Sparkplug B (UNS) · Kafka · HTTP</text>

  <rect class="box" x="700" y="176" width="476" height="116" rx="8"/>
  <text class="t h" x="938" y="204" text-anchor="middle">Databases &amp; storage</text>
  <line class="rule" x1="726" y1="218" x2="1150" y2="218"/>
  <text class="t sub" x="938" y="244" text-anchor="middle">MySQL · PostgreSQL · SQL Server · Oracle</text>
  <text class="t sub" x="938" y="270" text-anchor="middle">InfluxDB · Redis · Files · AWS S3</text>

  <rect class="box" x="700" y="312" width="476" height="140" rx="8"/>
  <text class="t h" x="938" y="340" text-anchor="middle">On-site systems</text>
  <text class="t lbl green" x="938" y="362" text-anchor="middle">connect in via OPC UA Server</text>
  <line class="rule" x1="726" y1="376" x2="1150" y2="376"/>
  <text class="t sub" x="938" y="402" text-anchor="middle">SCADA · HMI · MES</text>
  <text class="t sub" x="938" y="428" text-anchor="middle">Historians · HMI software</text>
</svg>

## Core capabilities

| <div style="width:90pt">Capability</div> | Description | <div style="width:110pt">Learn more</div> |
| --- | --- | --- |
| **Data collection** | Southbound drivers connect 100+ industrial protocols, covering Modbus, OPC UA, EtherNet/IP, IEC 60870, BACnet, Siemens and Mitsubishi PLCs, and a range of CNC controllers | [Southbound Drivers](./introduction/driver-list/driver-list.md) |
| **Data processing** | A built-in stream processing engine with 160+ functions for filtering, transformation, aggregation, and windowing; extensible with Python/C++ functions and AI/ML models | [Data Processing](./streaming-processing/overview.md) |
| **Data forwarding** | Publish to IoT platforms and enterprise systems, write into databases, or serve data on the plant floor through an OPC UA Server | [Northbound Applications](./configuration/north-apps/catalog.md) |
| **Operations** | A web console for configuration, users and permissions, log download, runtime monitoring and alerts, with master-backup deployment | [Operations](./admin/introduction.md) |

## Getting started

- **Get one pipeline working first** — [Quick Start](./quick-start/quick-start.md): run an instance in Docker, collect from a simulated device, and forward to MQTT.
- **Deploy to production** — [Installation and Deployment](./installation/introduction.md): tar.gz, rpm, deb, and Docker, plus master-backup deployment.
- **Check whether your device protocol is supported** — [Southbound Drivers](./introduction/driver-list/driver-list.md): look up your protocol or CNC model in the compatibility tables.
- **Understand how it is put together** — [Architecture](./introduction/architecture.md).

## Data destinations

As the diagram shows, collected and processed data leaves in four directions:

| <div style="width:130pt">Destination</div> | How | Notes |
| --- | --- | --- |
| IoT platforms | [MQTT](./configuration/north-apps/mqtt/overview.md), [AWS IoT Core](./configuration/north-apps/aws-iot/overview.md), [Azure IoT Hub](./configuration/north-apps/azure-iot/overview.md), [Sparkplug B](./configuration/north-apps/sparkplugb/overview.md) | **Bidirectional**: publish tag values, and accept write commands from the platform to control devices. Sparkplug B builds a unified namespace (UNS); the docs include verified walkthroughs for [Ignition](./configuration/north-apps/sparkplugb/ignition.md) and [Cogent DataHub](./configuration/north-apps/sparkplugb/cogent.md) |
| Enterprise systems | [Kafka](./configuration/north-apps/kafka/overview.md), HTTP, [WebSocket](./configuration/north-apps/websocket/websocket.md) | Feed the enterprise message bus for MES and data platforms |
| Databases and storage | MySQL, PostgreSQL, SQL Server, Oracle, InfluxDB, Redis, AWS S3 | Written by a data processing [sink](./streaming-processing/sink/sink.md), optionally aggregated or downsampled first |
| Served on the plant floor | [OPC UA Server](./configuration/north-apps/opcua-server/overview.md) | On-site SCADA, HMI, MES, and historians connect in as clients to read tags and write control commands |

### Serving OPC UA on the plant floor

The first three push data outward. The [OPC UA Server](./configuration/north-apps/opcua-server/overview.md) reverses that: EMQX Neuron exposes an OPC UA service, and the SCADA, HMI, MES, and historian systems already installed in the plant connect to it as clients — subscribing to tag changes, reading live values, and writing control commands back down.

On an existing production line, the value is that **nothing upstream has to change**. SCADA already speaks OPC UA, so once it connects, the hundred-plus device protocols collected below become a single OPC UA data source — Modbus, Siemens S7, Mitsubishi, and CNC devices no longer have to be integrated one by one. Security covers policies such as Basic256Sha256, username and password authentication, and mutual validation with a server certificate and trusted client certificates.

## Deployment and performance

- **Low latency**: collection intervals down to 100 ms, with processing at the edge instead of round-tripping to the cloud.
- **Lightweight**: low memory footprint, x86 and ARM support, runs on industrial PCs and gateway hardware, and deploys via Docker and Kubernetes.
