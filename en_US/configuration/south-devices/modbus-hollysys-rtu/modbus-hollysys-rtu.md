# HollySys Modbus RTU

The EMQX Neuron HollySys Modbus RTU driver is for collecting HollySys PLC tags using the Modbus RTU protocol,

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **HollySys Modbus RTU** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Parameter                  | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **Physical Link**          | Selects the communication medium, either serial or Ethernet.                           |
| **Connection Timeout**     | The time the system waits for a device to respond to a command.                        |
| **Maximum Retry Times**    | The maximum number of retries after a failed attempt to send a read command.           |
| **Retry Interval**         | Resend reading instruction interval(ms) after a failed attempt to send a read command. |
| **Send Interval**          | The waiting time between sending each read/write command. Some serial devices may discard certain commands if they receive consecutive commands in a short period of time. |
| **Serial Device**          | Only needed in **Serial** mode, the path to the serial device when using a serial connection, e.g., /dev/ttyS0 in Linux systems. |
| **Stop Bits**              | Only for the **Serial** mode, the serial connection parameter.                         |
| **Parity**                 | Only for the **Serial** mode, the serial connection parameter.                         |
| **Baud Rate**              | Only for the **Serial** mode, the serial connection parameter.                         |
| **Data Bits**              | Only for the **Serial** mode, the serial connection parameter.                         |
| **Connection Mode**        | Only for the **Ethernet** mode, you can choose EMQX Neuron as the TCP client or server.     |
| **IP Address**             | Only for the **Ethernet** mode,  the IP address of the device when using TCP connection with EMQX Neuron as the client, or the IP address of EMQX Neuron when using TCP connection with EMQX Neuron as the server. The default value is 0.0.0.0. |
| **Port**                   | Only for the **Ethernet** mode, the port number of the device when using TCP connection with EMQX Neuron as the client, or the port number of EMQX Neuron when using TCP connection with EMQX Neuron as the server. |
| **Maximum Retry Times**    | The maximum number of retries after a failed attempt to send a read command.           |
| **Retry Interval**         | Resend reading instruction interval(ms) after a failed attempt to send a read command. |

The HollySys Modbus RTU driver configuration is similar to that of the [Modbus RTU driver module](../modbus-rtu/modbus-rtu.md).

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data types

* BIT
* BOOL
* INT16
* UINT16
* WORD

### Address format

> SLAVE!ADDRESS[#ENDIAN]

The address format is nearly the same to that of the [Modbus RTU driver module](../modbus-rtu/modbus-rtu.md), the only difference is in the **ADDRESS** part.

#### **SLAVE**

Required, Slave is the slave address or site number.

#### **ADDRESS**

HollySys PLC maps data units onto the Modbus address space for access through the Modbus RTU protocol.
The EMQX Neuron HollySys Modbus RTU driver frees users from details of the address mapping, and designates the PLC data unit name as the **ADDRESS**.

| Area                            | Data unit example                           | Attribute  | Register Size | Data Type      |
| ------------------------------- | ------------------------------------------- | ---------- | ------------- | -------------- |
| IX (Input)                      | IX0.0 ... IX0.7, IX1.0 ... IX1.7 ...        | Read       | 1Bit          |  BOOL/BIT      |
| IW (Input Registers)            | IW0, IW1, ...                               | Read       | 16Bit,2Byte   |  INT16/UINT16  |
| QX (Coils)                      | QX0.0 ... QX0.7, QX1.0 ... QX1.7 ...        | Read/Write | 1Bit          |  BOOL/BIT      |
| QW (Hold Registers)             | QW0, QW1, ...                               | Read/Write | 16Bit,2Byte   |  INT16/UINT16  |
| MX (Coils)                      | MX0.0 ... MX0.7, MX1.0 ... MX1.7 ...        | Read/Write | 1Bit          |  BOOL/BIT      |
| MW (Hold Registers)             | MW0, MW1, ...                               | Read/Write | 16Bit,2Byte   |  INT16/UINT16  |

#### **#ENDIAN**

Optional, byte order, applicable to data types int16/uint16, see the table below for details.
| Symbol | Byte Order | Supported Data Types | Note                                |
| ------ | ---------- | -------------------- | ----------------------------------- |
| #B     | 2,1        | int16/uint16         |                                     |
| #L     | 1,2        | int16/uint16         | Default byte order if not specified |

::: tip
The byte order can be illustrated using the notation ABCD, which corresponds directly to the sequence 1234. As an example, the ABCD designation represents the standard or default Endianness 1234. (#LL).
:::

### Example Addresses

| Address        | Data Type | Description                                        |
| -------------- | --------- | -------------------------------------------------- |
| 1!IX1.0        | bit       | Data unit IX1.0 on slave 1, read only.             |
| 1!QW0          | int16     | Data unit QW0 on slave 1, support read/write.      |
| 2!MW1          | int16     | Data unit MW1 on slave 1, support read/write.      |
