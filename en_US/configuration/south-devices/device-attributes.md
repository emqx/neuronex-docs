# Device Properties

Device properties add static information to southbound devices, such as device identifiers, installation locations, production lines, and device models. This information does not need to be read from device registers. You can maintain it centrally on the southbound device and publish it with device status or collected data through **MQTT V2**, helping downstream systems identify the data source.

For example, a device's temperature and current are collected periodically as tags, while its identifier and production line are configured as device properties. Downstream systems can then use the device identifier to associate messages with an asset, or organize collected data by production line.

::: tip
The publishing configuration on this page applies to **MQTT V2** applications. Device status messages automatically include device properties. Collected data messages do not include them by default; you must explicitly reference them in a template.
:::

## Device Properties vs. Tags

| Configuration | Where to Configure | Purpose |
| --- | --- | --- |
| **Device properties** | The **Properties** tab of a southbound device | Maintain device-level static information. All MQTT V2 applications subscribed to the device can use these properties, without configuring them separately in each application |
| **Tags** | A collection group of a southbound device | Read or write device data through a protocol, such as temperature, current, and switch states. See [Groups and Tags](../groups-tags/groups-tags.md) |

Device properties belong to the device, not to a particular collection group. Multiple groups on the same device can reference the same set of properties when publishing data.

## Configure Device Properties

### Prerequisites

- You have [created a southbound device](./south-devices.md) and configured at least one [collection group and tag](../groups-tags/groups-tags.md).
- To verify MQTT publishing, you have an MQTT broker accessible from the EMQX Neuron runtime environment, and an MQTT client such as MQTTX.
- **MQTT V2** is available in the list of northbound applications in your version.

### Add Properties

1. On **Data Collection → South Devices**, open the target device and select the **Properties** tab.
2. Add properties, enter their names and values, and save.
3. Confirm that the names, values, and data types in the property list are as expected.

The following example configures three properties for the southbound device `modbus-1`:

| Property Name | Value | Data Type | Purpose |
| --- | --- | --- | --- |
| `asset_id` | `M-001` | String | The device's asset identifier |
| `location` | `Building A` | String | The device's installation location |
| `line` | `3` | Integer | The device's production line |

The corresponding data is:

```json
{
  "asset_id": "M-001",
  "location": "Building A",
  "line": 3
}
```

This JSON representation illustrates how property names, values, and types correspond to one another.

### Supported Data Types

Property values support strings, booleans, integers, floating-point numbers, and **one-dimensional arrays whose elements are all of the same type**.

| Data Type | Examples |
| --- | --- |
| String | `"M-001"` |
| Boolean | `true` |
| Integer | `3` |
| Floating-point number | `1.5` |
| One-dimensional array | `["zone-a", "zone-b"]`, `[1, 2, 3]` |

Do not use objects, nested arrays, or arrays containing mixed element types. For example, `{"floor": 1}`, `[[1, 2], [3, 4]]`, and `[1, "zone-a"]` are not supported property values.

The number `3` and the string `"3"` have different meanings. Choose data types according to the downstream system's requirements to avoid type mismatches during filtering or calculations.

## Publish Properties Through MQTT V2

### Configure the Application and Subscription

1. On **Data Collection → North Apps**, add an application and select **MQTT V2**. In this example, name the application `mqtt-properties`.
2. Configure the MQTT broker address, port, and any required authentication information. Set a client ID that is not used by another connection.
3. Keep the default **Topic Prefix** `neuron/${app}`. In this example, the resolved prefix is `neuron/mqtt-properties`.
4. Open the application's **Group List** and add a subscription to collection group `group-1` on southbound device `modbus-1`. Keep the default data topic `${prefix}/${device}/data`.
5. Confirm that the MQTT V2 application is running and connected to the broker.

This example uses the following two topics:

| Message | Topic | Automatically Includes Device Properties? |
| --- | --- | --- |
| Device status | `neuron/mqtt-properties/modbus-1/state` | Yes, as top-level fields |
| Collected data | `neuron/mqtt-properties/modbus-1/data` | No, a template must be configured |

