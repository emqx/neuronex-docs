# Architecture

EMQX Neuron runs on the plant floor: southbound drivers read and write devices over their native protocols, northbound applications send data outward, a separate stream processing engine handles the data in between, and a system management module configures and monitors the whole thing.

<style>
.nxa            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxa .t         { font-family: -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #1f2d3d; }
.nxa .h         { font-size: 16px; font-weight: 600; }
.nxa .m         { font-size: 15px; font-weight: 600; }
.nxa .sub       { font-size: 12px; fill: #4a5b6e; }
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

<svg class="nxa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" role="img" aria-label="EMQX Neuron architecture: field devices and other data sources on the left; EMQX Neuron in the middle, made up of system management plus data collection, data processing (a separate process), and data forwarding; IoT platforms, SCADA, and databases on the right, with bidirectional communication between the layers">
  <defs>
    <marker id="nxaA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1200" height="500" rx="10"/>

  <rect class="box" x="24" y="120" width="178" height="264" rx="8"/>
  <text class="t h" x="113" y="148" text-anchor="middle">Devices and sources</text>
  <line class="rule" x1="44" y1="162" x2="182" y2="162"/>
  <text class="t sub" x="113" y="188" text-anchor="middle">PLC · CNC machines</text>
  <text class="t sub" x="113" y="214" text-anchor="middle">Robots · Smart meters</text>
  <text class="t sub" x="113" y="240" text-anchor="middle">DCS · SCADA</text>
  <line class="rule" x1="44" y1="290" x2="182" y2="290"/>
  <text class="t sub" x="113" y="318" text-anchor="middle">HTTP APIs · Databases</text>
  <text class="t sub" x="113" y="344" text-anchor="middle">Files and logs · Video</text>

  <line class="flow" x1="210" y1="252" x2="242" y2="252" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <rect class="prod" x="250" y="56" width="700" height="392" rx="10"/>
  <text class="t h ptitle" x="600" y="86" text-anchor="middle">EMQX Neuron</text>

  <rect class="mgmt" x="274" y="102" width="652" height="62" rx="6"/>
  <text class="t m" x="600" y="126" text-anchor="middle">System management</text>
  <text class="t sub" x="600" y="150" text-anchor="middle">Config · Users and permissions · Auth · Logs · Monitoring · Alerts</text>

  <rect class="mod" x="274" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="376" y="212" text-anchor="middle">Data collection</text>
  <line class="rule" x1="294" y1="226" x2="458" y2="226"/>
  <text class="t sub" x="376" y="252" text-anchor="middle">Modbus · OPC UA</text>
  <text class="t sub" x="376" y="278" text-anchor="middle">EtherNet/IP · IEC 60870</text>
  <text class="t sub" x="376" y="304" text-anchor="middle">BACnet · KNX · DL/T645</text>
  <text class="t sub" x="376" y="330" text-anchor="middle">Siemens / Mitsubishi PLC</text>
  <text class="t sub" x="376" y="356" text-anchor="middle">FANUC / Mazak CNC</text>
  <text class="t tiny" x="376" y="396" text-anchor="middle">50 southbound drivers</text>

  <rect class="proc" x="498" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="600" y="212" text-anchor="middle">Data processing</text>
  <text class="t tiny blue" x="600" y="230" text-anchor="middle">separate process · NNG</text>
  <line class="rule" x1="518" y1="244" x2="682" y2="244"/>
  <text class="t sub" x="600" y="270" text-anchor="middle">Normalize · Clean</text>
  <text class="t sub" x="600" y="296" text-anchor="middle">Transform · Filter · Aggregate</text>
  <text class="t sub" x="600" y="322" text-anchor="middle">Time windows</text>
  <text class="t sub" x="600" y="348" text-anchor="middle">Custom functions (Python/C++)</text>
  <text class="t sub" x="600" y="374" text-anchor="middle">AI/ML inference</text>

  <rect class="mod" x="722" y="184" width="204" height="240" rx="6"/>
  <text class="t m" x="824" y="212" text-anchor="middle">Data forwarding</text>
  <line class="rule" x1="742" y1="226" x2="906" y2="226"/>
  <text class="t sub" x="824" y="252" text-anchor="middle">MQTT · Sparkplug B</text>
  <text class="t sub" x="824" y="278" text-anchor="middle">AWS IoT · Azure IoT</text>
  <text class="t sub" x="824" y="304" text-anchor="middle">Kafka · HTTP · WebSocket</text>
  <text class="t sub" x="824" y="330" text-anchor="middle">Databases · Files · S3</text>
  <text class="t sub" x="824" y="356" text-anchor="middle">OPC UA Server</text>

  <line class="flow" x1="478" y1="304" x2="496" y2="304" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>
  <line class="flow" x1="704" y1="304" x2="720" y2="304" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <line class="flow" x1="958" y1="252" x2="990" y2="252" marker-start="url(#nxaA)" marker-end="url(#nxaA)"/>

  <rect class="box" x="998" y="120" width="178" height="264" rx="8"/>
  <text class="t h" x="1087" y="148" text-anchor="middle">Target systems</text>
  <line class="rule" x1="1018" y1="162" x2="1156" y2="162"/>
  <text class="t sub" x="1087" y="192" text-anchor="middle">EMQX · IoT platforms</text>
  <text class="t sub" x="1087" y="222" text-anchor="middle">SCADA · HMI</text>
  <text class="t sub" x="1087" y="252" text-anchor="middle">MES · ERP</text>
  <text class="t sub" x="1087" y="282" text-anchor="middle">Databases · Historians</text>
  <text class="t sub" x="1087" y="312" text-anchor="middle">Analytics · Dashboards</text>
  <text class="t sub" x="1087" y="342" text-anchor="middle">Enterprise apps</text>
</svg>

## Core data model

Three concepts underpin every configuration in EMQX Neuron:

| Concept | What it is |
| --- | --- |
| **Node** | A running instance of one southbound driver or northbound application. The same driver can back several nodes, each talking to a different device |
| **Group** | A collection unit under a node, with its own polling interval. **The group is the unit of collection, reporting, and subscription** |
| **Tag** | One address inside a device, with read/write attributes, a data type, and precision |

A single EMQX Neuron process runs many southbound and northbound nodes side by side, isolated from one another, with the core framework routing messages between them.

For configuration steps, see [Data Collection, Processing and Forwarding](../configuration/introduction.md); for limits such as name lengths, groups per node, and the fastest polling interval, see [Configuration specification](../configuration/introduction.md#configuration-specification) on that page.

## Routing from southbound to northbound

Collected data does not go straight from a driver to an application — the core framework's message bus forwards it:

1. On startup, each node opens two UNIX domain sockets (`AF_UNIX` / `SOCK_DGRAM`): one carries control commands, the other carries data, keeping the control plane and data plane separate.
2. A northbound application subscribes by **(driver, group)**. The core framework records the subscription along with that application's socket address.
3. When a group finishes a polling cycle, the core framework looks up every application subscribed to that group and delivers the data to each one's data-plane socket.

Because subscription is per group rather than per node, different groups on the same device can go to different applications — a high-frequency group to the local SCADA, a low-frequency group to the cloud. See [Subscribe to Southbound Data](../configuration/subscription.md).

## Stream processing engine

The stream processing engine is a **separate process**, not part of the EMQX Neuron main process. The two communicate over an NNG channel:

- On the EMQX Neuron side, the **rule engine application** (a northbound application) listens on `0.0.0.0:7081` — the port is configurable in the range 1024–65535 — using the NNG `pair0` protocol.
- The engine process dials in as the client and receives the subscribed southbound data.

The consequence is that **collection and processing do not block each other**: restarting the engine, a faulty rule, or a load spike will not disturb southbound collection, and the engine can be scaled independently. The cost is one cross-process hop for the data.

The engine can also ingest non-device sources — [HTTP Pull](../streaming-processing/http_pull.md), [HTTP Push](../streaming-processing/http_push.md), [SQL databases](../streaming-processing/sql.md), [files](../streaming-processing/file.md), and [video streams](../streaming-processing/video.md) — and merge them with device data in the same engine. Results are written out through a [sink](../streaming-processing/sink/sink.md).

## Offline caching

Plant networks are unreliable, so data is not lost when a northbound connection drops. Taking the MQTT application as an example, with **offline caching** enabled:

| Setting | Description | Range |
| --- | --- | --- |
| Cache memory size | Messages are buffered in memory first after a disconnect | 1–1024 MB |
| Cache disk size | Spills to disk once memory fills; should be larger than the memory cache | 1–10240 MB |
| Sync interval | Interval for replaying cached messages after reconnecting, in milliseconds | 10–120000, default 100 |

The memory and disk tiers are configured together — set both or neither. Once the connection recovers, cached messages are replayed in batches at the sync interval.

## System management

- **Configuration**: one web console for southbound drivers, northbound applications, and processing rules; configuration is persisted in the data directory and survives upgrades.
- **Security**: username and password access control, JWT-based API authentication, and TLS/SSL for transport.
- **Observability**: runtime logs, per-node performance metrics, connection status monitoring, and alerts.
- **High availability**: deployable in [master-backup mode](../best-practise/master-backup.md).

See [Operations](../admin/introduction.md).
