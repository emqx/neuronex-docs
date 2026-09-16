# NON A11

The non-A11 driver is applicable to non-A11 devices, with the driver supporting both client and server modes for device interfacing. The driver currently supports UINT16/INT16/UINT32/INT32/FLOAT/STRING data types and allows user-defined instructions for data reading.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **NON A11** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Parameter              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Connection Mode**    | The way the driver connects to the device, the default is client, which means that the neuron driver is used as the client |
| **IP Address**         | Only for **TCP** mode. <br />When EMQX Neuron is used as a client, fill in the IP of the remote device. <br />When EMQX Neuron is used as a server, fill in the IP of EMQX Neuron locally, 0.0.0.0 can be filled in by default. |
| **Port**               | Only for **TCP** mode. <br />When EMQX Neuron is used as a client, fill in the TCP port of the remote device. <br />When EMQX Neuron is used as a server, fill in the TCP port of EMQX Neuron. |
| **Site Number**        | Site number                                                  |
| **Connection Timeout** | Connection timeout, unit: ms                                 |
| **Send Interval**      | Send reading instruction interval, unit: ms                  |

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* INT16
* UINT16
* INT32
* UINT32
* FLOAT
* STRING

### Address Format

> SITE ! COMMAND ! OFFSET[.LEN]

### Example Addresses

| Address | Data Type          | Description                            |
| ------- | ------------------ | -------------------------------------- |
| 1!1!10.20 | string             | site 1, command 1, offset 10, string length 20 |
| 1!12!1    | uint16/int16       | site 1, command 12, offset 1                   |
| 1!20!32   | uint32/int32/float | site 1, command 20, offset 32                  |
