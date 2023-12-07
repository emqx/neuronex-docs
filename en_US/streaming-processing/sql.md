# Sql 

<span style="background:green;color:white;padding:1px;margin:2px">Stream</span>
<span style="background:green;color:white;padding:1px;margin:2px">Scan table</span>
<span style="background:green;color:white;padding:1px;margin:2px">Lookup table</span>

The NeuronEX data processing module supports docking with databases such as `sqlserver`, `postgres`, `mysql`, `sqlite` and `oracle` through `SQL` type data sources, and can query the database regularly to obtain data streams.

## Create stream

Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Stream Management** tab, click **Create Stream**.

In the pop-up **Source**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Check to confirm whether it is a structured stream. If it is a structured stream, you need to add further stream fields. It can be unchecked by default.
- **Stream Type**: Select SQL
- **Configuration key**: You can edit and use the default configuration key, or click to add a configuration key and make the following settings in the pop-up dialog box. 

   - **Name**: Enter the configuration key name.
   - **Database Address**: The connection address of the database. For detailed configuration of various databases, please refer to [Database Connection Address](#database-connection-address).
   - **Interval**: The time interval (milliseconds) between issuing queries.
   - **TemplateSql**: SQL statement template, see [SQL statement template example](#sql-statement-template-example) for details.
   - **indexField**: Optional parameter, which column of the table is used as an index to record the offset.
   - **indexValue**: Optional parameter, initial index value. If the user specifies this field, the query will use this initial value as the query condition, and the next query will be updated when a larger value is obtained.
   - **indexFieldType**: Optional parameter, column type of the index field. If it is dateTime type, the field must be set to DATETIME.
   - **dateTimeFormat**: optional parameter, the time format of the index field.
- **Stream format**: Default json format.
- **Shared**: Check to confirm whether to share the source.

### Database connection address

Database connection address reference:

| database | url sample |
| ---------- | --------------------------------------------------------- |
| mysql | mysql://username:password@127.0.0.1:3306/testdb?parseTime=true |
| sql server | sqlserver://username:password@127.0.0.1:1433/testdb |
| postgres | postgres://username:password@127.0.0.1:5432/testdb |
| oracle | oracle://username:password@127.0.0.1:1521/testdb |
| sqlite | sqlite:/tmp/test.db |

### SQL statement template example

- Obtain database data by using the `TemplateSql` configuration item alone.
  
   TemplateSql input:
   ```sql
   select top 10 * from Student where id > 1010 order by id ASC
   ```
   Output of execution to database:
   ```sql
   select top 10 * from Student where id > 1010 order by id ASC
   ```

- Use the `TemplateSql` configuration item in combination with `indexField` and `indexValue` to obtain database data.

   indexField input: `stun`
  
   indexValue input: `100`

   TemplateSql input:
   ```sql
   select * from Student where stun > {{.stun}} limit 10
   ```
   Output of execution to database:
   ```sql
   select * from Student where stun > 100 limit 10
   ```
- Use the `TemplateSql` configuration item in combination with `indexField`, `indexValue`, `indexFieldType`, and `dateTimeFormat` to obtain database data.

   indexField input: `registerTime`
  
   indexValue input: `2022-04-21 10:23:55`

   indexFieldType:`DATETIME`

   dateTimeFormat：`YYYY-MM-dd HH:mm:ss`

   TemplateSql input:
   ```sql
   select * from Student where registerTime > '{{.registerTime}}' order by registerTime ASC limit 10
   ```
   Output of execution to database:
   ```sql
   select * from Student where registerTime > '2022-04-21 10:23:55' order by registerTime ASC limit 10
   ```

## Create scan table

Please refer to the [Create Stream](#CreateStream) section.

## Create lookup table

The SQL source is supported as a lookup table. We can create a SQL lookup table using the CREATE TABLE statement. It will be tied to the entity relational database and queried on demand.

```text
CREATE TABLE alertTable() WITH (DATASOURCE="tableName", CONF_KEY="sqlite_config", TYPE="sql", KIND="lookup")
```

### Query cache

Querying an external database is slower than computing in memory. If throughput is high, you can use a lookup cache to improve performance. If lookup caching is not enabled, all requests are sent to the external database. When lookup caching is enabled, one cache will be held per lookup table instance. When querying, we will first query the cache before sending to the external database.

The cache configuration is in `sql.yaml`.

```yaml
   lookup:
     cache: true
     cacheTtl: 600
     cacheMissingKey: true
```

* cache: bool value, indicating whether to enable caching.
* cacheTtl: cache survival time, unit is seconds.
* cacheMissingKey: Whether to cache null values.
