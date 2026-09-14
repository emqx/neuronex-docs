# 数据转发

采集和处理后的数据可以送到云平台、消息队列、数据库等外部系统，有两条路径：

- [北向应用](../configuration/north-apps/north-apps.md)：南向驱动采集后直接上报 MQTT、Sparkplug B、Kafka、WebSocket 等。
- [数据处理 Sink](../streaming-processing/sink/sink.md)：规则处理后再写入外部系统。

本栏目介绍如何创建北向应用、订阅南向数据组，以及各北向协议的配置。规则结果如何写出，见 [数据处理 · 动作 (Sink)](../streaming-processing/sink/sink.md)。
