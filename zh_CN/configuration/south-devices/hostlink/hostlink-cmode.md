# Omron Host Link

Hostlink 协议是欧姆龙公司定义的一种用于其他设备与欧姆龙公司 PLC 的通信的协议。
Hostlink 通讯协议有两种模式：C-mode 和 FINS。
Cmode 采用 ASCII 码，由上位机主动发出指令给 CPU；FINS 采用二进制码，可用在多种网络设备，可被 CPU、IO模块、上位机主动发出。

通用配置步骤见[添加南向驱动](../south-devices.md)与[组与点位](../../groups-tags/groups-tags.md)。

EMQX Neuron HostLink Cmode 驱动用于通过串口网络与欧姆龙 PLC 进行通信。

## 添加驱动

在 **数据采集 → 南向设备** 页点击 **添加设备**，驱动类型选择 **HOSTLINK CMODE**。

## 连接参数

点击驱动卡片进入**设备配置**页填写：

| 参数                 | 说明                                                    |
| -------------------- | ------------------------------------------------------- |
| **接收超时时间** | 等待设备返回指令响应的时间。  |
| **指令发送间隔** | 发送每条读写指令之间的等待时间。某些串口设备在较短时间内接收到连续指令时，可能会丢弃某些指令。 |
| **串口设备** | 使用串口连接时，串口设备的路径，如 Linux 系统中 /dev/ttyS1。|
| **停止位** | 串口连接参数。 |
| **校验位** | 串口连接参数。 |
| **波特率** | 串口连接参数。 |
| **数据位** | 串口连接参数。 |

## 点位配置

以下为本驱动支持的数据类型与地址格式。

### 数据类型

* BOOL
* INT16
* UINT16
* INT32
* UINT32
* INT64
* UINT64
* FLOAT
* DOUBLE
* STRING

### 地址格式

> ID!AREA ADDRESS\[.BIT]\[.LEN\[H]\[L]]

#### ID

必填，单元号。例如单元号为 10，区域为 CIO，地址为 0 则填 10!CIO0000

#### AREA ADDRESS

| 区域 | 数据类型                                      | 属性     | 备注        |
| ---- | ------------------------------------------- | ------- | ---------- |
| CIO  | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | IR/SR CIO 区 |
| LR   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | LR 区        |
| HR   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | HR 区        |
| D    | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | DM 区        |
| A    | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | AR 区        |
| TD   | uint16/int16/uint32/int32/uint64/int64/FLOAT/DOUBLE/STRING  | 读/写    | TC 值        |
| TS   | BOOL                                                        | 读/写    | TC 状态      |

#### .LEN\[H]\[L]

当数据类型是 string 类型时，是必填项。
**.LEN** 表示存储区域大小，其最大值为 29，该区域的单位为 PLC 中的双字节存储单元。
string 类型包含 **H** 和 **L** 两种字节顺序，不填默认是 **H** 字节顺序。

### 地址示例

| 地址       | 数据类型  | 说明 |
| --------- | -------- | -------- |
| 10!CIO0001        | int16   | CIO 区域，地址为 1，单元号为 10      |
| 10!CIO0002        | uint16  | CIO 区域，地址为 2，单元号为 10      |
| 10!LR0020         | double  | LR 区域，地址为 20，单元号为 10      |
| 10!LR0030         | uint32  | LR 区域，地址为 30，单元号为 10      |
| 10!HR0010         | int32   | HR 区域，地址为 10，单元号为 10      |
| 10!HR0020         | float   | HR 区域，地址为 20，单元号为 10      |
| 10!D0010          | int32   | DM 区域，地址为 10，单元号为 10      |
| 10!D0020          | float   | DM 区域，地址为 20，单元号为 10      |
| 10!A0002          | int32   | AR 区域，地址为 2，单元号为 10       |
| 10!A0004          | uint32  | AR 区域，地址为 4，单元号为 10       |
| 10!TD0002         | uint16  | TC 值，地址为 2，单元号为 10         |
| 10!TD0004         | uint32  | TC 值，地址为 4，单元号为 10         |
| 10!TS0002         | BOOL    | TC 状态，地址为 2，单元号为 10       |
| 10!TS0004         | BOOL    | TC 状态，地址为 4，单元号为 10       |
| 10!CIO0000.20L    | string  | CIO 区域，地址为 0，单元号为 10，字符串长度 20 个字节，字节顺序为 L      |
| 10!CIO0001.20H    | string  | CIO 区域，地址为 1，单元号为 10，字符串长度 20 个字节，字节顺序为 H      |
