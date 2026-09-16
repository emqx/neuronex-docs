# 在转发前处理数据

采集到的数据可以原样上报，也可以先经规则引擎加工再上报。本页说明这一步在配置流程中怎么接，完整的规则引擎能力见[数据处理](../streaming-processing/overview.md)。

## 是否需要这一步

| 情形 | 处理方式 |
| --- | --- |
| 云端或上位系统需要完整的原始数据 | 跳过本步，直接进入[创建北向应用](./north-apps/north-apps.md) |
| 采集频率远高于业务需要 | 用时间窗口聚合后上报，数据量可降两个数量级 |
| 稳态下数值长时间不变 | 条件过滤，仅在变化超过阈值时上报 |
| 告警需要秒级响应 | 判断逻辑放在边缘，不必等待云端往返，断网时仍然有效 |
| 上报前需统一单位或字段名 | 在边缘完成一次，胜过在每个下游系统各做一次 |

两条路径可同时存在：一部分采集组直接上报，另一部分先进规则引擎。

::: tip
只是做线性换算（乘系数、偏移量）或控制小数位数，不需要规则引擎——在点位上配置即可，见[组与点位 · 数据加工](./groups-tags/groups-tags.md#数据加工)。
:::

## 三步接入

**1. 让采集数据进入规则引擎**

规则引擎以一个北向应用的形式接收南向数据。在 **数据采集 → 北向应用** 页找到默认已存在的**规则引擎应用**（节点名 `DataProcessing`），点击 `添加订阅`，选择要处理的南向驱动和采集组。

订阅之后，该组的点位进入规则引擎的 `neuronStream` 数据流。详见[规则引擎应用](./north-apps/ekuiper/overview.md)。

**2. 新建规则**

在 **数据处理 → 规则** 页新建规则，用 SQL 描述要做的加工。例如只保留变化超过阈值的数据：

```sql
SELECT * FROM neuronStream WHERE abs(pressure - lag(pressure)) > 0.5
```

SQL 能力见 [SQL 参考](../streaming-processing/sqls/overview.md)，时间窗口聚合见[窗口](../streaming-processing/sqls/windows.md)。

**3. 指定结果去向**

为规则添加**动作 (Sink)**，决定处理结果发往何处：

| 去向 | 用什么 |
| --- | --- |
| 直接写入外部系统 | MQTT、Kafka、MySQL、InfluxDB、Redis、AWS S3 等，见[动作 (Sink)](../streaming-processing/sink/sink.md) |
| 写回设备 | [Neuron 动作](../streaming-processing/sink/neuron.md)，构成「采集 → 判断 → 控制」的边缘闭环 |
| 交给下一条规则 | [内存 Sink](../streaming-processing/sink/memory.md)，构成[规则流水线](../streaming-processing/rule_pipeline.md) |

::: warning
规则的动作与北向应用是两条独立的出口。经规则处理的数据由**动作**发出，不会再经过北向应用；若两者都配置了，同一份采集数据会被上报两次。
:::

## 验证

创建规则时开启[规则调试](../streaming-processing/rule_test.md)，可实时查看 SQL 的输出是否符合预期，不必等到数据落到下游再排查。

完整的动手演练见[第一条规则](../streaming-processing/first-rule.md)。

## 下一步

- 不经规则直接上报，或规则结果仍需经北向应用发出 —— [创建北向应用](./north-apps/north-apps.md)
- 规则引擎的数据源、SQL、窗口、动作与算法集成 —— [数据处理](../streaming-processing/overview.md)
