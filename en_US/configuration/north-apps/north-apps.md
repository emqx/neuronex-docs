# Create northbound applications

Plugins can be divided into northbound applications and southbound drivers. Northbound plugins are usually used to connect to cloud platforms or external applications.

This section mainly introduces how to create northbound applications in EMQX Neuron.Currently EMQX Neuron mainly supports the following northbound plugins:

- [MQTT](./mqtt/overview.md): EMQX Neuron supports the MQTT communication protocol. The EMQX Neuron MQTT plugin allows users to quickly build IoT applications using the MQTT protocol, which can communicate between devices and the cloud.

- [Azure IoT](./azure-iot/overview.md): The EMQX Neuron Azure IoT plugin allows users to interact with EMQX Neuron through Azure IoT Hub.

- [AWS IOT](./aws-iot/overview.md): The EMQX Neuron AWS IOT plugin allows users to interact with EMQX Neuron through AWS IOT Core.
- [eKuiper](./ekuiper/overview.md): LF Edge [eKuiper](https://ekuiper.org/) is a lightweight IoT edge analytics and streaming processing open source software implemented in Golang that can run on various resource-constrained edge devices. The EMQX Neuron eKuiper plugin enables users to publish collected data to eKuiper for further processing.
- [SparkplugB](./sparkplugb/overview.md): SparkplugB is an industrial IoT data transmission specification based on MQTT 3.1.1. The data collected by the EMQX Neuron SparkplugB plugin from the device can be transmitted from the edge to the SparkplugB application via the SparkplugB protocol, and users can also send data modification instructions from the application to EMQX Neuron.
- [WebSocket](./websocket/websocket.md): The WebSocket network protocol supports providing a bidirectional communication channel on a single TCP connection. With the EMQX Neuron WebSocket plugin, users can push collected data to a WebSocket server.
- [DataStorage](./DataStorage/DataStorage.md): The DataStorage plugin is used to store collected data in the EMQX Neuron built-in Datalayers time-series database.
- [OPC UA Server](./opcua-server/overview.md): OPC UA is an industrial IoT data transmission specification. The EMQX Neuron OPC UA Server plugin supports exposing data from southbound devices to upper systems or third-party clients through OPC UA services. External systems can subscribe to data changes, read real-time data tags, and send control commands through OPC UA Server.
- [Kafka](./kafka/overview.md): Kafka is a distributed streaming processing platform. The EMQX Neuron Kafka plugin enables users to publish collected data to Kafka for further processing.