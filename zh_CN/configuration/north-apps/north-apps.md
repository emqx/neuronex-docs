# 创建北向应用

插件可以分为北向应用和南向驱动程序。北向插件通常用于连接到云平台或像处理引擎这样的外部应用程序。本节主要介绍如何在 NeuronEX 中创建北向应用。

目前 NeuronEX 主要支持四种北向插件：

- [MQTT 插件](./mqtt/mqtt.md)：NeuronEX 支持 MQTT 通讯协议。 NeuronEX MQTT 插件允许用户快速构建使用 MQTT 协议的物联网应用程序，可以在设备和云之间进行通讯。
- [eKuiper 插件](./ekuiper/ekuiper.md)：LF Edge [eKuiper](https://ekuiper.org/) 是 Golang 实现的轻量级物联网边缘分析、流式处理开源软件，可以运行在各类资源受限的边缘设备上。NeuronEX eKuiper 插件使用户能够将收集到的数据发布到 eKuiper 以进一步处理。 
- [Sparkplug B 插件](./sparkplugb/sparkplugb.md)：Sparkplug B 是一种建立在 MQTT 3.1.1 基础上的工业物联网数据传输规范。NeuronEX Sparkplug B 插件从设备采集到的数据可以通过 Sparkplug B 协议从边缘端传输到 Sparkplug B 应用中，用户也可以从应用程序向 NeuronEX 发送数据修改指令。
- [WebSocket 插件](./websocket.md)：WebSocket 网络协议支持在单个 TCP 连接上提供双向通信通道。借助 NeuronEX WebSocket 插件，用户可以将采集的数据推送到 WebSocket 服务器。


