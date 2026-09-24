# Databricks

采集到的点位数据要做长期存储和分析时，也可以落到湖仓平台。EMQX 没有直连 Databricks 的 Sink，走的是 **Amazon S3**：EMQX 把消息写进 S3，Databricks 通过外部位置（External Location）读取。

```
现场设备 → EMQX Neuron → EMQX Cloud / EMQX Enterprise → Amazon S3 → Databricks
```

边缘侧只维护一条 MQTT 链路，下游怎么落盘、怎么建模都在 EMQX 与 Databricks 侧配置，EMQX Neuron 不用动。

## 前置条件

- 一套可用的 EMQX Cloud 部署或自建 EMQX Enterprise，EMQX Neuron 已连上并在上报数据，见 [EMQX Cloud](./overview.md)
- Databricks 账号，且有创建工作区与外部位置的权限
- 一组对目标 S3 存储桶有读写权限的 AWS 访问密钥

::: tip
数据集成是 EMQX Enterprise 与 EMQX Cloud 的功能，开源版 EMQX 不包含。
:::

## EMQX Neuron 发出的报文

默认的 **values-format** 报文结构固定，整条报文会原样落到 S3，后面在 Databricks 中查询时按这个结构解析：

```json
{
  "node": "modbus-tcp",
  "group": "group-1",
  "timestamp": 1790219933821,
  "values": { "temperature": 23.5, "pressure": 1013 },
  "errors": {},
  "metas": {}
}
```

默认主题为 `/neuron/{应用名}/{驱动名}/{组名}`，可在每条订阅中自定义。存在多个工厂或产线时建议按层级命名，例如 `factory-a/line-1/modbus-tcp`，EMQX 侧用通配符一次订阅全部，见[数据上云 · 上报主题](../cloud.md#上报主题)。

## Databricks 侧准备

1. 创建工作区，记下它关联的 S3 存储桶名。
2. 在 **Catalog → External locations** 中新建外部位置，指向准备存放数据的路径，例如 `s3://<桶名>/neuron-data`。
3. 准备一组对该桶有读写权限的 AWS 访问密钥。

## 在 EMQX 中创建连接器与 Sink

连接器选 **Amazon S3**：

| 字段 | 取值 |
| --- | --- |
| 主机 | `s3.{region}.amazonaws.com` |
| 端口 | `443` |
| 访问密钥 ID、私有访问密钥 | 上一步的 AWS 凭据 |

Sink 的关键是对象键要落在外部位置指向的路径下：

| 字段 | 取值 |
| --- | --- |
| 存储桶 | Databricks 工作区关联的桶名 |
| 对象键 | `neuron-data/${clientid}_${timestamp}.json` |
| 对象内容 | `${payload}` |

规则 SQL 这里可以直接取整条报文，不需要摊平：

```sql
SELECT * FROM "/neuron/#"
```

## 在 Databricks 中查询

数据以 JSON 文件落在 S3，通过外部位置直接查：

```sql
SELECT
  payload:node        AS node,
  payload:group       AS group_name,
  payload:timestamp   AS ts,
  payload:values      AS tag_values
FROM json.`s3://<桶名>/neuron-data/`;
```

点位值在 `values` 这一层嵌套里，点位名就是键名，新增点位会自动出现在 JSON 中，不需要改这条查询。需要长期分析时，再把它加载成 Delta 表。

## 延伸阅读

- EMQX 文档：[Databricks 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/databricks.html)
- 点位集合稳定、要直接出报表时，见 [Snowflake](./snowflake.md)
- 全部可用的下游系统见 [EMQX 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/data-bridges.html)
- 上报量偏大时，可先在边缘做过滤与聚合再上报，见[在转发前处理数据](../../processing.md)
