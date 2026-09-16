# OPC UA Server

OPC UA（OPC Unified Architecture）是一种平台无关、与厂商无关的工业通信标准，用于在工业自动化系统中进行可靠、安全的数据交换。OPC UA 支持数据建模、事件、历史数据访问和方法调用等丰富功能，适用于从边缘设备到云端的分布式场景。

与其他北向应用不同，OPC UA Server 不向外推送数据，而是把南向采集到的点位以 OPC UA 服务对外开放：厂内的 SCADA、HMI、MES、组态软件等作为 OPC UA 客户端主动连接进来，浏览地址空间、订阅数据变化、读取实时点位，也可以写回设备。

## 添加应用

在**数据采集 -> 北向应用**，点击 **添加应用**，选择 **OPC UA Server** 类型来创建一个 OPC UA Server 节点。

## 应用配置

创建 OPC UA Server 应用时，可配置以下字段：

| 字段                         | 说明                                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **主机**                     | 指定运行 OPC UA 服务器的计算机，默认 127.0.0.1。                                                               |
| **端口号**                   | 服务器绑定的端口号，默认 4840。                                                                                |
| **安全策略**                 | 支持的安全策略列表，包括 None、Basic256Sha256、Basic256、Basic256Rsa15、Aes128_Sha256_RsaOaep。默认支持 None。 |
| **用户名密码认证**           | 启用用户名和密码认证，支持新增用户，密码更新以及用户删除。                                                     |
| **服务器端证书**             | Server 使用的证书和密钥（PEM）。                                                                               |
| **受信任的证书颁发机构证书** | 支持上传受信任的证书颁发机构的证书（PEM）。                                                                    |
| **受信任的客户端证书**       | 支持上传客户自己生成的证书（PEM）。                                                                            |

::: warning
**主机**需要填写运行主机的实际 IP。保持默认的 `127.0.0.1` 时，只有本机的客户端能连上，外部客户端连接会失败。
:::

### 安全与证书

OPC UA 强烈推荐启用安全策略与消息加密来防止中间人攻击和窃听。配置要点：

- 使用强加密的安全策略（如 Basic256Sha256），客户端启用 SignAndEncrypt 模式。
- 将客户端证书加入 **受信任的客户端证书** 列表以启用双向 TLS。
- 启用用户名密码认证。

EMQX Neuron 首次启动 OPC UA Server 时会生成自签名证书，外部客户端可能需要手动信任该证书（例如在 UA 客户端中将证书导入受信任列表）。

主动上传的客户端证书默认受信任；陌生客户端连接时，其证书会进入非信任列表，需要在界面手动信任后才能连接。

## 添加订阅

**只有被订阅的组，其点位才会出现在 OPC UA 地址空间中。** 创建应用后必须添加订阅，否则客户端连上来看不到任何变量节点。

点击 OPC UA Server 应用卡片进入**组列表**页，点击 **添加订阅**：

- **南向设备**：选择要开放的南向设备，例如 `modbus-tcp-1`；
- **组**：选择该设备下的某个组，例如 `group-1`。

订阅的通用说明见[订阅南向数据](../../subscription.md)。

## 地址空间与命名规则

EMQX Neuron 会把已订阅的点位映射为 OPC UA 的节点（Node）：

- 每个南向节点（例如 `modbus-tcp-1`）对应一个 OPC UA 对象节点（Object）。
- 组（Group）作为子对象组织在南向节点下。
- 点位（Tag）映射为变量节点（Variable），其 DataType 按下表从 EMQX Neuron 的数据类型映射到 OPC UA 类型。

所有南向节点都位于 EMQX Neuron 节点之下。NodeId 遵循 `ns=1;s=[南向设备名称].[组名称].[点位名称]` 规范，例如 `ns=1;s=modbus-tcp-1.group-1.temperature`，其中 `ns=1` 代表 EMQX Neuron 的命名空间。

## 数据类型映射

| EMQX Neuron  | OPC UA        |
| ------------ | ------------- |
| INT8/UINT8   | Sbyte/Byte    |
| INT16/UINT   | Int16/UInt16  |
| INT32/UINT32 | Int32/UInt32  |
| INT64/UINT64 | Int64/UInt64  |
| FLOAT        | Float         |
| DOUBLE       | Double        |
| BIT/BOOL     | Boolean       |
| STRING       | String        |
| BYTES        | ByteString    |
| ARRAY_INT8   | Array Sbyte   |
| ARRAY_UINT8  | Array Byte    |
| ARRAY_INT16  | Array Int16   |
| ARRAY_UINT16 | Array Uint16  |
| ARRAY_INT32  | Array Int32   |
| ARRAY_UINT32 | Array Uint32  |
| ARRAY_INT64  | Array Int64   |
| ARRAY_UINT64 | Array Uint64  |
| ARRAY_FLOAT  | Array Float   |
| ARRAY_DOUBLE | Array Double  |
| ARRAY_BOOL   | Array Boolean |
| Json         | String        |

## 反控设备

OPC UA 客户端对变量节点执行写操作，即可把值下发到设备，不需要额外配置主题或通道。

前提是该点位在南向驱动中带 **write** 属性，见[组与点位 · 点位属性](../../groups-tags/groups-tags.md#点位属性)。点位只读时，写操作会返回错误。

在 UaExpert 中的具体操作见[UaExpert 连接示例](./uaexpert.md#4-监控与写入)。

## 运行与维护

在应用卡片或列表中点击**数据统计**，可查看连接状态和收发数据情况。统计字段说明见[创建北向应用](../north-apps.md#数据统计)。

若客户端连接异常，点击 **DEBUG 日志**，系统会打印该节点的 DEBUG 级别日志，约十分钟后切回默认级别。随后在**管理** -> **日志** 页面查看，详见[管理日志](../../../admin/log-management.md)。

常见连接失败原因：

- **主机**填的是 `127.0.0.1`，外部客户端连不上。
- 客户端证书还在非信任列表里，服务端返回 `BadCertificateUntrusted`，需要在认证管理页手动信任。
- 客户端选择的安全策略未在服务端启用。

## 连接示例

[使用 UaExpert 连接 EMQX Neuron OPC UA Server](./uaexpert.md) 演示了完整的连接、信任证书、订阅变量和写入值的过程。
