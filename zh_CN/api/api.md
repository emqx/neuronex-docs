# HTTP API

EMQX Neuron 提供管理与监控用的 REST API，遵循 OpenAPI (Swagger) 3.1 规范，覆盖系统管理、数据采集配置与运行统计。

服务启动后访问 `http://<网关地址>:8085/api-docs/index.html` 查看完整接口文档，并可直接在 Swagger UI 中调用接口验证。也可查阅在线版[API 文档](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html)。

| 页面 | 内容 |
| --- | --- |
| [JWT 身份验证](./jwt.md) | 接口采用 JWT 认证，本页说明获取和使用 Token 的方式 |
| [驱动与应用设置](./plugin-setting.md) | 各南向驱动与北向应用通过 API 配置时的参数结构 |
| [数据类型](./data-type.md) | 接口中点位数据类型的表示方式 |
| [错误代码](./error-code.md) | 全部错误码及其含义，用于定位调用失败的原因 |

::: tip
通过 API 反控设备的完整示例见[数据监控与反控](../admin/monitoring.md#反控设备)。
:::
