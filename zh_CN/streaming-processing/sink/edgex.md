# EdgeX Sink

该目标用于将消息发送到 EdgeX 消息总线上。

对于 ZeorMQ 消息总线，该 sink 会创建一个新的 EdgeX 消息总线（绑定到 NeuronEX 服务的运行地址），而非原来既有的消息总线（通常为 application 服务所暴露的地址和端口）。

如果别的主机需要访问 NeuronEX 端口，需要在开始运行 NeuronEX 服务之前，把端口号映射到主机上。

如希望使用 EdgeX Sink 连接器，点击 **数据流处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **edgex**。

## 传输与存储配置

在弹出的页面，进行如下设置：

:::tip

如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据流处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。

:::

- **名称**：输入名称
- **协议**：协议，默认值为 `redis` 
- **绑定主机**：消息总线主机地址，默认值为 `localhost` 。
- **端口**：消息总线端口号。
- **主题**：发布的主题名称。该主题为固定值。若不同的消息需要动态指定主题，则将该属性置空，并设置**主题前缀**。注意：**主题**和**主题前缀**只应设置一项，如两项都未设置，则使用缺省主题 `application` 。
- **主题前缀**：通过该项设置动态主题，如`$topicPrefix/$profileName/$deviceName/$sourceName` 。注意：**主题**和**主题前缀**只应设置一项。
- **消息总线类型**：消息总线类型，目前支持三种类型的消息总线，'redis', 'zero' 或者 'mqtt'，默认为 'redis'。
- **消息类型**：EdgeX 消息模型类型，默认为  `event`
  - 若要将消息发送为类似 apllication service 的 event 类型，则应设置为 `event`。
  - 若要将消息发送为类似 device service 或者 core data service 的 event request 类型，则应设置为 `request`。
- **内容类型**：发布消息的内容类型，默认为 `application/json` 。
- **元数据字段名**：用于选出消息中所有的 EdgeX 元数据，类似 `meta(*) AS xxx`。
- **设备名称**：指定设备名称，该名称将作为从 NeuronEX 中发出的 Event 结构体的设备名称。
- **Profile 名称**：指定从 NeuronEX 中发出的 Event 结构体的 profile 名称。若在**元数据字段名**中设置了 Profile 名称，将会优先采用。
- **源名称**：指定从 NeuronEX 中发出的 Event 结构体的源名称。若在**元数据字段名**中设置了源名称，将会优先采用。
- **选项**：如**消息总线类型**设为 **MQTT**，还可通过键值对的形式指定其他一些可选配置项，例如 `KeepAlive: "5000"`。请注意，所有可选配置项的值都必须为**字符类型**。
- **是否忽略输出**：可选值 True、False，默认为 False，则忽略输出。
- **将结果数据按条发送**：

  - 默认为 false，输出格式为 `{"result":"${the string of received message}"}`， 例如，`{"result":"[{"count":30},""count":20}]"}`
  - 如设为 true，结果消息将与实际字段名称一一对应发送。 对于上述示例，它将先发送 `{"count":30}`，再发送 `{"count":20}`
- **流格式**：支持 json、binary、protobuf、delimited、custom。
  - 如选择 protobuf 或 custom，还应配置对应的[模式和模式消息](../config.md)
  - 如选择 delimited，还应配置分隔符，如 ","
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)

### 可选 MQTT 配置项

以下为支持的可选的配置列表，您可以参考 MQTT 协议规范来获取更详尽的信息。

- ClientId
- Username
- Password
- Qos
- KeepAlive
- Retained
- ConnectionPayload
- CertFile
- KeyFile
- CertPEMBlock
- KeyPEMBlock
- SkipCertVerify

## 通用配置

您可点击展开**高级**部分实现更加定制化的设置。

- **连接选择器**：重用到 mqttmsgbus、natsmsgbus、redismsgbus 或 zeromsgbus 连接器。
- **线程数**：设置运行的线程数。该参数值大于 1 时，消息发出的顺序可能无法保证。
- **缓存大小**：设置可缓存消息数目。若缓存消息数超过此限制，sink 将阻塞消息接收，直到缓存消息数目小于限制为止。
- **是否启用缓存**：设置是否启用缓存，可选值 True、False
- **停止时是否清理缓存**：设置停止时是否清理缓存，可选值 True、False
- **内存缓存阈值**：内存中缓存的最大消息数。
- **最大磁盘缓存**：缓存在磁盘中的最大消息数。
- **缓冲区页面大小**：缓冲区页的消息数，单位为批量读/写磁盘，防止频繁 IO。
- **重发间隔**：重新发送缓存消息的时间间隔（毫秒）。
- **是否异步运行**：设置是否异步运行输出操作以提升性能。请注意，异步运行时，将无法保证输出结果的顺序。

