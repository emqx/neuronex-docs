# 对接上位系统

产线已建成、SCADA、HMI、MES、历史库与组态软件均在运行时，这一类北向应用用于向它们提供网关采集的数据，而不改动这些系统本身。

与其他北向应用方向相反：EMQX Neuron 不主动推送数据，而是**以 OPC UA 标准对外提供服务**，上位系统作为客户端接入，浏览地址空间、订阅点位变化、读取实时值，并可反向下发控制指令。

OPC UA 是工业自动化领域的通用接口，SCADA、HMI 与组态软件普遍原生支持。接入后，南向采集的各类设备协议——Modbus、西门子 S7、三菱、欧姆龙、CNC、电力 IEC 系列——统一为一个 OPC UA 数据源，上位系统不需要逐个对接，也不需要为每种 PLC 单独采购 OPC 驱动或编写通讯程序。在 EMQX Neuron 侧新增南向驱动并订阅后，其点位自动出现在地址空间中。

## 地址空间结构

EMQX Neuron 将**已订阅**的点位映射为 OPC UA 节点，层级与现场结构一致：

```
EMQX Neuron
└── modbus-tcp-1          南向驱动 → 对象节点（Object）
    └── group-1           采集组   → 子对象
        └── temperature   点位     → 变量节点（Variable）
```

NodeId 规范为 `ns=1;s=[南向设备名].[组名].[点位名]`，例如 `ns=1;s=modbus-tcp-1.group-1.temperature`。上位系统可依此规则批量生成标签配置，无需手工浏览。

::: warning
只有被订阅的组，其点位才会出现在地址空间中。创建应用后必须[添加订阅](../subscription.md)，否则客户端连接后看不到任何变量节点。
:::

## 安全配置

OPC UA 在工厂网络中通常承载控制指令，安全配置不是可选项。

| 项目 | 说明 |
| --- | --- |
| **安全策略** | 支持 None、Basic256Sha256、Basic256、Basic256Rsa15、Aes128_Sha256_RsaOaep。生产环境建议使用 Basic256Sha256，客户端启用 SignAndEncrypt 模式 |
| **证书双向校验** | 首次启动生成服务端自签名证书，客户端需手动信任；陌生客户端的证书进入非信任列表，需在界面手动放行后方可连接 |
| **用户名密码认证** | 支持新增用户、更新密码与删除用户 |

## 反控设备

OPC UA 客户端对变量节点执行写操作，值即下发到设备，无需额外配置主题或通道。目标点位须在南向驱动中配置 **write** 属性，见[组与点位 · 点位属性](../groups-tags/groups-tags.md#点位属性)。

## 选择应用

| 应用 | 适用情形 |
| --- | --- |
| [OPC UA Server](./opcua-server/overview.md) | 上位系统具备 OPC UA 客户端时的标准做法 |
| [WebSocket](./websocket/websocket.md) | 推送到自有的 WebSocket 服务端，适用于自研看板或后台。方向为主动推送，非被动取数 |

## 连接示例

[使用 UaExpert 连接 EMQX Neuron OPC UA Server](./opcua-server/uaexpert.md) 演示连接、信任证书、订阅变量与写入值的完整过程。
