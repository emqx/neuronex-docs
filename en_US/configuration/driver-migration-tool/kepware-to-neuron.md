# Kepware to EMQX Neuron Migration Guide

## Overview

- **Migration goal**: Convert acquisition configuration from KEPServerEX (V6.0 and above) into a configuration that EMQX Neuron can import.

- **Conversion method**: Use the [online configuration migration tool](https://www.emqx.com/en/products/emqx-neuron/migrator) provided on the EMQ website.

## Supported protocols for conversion

| KEPServerEX protocol                  | Supported | Notes                                                                 |
| ----------------------------------- | --------- | --------------------------------------------------------------------- |
| Modbus TCP/IP Ethernet              | Yes       | BCD and arrays not supported                                          |
| Modbus RTU Serial                   | Yes       | BCD and arrays not supported                                          |
| Modbus ASCII Serial                 | Yes       | BCD and arrays not supported                                          |
| OPC UA Client                        | Yes       | Certificates cannot be exported                                       |
| Mitsubishi Ethernet                 | Yes       | BCD and arrays not supported                                          |
| Allen-Bradley ControlLogix Ethernet | Yes       | Only ControlLoginc 5500 devices supported. BCD and arrays not supported |
| Allen-Bradley DF1                   | Yes       | BCD and arrays not supported                                          |
| Siemens TCP/IP Ethernet             | Yes       | BCD and arrays not supported                                          |
| Omron FINS Ethernet                 | Yes       | BCD and arrays not supported                                          |
| BACnet/IP                           | Yes       | Currently only analog, binary, and multi-state objects are supported    |
| CODESYS                             | Yes       | Only V3 protocol; single array element reads supported; whole-array reads not supported |

:::tip
Protocols not listed are not supported for conversion for now.
:::

## How to export configuration from KEPServerEX

Follow these steps to export configuration in KEPServerEX:

- In the File menu, click **Save As**;

- Choose not to encrypt;

- Select **JSON** as the save format.

## Official conversion tool

### Upload and convert

Open the [official migration tool page](https://www.emqx.com/en/products/emqx-neuron/migrator).

Set the source to **KEPServerEX.**

Upload the export file obtained in [How to export configuration from KEPServerEX](#how-to-export-configuration-from-kepserverex).

Wait for the server to finish conversion and review the summary (device count, tag success/failure statistics, etc.).

Click **Download EMQX Neuron configuration JSON** to download the converted configuration file.

### Conversion failure scenarios

When you download the EMQX Neuron configuration JSON, devices and tags that were not converted successfully (e.g. unsupported drivers) are automatically excluded; the file only contains successfully converted devices and their tags.

After expanding a device, you can see the detailed reasons for conversion failures:

| **Tag name**   | **Type** | **Address** | **Status** | **Failure reason**      |
| -------------- | -------- | ----------- | ---------- | ----------------------- |
| outputuint64   | uint64   | H:0         | OK         | -                       |
| inputstring    | string   | I:0         | Failed     | String length exceeded  |

## Import and verify on the EMQX Neuron side

- Ensure EMQX Neuron and KEPServerEX are on the same network so that EMQX Neuron can reach the devices that KEPServerEX was collecting from.

- Log in to the EMQX Neuron Dashboard.

- On the **South Devices** page under the data acquisition module, click **Import**.

- Check the connection status of the imported drivers and ensure connections succeed.

- On the **Data Monitoring** page, verify that acquisition data looks normal.

## Detailed description of conversion protocols

### Data model mapping

| **KEPServerEX field**                                            | **EMQX Neuron field**      | **Description**                                                                 |
| ---------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------- |
| common.ALLTYPES_NAME                                             | name                  | Device node name                                                                |
| servermain.MULTIPLE_TYPES_DEVICE_DRIVER:"Modbus TCP/IP Ethernet" | driver: "Modbus TCP"  | Driver name                                                                     |
| servermain.DEVICE_ID_STRING                                      | params.host, slave id | IP and station number <192.168.10.111>.1, needs to be parsed out                 |
| modbus_ethernet.DEVICE_ETHERNET_PORT_NUMBER                      | params.port           | Port number                                                                     |
| modbus_ethernet.DEVICE_ZERO_BASED_ADDRESSING                     | params.address_base   | Start address<br><br>true->0<br><br>false->1                                     |
| servermain.DEVICE_CONNECTION_TIMEOUT_SECONDS                     | params.timeout        | Seconds->milliseconds                                                           |
| servermain.DEVICE_RETRY_ATTEMPTS                                 | params.max_retries    | Maximum retry count                                                             |
| servermain.DEVICE_INTER_REQUEST_DELAY_MILLISECONDS               | params.interval       | Interval between command sends                                                  |
| modbus_ethernet.DEVICE_FIRST_WORD_LOW                            | params.endianess      | Byte order for 4-byte data<br><br>true->ABCD<br><br>false->CDAB                  |
| modbus_ethernet.DEVICE_FIRST_DWORD_LOW                           | params.endianess_64   | true->12 34 56 78<br><br>false->87 65 43 21                                      |
| common.ALLTYPES_NAME                                             | tag name              | Tag name                                                                        |
| servermain.TAG_ADDRESS                                           | tag address           | Tag address                                                                     |
| servermain.TAG_DATA_TYPE                                         | tag type              | Tag type                                                                        |
| servermain.TAG_READ_WRITE_ACCESS                                 | tag r/w               | Tag read/write attributes false->r<br><br>true->rw                               |

### Register area mapping

| **KEPServerEX** | **EMQX Neuron** | **R/W** | **Description**              |
| --------------- | ---------- | ------- | ---------------------------- |
| 0               | 0          | Read-only | Coil                         |
| 1               | 1          | R/W     | Discrete Input               |
| 3               | 3          | Read-only | Input Register               |
| 4               | 4          | R/W     | Hold Register                |

### Data type mapping

| **KEPServerEX** | **EMQX Neuron** | **Description** |
| --------------- | ---------- | --------------- |
| 1               | 12         | boolean         |
| 5               | 4          | uint16          |
| 4               | 3          | int16           |
| 7               | 6          | uint32          |
| 6               | 5          | int32           |
| 8               | 9          | float           |
| 9               | 10         | double          |
| 0               | 13         | string          |

:::tip
EMQX Neuron strings support a maximum length of 128; KEPServerEX supports 240. EMQX Neuron does not support arrays; KEPServerEX does.
:::

### Grouping strategy

**EMQX Neuron** supports multiple acquisition groups under a single driver; each group can have its own acquisition interval. Tags under a group cannot have individual acquisition intervals, and every tag must belong to a group.

**KEPServerEX** supports grouped and ungrouped tags, and nested sub-groups under a group (multi-level hierarchy).

**KEPServerEX → EMQX Neuron** conversion rules:

- Ungrouped tags: placed in the **Global** acquisition group.

- Grouped tags: placed in a `groupname-subgroupname-…` acquisition group (group names concatenated top-down with hyphens `-`).

- In **KEPServerEX**, each tag can have its own acquisition **interval**. During conversion, for each acquisition group the **minimum** interval among all tags in that group is used as the group’s interval in EMQX Neuron; if no valid value can be parsed from the configuration, the conversion tool’s internal default is used.

## Special notes on supported conversion protocols

### Protocol details


#### 1) Protocol name: Modbus TCP

EMQX Neuron Modbus TCP address format: `{slave_id}!{area_code}{address}|[.bit|.len]`

- **Ordinary numeric types**: `1!40000` (slave_id=1, Hold Register, address=0)

- **String type**: `1!40000.55H` (55-byte string at address 0)

- **Register bit type**: `1!40000.0` (Hold Register address=0, bit 0)

KEPServerEX Modbus TCP address pattern: `[H|]|{area_code}{address}|[.bit|.len]| [size]`; KEPServerEX supports decimal and hexadecimal addressing.

**KEPServerEX → EMQX Neuron** conversion steps:

- Parse slave ID

- Determine addressing radix

- Obtain register area

- Convert address value according to radix

- Convert type value

- Convert read/write attributes

#### 2) Protocol name: OPC UA

- Polling and subscription modes are supported

- **KEPServerEX** does not support exporting certificates. If certificates are configured, conversion to EMQX Neuron uses auto-generated certificates, which the user should update afterward.

- The password for **KepServerEX** is encrypted and does not support password export; it must be entered manually by the user.

#### 3) Protocol name: Mitsubishi Ethernet

- The tool maps different **Mitsubishi Ethernet** device models in **KEPServerEX** to three different EMQX Neuron drivers respectively.
