# Send Data to the Cloud

A group or headquarters consolidating data from several plants for analysis, dashboards, and remote maintenance — this is the most common use of a northbound application.

Field devices speak Modbus, Siemens S7, Mitsubishi, CNC protocols; cloud platforms only speak MQTT and JSON. EMQX Neuron does the protocol conversion and normalization at the edge and publishes per collection group on a timer, so the cloud receives uniformly structured JSON instead of a separate adapter per device type.

## Three things to decide first

### Which upload format

The same data can be organized in different JSON shapes, controlled by the **Upload Format** parameter. How you write the cloud-side parser depends on which you pick:

| Format | What it looks like |
| --- | --- |
| `values-format` | Splits data into `values` and `errors` sub-objects, keeping healthy tags separate from ones that failed to collect |
| `tags-format` | Puts every tag in one array, each element carrying a tag name and value |
| `ECP-format` | `tags-format` plus a data type field |
| `Custom` | A template you define, with fields and nesting of your choosing |

For field-level details and sample payloads, see [Upstream/Downstream Data Format](./mqtt/api.md#data-upload).

You can also give each collection group a set of **static tags** — fixed JSON key/value pairs such as line number, device serial, or location — published alongside the collected data, so the cloud does not have to look up a device registry elsewhere.

### Which topic

The default upload topic is `/neuron/{application name}/upload`, and each subscription can override it. Across multiple plants or lines, put the hierarchy in the topic — for example `factory-a/line-1/modbus-tcp` — so the cloud can route with wildcard subscriptions.

### Raw data or processed first

With many tags at a high polling rate, sending raw data straight to the cloud consumes significant bandwidth and cloud storage. You can route southbound data into the [data processing](../../streaming-processing/overview.md) engine first and use SQL to filter, downsample, or aggregate before it leaves — for example publishing only when a value changes beyond a threshold, or one average per minute. Both paths can run side by side.

## Three things plants care about

**No data loss when the link drops**　During an outage, messages go to memory first and spill to disk when memory fills (up to 1 GB memory plus 10 GB disk), then replay in FIFO order once the connection returns. Unstable networks are normal on a plant floor, and this is what determines whether the data set is complete. For configuration and measured disk usage, see [Offline Data Caching](./mqtt/overview.md#offline-data-caching).

**Write-back from the cloud**　The link is bidirectional. The platform publishes a write command to a designated topic; EMQX Neuron writes it to the device through the southbound driver and returns the result. The tag must carry the **write** attribute — see [Groups and Tags · Tag attributes](../groups-tags/groups-tags.md#tag-attributes).

**Encryption in transit**　TLS with mutual certificate authentication. The AWS IoT and Azure IoT applications come preconfigured for each platform's certificate scheme, so there is no TLS configuration to assemble by hand.

## Which application

| Application | When |
| --- | --- |
| [MQTT](./mqtt/overview.md) | Any MQTT broker — EMQX, EMQX Cloud, or self-hosted. Upload topics and JSON format are configurable. Every other MQTT-based application inherits its parameters, so read this page first |
| [AWS IoT](./aws-iot/overview.md) | For AWS IoT Core. Connection and topic rules come preconfigured — supply the device data endpoint plus the certificate and private key from the console |
| [Azure IoT](./azure-iot/overview.md) | For Azure IoT Hub, with Shared Access Signature or X.509 certificate authentication |

::: tip
Avoid running several MQTT application nodes in one EMQX Neuron instance — it causes resource contention and lower throughput. To reach multiple destinations, add several subscriptions to one node, or use different northbound application types.
:::

## Next steps

- Get one path working: [Create a Northbound Application](./north-apps.md) → [Subscribe to Southbound Data](../subscription.md)
- If the platform should model devices automatically, see [Connect an IIoT Platform](./uns.md)
