# Redis 源

<span style="background:green;color:white">查询表</span>

NeuronEX 提供了对 redis 中数据查询的内置支持。请注意，现在 redis 源只能作为查询表使用。

## 创建查询表

Redis 源支持查询表。登录 NeuronEX，点击**数据流处理** -> **源管理**。在**查询表**页签，点击**创建查询表**。

- **表名称**：输入表名称
- **是否为带结构的表**：勾选确认是否为带结构的表，如为带结构的表，则需进一步添加表字段
  - **名称**：字段名称
  - **类型**：支持 bigint、float、string、datetime、boolean、array、struct、bytea
- **表类型**：选择 redis
- **数据源**（主题）：将要订阅的内存主题， 例如 topic1。类似 MQTT 主题。
- **配置组**：可使用默认配置组，也可点击添加配置组按钮，按照如下说明进行配置。设置完成后，可点击**测试连接**进行测试：
  - **名称**：输入配置组名称
  - **地址**：Redis 的地址, 例如: 10.122.48.17:6379
  - **用户名**：Redis 用户名
  - **密码**：Redis 登录密码
  - **数据类型**：选择 string 或者 list
- **表格式**：支持 json、binary、delimited、custom。
  - 如选择 custom，还应配置对应的[模式和模式消息](./config.md#模式)
  - 如选择 delimited，还应配置分隔符，如 ","

- **主键**：指定主键。

您也可选择通过文本模式进行配置，通过 SQL 定义。