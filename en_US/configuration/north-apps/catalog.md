# Northbound Applications

Once southbound drivers have collected the data, its destination determines which northbound application to use. EMQX Neuron offers four destinations, each matching a typical plant scenario.

| Use case | Application |
| --- | --- |
| [Send data to the cloud](./cloud.md)<br />Headquarters or a cloud platform consolidates data from several plants | [MQTT](./mqtt/overview.md) · [AWS IoT](./aws-iot/overview.md) · [Azure IoT](./azure-iot/overview.md) |
| [Connect an IIoT platform (unified namespace)](./uns.md)<br />Let the platform model devices automatically, with no config change when devices are added | [Sparkplug B](./sparkplugb/overview.md) |
| [Serve upper-level systems](./scada.md)<br />SCADA, MES, and configuration software read from the gateway without being modified | [OPC UA Server](./opcua-server/overview.md) · [WebSocket](./websocket/websocket.md) |
| [Feed analytics and edge computing](./analytics.md)<br />Land in a data lake for long-term analysis, or filter and aggregate at the edge first | [Kafka](./kafka/overview.md) · [Rules Engine Application](./ekuiper/overview.md) |

The first three push data outward. **Serving upper-level systems** reverses that: on-site systems connect in as clients to read. Support for write-back per category is listed in the table below.

## Common steps

The configuration flow is the same for every northbound application:

1. [Create a northbound application](./north-apps.md): select the application type and fill in the connection parameters
2. [Subscribe to southbound data](../subscription.md): attach the collection groups to be published

Data is reported per **group**. One application can subscribe to many groups, and one group can be subscribed by many applications, so the same data can reach a cloud platform, an on-site system, and a data platform simultaneously.

## Capability comparison

| <div style="width:100pt">Application</div> | <div style="width:70pt">Direction</div> | <div style="width:70pt">Write back</div> | <div style="width:60pt">Offline cache</div> | Security |
| --- | --- | --- | --- | --- |
| [MQTT](./mqtt/overview.md) | Push | Write request / response topics | Yes | TLS, mutual auth |
| [Sparkplug B](./sparkplugb/overview.md) | Push | NCMD / DCMD commands | Yes | TLS, mutual auth |
| [AWS IoT](./aws-iot/overview.md) | Push | Write request / response topics | Yes | Device certificate |
| [Azure IoT](./azure-iot/overview.md) | Push | Cloud-to-device (C2D) messages | Yes | SAS token, X.509 certificate |
| [OPC UA Server](./opcua-server/overview.md) | Pull | Client writes the variable node | — | Security policy, certificates, username/password |
| [WebSocket](./websocket/websocket.md) | Push | No | — | wss, mutual auth |
| [Kafka](./kafka/overview.md) | Push | No (producer only) | — | SASL, TLS |
| [Rules Engine Application](./ekuiper/overview.md) | Internal | Neuron sink writes back | — | — |

::: tip
Besides northbound applications, EMQX Neuron offers a RESTful API for reading and writing tags — see [HTTP API](../../api/api.md).
:::
