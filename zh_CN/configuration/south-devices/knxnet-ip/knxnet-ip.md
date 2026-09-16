# KNXnet/IP

KNXnet/IP 是一种基于标准互联网协议（IP）的通信协议，用于 KNX 家庭和建筑自动化系统,使得 KNX 设备可以通过以太网、Wi-Fi 或其他 IP 网络进行通信。

通用配置步骤见[添加南向驱动](../south-devices.md)与[组与点位](../../groups-tags/groups-tags.md)。

EMQX Neuron KNXnet/IP 驱动支持与 KNXnet/IP 设备建立连接。

::: tip

由于 KNXnet/IP 协议的工作原理，如果使用虚拟化技术如虚拟机或 Docker 部署 EMQX Neuron，KNX 驱动可能
无法正常工作。如果是在 Linux 主机中使用 docker 镜像部署 EMQX Neuron，那么需要使用 docker 选项`--net=host`。
在其他情况下，推荐您使用二进制安装包部署 EMQX Neuron。

:::

## 添加驱动

在 **数据采集 → 南向设备** 页点击 **添加设备**，驱动类型选择 **KNXnet/IP**。

## 连接参数

点击驱动卡片进入**设备配置**页填写：

| 参数               | Description                        |
| ------------------ | ---------------------------------- |
| **发现端点 IP**    | KNXnet/IP 设备 IP，默认224.0.23.12 |
| **发现端点端口号** | KNXnet/IP 设备端口, 默认3671       |

注意:如果使用多拨地址 *224.0.23.12* 进行配置，通常要求设备与 EMQX Neuron 部署在同一网段中。

## 点位配置

以下为本驱动支持的数据类型与地址格式。

### 数据类型

* BIT
* BOOL
* INT8
* UINT8
* INT16
* UINT16
* FLOAT

### 地址格式 1

* > GROUP_ADDRESS,INDIVIDUAL_ADDRESS

表示一个 KNX 设备地址及其所属的组地址。

- 进行读操作时，KNX 驱动发送 `GroupValueRead` 隧道请求，在收到匹配设备地址的 `GroupValueResp` 报文时更新点位数据。
- 进行写操作时， KNX 驱动发送一个 `GroupValueWrite` 隧道请求报文。

#### 地址示例

`0/0/1,1.1.1` 代表 KNX 组地址 `0/0/1`下的设备地址 `1.1.1`。

### 地址格式 2

* > GROUP_ADDRESS,INDIVIDUAL_ADDRESS,BIT

针对读取比特位数少于8的 `uint8` 类型数据，可使用该地址格式，如 KNX data point 类型 `B2` 和 `B1U3` 等。
其中 *BIT* 表示数据比特位数。

#### 地址示例

`0/0/1,1.1.1,2` 代表 KNX 组地址 `0/0/1`下的设备地址 `1.1.1`，数据为两个比特。
