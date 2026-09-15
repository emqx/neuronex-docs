# Connect an IIoT Platform (Unified Namespace)

Use this class of northbound application when the plant runs an IIoT platform such as Ignition or Cogent DataHub, or when you are building a **unified namespace (UNS)** to the Sparkplug B specification.

## Why plain MQTT is not enough

MQTT defines which topic a message goes to, not what the message looks like. That leads to three practical problems:

- **The payload has to be agreed in advance.** Upload format, field naming, and data types are aligned by documentation alone; change the format on the gateway and the platform-side parser has to change with it.
- **Adding a device means changing platform configuration.** The platform does not know which tags a new device has, so someone has to model it and create tags by hand. On an expanding line, that is the bulk of the work.
- **The platform cannot tell whether a device is still online.** No data could mean the device stopped, the gateway dropped off, or the tag simply does not report. Whether a value is current or ten minutes stale is indistinguishable.

## How Sparkplug B solves it

Sparkplug B is an industrial IoT data transfer specification built on MQTT 3.1.1 that standardizes all three:

| Mechanism | What it solves |
| --- | --- |
| **BIRTH message** | On connect, a device declares which tags it has, their data types, and initial values. The platform models it automatically, so **adding a device needs no platform-side configuration** |
| **DEATH message** | Sent by the broker through the MQTT will mechanism when the gateway drops unexpectedly. The platform knows at once that the device's data is no longer trustworthy, instead of continuing to show stale values |
| **Sequence and bdSeq numbers** | Every message carries an incrementing sequence number, so the platform can detect a gap and request a re-BIRTH to keep its model consistent with the field |
| **Aliases** | Transmit a short integer instead of the full tag name — a meaningful payload reduction when there are many tags |

Together these turn an MQTT network from a pile of topics into a **state-aware, self-describing** data source — the foundation of a unified namespace, where the plant has a single source of truth that every system reads from and writes to, instead of integrating point to point.

## How EMQX Neuron maps to it

EMQX Neuron joins as a Sparkplug B **edge node** and maps each southbound driver to one device beneath it:

```
spBv1.0 / {group id} / DDATA / {node id} / {southbound driver}
              ↑                    ↑              ↑
        plant or workshop      this gateway    one device
```

- **Group ID**: the top-level grouping of the namespace, usually a plant or workshop
- **Node ID**: the unique identifier of this EMQX Neuron instance
- **Southbound driver**: one southbound driver node is one device

With **Group Path** enabled (the default), the collection group name prefixes the metric name, so the tag hierarchy matches how the line is actually organized and the platform sees the real structure.

When planning the namespace, settle the Group ID and Node ID naming convention before rolling out at scale — both live in the application configuration, and changing them triggers a re-BIRTH.

## Write-back and ecosystem

Upstream platforms write tags on a southbound driver through `DCMD` commands; `NCMD` carries edge-node-level commands. The tag must carry the **write** attribute.

| Application | When |
| --- | --- |
| [Sparkplug B](./sparkplugb/overview.md) | Preferred whenever the platform understands the Sparkplug B specification. The docs include verified walkthroughs for [EMQX](./sparkplugb/sparkplug.md), [Ignition](./sparkplugb/ignition.md), and [Cogent DataHub](./sparkplugb/cogent.md) |

::: tip
Sparkplug B connection parameters — broker address, port, credentials, SSL, offline caching — are identical to the [MQTT application](./mqtt/overview.md). Only **Group ID** and **Node ID** come from the Sparkplug B specification itself.
:::
