# 创建北向应用

插件可以分为北向应用和南向驱动程序。北向插件通常用于连接到云平台或像处理引擎这样的外部应用程序。本节主要介绍如何在 ECP Edge 中创建北向应用。

目前 ECP Edge 主要支持四种北向插件：

- [Monitor 插件](./monitor.md)：ECP Edge 在启动时创建一个 Monitor 单例节点，用于监控运行的 ECP Edge 实例。您可以在仪表板的**北向应用**页签中看到 Monitor 节点。
- [eKuiper 插件](./ekuiper/ekuiper.md)：LF Edge [eKuiper](https://ekuiper.org/) 是 Golang 实现的轻量级物联网边缘分析、流式处理开源软件，可以运行在各类资源受限的边缘设备上。ECP Edge eKuiper 插件使用户能够将收集到的数据发布到 eKuiper 以进一步处理。 
- [MQTT 插件](./mqtt/mqtt.md)：ECP Edge 支持 MQTT 通讯协议。 ECP Edge MQTT 插件允许用户快速构建使用 MQTT 协议的物联网应用程序，可以在设备和云之间进行通讯。
- [Sparkplug B 插件](./sparkplugb/sparkplugb.md): Sparkplug B 是一种建立在 MQTT 3.1.1 基础上的工业物联网数据传输规范。ECP Edge Sparkplug B 插件从设备采集到的数据可以通过 Sparkplug B 协议从边缘端传输到 Sparkplug B 应用中，用户也可以从应用程序向 ECP Edge 发送数据修改指令。

