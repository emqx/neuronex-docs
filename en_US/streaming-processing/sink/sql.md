# SQL Sink

<span style="background:green;color:white">updatable</span>

The sink will write the result to the database.



## Properties

| Property name  | Optional | Description                                                                                                                                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Server Address            | false    | The url of the target database                                                                                                                                |
| Table Name         | false    | The table name of the database                                                                                                                                  |
| Tag Fields         | true     | The fields to be inserted to. The result map and the database should both have these fields. If not specified, all fields in the result map will be inserted. |

Other common sink properties are supported. Please refer to the [sink common properties](../overview.md#common-properties) for more information.

## Database Connection Address

Database connection address reference:

| database   | url sample                                            |
| ---------- | ----------------------------------------------------- |
| mysql      | mysql://username:password@127.0.0.1:3306/testdb |
| sql server | sqlserver://username:password@127.0.0.1:1433/testdb  |
| postgres   | postgres://username:password@127.0.0.1:5432/testdb             |
| oracle     | oracle://username:password@127.0.0.1:1521/testdb               |
| sqlite     | sqlite:/tmp/test.db                             |

## Sample 

The following is an example of writing device data collected by the data collection module into a MySQL database.

* Filter the points that need to be stored in MySQL in the SQL editor: `deviceid`, `devicename`, `temp`

<img src="../_assets/sql_sink_example1.png" alt="sql_sink_example1" style="zoom:100%;" />

* Add SQL Sink action
   * Click the `Test Connection` button to test the database connection status
   * Write `deviceid`, `devicename`, `temp` data into table `table1` of MySQL database `test`.

<img src="../_assets/sql_sink_example2.png" alt="sql_sink_example2" style="zoom:100%;" />

::: tip 
   Table `table1` needs to be created in advance in the MySQL database, and fields with the same column names `deviceid`, `devicename`, and `temp` exist, and the data types must be consistent.
:::