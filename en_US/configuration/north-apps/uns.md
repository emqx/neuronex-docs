# Connect an IIoT Platform (Unified Namespace)

Use this class of northbound application when the plant runs an IIoT platform such as Ignition or Cogent DataHub, or when a **unified namespace (UNS)** is being built to the Sparkplug B specification.

## How it differs from plain MQTT

MQTT defines which topic a message goes to, not how the message is structured. Three problems follow: the field names and data types of the payload have to be agreed between both sides in advance, so a format change on the gateway requires a parser change on the platform; the platform cannot know which tags a newly connected device has and must be modelled by hand; and the platform cannot distinguish a current value from a stale one — an absence of data may mean the device stopped, the gateway dropped off, or that the tag simply does not report.

Sparkplug B is an industrial IoT data transfer specification built on MQTT 3.1.1 that addresses these with four mechanisms:

| Mechanism | Purpose |
| --- | --- |
| **BIRTH message** | On connect, a device declares its tag list, data types, and initial values. The platform models it automatically, and adding a device requires no platform-side configuration change |
| **DEATH message** | Published by the broker through the MQTT will mechanism when the gateway disconnects unexpectedly, so the platform knows at once that the device's data is no longer trustworthy |
| **Sequence and bdSeq numbers** | Every message carries an incrementing sequence number, letting the platform detect a gap and request a re-BIRTH to keep its model consistent with the field |
| **Aliases** | A short integer replaces the full tag name in transit, materially reducing payload size when tag counts are high |

Together these give an MQTT network state awareness and a self-describing structure — the basis of a unified namespace, in which the plant maintains a single source of data that every upper-level system reads from and writes to, rather than integrating point to point.

## Namespace structure

EMQX Neuron joins as a Sparkplug B **edge node** and maps each southbound driver to one device beneath it:

```
spBv1.0 / {group id} / DDATA / {node id} / {southbound driver}
              ↑                    ↑               ↑
        plant or workshop     this gateway     one device
```

| Field | Source |
| --- | --- |
| **Group ID** | An application parameter; the top-level grouping of the namespace, usually a plant or workshop |
| **Node ID** | An application parameter; the unique identifier of this EMQX Neuron instance |
| **{southbound driver}** | The name of the subscribed southbound driver node — one driver is one device |

**Group Path** is enabled by default, which prefixes the metric name with the collection group name so that the tree the platform sees matches how the line is organized.

Changing the Group ID or Node ID triggers a re-BIRTH, so settle the naming convention for both before rolling out at scale.

For the full topic list, see [Sparkplug B · Topic Structure](./sparkplugb/overview.md#topic-structure).

## Writing back to devices

Upper-level platforms write tags on a southbound driver through `DCMD` commands; `NCMD` carries edge-node-level commands. The target tag must have the **write** attribute configured in the southbound driver — see [Groups and Tags · Tag attributes](../groups-tags/groups-tags.md#tag-attributes).

## Selecting an application

| Application | When it applies |
| --- | --- |
| [Sparkplug B](./sparkplugb/overview.md) | The first choice whenever the platform supports the Sparkplug B specification. Connection parameters — broker address, port, credentials, SSL, offline caching — match the [MQTT application](./mqtt/overview.md); only **Group ID** and **Node ID** come from the Sparkplug B specification itself |

## Connection examples

- [Integration with EMQX](./sparkplugb/sparkplug.md): publish to EMQX and decode the payload with its codec functions
- [Ignition](./sparkplugb/ignition.md)
- [Cogent DataHub](./sparkplugb/cogent.md)
