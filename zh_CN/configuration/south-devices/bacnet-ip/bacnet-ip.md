# BACnet/IP

BACnet（Building Automation and Control Networks）是一种用于智能建筑的通信协议，它是由国际标准化组织（ISO）、美国国家标准协会（ANSI）和美国采暖、制冷与空调工程师学会（ASHRAE）定义的通信协议。BACnet 是专门为智能建筑及控制系统设计的通信协议，可用于暖通空调系统（HVAC）、照明控制、门禁系统、火警侦测系统以及其相关设备。其优点在于可降低维护系统所需成本，并且安装比一般工业通信协议更为简易。此外，BACnet 还提供了五种业界常用的标准协议，可以防止设备和系统供应商的垄断，从而增加未来系统的扩展性和兼容性。BACnet 协议支持多种通信方式，包括串口、IP、Ethernet、ZigBee 等。

通用配置步骤见[添加南向驱动](../south-devices.md)与[组与点位](../../groups-tags/groups-tags.md)。

BACnet/IP 驱动以单播方式与一台地址已知的设备通信，读取使用 ReadPropertyMultiple，写入使用 WriteProperty。它本身不做设备发现：Who-Is/I-Am 广播、经 BBMD（BACnet Broadcast Management Device）跨子网发现，由 [设备扫描](#设备扫描) 驱动负责。两者配合使用是推荐的做法 —— 先用扫描驱动发现网络中的设备和点位，再由它直接生成一个配置好的 BACnet/IP 节点。

## 添加驱动

在 **数据采集 → 南向设备** 页点击 **添加设备**，驱动类型选择 **BACnet/IP**。

## 连接参数

点击驱动卡片进入**设备配置**页填写：

| 字段                 | 说明                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| **目标设备 IP 地址** | BACnet 设备的 IP。设备在 BACnet 路由器后面时，此处填**路由器**的 IP                                         |
| **目标设备端口号**   | BACnet 设备的端口号，默认为 47808                                                                          |
| **目标设备网络**     | 设备所在 BACnet 网络的网络号（DNET），取值 0 - 65534。仅在填写了目标设备 MAC 时生效，设备可直接访问时保持 0 |
| **目标设备 MAC**     | 路由器后面那台设备的 MAC（DADR），十六进制无分隔符。设备在本网络时**留空**                                  |

### 跨 BACnet 网络访问

跨 IP 子网和跨 BACnet 网络是两件不同的事，配置方式也不同：

* **跨 IP 子网**，但仍属同一个 BACnet/IP 网络 —— 只影响广播，单播读写不受影响。本驱动直接填设备自己的 IP 即可，不需要 BBMD。
* **跨 BACnet 网络**，设备挂在 BACnet 路由器后面的 MS/TP 网络或另一个 B/IP 网络上 —— 设备没有可直接到达的 IP，报文必须经路由器转发。这时才需要填写目标设备网络和目标设备 MAC。

MAC 的长度取决于设备所在网络的类型：MS/TP 站号为一字节（如 `05`），B/IP 地址为六字节的 IP 加端口（如 `C0A80164BAC0` 表示 192.168.1.100:47808）。

| 场景                             | 目标设备 IP 地址 | 目标设备网络 | 目标设备 MAC   |
| -------------------------------- | ---------------- | ------------ | -------------- |
| 设备在本网络，可直接访问         | 设备 IP          | 0            | 留空           |
| 设备在路由器后的 MS/TP 网络 2001 | 路由器 IP        | 2001         | `05`           |
| 设备在路由器后的另一 B/IP 网络   | 路由器 IP        | 该网络的网络号 | `C0A80164BAC0` |

::: tip
不确定该填什么时，先用 [设备扫描](#设备扫描) 扫描一次。扫描结果中每台设备都带有 `address`、`port`、`dnet`、`dadr` 四个字段，与上面四项配置一一对应；也可以直接调用它的应用接口生成节点，无需手工填写。
:::

## 点位配置

以下为本驱动支持的数据类型与地址格式。

### 数据类型

* FLOAT
* DOUBLE
* BIT
* BOOL
* INT8
* INT32
* UINT8
* UINT16
* UINT32
* STRING

### 地址格式

> AREA ADDRESS(.PROPERTY_ID)

AREA 为区域缩写，ADDRESS 为对象实例号，PROPERTY_ID 为可选的属性名。不指定属性时读写当前值（Present_Value），DEV 区域除外。

支持区域

| 区域 | 对象类型               | 地址范围     | 属性  | 数据类型             | 备注           |
| ---- | ---------------------- | ------------ | ----- | -------------------- | -------------- |
| AI   | analog-input           | 0 - 0x3fffff | 读    | FLOAT                | 模拟输入       |
| AO   | analog-output          | 0 - 0x3fffff | 读/写 | FLOAT                | 模拟输出       |
| AV   | analog-value           | 0 - 0x3fffff | 读/写 | FLOAT                | 模拟量         |
| BI   | binary-input           | 0 - 0x3fffff | 读    | BIT                  | 二进制输入     |
| BO   | binary-output          | 0 - 0x3fffff | 读/写 | BIT                  | 二进制输出     |
| BV   | binary-value           | 0 - 0x3fffff | 读/写 | BIT                  | 二进制值       |
| MSI  | multi-state-input      | 0 - 0x3fffff | 读    | UINT8                | 多状态输入     |
| MSO  | multi-state-output     | 0 - 0x3fffff | 读/写 | UINT8                | 多状态输出     |
| MSV  | multi-state-value      | 0 - 0x3fffff | 读/写 | UINT8                | 多状态值       |
| ACC  | accumulator            | 0 - 0x3fffff | 读/写 | UINT32（兼容 UINT8） | 累加器         |
| LAV  | large-analog-value     | 0 - 0x3fffff | 读/写 | DOUBLE               | 大模拟量       |
| IV   | integer-value          | 0 - 0x3fffff | 读/写 | INT32                | 整数量         |
| PIV  | positive-integer-value | 0 - 0x3fffff | 读/写 | UINT32               | 正整数量       |
| CSV  | characterstring-value  | 0 - 0x3fffff | 读/写 | STRING               | 字符串量       |
| LO   | lighting-output        | 0 - 0x3fffff | 读/写 | FLOAT                | 照明输出       |
| BLO  | binary-lighting-output | 0 - 0x3fffff | 读/写 | BIT                  | 二进制照明输出 |
| DV   | date-value             | 0 - 0x3fffff | 读/写 | STRING               | 日期量         |
| TV   | time-value             | 0 - 0x3fffff | 读/写 | STRING               | 时间量         |
| DEV  | device                 | 0 - 0x3fffff | 读    | 见下方属性表         | 设备           |

::: tip
数据类型由对象类型决定，不能任选。例如 AI 点位只能是 FLOAT，MSV 点位只能是 UINT8，类型填错会返回类型不支持的错误。ACC 区域按标准应为 UINT32，UINT8 仅为兼容早期配置而保留。

输入类对象（AI、BI、MSI）反映被测量的物理量，不可写，添加时带上写属性会被拒绝。
:::

目前支持标准属性和自定义属性

标准属性

| 属性             | 地址                            | 类型   |
| ---------------- | ------------------------------- | ------ |
| 对象名称         | Object_Name                     | string |
| 对象类型         | Object_Type                     | uint8  |
| 描述             | Description                     | string |
| 设备类型         | Device_Type                     | string |
| 状态标志         | Status_Flags                    | string |
| 事件状态         | Event_State                     | uint8  |
| 脱离服务         | Out_Of_Service                  | bool   |
| 更新间隔         | Update_Interval                 | uint8  |
| 最小值           | Min_Pres_Value                  | float  |
| 最大值           | Max_Pres_Value                  | float  |
| 分辨率           | Resolution                      | float  |
| COV增量          | COV_Increment                   | float  |
| 时间延迟         | Time_Delay                      | uint8  |
| 通告类           | Notification_Class              | uint8  |
| 通告类型         | Notify_Type                     | uint8  |
| 单位             | Units                           | uint8  |
| 高阈值           | High_Limit                      | float  |
| 低阈值           | Low_Limit                       | float  |
| 阈值宽度         | Deadband                        | float  |
| 可靠性           | Reliability                     | uint8  |
| 极性             | Polarity                        | uint8  |
| 系统状态         | System_Status                   | uint8  |
| 厂商名           | Vendor_Name                     | string |
| 厂商ID           | Vendor_Identifier               | uint8  |
| 型号名称         | Model_Name                      | string |
| 固件版本         | Firmware_Revision               | string |
| 应用软件版本     | Application_Software_Version    | string |
| 位置             | Location                        | string |
| 协议版本         | Protocol_Version                | uint16 |
| 协议一致类别     | Protocol_Conformance_Class      | uint8  |
| 协议服务支持     | Protocol_Service_Supported      | string |
| 协议对象类型支持 | Protocol_Object_Types_Supported | string |
| 序列号           | Serial_Number                   | string |
| 最大APDU长度支持 | Max_APDU_Length_Accepted        | uint16 |
| 分段支持         | Segmentation_Supported          | uint8  |
| 本地时间         | LOCAL_TIME                      | string |
| 本地日期         | LOCAL_DATE                      | string |
| 时差             | UTC_Offset                      | int8   |
| 夏令时状态       | Daylight_Savings_Status         | bool   |
| APDU分段超时     | APUD_Segment_Timeout            | uint8  |
| APDU超时         | APUD_Timeout                    | uint16 |
| APDU重传次数     | Number_Of_APDU_Retries          | uint8  |
| 最大主节点数     | Max_Master                      | uint8  |
| 最大信息帧数     | Max_Info_Frame                  | uint8  |
| 配置名           | Profile_Name                    | string |
| 频率             | Pulse_Rate                      | uint8  |
| 分频             | Scale                           | float  |
| 预分频           | Prescale                        | float  |
| 原值             | Value_Before_Change             | uint8  |
| 修改时间         | Value_Change_Time               | string |

不指定属性，默认为当前值（Present_Value）属性，DEV 区域除外。

自定义属性

PROPERTY_ID 由两部分组成，一个是 custom 标志，一个是属性的值（int），整体格式为 AREA ADDRESS.custom.id。

支持 Present Value 置零操作，目前支持 AO 和 BO 区域，地址形式为 (AO|BO)xxx.NULL，只支持写操作，根据区域的类型，写入类型的零值即可。

::: tip
`.NULL` 点位只能写不能读，添加时若带上读属性或订阅属性会返回属性不支持的错误。
:::

### 地址示例

| 地址                  | 数据属性 | 说明                                    |
| --------------------- | -------- | --------------------------------------- |
| AI0                   | FLOAT    | AI 区域，地址为 0                       |
| AI1                   | FLOAT    | AI 区域，地址为 1                       |
| AV30                  | FLOAT    | AV 区域，地址为 30                      |
| BO10                  | BIT      | BO 区域，地址为 10                      |
| BO10.NULL             | BIT      | BO 区域，地址为 10，写入NULL值          |
| BO20                  | BIT      | BO 区域，地址为 20                      |
| BI0                   | BIT      | BI 区域，地址为 0                       |
| BI1                   | BIT      | BI 区域，地址为 1                       |
| BV3                   | BIT      | BV 区域，地址为 3                       |
| MSI10                 | UINT8    | MSI 区域，地址为 10                     |
| MSI20                 | UINT8    | MSI 区域，地址为 20                     |
| MSI30                 | UINT8    | MSI 区域，地址为 30                     |
| ACC1                  | UINT32   | ACC 区域，地址为 1                      |
| LAV5                  | DOUBLE   | LAV 区域，地址为 5                      |
| IV7                   | INT32    | IV 区域，地址为 7                       |
| PIV8                  | UINT32   | PIV 区域，地址为 8                      |
| CSV2                  | STRING   | CSV 区域，地址为 2                      |
| AI0.Object_Name       | STRING   | AI 区域，地址为 0，属性为对象名         |
| AI0.custom.1234       | ALL      | AI 区域，地址为 0，属性值为1234         |
| DEV400001.Vendor_Name | STRING   | DEV 区域，地址为 400001，属性值为厂商名 |

## 设备扫描

现场设备清单不明确时，可以先用 **数据采集 → BACnet/IP 设备扫描** 广播发现设备并枚举点位，再据此生成配置好的 BACnet/IP 驱动。详见 [BACnet/IP 设备扫描](./scan.md)。
