# Serve Upper-Level Systems

The line is already built. SCADA, HMI, MES, historians, and configuration software are all running, and now they need the data the gateway collects — without being modified themselves.

This class runs opposite to the other northbound applications: EMQX Neuron does not push data out, it **exposes an OPC UA service**. Upper-level systems connect in as clients to browse the address space, subscribe to tag changes, read live values, and write control commands back down.

## The value is zero change upstream

SCADA, HMI, and configuration software already speak OPC UA — it is the de facto standard interface in industrial automation. Once connected:

- **A hundred device protocols become one data source.** The Modbus, Siemens S7, Mitsubishi, Omron, CNC, and IEC power protocols collected below no longer have to be integrated one by one; the upper-level system faces a single OPC UA Server.
- **No code changes and no driver purchases upstream.** The cost of buying an OPC driver or writing a comms program per PLC type goes away.
- **New devices are transparent.** Add a southbound driver in EMQX Neuron and subscribe it, and its tags appear in the address space.

## How the address space is organized

EMQX Neuron maps **subscribed** tags to OPC UA nodes, mirroring the plant structure:

```
EMQX Neuron
└── modbus-tcp-1          southbound driver → Object node
    └── group-1           collection group  → child Object
        └── temperature   tag               → Variable node
```

NodeId follows `ns=1;s=[device].[group].[tag]` — for example `ns=1;s=modbus-tcp-1.group-1.temperature`. Upper-level systems can generate their tag configuration from that rule instead of browsing by hand.

::: warning
Only tags in subscribed groups appear in the address space. After creating the application you must [add a subscription](../subscription.md), otherwise clients connect but see no variable nodes.
:::

## Security

On a plant network, OPC UA usually carries control commands, so security configuration is not optional:

- **Security policy**: None, Basic256Sha256, Basic256, Basic256Rsa15, and Aes128_Sha256_RsaOaep are supported. In production use Basic256Sha256 and enable SignAndEncrypt on the client.
- **Mutual certificate validation**: a self-signed server certificate is generated on first start and clients must trust it; an unknown client's certificate lands in the untrusted list and has to be approved in the UI before it can connect.
- **Username and password authentication**: users can be added, have passwords updated, and be deleted.

## Write-back

An OPC UA client writes to a variable node and the value goes down to the device — no extra topic or channel to configure. The tag must carry the **write** attribute in the southbound driver; see [Groups and Tags · Tag attributes](../groups-tags/groups-tags.md#tag-attributes).

## Which application

| Application | When |
| --- | --- |
| [OPC UA Server](./opcua-server/overview.md) | The standard route whenever the upper-level system has an OPC UA client. Includes a [UaExpert walkthrough](./opcua-server/uaexpert.md) covering connection, certificate trust, subscribing to variables, and writing values |
| [WebSocket](./websocket/websocket.md) | Push to your own WebSocket server — a good fit for in-house dashboards and back ends. This one pushes rather than serving |
