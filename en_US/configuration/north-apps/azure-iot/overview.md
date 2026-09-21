# Azure IoT

[Azure IoT Hub] enables reliable, secure bidirectional communications between IoT devices and its cloud-based services. It allows developers to receive messages from, and send messages to, IoT devices, acting as a central message hub for communication. It can also help organizations make use of data obtained from IoT devices, transforming IoT data into actionable insights.

The EMQX Neuron Azure IoT application is built on the [MQTT application] and comes preconfigured for Azure IoT Hub: supply the IoT hub hostname and device ID, then choose Shared Access Signature or X.509 certificate authentication. The upload and write-back topics are derived from the device ID automatically.

[MQTT application]: ../mqtt/overview.md
[Azure IoT Hub]: https://learn.microsoft.com/en-us/azure/iot/

## Add Application

To create a northbound node and connect it to Azure IoT Hub to upload data, navigate to **North Apps** and click **Add Application**.

- Name: The name of this application node, for example, "azure-iot".
- Application: Select the Azure IoT application.

## Configure Application

See the table below for the configuration parameters.

| Parameter                       | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| **Device ID**                   | Azure IoT Hub device ID.                                     |
| **QoS Level**                   | MQTT QoS level for message delivery, optional, default QoS 0. |
| **Upload Format**               | JSON format of reported data, a required field: <br /><br /> - *values-format*, data are split into `values` and `errors` sub-objects. <br />- *tags-format*, tag data are put in a single array. <br /><br />Same as the MQTT application, see [MQTT Upstream/Downstream Data Format](../mqtt/api.md#write-tag) |
| **IoT Hub Hostname**            | Azure IoT Hub hostname (full CName).                         |
| **Authentication**              | Azure IoT Hub device authentication method, uses either Shared Access Signature or X.509 Certificates. |
| **SAS Token**                   | SAS token, required if using Shared Access Signature authentication.   |
| **Root CA Certificate**         | CA certificate, required if using X.509 authentication.                |
| **Device Certificate**          | Device Certificate, required if using X.509 authentication.            |
| **Private Key**                 | Device Private Key, required if using X.509 authentication.            |
| **Offline Data Caching**        | Offline data caching switch. Cache MQTT messages when offline, and sync cached messages when back online. |
| **Cache Memory Size**           | In-memory cache limit (MB) in case of communication failure, a required field. Range in [0, 1024]. Should not be larger than *Cache Disk Size*. |
| **Cache Disk Size**             | In-disk cache limit (MB) in case of communication failure, a required field. Range in [0, 10240]. If nonzero, *cache-mem-size* should also be nonzero. |
| **Cache Sync Interval**         | Time interval (MS) between each message to sync when communication restores. Range in [10, 120000].  |


## Add Subscription

After application configuration, data delivery can be enabled via southbound device subscriptions.

Click the north app on the **North Apps** page, then **Add Subscription** on the **Group List** page. And set the following:

- **South device**: Select the southbound device to subscribe to, for example, 'modbus-tcp-1'.
- **Group**: Select a group from the southbound device, for example, 'group-1'.

Select the desired southbound device (e.g., 'modbus-tcp-1') and group (e.g., 'group-1').

After the Azure IoT application connects successfully,  it will send messages to Azure IoT Hub using the MQTT topic `devices/{device-id}/messages/events/`, where `{device-id}` is the **Device ID**.

The exact format of the data reported is controlled by the **Upload Format** parameter, and the behavior is the same as that of the MQTT application. For more detailed information, see [MQTT Upstream/Downstream Data Format](../mqtt/api.md#data-upload)

## Write tags using cloud-to-device messages

The Azure IoT application subscribes to the MQTT topic `devices/{device-id}/messages/devicebound/#` to receive cloud-to-device (C2D) write requests from Azure IoT Hub, and publishes the write result to the upstream topic `devices/{device-id}/messages/events/`. `{device-id}` is the **Device ID**.
The write request data format is the same as the MQTT application, see [MQTT Upstream/Downstream Data Format](../mqtt/api.md#write-tag).

## Tutorial

[Bridging Data to Azure IoT Hub using EMQX Neuron](./example.md) demonstrates how to use the Azure IoT application to connect to Azure IoT Hub.