完成设置后，可点击**测试连接**确认连接情况。最后点击**提交**，完成设置。

::: v-pre
EdgeX 动作可支持数据模板对结果格式进行变化，但是数据模板的结果必须为 JSON 字符串的 object 形式，例如 `"{\"key\":\"{{.key}}\"}"`。数组形式的 JSON 字符串或者非 JSON 字符串都不支持。
::

## 示例：发送到 Redis

通过设置不同的属性组合，我们可以将结果采用不同的格式发送到不同的 EdgeX 消息总线设置中。

### 像 application service 一样发送到 redis 消息总线

使用默认配置，EdgeX sink 会将消息以 event 格式发送到默认的 redis 消息总线中。

```json
{
  "id": "ruleRedisEvent",
  "sql": "SELECT temperature * 3 AS t1, humidity FROM events",
  "actions": [
    {
      "edgex": {
        "protocol": "redis",
        "host": "localhost",
        "port": 6379,
        "topic": "application",
        "profileName": "ekuiperProfile",
        "deviceName": "ekuiper",        
        "contentType": "application/json"
      }
    }
  ]
}
```

### 像 device service 一样发送到 redis 消息总线

通过更改 `topicPrefix` 和 `messageType` 属性，我们可以让 EdgeX sink 模拟设备。设备默认情况下会发送消息到 `edgex/events/device/$profileName/$deviceName/$sourceName` 格式的主题中。所以，我们需要设置 `topicPrefix` 属性为 `edgex/events/device` 以确保消息路由为设备消息。此外，通过与 `metadata` 结合，我们可以发送到动态的主题中，从而模拟多个设备。详情参考下一节[动态元数据](#动态元数据)。

```json
{
  "id": "ruleRedisDevice",
  "sql": "SELECT temperature * 3 AS t1, humidity FROM events",
  "actions": [
    {
      "edgex": {
        "protocol": "redis",
        "host": "localhost",
        "port": 6379,
        "topicPrefix": "edgex/events/device",
        "messageType": "request",
        "metadata": "metafield_name",
        "contentType": "application/json"
      }
    }
  ]
}
```

## 示例：发送到 MQTT 消息总线

以下是将分析结果发送到 MQTT 消息总线的规则，请注意在`optional` 中是如何指定 `ClientId` 的。

```json
{
  "id": "ruleMqtt",
  "sql": "SELECT meta(*) AS edgex_meta, temperature, humidity, humidity*2 as h1 FROM demo WHERE temperature = 20",
  "actions": [
    {
      "edgex": {
        "protocol": "tcp",
        "host": "127.0.0.1",
        "port": 1883,
        "topic": "result",
        "type": "mqtt",
        "metadata": "edgex_meta",
        "contentType": "application/json",
        "optional": {
        	"ClientId": "edgex_message_bus_001"
        }
      }
    }
  ]
}
```

## 示例：发送到 ZeroMQ 消息总线

以下是将分析结果发送到 ZeroMQ 消息总线的规则。

```json
{
  "id": "ruleZmq",
  "sql": "SELECT meta(*) AS edgex_meta, temperature, humidity, humidity*2 as h1 FROM demo WHERE temperature = 20",
  "actions": [
    {
      "edgex": {
        "protocol": "tcp",
        "host": "*",
        "port": 5571,
        "topic": "application",
        "profileName": "myprofile",
        "deviceName": "mydevice",        
        "contentType": "application/json"
      }
    }
  ]
}
```

## 连接重用

以下是如何使用连接重用功能的示例。我们只需要删除连接相关的参数并使用 `connectionSelector` 指定要重用的连接。 

```json
{
  "id": "ruleRedisDevice",
  "sql": "SELECT temperature, humidity, humidity*2 as h1 FROM demo WHERE temperature = 20",
  "actions": [
    {
      "edgex": {
        "connectionSelector": "edgex.redisMsgBus",
        "topic": "application",
        "profileName": "myprofile",
        "deviceName": "mydevice",        
        "contentType": "application/json"
      }
    }
  ]
}
```

## 动态元数据

### 发布结果到  EdgeX 消息总线，而不保留原有的元数据
在此情况下，原有的元数据 (例如 `Events` 结构体中的 `id, deviceName, profileName, sourceName, origin, tags`，以及`Reading` 结构体中的  `id, deviceName, profileName, origin, valueType` 不会被保留)。NeuronEX 在此情况下作为 EdgeX 的一个单独微服务，它有自己的 `device name`， `profile name` 和 `source name`。 提供了属性 `deviceName` 和 `profileName`， 这两个属性允许用户指定 eKuiper 的设备名称和 profile 名称。而 `sourceName` 默认为 `topic` 属性的值。如下所示，

1. 从 EdgeX 消息总线上的 `events` 主题上收到的消息，

    ```
    {
      "DeviceName": "demo", "Origin": 000, …
      "readings": 
      [
         {"ResourceName": "Temperature", value: "30", "Origin":123 …},
         {"ResourceName": "Humidity", value: "20", "Origin":456 …}
      ]
    }
    ```
2. 使用如下的规则，并且在 `edgex` action 中给属性 `deviceName` 指定 `kuiper`，属性 `profileName` 指定 `kuiperProfile`。

    ```json
    {
      "id": "rule1",
      "sql": "SELECT temperature * 3 AS t1, humidity FROM events",
      "actions": [
        {
          "edgex": {
            "topic": "application",
            "deviceName": "kuiper",
            "profileName": "kuiperProfile",
            "contentType": "application/json"
          }
        }
      ]
    }
    ```
3. 发送到 EdgeX 消息总线上的数据。

    ```
    {
      "DeviceName": "kuiper", "ProfileName": "kuiperProfile",  "Origin": 0, …
      "readings": 
      [
         {"ResourceName": "t1", value: "90", "Origin": 0 …},
         {"ResourceName": "humidity", value: "20" , "Origin": 0 …}
      ]
    }
    ```
请注意，
- Event 结构体中的设备名称( `DeviceName`)变成了 `kuiper`，profile 名称( `ProfileName`)变成了 `kuiperProfile`
- `Events and Readings` 结构体中的数据被更新为新的值。 字段 `Origin` 被 NeuronEX 更新为新的值 (这里为 `0`)

### 发布结果到  EdgeX 消息总线，并保留原有的元数据

但是在某些场景中，你可能需要保留原来的元数据。比如保留发送到 NeuronEX 的设备名称，在本例中为 `demo`， 还有 reading 数组中的其它元数据。在此情况下，NeuronEX 更像是一个过滤器 - 将不关心的数据过滤掉，但是依然保留原有的数据。

参考以下的例子，

1. 从 EdgeX 消息总线上的 `events` 主题上收到的消息，

    ```
    {
      "DeviceName": "demo", "Origin": 000, …
      "readings": 
      [
         {"ResourceName": "Temperature", value: "30", "Origin":123 …},
         {"ResourceName": "Humidity", value: "20", "Origin":456 …}
      ]
    }
    ```
2. 使用如下规则，在`edgex` action 中，为 `metadata` 指定值 `edgex_meta` 。

    ```json
    {
      "id": "rule1",
      "sql": "SELECT meta(*) AS edgex_meta, temperature * 3 AS t1, humidity FROM events WHERE temperature > 30",
      "actions": [
        {
          "edgex": {
            "topic": "application",
            "metadata": "edgex_meta",
            "contentType": "application/json"
          }
        }
      ]
    }
    ```
    请注意，
    - 用户需要在 SQL 子句中加 `meta(*) AS edgex_meta` ，函数 `meta(*)` 返回所有的元数据。
    - 在 `edgex` action里， 属性 `metadata` 指定值 `edgex_meta` 。该属性指定哪个字段包含了元数据。

3. 发送给 EdgeX 消息总线的数据

  ```
  {
    "DeviceName": "demo", "Origin": 000, …
    "readings": 
    [
       {"ResourceName": "t1", value: "90" , "Origin": 0 …},
       {"ResourceName": "humidity", value: "20", "Origin":456 …}
    ]
  }
  ```
请注意：
- `Events` 结构体的元数据依然保留，例如 `DeviceName` & `Origin`

- 对于在原有消息中可以找到的 reading，元数据将继续保留。 比如 `humidity` 的元数据就是从 EdgeX 消息总线里接收到的`原值 - 或者说是旧值`。

- 对于在原有消息中无法找到的 reading，元数据将不会被设置。如例子中的 `t1` 的元数据被设置为 NeuronEX 产生的缺省值。

- 如果你的 SQL 包含了聚合函数，那保留原有的元数据就没有意义，但是 NeuronEX 还是会使用时间窗口中的某一条记录的元数据。例如，在下面的 SQL 里，

  ```sql
  SELECT avg(temperature) AS temperature, meta(*) AS edgex_meta FROM ... GROUP BY TUMBLINGWINDOW(ss, 10)
  ```

  这种情况下，在时间窗口中可能有几条数据，NeuronEX 会使用窗口中的第一条数据的元数据来填充 `temperature` 的元数据。
