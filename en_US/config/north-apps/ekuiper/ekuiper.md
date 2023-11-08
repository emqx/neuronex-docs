# eKuiper 插件

LF Edge [eKuiper] 是 Golang 实现的轻量级物联网边缘分析、流式处理开源软件，可以运行在各类资源受限的边缘设备上。eKuiper 的主要目标是在边缘端提供一个流媒体软件框架。eKuiper 的规则引擎允许用户提供基于 SQL 或基于图形的规则，在几分钟内创建物联网边缘分析应用。

ECP Edge eKuiper 插件使用户能够将收集到的数据发布到 eKuiper 以进一步处理。
作为一款工业网关，ECP Edge 为众多使用不同协议的不同设备提供一站式访问，而 eKuiper 具有数据过滤、聚合、转换和路由的能力。
将两个产品结合在一起，您将得到双重优势，这极大地降低了边缘计算解决方案的资源要求，并能发掘更多的用例。

## 参数

使用 eKuiper 插件时可使用如下参数。

| 字段                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| **本地 IP 地址**    | 监听来自 eKuiper 的连接的 IP 地址。                          |
| **本地端口**        | 监听来自 eKuiper 的连接的 TCP 端口号                         |

## 集成 eKuiper

ECP Edge 和 eKuiper 之间的交互是双向的，需要两边同时提供支持：
* ECP Edge 方面，提供 eKuiper 插件以支持向 eKuiper 发布数据并接收命令。
* eKuiper 方面，提供一个 ECP Edge 源以支持从 ECP Edge 订阅数据，以及一个 ECP Edge 动作以支持通过 ECP Edge 控制设备。

两端可以使用 TCP 传输层，并支持多对多的连接。

**数据上报示例**

```json
{
  "timestamp": 1646125996000,
  "node_name": "modbus", 
  "group_name": "grp",
  "values": {
    "tag0": 42,
    "tag1": "string"
  },
  "errors": {
    "tag2": 1011
  }
}
```

其中，

* `timestamp` : 数据采集时的 UNIX 时间戳。
* `node_name` : 被采集的南向节点的名字。
* `group_name` : 被采集的南向节点的点位组的名字。
* `values` : 存储采集成功的点位值的字典。
* `errors` : 存储采集失败的错误码的字典。

**反向控制示例**

```json
{
    "node_name": "modbus",
    "group_name": "grp",
    "tag_name": "tag0",
    "value": 1234
}
```

* `node_name` : 某个南向节点名字。
* `group_name` : 南向节点的某个组的名字。
* `tag_name` : 要写入的点位名字。
* `value` : 要写入的数据值。

:::warning

【attention】这一页删掉了大量的内容，需要确认 https://neugates.io/docs/zh/latest/configuration/north-apps/ekuiper/overview.html

:::

[eKuiper]: https://ekuiper.org
[NNG pair0 协议]: https://nng.nanomsg.org/man/v1.3.2/nng_pair.7.html
[IPC 传输层]: https://nng.nanomsg.org/man/v1.3.2/nng_ipc.7.html
[TCP 传输层]: https://nng.nanomsg.org/man/v1.3.2/nng_tcp.7.html
[使用 eKuiper 对 Neuron 采集的数据进行流式处理]: https://ekuiper.org/docs/zh/latest/integrations/neuron/neuron_integration_tutorial.html#integration-of-neuron-and-ekuiper



## 常见问题

### 如何基于业务需求编写 eKuiper 规则？

请参考 [eKuiper Docs](https://ekuiper.org/docs/en/latest)

### *data-stream-processing* 北向节点处于未连接状态，但 eKuiper 运行正常。

确保您创建了使用 eKuiper ECP Edge 源的规则，并且 eKuiper 会延迟连接直到规则被启动。

### 如何查看 eKuiper 是否成功从 ECP Edge 采集到数据？

1. 检查 **data-stream-processing** 节点处于连接状态，并且订阅了南向节点。
2. 通过仪表板的性能监控面板，检查 **data-stream-processing** 节点确实采集到了设备数据。
3. 如果使用 ECP EdgeEX 仪表板，可以通过规则的统计面板，检查规则确实触发了。
