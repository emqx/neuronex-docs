# OPC UA Server

OPC UA (OPC Unified Architecture) is a platform-independent, vendor-neutral industrial communication standard designed for reliable and secure data exchange in automation systems. OPC UA supports data modeling, events, historical data access, and method invocation, making it suitable for distributed scenarios from edge devices to the cloud.

Unlike the other northbound applications, the OPC UA Server does not push data out. It exposes collected tags as an OPC UA service: SCADA, HMI, MES, and configuration software on site connect in as OPC UA clients to browse the address space, subscribe to data changes, and read live tags — and can write back to devices.

## Add Application

In **Data Collection -> North Apps**, click **Add Application** and select **OPC UA Server** to create an OPC UA Server node.

## Application Configuration

When creating an OPC UA Server application, you can configure the following parameters:

| Parameter                                | Description                                                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Host**                                 | The computer running the OPC UA server, default is 127.0.0.1.                                                                 |
| **Port**                                 | The port the server binds to, default is 4840.                                                                                |
| **Security Policy**                      | Supported security policies, including None, Basic256Sha256, Basic256, Basic256Rsa15, Aes128_Sha256_RsaOaep. Default is None. |
| **Username and Password Authentication** | Enable username and password authentication, supports adding users, updating passwords, and deleting users.                   |
| **Server Certificate**                   | Certificate and key (PEM) used by the server.                                                                                 |
| **Trusted Certificate Authority**        | Upload trusted CA certificates (PEM).                                                                                         |
| **Trusted Client Certificate**           | Upload client-generated certificates (PEM).                                                                                   |

::: warning
Set **Host** to the actual IP of the machine running EMQX Neuron. If you leave the default `127.0.0.1`, only clients on the same machine can connect and external clients will fail.
:::

### Security and Certificates

OPC UA strongly recommends enabling security policies and message encryption to prevent man-in-the-middle attacks and eavesdropping. Key points:

- Use a strong security policy (such as Basic256Sha256) and enable SignAndEncrypt mode on the client.
- Add client certificates to the **Trusted Client Certificates** list to enable mutual TLS.
- Enable username/password authentication.

When EMQX Neuron starts the OPC UA Server for the first time, it generates a self-signed certificate. External clients may need to trust it manually (for example, by importing it into the trusted list in the UA client).

Certificates you upload yourself are trusted by default. When an unknown client connects, its certificate goes to the untrusted list and must be trusted manually in the UI before the connection succeeds.

## Add Subscription

**Only tags in subscribed groups appear in the OPC UA address space.** You must add a subscription after creating the application, otherwise clients connect but see no variable nodes.

Click the OPC UA Server application card to open the **Group List** page, then click **Add Subscription**:

- **South device**: the southbound device to expose, for example `modbus-tcp-1`;
- **Group**: a group under that device, for example `group-1`.

For the generic subscription steps, see [Subscribe to Southbound Data](../../subscription.md).

## Address Space and Naming Rules

EMQX Neuron maps subscribed tags to OPC UA nodes:

- Each southbound node (for example `modbus-tcp-1`) becomes an OPC UA Object node.
- Groups are organized as child objects under the southbound node.
- Tags become Variable nodes, with DataType mapped from the EMQX Neuron type per the table below.

All southbound nodes sit under the EMQX Neuron node. NodeId follows `ns=1;s=[device].[group].[tag]` — for example `ns=1;s=modbus-tcp-1.group-1.temperature`, where `ns=1` is the EMQX Neuron namespace.

## Data Type Mapping

| EMQX Neuron  | OPC UA        |
| ------------ | ------------- |
| INT8/UINT8   | Sbyte/Byte    |
| INT16/UINT   | Int16/UInt16  |
| INT32/UINT32 | Int32/UInt32  |
| INT64/UINT64 | Int64/UInt64  |
| FLOAT        | Float         |
| DOUBLE       | Double        |
| BIT/BOOL     | Boolean       |
| STRING       | String        |
| BYTES        | ByteString    |
| ARRAY_INT8   | Array Sbyte   |
| ARRAY_UINT8  | Array Byte    |
| ARRAY_INT16  | Array Int16   |
| ARRAY_UINT16 | Array Uint16  |
| ARRAY_INT32  | Array Int32   |
| ARRAY_UINT32 | Array Uint32  |
| ARRAY_INT64  | Array Int64   |
| ARRAY_UINT64 | Array Uint64  |
| ARRAY_FLOAT  | Array Float   |
| ARRAY_DOUBLE | Array Double  |
| ARRAY_BOOL   | Array Boolean |
| Json         | String        |

## Write Back to Devices

An OPC UA client writes to a variable node and the value goes down to the device — no extra topic or channel to configure.

The tag must carry the **write** attribute in the southbound driver; see [Groups and Tags · Tag attributes](../../groups-tags/groups-tags.md#tag-attributes). Writing to a read-only tag returns an error.

For the steps in UaExpert, see [Using UaExpert](./uaexpert.md#4-monitoring-and-writing).

## Operation and Maintenance

Click **Data Statistics** on the application card or row to see connection state and traffic. For the statistics fields, see [Create a Northbound Application](../north-apps.md#data-statistics).

If clients have trouble connecting, click **DEBUG log**. The system prints DEBUG-level logs for that node and switches back to the default level after about ten minutes. Then open **Administration** -> **Logs**; see [Managing Logs](../../../admin/log-management.md).

Common causes of connection failure:

- **Host** is left at `127.0.0.1`, so external clients cannot reach the server.
- The client certificate is still untrusted, the server returns `BadCertificateUntrusted`, and it must be trusted manually on the authentication page.
- The security policy the client selected is not enabled on the server.

## Connection Example

[Using UaExpert to Connect to EMQX Neuron OPC UA Server](./uaexpert.md) walks through connecting, trusting the certificate, subscribing to variables, and writing values.
