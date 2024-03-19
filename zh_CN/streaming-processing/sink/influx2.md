# InfluxDB 目标（Sink）

该插件将分析结果发送到 InfluxDB V2.X 中。

## 属性

| 属性名称    | 是否可选 | 说明                      |
| ----------- | -------- | ------------------------- |
| 地址        | 否       | InfluxDB 的地址           |
| Bucket      | 否       | InfluxDB 存储bucket       |
| Token       |  是      | InfluxDB 访问Token        |
| 组织         | 否       | InfluxDB 存储组织         |
| 时间精度  | 否       | 数据存储时间精度 |
| 时间戳字段名  | 是       | 时间戳字段名称 |
| 使用行协议  | 否       | 时间戳字段名称 |
| measurement | 否       | InfluxDB 的测量（如表名） |
| Fields     | 是       | InfluxDB 的标签值         |
| 标签       | 是       | InfluxDB 的标签键         |

其他通用的 sink 属性也支持，请参阅[公共属性](../overview.md#公共属性)。

