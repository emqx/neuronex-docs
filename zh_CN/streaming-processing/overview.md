# 数据流处理

在边缘侧，大部分数据都是以连续流的形式诞生，如传感器事件等。随着物联网的广泛应用，越来越多的边缘计算节点需要访问云网络并产生大量的数据。为了降低通信成本，减少云端的数据量，同时提高数据处理的实时性，达到本地及时响应的目的，同时在网络断开的情况下进行本地及时数据处理，NeuronEX 支持在边缘进行实时的流处理。

## 架构

NeuronEX 数据流处理部分的架构如下：

![arch](./_assets/arch.png)

## 流处理的特点

流处理具有以下特点：

- 无界数据：流数据是一种不断增长的、无限的数据集，不能作为一个整体来操作。
- 无界的数据处理：由于适用于无界数据，流处理本身也是无界的。与批处理相比，工作负载可以均匀地分布在不同的时间。
- 低延迟、近实时：流处理可以在数据产生后就进行处理，以极低的延迟获得结果。

流处理将应用和分析统一起来。这简化了整个基础设施，因为许多系统可以建立在一个共同的架构上，也允许开发人员建立应用程序，使用分析结果来响应数据中的洞察力，以采取行动。

## 关键概念

### 源管理

[源](./source.md)提供了与外部系统的连接，以便将数据加载进来。在规则中，根据数据使用逻辑，数据源可作为流或者表使用。 

- [流](./stream.md)：流是 NeuronEX 中数据源连接器的运行形式，用户可通过指定源类型来定义如何连接到外部资源。流的作用就像规则的触发器，每个事件都会触发规则中的计算。

- [表](./tables.md)：表 （**Table**） 用于表示流的当前状态。它可以被认为是流的快照，您可通过表对数据进行批处理。

  - [扫描表](./scan.md)：像一个由事件驱动的流一样，逐个加载数据事件。该模式的源可以用在流或扫描表中。

  - [查询表](./lookup.md)：在需要时引用外部内容，只用于查找表。

目前 NeuronEX 内置以下数据源：

- [文件](./file.md)：从文件中读取数据，通常用作表格，可以作为流、扫描表的数据源；
- [内存](./memory.md)：从 eKuiper 内存主题读取数据以形成规则管道，可以作为流、扫描表和查询表的数据源；
- [HTTP pull](./http_pull.md)：从 HTTP 服务器中拉取数据，可以作为流、扫描表的数据源；
- [HTTP push](./http_push.md)：通过 http 推送数据到 eKuiper，可以作为流、扫描表的数据源；
- [MQTT](./mqtt.md)：从 MQTT 主题读取数据，可以作为流、扫描表的数据源；
- [Neuron](./neuron.md): 从本地 Neuron 实例读取数据，可以作为流、扫描表的数据源；
- [Redis](./redis.md)：从 Redis 中查询数据，可以作为查询表的数据源。

### [规则](./rules.md)

规则代表了一个流处理流程，定义了从将数据输入流的数据源、到各种处理逻辑，再到将数据输入到外部系统的动作。您可通过两种方法来定义规则的业务逻辑，可视化模式或文本模式，在

- [Sink](./sink/sink.md)：在 NeuronEX，Sink 用来向外部系统写入数据，分为内置动作和扩展动作两类。
  
  - 内置动作
    - [MQTT sink](./sink/mqtt.md)：输出到外部 mqtt 服务。
    - [Neuron sink](./sink/neuron.md)：输出到本地的 Neuron 实例。
    - [EdgeX sink](./sink/edgex.md)：输出到 EdgeX Foundry。此动作仅在启用 edgex 编译标签时存在。
    - [Rest sink](./sink/rest.md)：输出到外部 http 服务器。
    - [Redis sink](./sink/redis.md): 写入 Redis 。
    - [File sink](./sink/file.md)： 写入文件。
    - [Memory sink](./sink/memory.md)：输出到 eKuiper 内存主题以形成规则管道。
    - [Log sink](./sink/log.md)：写入日志，通常只用于调试。
    - [Nop sink](./sink/nop.md)：不输出，用于性能测试。
  
  
  - 扩展动作
    - [SQL sink](./sink/sql.md)：写入 SQL 数据库。
    - [InfluxDB sink](./sink/influx.md)： 写入 Influx DB `v1.x`。
    - [InfluxDBV2 sink](./sink/influx2.md)： 写入 Influx DB `v2.x`。
    - [Tdengine sink](./sink/tdengine.md)： 写入 Tdengine 。
    - [Image sink](./sink/image.md)： 写入一个图像文件。仅用于处理二进制结果。
    - [ZeroMQ sink](./sink/zmq.md)：输出到 Zero MQ 。
    - [Kafka sink](./sink/kafka.md)：输出到 Kafka 。

### [扩展](./extension.md)

NeuronEX 允许用户自定义扩展，以支持更多功能。 用户可以通过原生 golang 插件系统编写扩展插件，或者通过eKuiper portable 插件系统编写扩展插件，后者支持更多语言。此外，用户也可以通过配置的方式扩展 SQL 中的函数，用于调用外部已有的 REST 或 RPC 服务。您可通过[扩展](./extension.md)页面创建插件、注册外部服务或创建便捷插件。

### [配置](./config.md)

配置页面介绍如何进行资源配置，如配置组和传输与存储模版、连接、模式以及文件管理。

