# BACnet/IP Device Scan

BACnet/IP devices can be discovered by broadcasting Who-Is messages and listening for I-Am responses. The scan driver implements this discovery, and can also re-enumerate the tags of known devices. It is a separate driver from the BACnet/IP driver, and is used to generate fully configured BACnet/IP nodes.

The usual workflow is three steps:

1. Enable scanning, choosing the scan modes according to your network topology
2. Look at the devices and tags found by the scan
3. Select a device and the tags you want, then click `Add Driver and Tags` to generate a fully configured BACnet/IP driver; if the driver already exists, use `Add Tags to Group` to add the tags to an existing collection group

## Enable Scanning

Enable scanning on **Administration → BACnet/IP Device Scan**.

## Scan Configuration

| Parameter                 | Default           | Description                                                                                      |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| **Local Bind Address**    | `0.0.0.0`         | Local interface to bind. `0.0.0.0` binds every interface; name one on a multi-homed host           |
| **Local Bind Port**       | `47808`           | Local port used to send and receive BACnet messages. This normally has to be 47808, see below      |
| **Device Scan Interval**  | `600`             | How often to broadcast Who-Is to find devices, in seconds, 30 - 86400                             |
| **Point Scan Interval**   | `1200`            | How often to re-enumerate the tags of known devices, in seconds, 60 - 86400                     |
| **Local Broadcast Scan**  | Enabled           | Send Who-Is as an Original-Broadcast-NPDU                                                         |
| **Global Broadcast Scan** | Disabled          | Send Who-Is with DNET 0xFFFF, which BACnet routers forward to every network they serve             |
| **Broadcast Address**     | `255.255.255.255` | Destination of both broadcast modes. A subnet-directed address such as `192.168.1.255` is better   |
| **Scan via BBMD**         | Disabled          | Register as a foreign device with a BBMD and send Who-Is as Distribute-Broadcast-To-Network         |
| **BBMD IP Address**       | empty             | Only needed when Scan via BBMD is enabled                                                         |
| **BBMD Port**             | `47808`           | Only needed when Scan via BBMD is enabled                                                         |

## Choosing the Scan Modes

The three modes correspond to three different places a device can be. They may be enabled together, and duplicate discoveries are merged.

| Where the device is                                        | Mode to enable        | Why                                                                   |
| ---------------------------------------------------------- | --------------------- | --------------------------------------------------------------------- |
| On the same IP subnet as EMQX Neuron                            | Local Broadcast Scan  | The common case; the broadcast reaches it directly                     |
| On the same BACnet/IP network but a different IP subnet    | Scan via BBMD         | IP broadcasts do not cross subnets, so a BBMD there has to relay them   |
| On an MS/TP or other BACnet network behind a BACnet router | Global Broadcast Scan | A router receiving a Who-Is with DNET 0xFFFF forwards it onward         |

If you cannot tell which applies, enable all three and look at the result. A device found across a BACnet network is reported with `routed` set to `true` plus a `dnet` and `dadr`, which go straight into the target device network and MAC above.

## Properties Read During a Scan

Besides the address and the name, each object has the following properties read. Most are optional in BACnet, so the field is empty when the device does not support it.

| Property | Applies to | Purpose |
| --- | --- | --- |
| Object_Name | All | Tag name |
| Present_Value | All | A snapshot of the value at scan time |
| Status_Flags | All | The alarm, fault, overridden, and out-of-service flags |
| Description | All | Description — a device's human-readable label often lives here rather than in Object_Name |
| Units | Analog types | Engineering units, such as `degrees-celsius` |
| Number_Of_States | Multi-state types | Total number of states |
| State_Text | Multi-state types | The name of each state, up to 16 recorded |
| Inactive_Text | Binary types | What a value of 0 means, such as "stopped" |
| Active_Text | Binary types | What a value of 1 means, such as "running" |
