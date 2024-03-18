# Redis 目标（Sink）

<span style="background:green;color:white">updatable</span>

如希望使用 Redis Sink 连接器，点击 **数据处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **redis**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称
- **地址**：Redis 的地址，如：`10.122.48.17:6379`
- **密码**：Redis 登录密码。
- **数据库名**：Redis 数据库名称，如 0。
- **Key**：设置 Redis 的键值（key），用户只需配置 **Key** 或 **Key 字段**，推荐通过 **Key 字段** 配置 Redis 数据的键值（key）。
- **Key 字段**：使用 json 属性为 Redis 的键值（key），例如，**Key 字段**设为 `deviceName`，收到信息为 `{“deviceName":"abc"}`，那存入 Redis 用的键值（Key）即 `abc`。注意：该属性（如 `deviceName`）应已定义且为 string 类型。如属性未定义，那么该属性将被直接作为新的 key 值进行处理。注意：如设置了 **Key 字段**，则无需再配置**数据模版**。
- **数据类型**：选择 string 或者 list，默认为 string。注意：修改类型后，需首先在 Redis 中删除原有的 key，修改才会生效。
- **是否忽略输出**：默认为 False。
- **将结果数据按条发送**：默认为 True。
- **流格式**：默认为 `json`。
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)


完成设置后，可点击**测试连接**确认连接情况。最后点击**提交**，完成设置。

## 示例

下面是选择温度大于50度的样本规则，和一些配置文件仅供参考。

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

## 更新示例

通过指定 `rowkindField` 属性，sink 可以根据该字段中指定的动作进行更新。

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
