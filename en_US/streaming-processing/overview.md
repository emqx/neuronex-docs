# Data Processing

EMQX Neuron includes a stream processing engine that filters, converts, aggregates, and evaluates alarms before data leaves the edge.

<style>
.nxs            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxs .t         { font-family: -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #1f2d3d; }
.nxs .h         { font-size: 16px; font-weight: 600; }
.nxs .m         { font-size: 15px; font-weight: 600; }
.nxs .sub       { font-size: 12.5px; fill: #4a5b6e; }
.nxs .lbl       { font-size: 12.5px; font-weight: 600; fill: #2a6ebb; }
.nxs .green     { fill: #00b173; }
.nxs .ptitle    { fill: #1b4f89; }
.nxs .bg        { fill: #f7fafd; }
.nxs .box       { fill: #ffffff; stroke: #ccd8e4; stroke-width: 1.5; }
.nxs .mod       { fill: #ffffff; stroke: #2a6ebb; stroke-width: 1.5; }
.nxs .src       { fill: #ffffff; stroke: #00b173; stroke-width: 2; }
.nxs .prod      { fill: #eaf2fb; stroke: #2a6ebb; stroke-width: 2; }
.nxs .flow      { stroke: #2a6ebb; stroke-width: 2; fill: none; }
.nxs .back      { stroke: #00b173; stroke-width: 2; fill: none; stroke-dasharray: 7 4; }
.nxs .ah        { fill: #2a6ebb; }
.nxs .ahg       { fill: #00b173; }

html.dark .nxs .t      { fill: #d7dee6; }
html.dark .nxs .sub    { fill: #9db0c4; }
html.dark .nxs .lbl    { fill: #7fb4ea; }
html.dark .nxs .green  { fill: #3ecf9a; }
html.dark .nxs .ptitle { fill: #8ec1f0; }
html.dark .nxs .bg     { fill: #161c24; }
html.dark .nxs .box    { fill: #1d2631; stroke: #3b4857; }
html.dark .nxs .mod    { fill: #1d2631; stroke: #5a9fe0; }
html.dark .nxs .src    { fill: #1d2631; stroke: #3ecf9a; }
html.dark .nxs .prod   { fill: #1a2938; stroke: #5a9fe0; }
html.dark .nxs .flow   { stroke: #7fb4ea; }
html.dark .nxs .back   { stroke: #3ecf9a; }
html.dark .nxs .ah     { fill: #7fb4ea; }
html.dark .nxs .ahg    { fill: #3ecf9a; }
</style>

<svg class="nxs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 470" role="img" aria-label="Data processing flow: on the left the collection module feeds in through the Neuron source, alongside other sources such as MQTT, HTTP, SQL databases, files and video streams; in the middle data processing runs source, rule and sink in sequence; on the right results are written to IoT platforms and brokers, databases and time-series stores, and object storage and files; the dashed line at the bottom shows rule results written back to devices through the Neuron sink">
  <defs>
    <marker id="nxsA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
    <marker id="nxsG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ahg" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1200" height="470" rx="10"/>

  <rect class="src" x="24" y="62" width="188" height="92" rx="8"/>
  <text class="t m" x="118" y="96" text-anchor="middle">Collection module</text>
  <text class="t sub" x="118" y="122" text-anchor="middle">Tags from southbound drivers</text>

  <rect class="box" x="24" y="212" width="188" height="118" rx="8"/>
  <text class="t m" x="118" y="246" text-anchor="middle">Other sources</text>
  <text class="t sub" x="118" y="272" text-anchor="middle">MQTT · HTTP · SQL databases</text>
  <text class="t sub" x="118" y="296" text-anchor="middle">Files · Video · Kafka · Redis</text>

  <line class="flow" x1="212" y1="108" x2="292" y2="119" marker-end="url(#nxsA)"/>
  <text class="t lbl" x="252" y="96" text-anchor="middle">Neuron source</text>
  <polyline class="flow" points="212,271 250,271 250,133 292,133" marker-end="url(#nxsA)"/>
  <text class="t lbl" x="252" y="196" text-anchor="middle">Ingest</text>

  <rect class="prod" x="300" y="30" width="336" height="330" rx="10"/>
  <text class="t h ptitle" x="468" y="58" text-anchor="middle">Data Processing</text>

  <rect class="mod" x="324" y="82" width="288" height="66" rx="6"/>
  <text class="t m" x="468" y="110" text-anchor="middle">Source</text>
  <text class="t sub" x="468" y="133" text-anchor="middle">Streams · Scan and lookup tables</text>

  <rect class="mod" x="324" y="164" width="288" height="86" rx="6"/>
  <text class="t m" x="468" y="192" text-anchor="middle">Rule</text>
  <text class="t sub" x="468" y="215" text-anchor="middle">SQL query · filter · aggregate</text>
  <text class="t sub" x="468" y="237" text-anchor="middle">Time windows · 160+ functions</text>

  <rect class="mod" x="324" y="266" width="288" height="66" rx="6"/>
  <text class="t m" x="468" y="294" text-anchor="middle">Sink</text>
  <text class="t sub" x="468" y="317" text-anchor="middle">Data templates · parallel actions</text>

  <polyline class="flow" points="636,299 674,299 674,105 706,105" marker-end="url(#nxsA)"/>
  <line class="flow" x1="674" y1="220" x2="706" y2="220" marker-end="url(#nxsA)"/>
  <line class="flow" x1="674" y1="335" x2="706" y2="335" marker-end="url(#nxsA)"/>
  <text class="t lbl" x="672" y="366" text-anchor="middle">Write out</text>

  <rect class="box" x="714" y="62" width="216" height="86" rx="8"/>
  <text class="t m" x="822" y="94" text-anchor="middle">IoT platforms and brokers</text>
  <text class="t sub" x="822" y="118" text-anchor="middle">MQTT · Kafka · REST</text>

  <rect class="box" x="714" y="177" width="216" height="86" rx="8"/>
  <text class="t m" x="822" y="209" text-anchor="middle">Databases and time series</text>
  <text class="t sub" x="822" y="233" text-anchor="middle">MySQL · InfluxDB · Redis</text>

  <rect class="box" x="714" y="292" width="216" height="86" rx="8"/>
  <text class="t m" x="822" y="324" text-anchor="middle">Object storage and files</text>
  <text class="t sub" x="822" y="348" text-anchor="middle">AWS S3 · Local files · Images</text>

  <polyline class="back" points="468,332 468,424 118,424 118,158" marker-end="url(#nxsG)"/>
  <text class="t lbl green" x="300" y="446" text-anchor="middle">Neuron sink · write back to devices</text>
</svg>

## When to use it

Southbound data can be published directly by a northbound application without passing through data processing. Process it through a rule first when:

- **The polling rate far exceeds what the business needs.** Polling every 100 ms catches transients, but a report only needs a per-minute average. Aggregating over a time window before publishing cuts volume by two orders of magnitude.
- **Values barely move in steady state.** During normal operation tag values are nearly constant. A conditional filter publishes only when a value moves beyond a threshold.
- **Alarms need sub-second response.** Keeping the decision at the edge avoids a cloud round trip and keeps working while the link is down.
- **Units or field names need normalizing before publishing.** Doing it once at the edge beats doing it in every downstream system.

Both paths can run side by side. For selection guidance, see [Northbound Applications · Feed Analytics and Edge Computing](../configuration/north-apps/analytics.md).

## Reading order

1. [Your First Rule](./first-rule.md): bring collected data in, transform it with one SQL statement, and publish to MQTT
2. [Source](./source.md): define where data comes from, used as a stream or a table in rules
3. [Rules](./rules.md): write SQL, add actions, and debug
4. [Sink](./sink/sink.md): where rule results go

## Connecting to the collection module

Data processing and the collection module are linked in both directions. These two connectors are the ones used most:

| Direction | What to use | Notes |
| --- | --- | --- |
| Collection → rules | [Neuron source](./neuron.md) | The northbound **Rules Engine Application** feeds subscribed collection groups into the `neuronStream` stream. The application exists by default — just add a subscription. See [Rules Engine Application](../configuration/north-apps/ekuiper/overview.md) |
| Rules → devices | [Neuron sink](./sink/neuron.md) | Rule results are written back to devices through southbound drivers, closing a collect → decide → control loop at the edge |

## Sources

A source defines how to connect to an external system. Creating one only registers a logical definition; data flows only once a rule that references it starts. The same definition can be used in the `FROM` clause of many rules.

In a rule, a source is used either as a [stream](./stream.md) or a [table](./tables.md): a stream triggers computation whenever data arrives; a table represents the current state of a stream for batch processing, and comes in [scan](./scan.md) and [lookup](./lookup.md) forms.

Decoding is set with the `format` property, which supports `json`, `binary`, `protobuf`, and `delimited`, or `custom` for your own format.

| <div style="width:80pt">Type</div> | Purpose |
| --- | --- |
| [Neuron](./neuron.md) | Tag data collected by the collection module |
| [MQTT](./mqtt.md) | Subscribe to an MQTT topic |
| [HTTP Pull](./http_pull.md) | Poll an HTTP service on a timer |
| [HTTP Push](./http_push.md) | A built-in HTTP server that receives client pushes |
| [Memory](./memory.md) | Receive the output of a previous rule, forming a pipeline |
| [SQL](./sql.md) | Query MySQL, PostgreSQL, SQL Server, Oracle, or SQLite |
| [File](./file.md) | Read file contents |
| [Video](./video.md) | Pull a video stream |
| [Simulator](./simulator.md) | Built-in simulated data for debugging rules |
| [Redis](./redis.md) | Read from Redis |
| [CAN](./can.md) | Read from a CAN bus |
| [Kafka](./kafka.md) | Consume a Kafka topic |
| [WebSocket](./websocket.md) | Receive over WebSocket |

## Sinks

A rule can have several actions, including more than one of the same type. Results can be reshaped by a [data template](./sink/data_template.md) before output; without one, the rule result is written as is.

| <div style="width:90pt">Type</div> | Purpose |
| --- | --- |
| [MQTT](./sink/mqtt.md) | Publish to an external MQTT service |
| [Neuron](./sink/neuron.md) | Write back to devices |
| [REST](./sink/rest.md) | Call an external HTTP API |
| [Memory](./sink/memory.md) | Pass to the next rule, forming a pipeline |
| [Log](./sink/log.md) | Write to the log, normally for debugging only |
| [SQL](./sink/sql.md) | Write to a relational database |
| [InfluxDB V1](./sink/influx.md) / [V2](./sink/influx2.md) | Write to a time-series database |
| [File](./sink/file.md) | Write to a file |
| [Kafka](./sink/kafka.md) | Write to a Kafka topic |
| [Redis](./sink/redis.md) | Write to Redis |
| [AWS S3](./sink/aws-s3.md) | Upload to object storage |
| [Image](./sink/image.md) | Save as an image file |
| [Nop](./sink/nop.md) | Discard output, for performance testing |

## SQL capabilities

| Capability | Description | Learn more |
| --- | --- | --- |
| Query and transform | Extract, convert, filter, sort, group, aggregate, plus LEFT / RIGHT / FULL / CROSS joins | [Query language](./sqls/query_language_elements.md) |
| Functions | 160+ covering math, strings, aggregation, hashing, date and time, JSON, arrays, objects, and analytics | [Functions](./sqls/functions/overview.md) |
| Windows | Tumbling, hopping, sliding, and session time windows, plus count windows | [Windows](./sqls/windows.md) |
| Custom extensions | What SQL cannot express can be written in Python, C/C++, or JavaScript, or registered as an external REST service | [Extensions](./extension.md) |

## How rules run

- A rule runs continuously once started, until stopped manually; it also stops on an error or when the instance exits.
- Rules are isolated from each other, so an error in one does not affect the others. They share the same hardware, and each rule can set an operator buffer to cap its processing rate.
- Rules can be chained into a pipeline through [memory](./memory.md) or MQTT source/sink pairs. See [Rule Pipeline](./rule_pipeline.md).
- Enable [rule testing](./rule_test.md) while creating a rule to see live whether the SQL, functions, and data template produce what you expect.

## Configuration

The [configuration](./config.md) page manages [connectors](./config.md#connector) (connection reuse), [schemas](./config.md#schema) for decoding formats such as Protobuf, and file management.
