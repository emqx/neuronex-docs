# Data Forwarding

Data collected and processed by EMQX Neuron can be sent to cloud platforms, message queues, databases, and other external systems in two ways:

- [Northbound applications](../configuration/north-apps/north-apps.md): after southbound collection, publish directly to MQTT, Sparkplug B, Kafka, WebSocket, and more.
- [Data processing sinks](../streaming-processing/sink/sink.md): write rule results to external systems.

This section covers creating a northbound application, subscribing to southbound groups, and per-protocol setup. For writing rule results, see [Data Processing · Sink](../streaming-processing/sink/sink.md).
