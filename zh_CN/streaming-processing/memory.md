# 内存源

<span style="background:green;color:white;">流</span>        <span style="background:green;color:white">扫描表</span>  <span style="background:green;color:white">查询表</span>

内存源获取 NeuronEX 流处理模块内存中保存的数据流事件。内存动作的典型用途是形成 [**规则流水线**](./rule_pipeline.md)，将上一个规则处理的结果放在 [**内存 Sink**](./sink/memory.md) 中，然后再通过内存源获取数据，形成规则流水线。

内存源通过`数据源（主题）`消费由 内存 Sink 生成的事件，主题消费该主题类似于 pubsub 主题，例如 MQTT，因此可能有多个内存目标发布到同一主题，也可能有多个内存源订阅同一主题。详情查阅[主题通配符](#主题通配符)

## 创建流

登录 NeuronEX，点击**数据处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段。可默认不勾选。
- **流类型**：选择 memory
- **数据源（主题）**：将要订阅的内存主题， 例如 topic1。详情查阅[主题通配符](#主题通配符)


## 主题通配符

内存源也支持主题通配符，与 MQTT 主题类似。 目前，支持两种通配符。

**+** : 单级通配符替换一个主题等级。

**#**: 多级通配符涵盖多个主题级别，只能在结尾使用。

示例：

1. `home/device1/+/sensor1`
2. `home/device1/#`

## 创建扫描表

内存源支持查询表。登录 NeuronEX，点击**数据处理** -> **源管理**。在**扫描表**页签，点击**创建扫描表**。

- **表名称**：输入表名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段。可默认不勾选。
- **表类型**：选择 memory
- **数据源**（主题）：将要订阅的内存主题， 例如 topic1。类似 MQTT 主题。详情查阅[主题通配符](#主题通配符)
- **保留大小**：指定保留大小。

## 创建查询表

内存源支持用作查询表，此时，主要具备如下优势：

- **独立性**：内存查找表独立于任何规则操作。即使规则被修改或删除，内存查找表中的数据也不受影响。
数据共享：如果多个规则引用相同的表，或者存在具有相同主题/键对的多个内存表，则它们全部共享相同的数据集，确保了不同规则之间的一致性，简化了数据访问。
- **与内存 Sink 集成**：内存查找表可通过与可更新的 [内存 Sink](./sink/memory.md#更新) 集成，保证内容的实时性。
- **规则流水线**：内存查找表可以作为多个规则之间的桥梁，类似于规则流水线的概念。它使一个流能够将历史数据存储在内存中，其他流可以访问和利用这些数据，因此适用于需要结合历史数据和实时数据进行决策的场景。

登录 NeuronEX，点击**数据处理** -> **源管理**。在**查询表**页签，点击**创建查询表**。

- **表名称**：输入表名称
- **是否为带结构的表**：勾选确认是否为带结构的表，如为带结构的表，则需进一步添加表字段。可默认不勾选。
- **表类型**：选择 memory
- **数据源**（主题）：将要订阅的内存主题， 例如 topic1。类似 MQTT 主题。详情查阅[主题通配符](#主题通配符)
- **主键**：指定主键。

:::tip 提示
作为查询表使用时，还应配置 KEY 属性，它将作为虚拟表的主键来加速查询。创建完成后，内存查找表将开始从指定的内存主题累积数据，并通过 KEY 字段进行索引，允许快速检索。


:::