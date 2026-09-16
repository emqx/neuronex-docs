# Sparkplug B

Sparkplug B is an industrial IoT data transfer specification built on MQTT 3.1.1. Sparkplug B provides a unified way for device manufacturers and software providers to share data by making MQTT networks state-aware and interoperable while ensuring flexibility and efficiency.

Data collected by EMQX Neuron from devices can be transferred from the edge to the Sparkplug B application via the Sparkplug B protocol, and users can send data modification commands to EMQX Neuron from the application. 

## Add Application

Navigate to **Data Collection -> North Apps** and click **Add Application** to add a Sparkplug B client node.

## Configure Application

Sparkplug B is an application-based protocol running on top of MQTT, so the setup in EMQX Neuron is similar to the MQTT application.

|  Parameter         |  Description                                                        |
| ------------- | ------------------------------------------------------------ |
| **Client ID** |  MQTT client ID, a unique identifier for the connection                          |
| **Group ID**  | The top-level logical grouping in the Sparkplug B protocol, which can represent entities such as factories or workshops     |
| **Node ID**   | Unique Identification of Edge Nodes in Sparkplug B Protocol                           |
| **Enable Alias**   | Enable Metric alias, set to true to enable, default is off               |
| **Group Path**   | Use the group name of the southbound device as the starting path of the Metric name. default true |
| **Offline Data Caching** | Offline caching switch. Cache MQTT messages when offline, and sync cached messages when back online. |
| **Cache Memory Size (MB)**      |  Max in-memory cache size in megabytes when MQTT connection exception occurs. Should be smaller than cache disk size.  |
| **Cache Disk Size (MB)**  | Max in-disk cache size in megabytes when MQTT connection exception occurs. Should be larger than cache memory size. If nonzero, cache memory size should also be nonzero. |
| **Cache Sync Interval (MS)**      | Cache message retransmission interval, unit: milliseconds |
| **Broker Host**      | MQTT Broker Host                                            |
| **Broker Port**      | MQTT Broker Port                                           |
| **Username**  |  Username to use when connecting to Broker                                 |
| **Password**  |  Password to use when connecting to Broker                                   |
| **SSL**       | Whether to enable mqtt ssl, default false                                 |
| **CA**        |  Ca file, enabled only if the ssl value is true                             |
| **Client Cert**      | Cert file, enabled only if the ssl value is true                           |
| **Client Key**       | Key file, enabled only if the ssl value is true                           |
| **Keypass**   |  Key file password, only enabled if ssl value is true                     |

:::tip
Only the `Group ID` and `Node ID` are from the Sparkplug B specification, the rest are connection parameters of the MQTT Broker, see [MQTT Overview](../mqtt/overview.md).
:::

## Add Subscription

Data is reported per **group**. Click the Sparkplug B application card to open the **Group List** page, then click **Add Subscription** and pick the groups to report. Once subscribed, the application starts receiving and publishing southbound data. For the generic steps, see [Subscribe to Southbound Data](../../subscription.md).

On the same page you can give each group a set of **static tags** — JSON key/value pairs published alongside the collected data to describe fixed device attributes:

```json
{"location": "sh", "sn_number": "12345613"}
```

See [Upstream/Downstream Data Format · Static Tags](../mqtt/api.md#static-tags) for details.

## Topic Structure

EMQX Neuron builds topics per the Sparkplug B specification, with the fixed namespace `spBv1.0`:

| <div style="width:190pt">Topic</div> | Description |
| --- | --- |
| `spBv1.0/{group id}/NBIRTH/{node id}` | Edge node came online |
| `spBv1.0/{group id}/DBIRTH/{node id}/{driver}` | Device came online, carrying that driver's tag definitions |
| `spBv1.0/{group id}/DDATA/{node id}/{driver}` | Collected data |
| `spBv1.0/{group id}/DDEATH/{node id}/{driver}` | Device went offline |
| `spBv1.0/{group id}/NDEATH/{node id}` | Edge node went offline, sent as the MQTT will message |

**Group ID** and **Node ID** come from the application configuration; `{driver}` is the name of the subscribed southbound driver node. For the specification itself, see [Integration with EMQX](./sparkplug.md).

## Write Back to Devices

Once connected, the Sparkplug B application subscribes to the command topics automatically. An upstream application publishes a CMD message to one of them to write a tag:

| <div style="width:190pt">Topic</div> | Description |
| --- | --- |
| `spBv1.0/{group id}/DCMD/{node id}/{driver}` | Write to tags of the named southbound driver |
| `spBv1.0/{group id}/NCMD/{node id}` | Edge node level command |

The tag must carry the **write** attribute in the southbound driver; see [Groups and Tags · Tag attributes](../../groups-tags/groups-tags.md#tag-attributes).

For the steps in an upstream platform, see [Ignition](./ignition.md) and [Cogent](./cogent.md).

## Use Case

- You can use the EMQX Neuron Sparkplug B application to report data to EMQX, and decode the complete and accurate data results through the EMQX's encoding and decoding functions. For specific steps, see [Integration with EMQX](sparkplug.md).
- You can connect to the Ignition platform through the EMQX Neuron SparkPlugB application. For specific steps, refer to [Ignition](ignition.md).
- You can also connect to Cogent DataHub through the EMQX Neuron SparkPlugB application. For specific steps, refer to [Cogent](cogent.md).

## Operation and Maintenance

On the device card or device row, you can click on the **Data Statistics** icon to review the application's operation status and track the data received and sent. For explanations on statistical fields, refer to the [Create a Northbound Application](../north-apps.md) section.

If there are any issues with device operation, you can click on the DEBUG log chart. The system will automatically print DEBUG level logs for that node and switch back to the system default log level after ten minutes. Later, you can click on **Administration** -> **Logs** to view logs and perform troubleshooting. For a detailed interpretation of system logs, see [Managing Logs](../../../admin/log-management.md).
