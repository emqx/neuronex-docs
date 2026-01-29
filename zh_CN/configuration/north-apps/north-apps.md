# 创建北向应用

插件可以分为北向应用和南向驱动程序。北向插件通常用于连接到云平台或像处理引擎这样的外部应用程序。本节主要介绍如何在 NeuronEX 中创建北向应用。

目前 NeuronEX 主要支持以下北向插件：

- [MQTT 插件](./mqtt/overview.md)：NeuronEX 支持 MQTT 通讯协议。 NeuronEX MQTT 插件允许用户快速构建使用 MQTT 协议的物联网应用程序，可以在设备和云之间进行通讯。
- [Azure IoT 插件](./azure-iot/overview.md)：NeuronEX Azure IoT 插件允许用户通过 Azure IoT Hub 与 NeuronEX 进行数据交互。
- [AWS IOT 插件](./aws-iot/overview.md)：NeuronEX AWS IOT 插件允许用户通过 AWS IOT Core 与 NeuronEX 进行数据交互。
- [eKuiper 插件](./ekuiper/overview.md)：LF Edge [eKuiper](https://ekuiper.org/) 是 Golang 实现的轻量级物联网边缘分析、流式处理开源软件，可以运行在各类资源受限的边缘设备上。NeuronEX eKuiper 插件使用户能够将收集到的数据发布到 eKuiper 以进一步处理。 
- [Sparkplug B 插件](./sparkplugb/overview.md)：Sparkplug B 是一种建立在 MQTT 3.1.1 基础上的工业物联网数据传输规范。NeuronEX Sparkplug B 插件从设备采集到的数据可以通过 Sparkplug B 协议从边缘端传输到 Sparkplug B 应用中，用户也可以从应用程序向 NeuronEX 发送数据修改指令。
- [WebSocket 插件](./websocket/websocket.md)：WebSocket 网络协议支持在单个 TCP 连接上提供双向通信通道。借助 NeuronEX WebSocket 插件，用户可以将采集的数据推送到 WebSocket 服务器。
- [DataStorage 数据存储插件](./DataStorage/DataStorage.md)：DataStorage 插件用于将采集的数据存储到 NeuronEX 内置的 Datalayers 时序数据库中。
- [OPC UA Server插件](./opcua-server/overview.md)：OPC UA 是一种工业物联网数据传输规范。NeuronEX 支持将 OPC UA Server 作为北向应用，以便将南向设备的数据通过 OPC UA 服务暴露给上层系统或第三方客户端。通过 OPC UA Server，外部系统可以订阅数据变化、读取实时点位，以及下发控制命令。

