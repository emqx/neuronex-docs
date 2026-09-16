# Omron Host Link

The Hostlink protocol is a protocol defined by Omron for communication between other devices and Omron PLC.
The Hostlink communication protocol has two modes: C-mode and FINS.
Cmode adopts ASCII code, and the upper computer actively sends instructions to the CPU; FINS adopts binary code and can be used in various network devices, and can be actively issued by CPU, IO module, and upper computer.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

The EMQX Neuron HostLink Cmode driver is used to communicate with the Omron PLC through a serial network.

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **HOSTLINK CMODE** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Parameter                 | Description                                                    |
| -------------------- | ------------------------------------------------------- |
| **Recv Timeout** | The time of the system waits for a device to respond to a command.  |
| **Send Interval** | 	The waiting time between sending each read/write command. Some serial devices may discard certain commands if they receive consecutive commands in a short period of time. |
| **Serial Port** | The path to the serial device when using a serial connection, e.g., /dev/ttyS0 in Linux systems. |
| **Stop Bits** | Serial connection parameter. |
| **Parity** | Serial connection parameter. |
| **Baud Rate** | Serial connection parameter. |
| **Data Size** | Serial connection parameter. |

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* BOOL
* INT16
* UINT16
* INT32
* UINT32
* INT64
* UINT64
* FLOAT
* DOUBLE
* STRING

### Address format

> ID!AREA ADDRESS\[.BIT]\[.LEN\[H]\[L]]

#### ID

Required, unit ID. For example, unit id is 10, area is CIO, address is 0, then fill in 10!CIO0000

#### AREA ADDRESS

| AREA | DATA TYPE                                                 | ATTRIBUTE  | REMARK           |
| ---- | --------------------------------------------------------- | ---------- | ---------------- |
| CIO  | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read/write    | IR/SR CIO area |
| LR   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read/write    | LR area        |
| HR   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read/write    | HR area        |
| D    | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read/write    | DM area        |
| A    | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read          | AR area        |
| TD   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | read/write    | TC value       |
| TS   | BOOL                                                        | read/write    | TC status      |

#### .LEN\[H]\[L]\[D]\[E]

When the data type is STRING, .LEN is a required field, indicating the number of bytes the string occupies. Each register contains four storage methods: H, L, D, and E, as shown in the table below.
| Symbol | Description                                 |
| --- | ------------------------------------- |
| H   | One register stores two bytes, with the high byte first |
| L   | One register stores two bytes, with the low byte first |
| D   | One register stores one byte, and it is stored in the low byte      |
| E   | One register stores one byte, and it is stored in the high byte|

### Example Addresses

| Address         | Data Type | Description |
| ----------- | ------- | --------- |
| 10!CIO0001        | int16   | CIO Area, address is 1, unit id is 10      |
| 10!CIO0002        | uint16  | CIO Area, address is 2, unit id is 10      |
| 10!LR0020         | double  | LR Area, address is 20, unit id is 10      |
| 10!LR0030         | uint32  | LR Area, address is 30, unit id is 10      |
| 10!HR0010         | int32   | HR Area, address is 10, unit id is 10      |
| 10!HR0020         | float   | HR Area, address is 20, unit id is 10      |
| 10!D0010          | int32   | DM Area, address is 10, unit id is 10      |
| 10!D0020          | float   | DM Area, address is 20, unit id is 10      |
| 10!A0002          | int32   | AR Area, address is 2, unit id is 10       |
| 10!A0004          | uint32  | AR Area, address is 4, unit id is 10       |
| 10!TD0002         | uint16  | TC value, address is 2, unit id is 10      |
| 10!TD0004         | uint32  | TC value, address is 4, unit id is 10      |
| 10!TS0002         | BOOL    | TC status, address is 2, unit id is 10     |
| 10!TS0004         | BOOL    | TC status, address is 4, unit id is 10     |
| 10!CIO0000.20L    | string  | CIO Area, address is 0, unit id is 10, the string length is 20 bytes, and the endianness is L      |
| 10!CIO0001.20H    | string  | CIO Area, address is 1, unit id is 10, the string length is 20 bytes, and the endianness is H      |
