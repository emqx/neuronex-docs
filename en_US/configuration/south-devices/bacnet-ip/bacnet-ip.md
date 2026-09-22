# BACnet/IP

BACnet (Building Automation and Control Networks) is a communication protocol used in smart buildings. It is defined by the International Organization for Standardization (ISO), the American National Standards Institute (ANSI) and the American Society of Heating, Venting, and Air-conditioning Engineers (ASHRAE). BACnet is designed specifically for smart buildings and control systems, and can be used for heating, ventilation, and air conditioning (HVAC), lighting control, access control, fire detection systems, and related equipment. Its advantages include reducing the cost of maintenance systems and making installation simpler than general industrial communication protocols. In addition, BACnet also provides five standard protocols commonly used in the industry, which can prevent equipment and system suppliers from monopolizing the market and increase the scalability and compatibility of future systems. BACnet supports multiple communication methods, including serial ports, IP, Ethernet, and ZigBee.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

The BACnet/IP driver talks to a single device at a known address by unicast, reading with ReadPropertyMultiple and writing with WriteProperty. It does no discovery of its own: Who-Is/I-Am broadcasts and cross-subnet discovery through a BBMD (BACnet Broadcast Management Device) belong to the [Device Scanning](#device-scanning) driver. Using the two together is the recommended approach - let the scan driver find the devices and tags on the network, then have it generate a fully configured BACnet/IP node for you.

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **BACnet/IP** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Parameter                 | Description                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Target Device IP Address** | IP of the BACnet device. When the device sits behind a BACnet router, put the **router's** IP here                                            |
| **Target Device Port**    | Port of the BACnet device, default 47808                                                                                                        |
| **Target Device Network** | Network number (DNET) of the BACnet network the device is on, 0 - 65534. Only used when a device MAC is given; leave at 0 for a direct device    |
| **Target Device MAC**     | MAC (DADR) of the device behind the router, as hex without separators. Leave **empty** for a device on this network                              |

### Reaching a Device on Another BACnet Network

Crossing IP subnets and crossing BACnet networks are two different things, and they are configured differently:

* **Across IP subnets** but still within the same BACnet/IP network - this only affects broadcasts; unicast reads and writes are unaffected. Give this driver the device's own IP; no BBMD is involved.
* **Across BACnet networks**, where the device hangs off an MS/TP network or another B/IP network behind a BACnet router - the device has no directly reachable IP and every message has to be forwarded by the router. This is when the target device network and MAC are needed.

The MAC length depends on the network the device is on: an MS/TP station number is one octet such as `05`, while a B/IP address is six octets of IP plus port, e.g. `C0A80164BAC0` for 192.168.1.100:47808.

| Scenario                                        | Target Device IP Address | Target Device Network | Target Device MAC |
| ----------------------------------------------- | ------------------------ | --------------------- | ----------------- |
| Device on this network, directly reachable      | Device IP                | 0                     | empty             |
| Device on MS/TP network 2001 behind a router    | Router IP                | 2001                  | `05`              |
| Device on another B/IP network behind a router  | Router IP                | That network's number | `C0A80164BAC0`    |

::: tip
When in doubt, run a scan first with [Device Scanning](#device-scanning). Every device it reports carries `address`, `port`, `dnet` and `dadr`, which map one to one onto the four settings above - or call its apply endpoint and skip filling them in by hand.
:::

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* FLOAT
* DOUBLE
* BIT
* BOOL
* INT8
* INT32
* UINT8
* UINT16
* UINT32
* STRING

### Address Format

> AREA ADDRESS(.PROPERTY_ID)

AREA is the area abbreviation, ADDRESS the object instance number, and PROPERTY_ID an optional property name. With no property given, the current value (Present_Value) is read or written, except in the DEV area.

support Area

| AREA | OBJECT TYPE            | ADDRESS RANGE | ATTRIBUTE  | DATA TYPE              | REMARK                 |
| ---- | ---------------------- | ------------- | ---------- | ---------------------- | ---------------------- |
| AI   | analog-input           | 0 - 0x3fffff  | read       | FLOAT                  | analog input           |
| AO   | analog-output          | 0 - 0x3fffff  | read/write | FLOAT                  | analog output          |
| AV   | analog-value           | 0 - 0x3fffff  | read/write | FLOAT                  | analog value           |
| BI   | binary-input           | 0 - 0x3fffff  | read       | BIT                    | binary input           |
| BO   | binary-output          | 0 - 0x3fffff  | read/write | BIT                    | binary output          |
| BV   | binary-value           | 0 - 0x3fffff  | read/write | BIT                    | binary value           |
| MSI  | multi-state-input      | 0 - 0x3fffff  | read       | UINT8                  | multi state input      |
| MSO  | multi-state-output     | 0 - 0x3fffff  | read/write | UINT8                  | multi state output     |
| MSV  | multi-state-value      | 0 - 0x3fffff  | read/write | UINT8                  | multi state value      |
| ACC  | accumulator            | 0 - 0x3fffff  | read/write | UINT32 (UINT8 accepted)| accumulator            |
| LAV  | large-analog-value     | 0 - 0x3fffff  | read/write | DOUBLE                 | large analog value     |
| IV   | integer-value          | 0 - 0x3fffff  | read/write | INT32                  | integer value          |
| PIV  | positive-integer-value | 0 - 0x3fffff  | read/write | UINT32                 | positive integer value |
| CSV  | characterstring-value  | 0 - 0x3fffff  | read/write | STRING                 | character string value |
| LO   | lighting-output        | 0 - 0x3fffff  | read/write | FLOAT                  | lighting output        |
| BLO  | binary-lighting-output | 0 - 0x3fffff  | read/write | BIT                    | binary lighting output |
| DV   | date-value             | 0 - 0x3fffff  | read/write | STRING                 | date value             |
| TV   | time-value             | 0 - 0x3fffff  | read/write | STRING                 | time value             |
| DEV  | device                 | 0 - 0x3fffff  | read       | see property table     | device                 |

::: tip
The data type follows from the object type and cannot be chosen freely. An AI tag must be FLOAT and an MSV tag must be UINT8; the wrong type is rejected with a type-not-supported error. The ACC area is UINT32 per the standard, with UINT8 kept only so tags configured earlier still validate.

Input objects (AI, BI, MSI) reflect a measured quantity and are not writable - adding one with the write attribute is refused.
:::

support standard property

| property                        | address                         | type   |
| ------------------------------- | ------------------------------- | ------ |
| object name                     | Object_Name                     | string |
| object type                     | Object_Type                     | uint8  |
| description                     | Description                     | string |
| device type                     | Device_Type                     | string |
| status flags                    | Status_Flags                    | string |
| event state                     | Event_State                     | uint8  |
| out of service                  | Out_Of_Service                  | bool   |
| update interval                 | Update_Interval                 | uint8  |
| minimum                         | Min_Pres_Value                  | float  |
| maximum                         | Max_Pres_Value                  | float  |
| resolution                      | Resolution                      | float  |
| COV increment                   | COV_Increment                   | float  |
| time delay                      | Time_Delay                      | uint8  |
| notification class              | Notification_Class              | uint8  |
| notify type                     | Notify_Type                     | uint8  |
| unit                            | Units                           | uint8  |
| high limit                      | High_Limit                      | float  |
| low limit                       | Low_Limit                       | float  |
| deadband                        | Deadband                        | float  |
| reliability                     | Reliability                     | uint8  |
| polarity                        | Polarity                        | uint8  |
| system status                   | System_Status                   | uint8  |
| vendor name                     | Vendor_Name                     | string |
| vendor identifier               | Vendor_Identifier               | uint8  |
| model name                      | Model_Name                      | string |
| firmware revision               | Firmware_Revision               | string |
| application software version    | Application_Software_Version    | string |
| location                        | Location                        | string |
| protocol version                | Protocol_Version                | uint16 |
| protocol conformance class      | Protocol_Conformance_Class      | uint8  |
| supported protocol service      | Protocol_Service_Supported      | string |
| supported protocol object types | Protocol_Object_Types_Supported | string |
| serial number                   | Serial_Number                   | string |
| max accepted apdu length        | Max_APDU_Length_Accepted        | uint16 |
| supported segmentation          | Segmentation_Supported          | uint8  |
| local time                      | LOCAL_TIME                      | string |
| local date                      | LOCAL_DATE                      | string |
| utc offset                      | UTC_Offset                      | int8   |
| daylight savings status         | Daylight_Savings_Status         | bool   |
| APDU segment timeout            | APUD_Segment_Timeout            | uint8  |
| APDU timeout                    | APUD_Timeout                    | uint16 |
| number of APDU retries          | Number_Of_APDU_Retries          | uint8  |
| max master                      | Max_Master                      | uint8  |
| max info frame                  | Max_Info_Frame                  | uint8  |
| profile name                    | Profile_Name                    | string |
| pluse rate                      | Pulse_Rate                      | uint8  |
| scale                           | Scale                           | float  |
| prescale                        | Prescale                        | float  |
| value before change             | Value_Before_Change             | uint8  |
| value change time               | Value_Change_Time               | string |

If no property is specified, the default property is Present_Value.

support custom property

PROPERTY_ID consists of two parts: a custom flag and the value (integer) of the property, with the overall format being AREA ADDRESS.custom.id.

Support Present Value zeroing operation, currently supporting AO and BO regions. The address format is "(AO|BO)xxx.NULL", and only write operations are supported. Depending on the type of region, write the zero value of the corresponding type.

::: tip
A `.NULL` tag is write-only. Adding one with the read or subscribe attribute is refused with an attribute-not-supported error.
:::

### Example Addresses

| Address               | Data Type | Description                                          |
| --------------------- | --------- | ---------------------------------------------------- |
| AI0                   | FLOAT     | AI area, address is 0                                |
| AI1                   | FLOAT     | AI area, address is 1                                |
| AV30                  | FLOAT     | AV area, address is 30                               |
| BO10                  | BIT       | BO area, address is 10                               |
| BO20                  | BIT       | BO area, address is 20                               |
| BO10.NULL             | BIT       | BO area, address is 10, write NULL                   |
| BI0                   | BIT       | BI area, address is 0                                |
| BI1                   | BIT       | BI area, address is 1                                |
| BV3                   | BIT       | BV area, address is 3                                |
| MSI10                 | UINT8     | MSI area, address is 10                              |
| MSI20                 | UINT8     | MSI area, address is 20                              |
| MSI30                 | UINT8     | MSI area, address is 30                              |
| ACC1                  | UINT32    | ACC area, address is 1                               |
| LAV5                  | DOUBLE    | LAV area, address is 5                               |
| IV7                   | INT32     | IV area, address is 7                                |
| PIV8                  | UINT32    | PIV area, address is 8                               |
| CSV2                  | STRING    | CSV area, address is 2                               |
| AI0.Object_Name       | STRING    | AI area, address is 0, property is Object_Name       |
| AI0.custom.1234       | ALL       | AI area, address is 0, property is 1234              |
| DEV400001.Vendor_Name | STRING    | DEV area, address is 400001, property is vendor name |

## Device Scanning

When the device inventory is not known, **Administration → BACnet/IP Device Scan** broadcasts to discover devices and enumerate their tags, then generates a fully configured BACnet/IP driver from the result. See [BACnet/IP Device Scan](./scan.md).
