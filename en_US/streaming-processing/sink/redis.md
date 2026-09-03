# Redis Sink

<span style="background:green;color:white">updatable</span>

To use the Redis Sink connector, click **Data Processing** -> **Rules** -> **Create Rule**. In **Actions**, click **Add** and select **redis**.

## Sink configuration

On the rule page, click **Add Action** and set:

- **Address**: Redis address, for example `10.122.48.17:6379`.
- **Password**: Redis password.
- **Database**: Redis database index, for example `0`.
- **Key**: Redis key. Configure either **Key** or **Key field**. Prefer **Key field**.
- **Key field**: Use a JSON property as the Redis key. If **Key field** is `deviceName` and the payload is `{"deviceName":"abc"}`, the key stored in Redis is `abc`. The property must already exist and be a string. If it is missing, the property name itself is used as the key. When **Key field** is set, you do not need a data template.
- **Data type**: `string` or `list`, default `string`. After you change the type, delete the existing key in Redis first, or the change does not take effect.
- **Omit empty results**: Default `False`.
- **Send results one by one**: Default `True`.
- **Stream format**: Default `json`.
- **Data template**: A Go template for the output format. If omitted, the raw input is sent. See [Data Template](./data_template.md).

After you finish, click **Test Connection**, then **Submit**.

## Example

A sample rule that selects temperatures above 50, plus configuration files for reference.

### /tmp/redis.txt

```json
{
  "id": "redis",
  "sql": "SELECT * from  demo_stream where temperature > 50",
  "actions": [
    {
      "log": {},
      "redis":{
        "addr": "10.122.48.17:6379",
        "password": "123456",
        "db": 1,
        "dataType": "string",
        "expire": "10000",
        "field": "temperature"
      }
    }
  ]
}
```

### /tmp/redisPlugin.txt

```json
{
  "file":"http://localhost:8080/redis.zip"
}
```

## Update example

With `rowkindField`, the sink applies the action named in that field.

```json
{
  "id": "ruleUpdateAlert",
  "sql":"SELECT * FROM alertStream",
  "actions":[
    {
      "redis": {
        "addr": "127.0.0.1:6379",
        "dataType": "string",
        "field": "id",
        "rowkindField": "action",
        "sendSingle": true
      }
    }
  ]
}
```
