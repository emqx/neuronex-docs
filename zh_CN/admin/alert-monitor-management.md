# 监控告警管理

EMQX Neuron 提供指标监控与告警事件两项能力，用于掌握实例运行状态并在异常发生时得到通知。

::: tip
两项能力**默认均为关闭**，且只能通过 HTTP API 下发配置与查询，控制台上没有对应的配置界面。是否生效同样通过 API 查询确认。
:::

## 监控指标

可采集的指标分三类：

| 类别 | 包含内容 |
| --- | --- |
| 数据采集引擎 | 南北向驱动数量、驱动连接状态、异常驱动数 |
| 数据处理引擎 | 规则的记录输入与输出数量、已停止的规则数 |
| 系统资源 | CPU、内存等 |

下发监控配置时可指定需要哪些指标。获取方式有两种：

| 方式 | 说明 |
| --- | --- |
| 推送到 Pushgateway | 配置 [Pushgateway](https://github.com/prometheus/pushgateway) 地址后，EMQX Neuron 自动将指标推送过去，由 Prometheus 拉取 |
| API 查询 | 直接调用接口读取当前指标 |

配置与查询接口见 [Monitor API](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html#tag/monitor/operation/MetricConfig)。

## 告警事件

EMQX Neuron 以轮询方式判断告警事件。下发告警配置时指定启用哪些规则，以及触发和恢复各自需要连续监控的次数——**N 值**为触发前需连续监控到异常的次数，**P 值**为恢复前需连续监控到正常的次数。

| 告警类型 | 告警对象 | 触发条件 | 触发事件生成条件 | 恢复事件生成条件 |
| --- | --- | --- | --- | --- |
| 数采驱动节点异常（含南向与北向） | 单个驱动 | 驱动处于运行中但未连接状态 | 连续监控 N 次 | 连续监控非异常状态 P 次 |
| 流处理引擎规则异常 | 单个规则 | 规则的任意 source、op 或 sink 异常数增加 | 连续监控 N 次 | 连续监控非异常状态 P 次 |
| EMQX Neuron 重启 | 当前实例 | EMQX Neuron 发生重启 | 监控到 1 次 | 无 |

获取方式有两种：

| 方式 | 说明 |
| --- | --- |
| 推送到 Webhook | 配置 Webhook 地址后，EMQX Neuron 自动将告警事件推送过去 |
| API 查询 | 查询最近产生的告警事件 |

配置与查询接口见 [Alert Rule API](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html#tag/monitor/operation/AlertRuleConfig)。
