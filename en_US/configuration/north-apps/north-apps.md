# Create northbound applications

Plugins can be divided into northbound applications and southbound drivers. Northbound plugins are usually used to connect to cloud platforms or external applications.

This section mainly introduces how to create northbound applications in NeuronEX.Currently NeuronEX mainly supports the following northbound plugins:

- [MQTT](./mqtt/overview.md): NeuronEX supports the MQTT communication protocol. The NeuronEX MQTT plugin allows users to quickly build IoT applications using the MQTT protocol, which can communicate between devices and the cloud.

- [Azure IoT](./azure-iot/overview.md): The NeuronEX Azure IoT plugin allows users to interact with NeuronEX through Azure IoT Hub.

- [AWS IOT](./aws-iot/overview.md): The NeuronEX AWS IOT plugin allows users to interact with NeuronEX through AWS IOT Core.
- [eKuiper](./ekuiper/overview.md): LF Edge [eKuiper](https://ekuiper.org/) is a lightweight IoT edge analytics and streaming processing open source software implemented in Golang that can run on various resource-constrained edge devices. The NeuronEX eKuiper plugin enables users to publish collected data to eKuiper for further processing.
- [SparkplugB](./sparkplugb/overview.md): SparkplugB is an industrial IoT data transmission specification based on MQTT 3.1.1. The data collected by the NeuronEX SparkplugB plugin from the device can be transmitted from the edge to the SparkplugB application via the SparkplugB protocol, and users can also send data modification instructions from the application to NeuronEX.
- [WebSocket](./websocket/websocket.md): The WebSocket network protocol supports providing a bidirectional communication channel on a single TCP connection. With the NeuronEX WebSocket plugin, users can push collected data to a WebSocket server.
- [DataStorage](./DataStorage/DataStorage.md): The DataStorage plugin is used to store collected data in the NeuronEX built-in Datalayers time-series database.
- [OPC UA Server](./opcua-server/overview.md): OPC UA is an industrial IoT data transmission specification. The NeuronEX OPC UA Server plugin supports exposing data from southbound devices to upper systems or third-party clients through OPC UA services. External systems can subscribe to data changes, read real-time data tags, and send control commands through OPC UA Server.