# Mitsubishi FX

The Mitsubishi FX driver is used to access Mitsubishi's FX0, FX2, FX3 and other PLC series via the FX programming port.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **Mitsubishi FX** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

|  Parameter    |  Description              |
| -------- | ------------------------------ |
| **Connection Timeout** | Connection timeout, default is 3000 milliseconds |
| **Send Interval** | Command transmission interval, default 20 ms     |
| **Serial Device** | Serial device path                               |
| **Stop Bits** | Stop bits, default is 1                          |
| **Parity**  | Parity, default is even                          |
| **Baud Rate** | Baud rate, default is 9600                       |
| **Data Bits** | Data Bits, default is 7                          |

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* INT16
* UINT16
* INT32
* UINT32
* FLOAT
* DOUBLE
* BIT
* STRING

### Address Format

> AREA ADDRESS\[.BIT]\[.LEN\[H]\[L]]

#### AREA ADDRESS

| AREA | TYPE | ATTRIBUTE  |  REMARK                                  |
| ---- | -------- | ----- | -------------------------------------- |
| X    | bit      | read/write | Input relay (FX3U)                |
| Y    | bit      | read/write | Output relay (FX3U)               |
| M    | bit      | read/write | Internal relay (FX3U)             |
| S    | bit      | read/write | Status relay (FX3U)               |
| TS   | bit      | read/write | Timer Contact (FX3U)              |
| CS   | bit      | read/write | Counter Contact (FX3U)            |
| TN   | all      | read/write | Timer Current value (FX3U)        |
| CN   | all      | read/write | Counter Current value (FX3U)      |
| D    | all      | read/write | Data register (FX3)               |

#### .BIT

Only available for **non-bit type area**, means read the specified binary bit of the specified address, the binary bit index interval is [0, 15].

| Address  | Data Type |  Description                      |
| ----- | -------- | -------------------------- |
| D20.0 | bit      | D Area, address 20, bit 0 |
| D20.2 | bit      | D Area, address 20, bit 2 |

#### .LEN\[H]\[L]

When the data type is string type, **.LEN** indicates the length of the string; you can optionally fill in **H** and **L** to indicate two byte orders, and the default is the byte order of **H**.

### Example Addresses

| Address      | Data Type |  Description                                          |
| --------- | -------- | -------------------------------------------- |
| X0    | bit      | X Area, address is 0   |
| X1    | bit      | X Area, address is 1   |
| Y0    | bit      | Y Area, address is 0   |
| Y1    | bit      | Y Area, address is 1   |
| D100  | int16    | D Area, address is 100 |
| D120  | uint16   | D Area, address is 120 |
| D200  | uint32   | D Area, address is 200 |
| D10   | float    | D Area, address is 10  |
| D20   | double   | D Area, address is 20  |
| D152.16L | string   | D Area, address is 152, string length is 16, endianness is L |
| D183.16  | string   | D Area, address is 183, string length is 16, endianness H |
