# SQL 目标（Sink）

<span style="background:green;color:white">updatable</span>

此插件将结果写入 SQL 数据库。



## 属性

| 属性名称       | 是否可选 | 说明                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| 数据库地址            | 否       | 目标数据库的url                                              |
| 表名          | 否       | 结果的表名                                                   |
| 标签字段         | 是       | 要插入的字段。结果映射和数据库都应该有这些字段。如果未指定，将插入结果映射中的所有字段 |


其他通用的 sink 属性也支持，请参阅[公共属性](./sink.md#公共属性)。

## 数据库连接地址

数据库连接地址参考：

| database   | url sample                                            |
| ---------- | ----------------------------------------------------- |
| mysql      | mysql://username:password@127.0.0.1:3306/testdb |
| sql server | sqlserver://username:password@127.0.0.1:1433/testdb  |
| postgres   | postgres://username:password@127.0.0.1:5432/testdb             |
| oracle     | oracle://username:password@127.0.0.1:1521/testdb               |
| sqlite     | sqlite:/tmp/test.db                             |

::: tip 注意
  部分 PG 服务端（尤其是未配置 SSL 时）会直接拒绝“尝试 SSL 连接”的请求，从而抛出 `pq: SSL is not enabled on the server` 错误。此时 PostgreSQL 数据库连接地址需要添加 `sslmode=disable` 参数。即，`postgres://username:password@127.0.0.1:5432/testdb?sslmode=disable`

:::

## 示例

下面是一个将数采模块采集到的设备数据写入 MySQL 数据库的示例

* 在SQL编辑器中筛选需要存入 MySQL 的点位：`deviceid`、`devicename`、`temp`

<img src="../_assets/sql_sink_example1.png" alt="sql_sink_example1" style="zoom:100%;" />

* 添加 SQL Sink动作
  * 点击`测试连接`按钮，测试数据库连接状态
  * 向 MySQL 数据库`test`的表`table1`中写入`deviceid`、`devicename`、`temp`数据。

<img src="../_assets/sql_sink_example2.png" alt="sql_sink_example2" style="zoom:100%;" />

::: tip 注意
  需要在 MySQL 数据库中提前创建表`table1`，并存在相同列名为`deviceid`、`devicename`、`temp`的字段，且数据类型要保持一致。
:::