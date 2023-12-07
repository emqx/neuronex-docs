

# REST Sink

This action is used to publish output messages to a RESTful API.

If you want to use the REST Sink connector, click **Data Processing** -> **Rules** -> **Create Rule**, in the **Action** area, click **Add**, **Sink** Select **rest**.

## Sink configuration

On the page that pops up, make the following settings:

::: tip
If you want to save the settings as a template, you can also click **Add Sink Template** to make settings in the pop-up window. The newly added template will be automatically added to the **Sink Templates** list. You can click **Data Processing** -> **Configuration** -> **Sink Templates** of **Resources** View or edit existing Sink templates.
:::

- **Name**: Enter a name
- **URL**: RESTful API terminal address, such as `https://www.example.com/api/dummy`
- **HTTP method**: HTTP method of RESTful API, optional values: `get`, `post`, `put`, `patch`, `delete` and `head`. The default value is `get`, which supports dynamic acquisition.
- **Body type**: supports dynamic acquisition.
   - If **HTTP method** is set to `get` and `head`, no body is required, so the default value is `none`.
   - For other http methods, the default value is `json`.
   - If the **message body type** is set to `html`, `xml` and `javascript`, the corresponding configuration should also be made in the **data template**.

- **Timeout**: HTTP request timeout time (milliseconds), the default is 5000 ms
- **HTTP Headers**: Other HTTP headers set by the HTTP request. Support dynamic acquisition.
- **Certification Path**: Optional parameter, fill in the certificate path, which can be an absolute path or a relative path. If a relative path is specified, the parent directory is the path where the neuronex command is executed. Example value: `/var/xyz-certificate.pem`.
- **Private key path**: Optional parameter, which can be an absolute path or a relative path. Example value: `/var/xyz-private.pem.key`.
- **Root Ca Path**: Optional parameter to verify the server certificate. It can be an absolute path or a relative path. Example value: `/var/xyz-rootca.pem`.
- **Skip certification verification**: Defaults to False. If set to True, certificate verification will be skipped, otherwise certificate verification will be performed.
- **Print HTTP response**: Control whether response information is printed to the console. If set to true, the response is printed; if set to false, printing is skipped.
- **Response type**: `code` or `body`
   - If set to `code`, NeuronEX will use the HTTP response code to determine the response status.
   - If set to `body`, NeuronEX will check the HTTP response body (should be in JSON format) and the value of the code field in it.

- **oAuth**: Configure the OAuth verification process
   - access
     - url: The URL to obtain the access code, always use the POST method to access.
     - body: The request body to obtain the access token. Typically, the authorization code is provided here.
     - expire: The expiration time of the token, the time unit is seconds, templates are allowed, so it must be a string.
   - refresh
     - url: URL of the refresh token, always requested using POST method.
     - headers: Request headers used for refresh tokens. The token is usually placed here for authorization.
     - body: The request body of the refresh token. When using a header file to pass refresh tokens, you may not need to configure this option.
- **Omit if content is empty**: Default is False.
- **Send single**: Default is True.
- **Stream format**: Default is `json`.
- **Data template**: Golang template, used to specify the output data format. If no data template is specified, the data will be used as raw input. For a detailed introduction to data templates, see [Data Template](./data_template.md)

After completing the settings, you can click **Test Connection** to confirm the connection. Finally click **Submit** to complete the settings.



### OAuth authentication example

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
       "dataTemplate": "{\"data\":{\"relationships\":{\"follower\":{\"data\":{\"type\":\"users\",\"id\ ":\"1398589\"}},\"followed\":{\"data\":{\"type\":\"users\",\"id\":\"{{.follower}} \"}}},\"type\":\"follows\"}}",
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


### taosdb rest example

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

## Set dynamic output parameters

In many cases, we need to decide the destination address and parameters to write based on the result data. In the REST sink, `method`, `url`, `bodyType` and `headers` support dynamic parameters. Dynamic parameters can be configured through data template syntax. Next, let's rewrite the above example using dynamic parameters. Suppose we receive data that contains metadata such as http method and url suffix. We can get these two values ​​in the output result by rewriting the SQL statement. The single piece of data output by the rule is similar to:

```json
{
   "method":"post",
   "url":"http://xxx.xxx.xxx.xxx:6041/rest/sql",
   "temperature": 20,
   "humidity": 80
}
```

In the rule action, the result data can be obtained as attribute variables through data template syntax. In the following example, `method` and `url` are dynamic variables.

```json
{"id": "rest2",
   "sql": "SELECT tele[0]->Tag00001 AS temperature, tele[0]->Tag00002 AS humidity, method, concat(\"http://xxx.xxx.xxx.xxx:6041/rest/sql\ ", urlPostfix) as url FROM neuron",
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
