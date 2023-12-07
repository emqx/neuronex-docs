# SQL Sink

<span style="background:green;color:white">updatable</span>

The sink will write the result to the database.



## Properties

| Property name  | Optional | Description                                                                                                                                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url            | false    | The url of the target database                                                                                                                                |
| table          | false    | The table name of the result                                                                                                                                  |
| fields         | true     | The fields to be inserted to. The result map and the database should both have these fields. If not specified, all fields in the result map will be inserted. |
| tableDataField | true     | Write the nested values of the tableDataField into database.                                                                                                  |
| rowkindField   | true     | Specify which field represents the action like insert or update. If not specified, all rows are default to insert.                                            |

Other common sink properties are supported. Please refer to the [sink common properties](../overview.md#common-properties) for more information.

## Sample usage

Below is a sample for using sql to get the target data and set to mysql database

```json
{
  "id": "rule",
  "sql": "SELECT stuno as id, stuName as name, format_time(entry_data,\"YYYY-MM-dd HH:mm:ss\") as registerTime FROM SqlServerStream",
  "actions": [
    {
      "log": {
      },
      "sql": {
        "url": "mysql://user:test@140.210.204.147/user?parseTime=true",
        "table": "test",
        "fields": ["id","name","registerTime"]
      }
    }
  ]
}
```

Write values of tableDataField into database:

The following configuration will write telemetry field's values into database

```json
{
  "telemetry": [{
    "temperature": 32.32,
    "humidity": 80.8,
    "ts": 1388082430
  },{
    "temperature": 34.32,
    "humidity": 81.8,
    "ts": 1388082440
  }]
}
```

```json lines
{
  "id": "rule",
  "sql": "SELECT telemetry FROM dataStream",
  "actions": [
    {
      "log": {
      },
      "sql": {
        "url": "mysql://user:test@140.210.204.147/user?parseTime=true",
        "table": "test",
        "fields": ["temperature","humidity"],
        "tableDataField":  "telemetry",
      }
    }
  ]
}
```

### Update Sample

By specifying the `rowkindField` and `keyField`, the sink can generate insert, update or delete statement against the primary key.

```json
{
  "id": "ruleUpdateAlert",
  "sql":"SELECT * FROM alertStream",
  "actions":[
    {
      "sql": {
        "url": "sqlite://test.db",
        "keyField": "id",
        "rowkindField": "action",
        "table": "alertTable",
        "sendSingle": true
      }
    }
  ]
}
```