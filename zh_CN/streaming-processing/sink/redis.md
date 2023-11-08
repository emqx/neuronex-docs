# Redis 目标（Sink）

如希望使用 Redis Sink 连接器，点击 **数据流处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **redis**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据流处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称
- **地址**：Redis 的地址，如：`10.122.48.17:6379`
- **密码**：Redis 登录密码。
- **数据库名**：Redis 数据库名称，如 0。
- **Key**：设置 Redis 的键值（key），用户只需配置 **Key** 或 **Key 字段**，推荐通过 **Key 字段** 配置 Redis 数据的键值（key）。
- **Key 字段**：使用 json 属性为 Redis 的键值（key），例如，**Key 字段**设为 `deviceName`，收到信息为 `{“deviceName":"abc"}`，那存入 Redis 用的键值（Key）即 `abc`。注意：该属性（如 `deviceName`）应已定义且为 string 类型。如属性未定义，那么该属性将被直接作为新的 key 值进行处理。注意：如设置了 **Key 字段**，则无需再配置**数据模版**。
- **数据类型**：选择 string 或者 list，默认为 string。注意：修改类型后，需首先在 Redis 中删除原有的 key，修改才会生效。
- **是否忽略输出**：可选值 True、False，默认为 False，则忽略输出。
- **将结果数据按条发送**：

  - 默认为 false，输出格式为 `{"result":"${the string of received message}"}`， 例如，`{"result":"[{"count":30},""count":20}]"}`
  - 如设为 true，结果消息将与实际字段名称一一对应发送。 对于上述示例，它将先发送 `{"count":30}`，再发送 `{"count":20}`
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](../config.md)
  - 如选择 delimited，还应配置分隔符，如 ","
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)。注意：如使用 **Key 字段**配置 Redis 的键值（key），则无需配置数据模版。

## 通用配置

您可点击展开**高级**部分实现更加定制化的设置。

- **线程数**：设置运行的线程数。该参数值大于 1 时，消息发出的顺序可能无法保证。
- **缓存大小**：设置可缓存消息数目。若缓存消息数超过此限制，sink 将阻塞消息接收，直到缓存消息数目小于限制为止。
- **启用缓存**：设置是否启用缓存，可选值 True、False
- **停止时清理缓存**：设置停止时是否清理缓存，可选值 True、False
- **内存缓存阈值**：内存中缓存的最大消息数。
- **最大磁盘缓存**：缓存在磁盘中的最大消息数。
- **缓冲区页面大小**：缓冲区页的消息数，单位为批量读/写磁盘，防止频繁 IO。
- **重发间隔**：重新发送缓存消息的时间间隔（毫秒）。
- **是否异步运行**：设置是否异步运行输出操作以提升性能。请注意，异步运行时，将无法保证输出结果的顺序。

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
