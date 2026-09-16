# CIP Ethernet/IP

EtherNet/IP (Industrial Protocol) 是一种工业自动化网络协议，由 ODVA (Open DeviceNet Vendor Association) 组织开发和维护，可以帮助实现设备间的自动化控制和数据交换，如制造业、能源行业、交通物流、建筑等行业。

通用配置步骤见[添加南向驱动](../south-devices.md)与[组与点位](../../groups-tags/groups-tags.md)。

EMQX Neuron EtherNet/IP (CIP) 驱动主要用于支持 EtherNet/IP 协议的设备。

## 添加驱动

在 **数据采集 → 南向设备** 页点击 **添加设备**，驱动类型选择 **EtherNet/IP (CIP)**。

## 连接参数

点击驱动卡片进入**设备配置**页填写：

| 字段 | 说明                  |
| ---- | --------------------- |
| PLC IP 地址 | 设备 IP 地址            |
| PLC 端口 | 设备端口，默认为 44818 |
| CPU槽号 | CPU 槽号，默认为 0     |

## 点位配置

以下为本驱动支持的数据类型与地址格式。

### 数据类型

* INT8
* UINT8
* INT16
* UINT16
* INT32
* UINT32
* INT64
* UINT64
* FLOAT
* DOUBLE
* BOOL
* BIT
* STRING
* WORD
* DWORD
* LWORD

### PLC 数据地址

>  TAG NAME

使用 PLC 软件连接到 PLC，PLC 上点位的名称即为 EMQX Neuron 中点位地址。
