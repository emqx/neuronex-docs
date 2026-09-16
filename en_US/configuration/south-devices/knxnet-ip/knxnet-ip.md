# KNXnet/IP

KNXnet/IP is an IoT-focused protocol that leverages Internet Protocol (IP) for enabling communication among KNX automation devices over networks like Ethernet or Wi-Fi, thereby fostering scalability and remote management in smart homes and buildings.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

This section introduces how to use EMQX Neuron KNXnet/IP driver to communicate with KNXnet/IP.

::: tip

Due to the way how KNXnet/IP protocol works, the KNX driver may not be able to work correctly
if EMQX Neuron is installed using some virtualization technology such as virtual machines or docker.
In a Linux host with docker, using the docker option `--net=host` is required. In other cases,
we recommend that you install EMQX Neuron using binary packages.

:::

## Add Driver

On **Data Collection → South Devices**, click **Add Device**.

- Name: The name of this device node.
- Driver: Select the **KNXnet/IP** driver.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Parameter                 | Description                              |
| ------------------------- | ---------------------------------------- |
| **Discovery Endpoint IP** | KNXnet/IP device IP, default 224.0.23.12 |
| **port**                  | KNXnet/IP device port, default 3671      |

Note that setting with the multicast address *224.0.23.12* normally requires that the KNXnet/IP device and EMQX Neuron are in the same subnetwork.

## Tag Configuration

The data types and address formats supported by this driver are listed below.

### Data Types

* bit
* bool
* int8
* uint8
* int16
* uint16
* float

### Address Format 1

* > GROUP_ADDRESS,INDIVIDUAL_ADDRESS

Represents a KNX individual address that is a member of the group address.

- When reading the KNX driver, EMQX Neuron sends a `GroupValueRead` tunneling request using the specified group address, and updates the tag value upon receiving a `GroupValueResp` matching the specified individual address.
- When writing the KNX driver, EMQX Neuron sends a `GroupValueWrite` tunneling request using the specified group address.

**Example**

`0/0/1,1.1.1` represents a KNX individual address `1.1.1` that is a member of the group address `0/0/1`.

### Address Format 2

* > GROUP_ADDRESS,INDIVIDUAL_ADDRESS,BIT

Same as above, but for `uint8` values with fewer than 8 bits, such as KNX data point types `B2` and `B1U3`, etc. *BIT* represents the number of bits.

**Example**

`0/0/1,1.1.1,2` represents a KNX individual address `1.1.1` that is a member of the group address `0/0/1`, the data is of 2 bit.
