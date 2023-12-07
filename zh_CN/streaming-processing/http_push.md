# HTTP Push 源

<span style="background:green;color:white;">流</span>        <span style="background:green;color:white">扫描表</span>


NeuronEX 数据处理模块通过 `HTTP Push` 类型的数据源，可以在内部启动一个 HTTP 服务器，默认地址为`http://0.0.0.0:10081`，接收来自 HTTP 客户端的消息，在所有规则中都可以共用这个 `HTTP Push`数据源。该类型可以作为流、扫描表的数据源。

:::tip 提示
当有任何使用 `HTTP Push` 源的规则启动后， HTTP 服务器才会启动运行，10081端口开启。当所有使用 httppush 源的规则都关闭后， HTTP 服务器会关闭运行，10081端口关闭。
:::

如果使用 Docker 部署 NeuronEX，需要在 `docker run` 命令中添加 `-p 10081:10081` 参数，将容器内的 10081 端口映射到宿主机的 10081 端口后，才可正常使用  `HTTP Push`源 。

```bash
## run NeuronEX
$ docker run -d --name neuronex -p 8085:8085 -p 10081:10081 --log-opt max-size=100m emqx/neuronex:latest
```

## 创建流

登录 NeuronEX，点击**数据流处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：勾选确认是否为带结构的流，如为带结构的流，则需进一步添加流字段。可默认不勾选。
- **流类型**：选择 httppush
- **数据源**：指定 URL 的路径部分，例如 /api/data。
  :::tip 提示
  httppush类型的数据源启动的 HTTP 服务器地址为`http://0.0.0.0:10081`，**数据源（URL拼接路径）** 填写为`/api/data`，则 HTTP 完整请求地址为：`http://0.0.0.0:10081/api/data` 。
  :::
- **配置组**：可使用默认配置组，如希望自定义配置组，可点击添加配置组：
  - **名称**：输入配置组名称。
  - **请求方法**：HTTP 请求方法，可以是 POST 或 PUT。
- **流格式**：支持 json、binary、protobuf、delimited、custom。默认 json 格式。
- **共享**：勾选确认是否共享源。



## 创建扫描表

HTTP Push 源支持查询表。登录 NeuronEX，点击**数据流处理** -> **源管理**。在**扫描表**页签，点击**创建扫描表**。

- **表名称**：输入表名称
- **是否为带结构的表**：勾选确认是否为带结构的表，如为带结构的表，则需进一步添加表字段。可默认不勾选。
- **表类型**：选择 httppush。
- **数据源**：指定 URL 的路径部分，与 URL 属性拼接成最终 URL， 例如 /api/data。
- **配置组**：可使用默认配置组，如希望自定义配置组，可参考[创建流](#创建流)部分。
- **表格式**：支持 json、binary、protobuf、delimited、custom。默认 json 格式。
- **保留大小**：指定保留大小。


<!-- ## 服务器配置

服务器配置在 `etc/kuiper.yaml` 中的 `source` 部分。

```yaml
source:
  ## Configurations for the global http data server for httppush source
  # HTTP data service ip
  httpServerIp: 0.0.0.0
  # HTTP data service port
  httpServerPort: 10081
  # httpServerTls:
  #    certfile: /var/https-server.crt
  #    keyfile: /var/https-server.key
```

用户可以指定以下属性：

- httpServerIp：用于绑定 http 数据服务器的IP。
- httpServerPort：用于绑定 http 数据服务器的端口。
- httpServerTls: http 服务器 TLS 的配置。 -->