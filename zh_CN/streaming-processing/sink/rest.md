# REST Sink

该动作用于将输出消息发布到 RESTful API 中。

如希望使用 REST Sink 连接器，点击 **数据处理** -> **规则** -> **新建规则**，在 **动作** 区域，点击**添加**，**Sink** 选择 **rest**。

## 传输与存储配置

在弹出的页面，进行如下设置：

::: tip
如希望将传输与存储设置保存为模版，也可点击 **添加传输与存储模版** 在弹出的窗口中进行设置。新添加的模版将自动添加到**传输与存储模版**列表，您可点击 **数据处理** -> **配置** -> **资源** 的 **传输与存储模版** 查看或编辑已有的传输与存储模版。
:::

- **名称**：输入名称
- **地址**：RESTful API 终端地址，例如 `https://www.example.com/api/dummy`
- **HTTP 方法**：RESTful API 的 HTTP 方法，可选值：`get`，`post`，`put`，`patch`，`delete` 和 `head`。 默认值为 `get`，支持动态获取。
- **消息体类型**：支持动态获取。
  - 如 **HTTP 方法**设为 `get` 和 `head`，不需要正文，因此默认值为 `none`。 
  - 对于其他 http 方法，默认值为 `json`。
  - 如**消息体类型**设为 `html`，`xml` 和 `javascript`，还应在**数据模版**处进行相应配置。

- **超时**：HTTP 请求超时的时间（毫秒），默认为 5000 毫秒
- **HTTP 头**：HTTP 请求设置的其它 HTTP 头。支持动态获取。
- **证书路径**：可选参数，填写证书路径，可以为绝对路径，也可以为相对路径。如果指定的是相对路径，那么父目录为执行 neuronex 命令的路径。示例值：`/var/xyz-certificate.pem`。
- **私钥路径**：可选参数，可以为绝对路径，也可以为相对路径。示例值：`/var/xyz-private.pem.key`。
- **根证书路径**：可选参数，用以验证服务器证书。可以为绝对路径，也可以为相对路径。示例值：`/var/xyz-rootca.pem`。
- **跳过证书验证**：默认为 False。如设置为 True，将跳过证书认证，否则进行证书验证。
- **打印 HTTP 响应**：控制是否将响应信息打印到控制台中。 如设为 true，则打印响应；如设为 false，则跳过打印。
- **响应类型**：`code` 或者 `body`
  - 如设为 `code`，NeuronEX 将通过 HTTP 响应码来判断响应状态。
  - 如设为 `body`，NeuronEX 将检查 HTTP 响应正文（应为 JSON 格式）以及其中 code 字段的值。

- **oAuth**： 配置 OAuth 验证流程
  - access
    - url：获取访问码的网址，总是使用 POST 方法访问。
    - body：获取访问令牌的请求主体。通常情况下，可在这里提供授权码。
    - expire：令牌的过期时间，时间单位是秒，允许使用模板，所以必须是一个字符串。
  - refresh
    - url：刷新令牌的网址，总是使用 POST 方式请求。
    - headers：用于刷新令牌的请求头。通常把令牌放在这里，用于授权。
    - body：刷新令牌的请求主体。当使用头文件来传递刷新令牌时，可能不需要配置此选项。
- **是否忽略输出**：默认为 False。
- **将结果数据按条发送**：默认为 True。
- **流格式**：默认为 `json`。
- **数据模版**：Golang 模板，用于指定输出数据格式。如不指定数据模板，则将数据作为原始输入。关于数据模版的详细介绍，见 [数据模版](./data_template.md)

完成设置后，可点击**测试连接**确认连接情况。最后点击**提交**，完成设置。



### OAuth 鉴权示例

```json
{
  "id": "ruleFollowBack",
  "sql": "SELECT follower FROM followStream",
  "actions": [{
    "rest": {
      "url": "https://com.awebsite/follows",
      "method": "POST",
      "sendSingle": true,
      "bodyType": "json",
      "dataTemplate": "{\"data\":{\"relationships\":{\"follower\":{\"data\":{\"type\":\"users\",\"id\":\"1398589\"}},\"followed\":{\"data\":{\"type\":\"users\",\"id\":\"{{.follower}}\"}}},\"type\":\"follows\"}}",
      "headers": {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "Bearer {{.access_token}}"
      },
      "oAuth": {
        "access": {
          "url": "https://com.awebsite/oauth/token",
          "body": "{\"grant_type\": \"password\",\"username\": \"user@gmail.com\",\"password\": \"mypass\"}",
          "expire": "3600"
        }
      }
    }
  }]
}
```


### taosdb rest示例

```json
{"id": "rest1",
  "sql": "SELECT tele[0]-\u003eTag00001 AS temperature, tele[0]-\u003eTag00002 AS humidity FROM neuron", 
  "actions": [
    {
      "rest": {
        "bodyType": "text",
        "dataTemplate": "insert into mqtt.kuiper values (now, {{.temperature}}, {{.humidity}})", 
        "debugResp": true,
        "headers": {"Authorization": "Basic cm9vdDp0YW9zZGF0YQ=="},
        "method": "POST",
        "sendSingle": true,
        "url": "http://xxx.xxx.xxx.xxx:6041/rest/sql"
      }
    }
  ]
}
```

## 设置动态输出参数

很多情况下，我们需要根据结果数据，决定写入的目的地址和参数。在 REST sink 里，`method`, `url`, `bodyType` 和 `headers` 支持动态参数。动态参数可通过数据模板语法配置。接下来，让我们使用动态参数改写上例。假设我们收到了数据中包含了 http 方法和 url 后缀等元数据。我们可以通过改写 SQL 语句，在输出结果中得到这两个值。规则输出的单条数据类似：

```json
{
  "method":"post",
  "url":"http://xxx.xxx.xxx.xxx:6041/rest/sql",
  "temperature": 20,
  "humidity": 80
}
```

在规则 action 中，可以通过数据模板语法取得结果数据作为属性变量。如下例子中，`method` 和 `url` 为动态变量。

```json
{"id": "rest2",
  "sql": "SELECT tele[0]->Tag00001 AS temperature, tele[0]->Tag00002 AS humidity, method, concat(\"http://xxx.xxx.xxx.xxx:6041/rest/sql\", urlPostfix) as url FROM neuron", 
  "actions": [
    {
      "rest": {
        "bodyType": "text",
        "dataTemplate": "insert into mqtt.kuiper values (now, {{.temperature}}, {{.humidity}})", 
        "debugResp": true,
        "headers": {"Authorization": "Basic cm9vdDp0YW9zZGF0YQ=="},
        "method": "{{.method}}",
        "sendSingle": true,
        "url": "{{.url}}"
      }
    }
  ]
}
```

