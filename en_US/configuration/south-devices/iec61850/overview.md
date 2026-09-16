# IEC61850

IEC61850 is an international communication standard protocol that achieves station-wide communication uniformity through a series of standardization of devices. IEC61850 is widely used in the power industry.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

The MMS message specification is applied between the IEC61850 standard station control layer and the interval layer. MMS achieves interoperability between different manufacturing devices in a network environment through an object-oriented modeling approach to the actual devices.

The IEC61850 driver is used for read/write to the IEC61850 server and currently supports access to the MMS protocol.

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **IEC61850** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

|   Parameters   | Description                      |
| -------- | -------------------------- |
| **Device IP Address** |  Target device IP             |
| **Device Port** | Target device port, Default 102 |
| **GI Interval** | The interval at which the device sends a general interrogation. Set to 0 to disable general interrogation. Unit: seconds |
## Tag Configuration

The data types and address formats supported by this driver are listed below.

The IEC61850 driver only supports the automatic addition of groups and tags by importing an SCL file. The Report block in the SCL file generates readable data groups, and the points are generated based on the referenced DataSet. Points are generated for data with FC as CO, SP, and SG. Writable points are generated in a separate Control group.

IEC61850 driver defines a special data reporting structure according to industry standards, with timestamp and quality fields in addition to the point value.

```json
{
 "timestamp": 1647497389075,
 "node": "iec61850",
 "group": "grp1",
 "tags": [{
   "name": "tag1",
   "value": 123,
   "q": 3,
   "t": 129401039041
  },
  {
   "name": "tag2",
   "value": 123,
   "q": 3,
   "t": 129401039088
  }
 ]
}
```

::: tip 

Since the IEC61850 driver uses a special data reporting structure, when selecting the data format for the northbound application, you need to select the **Tags-format** format.

:::

## Use Case

You can access the LibIEC61850 server through the EMQX Neuron IEC61850 driver. For specific steps, refer to [libiec61850](../iec61850/libiec61850.md).