The application publishes a device's status only after it subscribes to at least one group on that device. Device status messages have a fixed structure and are not affected by the data template or tag template.

### View Properties in Device Status Messages

Connect MQTTX to the same broker and subscribe to:

```text
neuron/mqtt-properties/modbus-1/state
```

Device status messages automatically include the configured properties. For example:

```json
{
  "timestamp": 1731744000123,
  "name": "modbus-1",
  "state": 1,
  "running": 3,
  "asset_id": "M-001",
  "location": "Building A",
  "line": 3
}
```

- `timestamp`, `name`, `state`, and `running` are fixed fields. `state: 1` indicates that the device is connected, and `running: 3` indicates that it is running.
- `asset_id`, `location`, and `line` are device properties. They appear directly at the top level of the message, not inside a `properties` object.
- Device status messages use **QoS 1** with **Retain** enabled. New subscribers can receive the most recent status retained by the broker. Receiving this message does not mean the device's status has just changed.
- When a property is added, modified, or deleted, the application immediately republishes the device status. No status messages are published while disconnected from the broker; the latest status is published after reconnection.

::: warning Property Names
`timestamp`, `name`, `state`, and `running` are fixed fields in device status messages. Device properties with these names are omitted from status messages. Use business-specific names such as `asset_id` or `location` to avoid conflicts.
:::

### Include All Properties in Collected Data Messages

The default MQTT V2 data template does not include device properties. To publish them with collected data, add `${properties}` to the application's **Data Template**:

```json
{
  "timestamp": "${timestamp}",
  "device": "${device}",
  "group": "${group}",
  "properties": "${properties}",
  "tags": "${tags}"
}
```

Keep the default **Tag Template**. After saving the configuration, subscribe in MQTTX to:

```text
neuron/mqtt-properties/modbus-1/data
```

Assuming that the collected value of `tag0` in `group-1` is `123`, the published message looks like this:

```json
{
  "timestamp": 1731744000123,
  "device": "modbus-1",
  "group": "group-1",
  "properties": {
    "asset_id": "M-001",
    "location": "Building A",
    "line": 3
  },
  "tags": [
    {
      "name": "tag0",
      "value": 123
    }
  ]
}
```

Here, `properties` is a field name specified in the data template. You can rename it to meet the downstream system's requirements. `${properties}` is the template variable that references the device properties.

### Publish Only Selected Properties

If the downstream system needs only some properties, or requires properties at the top level of the message, use `${properties[property_name]}`. For example:

```json
{
  "timestamp": "${timestamp}",
  "device": "${device}",
  "asset_id": "${properties[asset_id]}",
  "site": "${properties[location]}",
  "line": "${properties[line]}",
  "tags": "${tags}"
}
```

The published message looks like this:

```json
{
  "timestamp": 1731744000123,
  "device": "modbus-1",
  "asset_id": "M-001",
  "site": "Building A",
  "line": 3,
  "tags": [
    {
      "name": "tag0",
      "value": 123
    }
  ]
}
```

Template variables must be written inside JSON strings. When a string contains only one variable, the replacement preserves the variable's original JSON type. For example, `"${properties[line]}"` produces the integer `3`, not the string `"3"`. When a variable is mixed with literal text, the result is a concatenated string instead.

You can also use `${properties}` and `${properties[property_name]}` in the tag template, for example, to add the device identifier to each tag object.

## Verify the Configuration

After completing the configuration, check the following in order:

1. **Check status messages**: Subscribe to the device's `/state` topic. Confirm that all three properties appear and that `line` is numeric.
2. **Check data messages**: Subscribe to the device's `/data` topic. Confirm that, after configuring the template, properties and collected tags appear in the same message.
3. **Check property updates**: Change the device property `location` from `Building A` to `Building B` and save. Confirm that a new status message is published and that subsequent data messages contain the updated value.
4. **Check sharing across groups and applications**: If the device has multiple collection groups or is subscribed to by multiple MQTT V2 applications, check each application's status messages. To include properties in data messages, configure the property references in each application's template.

All JSON messages on this page are format examples. Actual timestamps, device states, and tag values depend on the runtime environment.
