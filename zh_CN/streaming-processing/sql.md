# Sql 源

<span style="background:green;color:white;padding:1px;margin:2px">流</span>
<span style="background:green;color:white;padding:1px;margin:2px">扫描表</span>
<span style="background:green;color:white;padding:1px;margin:2px">查询表</span>

NeuronEX 数据处理模块通过 `SQL` 类型的数据源，支持对接`sqlserver`、`postgres`、`mysql`、`sqlite3`和`oracle`等数据库，可以定期查询数据库以获取数据流。

## 创建流

登录 NeuronEX，点击**数据流处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段。可默认不勾选。
- **流类型**：选择 SQL
- **配置组**：可编辑使用默认配置组，或点击添加配置组，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：

  - **名称**：输入配置组名称。
  - **数据库地址**：数据库的连接地址，各类数据库的详细配置请参考 [数据库连接地址](#数据库连接地址) 。
  - **间隔时间**：发出查询的时间间隔（毫秒）。
  - **TemplateSql**：SQL 语句模板，详见[SQL 语句模板示例](#sql-语句模板示例)。
  - **indexField**：可选参数，表的哪一列作为索引来记录偏移量。
  - **indexValue**：可选参数，初始索引值，如果用户指定该字段，查询将使用这个初始值作为查询条件，当获得更大的值时将更新下一个查询。 
  - **indexFieldType**：可选参数，索引字段的列类型,如果是 dateTime 类型，必须将该字段设置为 DATETIME。
  - **dateTimeFormat**：可选参数，索引字段的时间格式。
- **流格式**：默认 json 格式。
- **共享**：勾选确认是否共享源。

### 数据库连接地址

数据库连接地址参考：

| database   | url sample                                            |
| ---------- | ----------------------------------------------------- |
| mysql      | mysql://username:password@127.0.0.1:3306/testdb?parseTime=true |
| sql server | sqlserver://username:password@127.0.0.1:1433/testdb  |
| postgres   | postgres://username:password@127.0.0.1:5432/testdb             |
| oracle     | oracle://username:password@127.0.0.1:1521/testdb               |
| sqlite     | sqlite:/tmp/test.db                             |

### SQL 语句模板示例

- 通过单独使用`TemplateSql`配置项，获取数据库数据。
  
  TemplateSql输入：
  ```sql
  select top 10 * from Student where id > 1010 order by id ASC
  ```
  向数据库执行的输出：
  ```sql
  select top 10 * from Student where id > 1010 order by id ASC
  ```

- 通过`TemplateSql`配置项和`indexField`、`indexValue`组合使用，获取数据库数据。

  indexField输入：`stun`
  
  indexValue输入：`100`

  TemplateSql输入：
  ```sql
  select * from Student where stun > {{.stun}} limit 10
  ```
  向数据库执行的输出：
  ```sql
  select * from Student where stun > 100 limit 10
  ```
- 通过`TemplateSql`配置项和`indexField`、`indexValue`、`indexFieldType`、`dateTimeFormat`组合使用，获取数据库数据。

  indexField输入：`registerTime`
  
  indexValue输入：`2022-04-21 10:23:55`

  indexFieldType：`DATETIME`

  dateTimeFormat：`YYYY-MM-dd HH:mm:ss`

  TemplateSql输入：
  ```sql
  select * from Student where registerTime > '{{.registerTime}}' order by registerTime ASC limit 10
  ```
  向数据库执行的输出：
  ```sql
  select * from Student where registerTime > '2022-04-21 10:23:55' order by registerTime ASC limit 10
  ```

## 创建扫描表

请参考[创建流](#创建流)部分。

## 创建查询表

SQL 源支持成为一个查询表。我们可以使用创建表语句来创建一个 SQL 查询表。它将与实体关系数据库绑定并按需查询。

```text
CREATE TABLE alertTable() WITH (DATASOURCE="tableName", CONF_KEY="sqlite_config", TYPE="sql", KIND="lookup")
```

### 查询缓存

查询外部数据库比在内存中计算要慢。如果吞吐量很高，可以使用查找缓存来提高性能。如果不启用查找缓存，那么所有的请求都被发送到外部数据库。当启用查找缓存时，每个查找表实例将持有一个缓存。当查询时，我们将首先查询缓存，然后再发送到外部数据库。

缓存的配置在 `sql.yaml` 中。

```yaml
  lookup:
    cache: true
    cacheTtl: 600
    cacheMissingKey: true
```

* cache: bool 值，表示是否启用缓存。
* cacheTtl: 缓存的生存时间，单位是秒。
* cacheMissingKey：是否对空值进行缓存。
