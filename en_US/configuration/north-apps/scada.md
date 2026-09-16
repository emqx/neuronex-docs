# Serve Upper-Level Systems

When the line is already built and SCADA, HMI, MES, historians, and configuration software are all running, this class of northbound application supplies them with the data the gateway collects, without changing those systems.

The direction is the reverse of the other northbound applications: EMQX Neuron does not push data out, it **exposes an OPC UA service**. Upper-level systems connect in as clients to browse the address space, subscribe to tag changes, read live values, and send control commands back down.

OPC UA is the common interface in industrial automation, and SCADA, HMI, and configuration software generally support it natively. Once connected, the device protocols collected below — Modbus, Siemens S7, Mitsubishi, Omron, CNC controllers, the IEC power series — are presented as a single OPC UA data source. Upper-level systems no longer integrate them one by one, and no OPC driver has to be purchased or comms program written per PLC type. When a southbound driver is added and subscribed in EMQX Neuron, its tags appear in the address space automatically.

## Address space structure

EMQX Neuron maps **subscribed** tags to OPC UA nodes, mirroring the plant structure:

```
EMQX Neuron
└── modbus-tcp-1          southbound driver → Object node
    └── group-1           collection group  → child Object
        └── temperature   tag               → Variable node
```

NodeId follows `ns=1;s=[device].[group].[tag]` — for example `ns=1;s=modbus-tcp-1.group-1.temperature`. Upper-level systems can generate their tag configuration from that rule instead of browsing by hand.

::: warning
Only tags in subscribed groups appear in the address space. A subscription must be added after creating the application — see [Subscribe to Southbound Data](../subscription.md) — or clients connect but see no variable nodes.
:::

## Security configuration

On a plant network OPC UA usually carries control commands, so security configuration is not optional.

| Item | Description |
| --- | --- |
| **Security policy** | None, Basic256Sha256, Basic256, Basic256Rsa15, and Aes128_Sha256_RsaOaep are supported. In production, use Basic256Sha256 and enable SignAndEncrypt on the client |
| **Mutual certificate validation** | A self-signed server certificate is generated on first start and must be trusted by the client; an unknown client's certificate enters the untrusted list and has to be approved in the UI before it can connect |
| **Username and password authentication** | Users can be added, have passwords updated, and be deleted |

## Writing back to devices

An OPC UA client writes to a variable node and the value goes down to the device, with no extra topic or channel to configure. The target tag must have the **write** attribute configured in the southbound driver — see [Groups and Tags · Tag attributes](../groups-tags/groups-tags.md#tag-attributes).

## Selecting an application

| Application | When it applies |
| --- | --- |
| [OPC UA Server](./opcua-server/overview.md) | The standard route when the upper-level system has an OPC UA client |
| [WebSocket](./websocket/websocket.md) | Push to an in-house WebSocket server, for custom dashboards and back ends. This one pushes rather than serving |

## Connection example

[Using UaExpert to Connect to EMQX Neuron OPC UA Server](./opcua-server/uaexpert.md) walks through connecting, trusting the certificate, subscribing to variables, and writing values.
