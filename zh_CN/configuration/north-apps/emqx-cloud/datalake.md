# 数据桥接到 Snowflake 与 Databricks

采集到的点位数据要做长期存储和分析时，通常落到数据仓库或湖仓平台。EMQX Neuron 不直接对接这类平台——它把数据发到 EMQX，由 EMQX 的数据集成写入下游：

```
现场设备 → EMQX Neuron → EMQX Cloud / EMQX Enterprise → Snowflake / Databricks
```

这样分工的好处是边缘侧只维护一条 MQTT 链路。下游换成别的仓库、或者同时写多个仓库，都在 EMQX 侧配置，EMQX Neuron 不用动。

本文介绍链路两端怎么对齐：EMQX Neuron 发出什么样的报文，EMQX 侧的规则怎么把它映射成表的列。云平台本身的配置以 EMQX 官方文档为准，文中给出对应链接。

## 前置条件

- 一套可用的 EMQX Cloud 部署或自建 EMQX Enterprise，EMQX Neuron 已连上并在上报数据，见 [EMQX Cloud](./overview.md)
- Snowflake 或 Databricks 账号，且有创建数据库、表、存储位置的权限

::: tip
数据集成是 EMQX Enterprise 与 EMQX Cloud 的功能，开源版 EMQX 不包含。
:::

## EMQX Neuron 发出的报文

默认的 **values-format** 报文结构固定，这是后续所有映射的依据：

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

点位值在 `values` 这一层嵌套里，**点位名就是键名**。这一点决定了下面规则 SQL 的写法。

## 桥接到 Snowflake

Snowflake 有两种写入模式：**聚合模式**先把消息攒成 CSV 文件上传到 Stage，再由 Snowpipe 加载进表；**流式模式**通过 Snowpipe Streaming API 逐行实时写入。点位数据量大、允许分钟级延迟时用聚合模式更省成本；要求秒级可见时用流式模式。

### Snowflake 侧准备

创建数据库、Schema 和接收表。表的列要和后面规则 SQL 选出的字段一一对应：

```sql
CREATE DATABASE IF NOT EXISTS neuron_data;
CREATE SCHEMA   IF NOT EXISTS neuron_data.public;

CREATE TABLE IF NOT EXISTS neuron_data.public.telemetry (
  node                STRING,
  group_name          STRING,
  publish_received_at TIMESTAMP_NTZ,
  temperature         DOUBLE,
  pressure            DOUBLE
);
```

再创建 Stage、Pipe，以及一个具备管道操作权限的用户和角色。流式模式还需要为该用户配置 RSA 密钥对认证：

```shell
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out snowflake_rsa_key.private.pem -nocrypt
openssl rsa -in snowflake_rsa_key.private.pem -pubout -out snowflake_rsa_key.public.pem
```

完整的对象创建语句与授权见 EMQX 文档的 [Snowflake 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/snowflake.html)。

### 在 EMQX 中创建连接器

聚合模式选 **Snowflake（ODBC）**，流式模式选 **Snowflake（Streaming API）**。主要字段：

| 字段 | 取值 |
| --- | --- |
| 服务器地址 | `org-account.snowflakecomputing.com` |
| 账户 | `org-account`，即组织 ID 与账户名 |
| 用户名 | 前面创建的管道用户 |
| 密码或私钥路径 | 聚合模式二选一；**流式模式必须用私钥** |
| 启用 TLS | 流式模式必须开启 |

### 创建规则

规则 SQL 负责把 EMQX Neuron 的嵌套报文摊平成表的列。

::: warning
**不要用 `SELECT *`。** Snowflake Sink 要求选出的字段名与数量和目标表的列完全一致，多一列少一列都会写入失败。
:::

```sql
SELECT
  payload.node                                          as node,
  payload.group                                         as group_name,
  unix_ts_to_rfc3339(publish_received_at, 'millisecond') as publish_received_at,
  payload.values.temperature                            as temperature,
  payload.values.pressure                               as pressure
FROM
  "/neuron/#"
```

`payload.values.温度点位名` 就是取 EMQX Neuron 报文里的点位值。**需要入库哪些点位，就在这里列哪些**，并保证表里有同名的列。点位增减时，表结构和这条 SQL 要一起改。

### 添加 Sink

聚合模式选 **Snowflake** 类型，填数据库名、Schema、Stage、Pipe、管道用户与私钥，另外两个参数决定上传节奏：

| 参数 | 说明 |
| --- | --- |
| 最大记录数 | 攒够这么多条就上传一次 |
| 时间间隔 | 距上次上传超过这么多秒就上传一次 |

两者谁先满足就触发。点位采集周期 1 秒、单组 20 个点位时，默认的 1000 条约合 50 秒一个文件。

流式模式选 **Snowflake-Streaming** 类型，填数据库名、Schema 和流式 Pipe 名即可，没有攒批参数。

## 桥接到 Databricks

EMQX 没有直连 Databricks 的 Sink，走的是 **Amazon S3**：EMQX 把消息写进 S3，Databricks 通过外部位置（External Location）读取。

### Databricks 侧准备

1. 创建工作区，记下它关联的 S3 存储桶名。
2. 在 **Catalog → External locations** 中新建外部位置，指向准备存放数据的路径，例如 `s3://<桶名>/neuron-data`。
3. 准备一组对该桶有读写权限的 AWS 访问密钥。

### 在 EMQX 中创建连接器与 Sink

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

### 在 Databricks 中查询

数据以 JSON 文件落在 S3，通过外部位置直接查：

```sql
SELECT
  payload:node        AS node,
  payload:group       AS group_name,
  payload:timestamp   AS ts,
  payload:values      AS tag_values
FROM json.`s3://<桶名>/neuron-data/`;
```

需要长期分析时，再把它加载成 Delta 表。

## 两条路径怎么选

| | Snowflake | Databricks |
| --- | --- | --- |
| 对接方式 | 原生连接器 | 经 Amazon S3 |
| 数据形态 | 结构化表，列在规则里定义 | 原始 JSON 文件，查询时解析 |
| 点位增减 | 要同时改表结构和规则 SQL | 不用改，新点位自动出现在 JSON 里 |
| 适合 | 点位集合稳定、要直接出报表 | 点位多变、先入湖再建模 |

## 延伸阅读

- EMQX 文档：[Snowflake 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/snowflake.html)、[Databricks 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/databricks.html)
- 全部可用的下游系统见 [EMQX 数据集成](https://docs.emqx.com/zh/emqx/latest/data-integration/data-bridges.html)
- 上报量偏大时，可先在边缘做过滤与聚合再上报，见[在转发前处理数据](../../processing.md)
