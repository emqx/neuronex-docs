# CIP Ethernet/IP

EtherNet/IP (Industrial Protocol), developed and maintained by the Open DeviceNet Vendor Association (ODVA), is a pivotal network protocol in industrial automation. It fosters seamless automated control and data exchange between devices, significantly benefiting sectors including manufacturing, energy, transportation logistics, and construction by enhancing operational efficiency and data transparency.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

You can use EMQX Neuron EtherNet/IP (CIP) driver to connect EtherNet/IP devices.

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **EtherNet/IP (CIP)** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Field          | Description                |
| -------------- | -------------------------- |
| PLC IP Address | Device ip                  |
| PLC Port       | Device port, default 44818 |
| CPU Slot       | Cpu slot, default 0        |

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* INT8
* UINT8
* INT16
* UINT16
* INT32
* UINT32
* INT64
* UINT64
* FLOAT
* DOUBLE
* BOOL
* BIT
* STRING
* WORD
* DWORD
* LWORD

### Address Format

>  TAG NAME

Connect to PLC with PLC software, the name of the point on the PLC is the address of the point in EMQX Neuron.
