# Kepware 到 EMQX Neuron 迁移指南

## 概述

- **迁移目标**：将 KEPServerEX (V6.0 及以上版本) 侧采集配置转换为 EMQX Neuron 可导入的配置。

- **转换方式**：使用 EMQ 官网提供的[在线配置转换工具](https://www.emqx.com/zh/products/emqx-neuron/migrator)。

## 支持的转换协议

| KEPServerEX 协议                         | 是否支持 | 备注                                  |
| ----------------------------------- | ---- | ----------------------------------- |
| Modbus TCP/IP Ethernet              | 支持   | BCD, 数组不支持                          |
| Modbus RTU Serial                   | 支持   | BCD, 数组不支持                          |
| Modbus ASCII Serial                 | 支持   | BCD, 数组不支持                          |
| OPC UA Client                        | 支持   | 证书不支持导出                             |
| Mitsubishi Ethernet                 | 支持   | BCD, 数组不支持                          |
| Allen-Bradley ControlLogix Ethernet | 支持   | 只支持 ControlLoginc 5500设备。BCD, 数组不支持 |
| Allen-Bradley DF1                   | 支持   | BCD, 数组不支持                          |
| Siemens TCP/IP Ethernet             | 支持   | BCD, 数组不支持                          |
| Omron FINS Ethernet                 | 支持   | BCD, 数组不支持                          |
| BACnet/IP                           | 支持   | 目前只支持模拟，二进制和多状态这三类对象                |
| CODESYS                             | 支持   | 只支持 V3 协议，支持单个数组元素读取，不支持整体数组读取      |

:::tip
未列出的协议暂不支持转换。
:::

## 在 Kepware 上如何获取配置文件

按下列步骤在 KEPServerEX 中导出配置:

 - 文件菜单，点击另存为菜单项；

 - 选择不加密；

 - 保存格式选择 json 格式。

## 官网转换工具

### 上传与转换

- 打开[官网迁移工具页面](https://www.emqx.com/zh/products/emqx-neuron/migrator)。选择来源为 **KEPServerEX。**

- 上传在 [KEPServerEX](#在-kepware-上如何获取配置文件) 得到的导出文件。

- 等待服务端完成转换，查看汇总结果（设备数、标签成功/失败统计等）。

- 点击下载 EMQX Neuron 配置 JSON 按钮，下载转换后的配置文件。

### 转换失败场景


下载 EMQX Neuron 配置 JSON 时，未成功转换的设备（例如不支持的驱动）及点位会被自动排除，文件中仅包含已转换成功的设备与其点位。

展开设备后，可详细查看转换失败原因：

| **点位名**      | **类型** | **地址** | **状态** | **失败原因** |
| ------------ | ------ | ------ | ------ | -------- |
| outputuint64 | uint64 | H:0    | OK     | -        |
| inputstring  | string | I:0    | 失败     | 字符串长度超限  |

## EMQX Neuron 侧导入与验证

- 确保 EMQX Neuron 和 KEPServerEX 部署在同一网络下，也即 EMQX Neuron 能访问到 KEPServerEX 对应采集的设备。

- 登录 EMQX Neuron Dashboard 界面。

- 在数据采集模块的南向设备页面，点击「导入」按钮。

- 查看导入驱动连接状态，确保连接成功。

- 在数据监控页面查看采集数据，确保数据正常。

## 转换协议详细说明

### 数据模型映射

| **KEPServerEX字段**                                                | **EMQX Neuron 字段**          | **说明**                                         |
| ---------------------------------------------------------------- | --------------------- | ---------------------------------------------- |
| common.ALLTYPES_NAME                                             | name                  | 设备节点名                                          |
| servermain.MULTIPLE_TYPES_DEVICE_DRIVER:"Modbus TCP/IP Ethernet" | driver: "Modbus TCP"  | 驱动名                                            |
| servermain.DEVICE_ID_STRING                                      | params.host, slave id | ip和站号<192.168.10.111>.1，需要提取                   |
| modbus_ethernet.DEVICE_ETHERNET_PORT_NUMBER                      | params.port           | 端口号                                            |
| modbus_ethernet.DEVICE_ZERO_BASED_ADDRESSING                     | params.address_base   | 开始地址<br><br>true->0<br><br>false->1            |
| servermain.DEVICE_CONNECTION_TIMEOUT_SECONDS                     | params.timeout        | 秒->毫秒                                          |
| servermain.DEVICE_RETRY_ATTEMPTS                                 | params.max_retries    | 最大重试次数                                         |
| servermain.DEVICE_INTER_REQUEST_DELAY_MILLISECONDS               | params.interval       | 指令发送间隔                                         |
| modbus_ethernet.DEVICE_FIRST_WORD_LOW                            | params.endianess      | 4 字节数据字节序<br><br>true->ABCD<br><br>false->CDAB |
| modbus_ethernet.DEVICE_FIRST_DWORD_LOW                           | params.endianess_64   | true->12 34 56 78<br><br>false->87 65 43 21    |
| common.ALLTYPES_NAME                                             | tag name              | 点位名                                            |
| servermain.TAG_ADDRESS                                           | tag address           | 点位地址                                           |
| servermain.TAG_DATA_TYPE                                         | tag type              | 点位类型                                           |
| servermain.TAG_READ_WRITE_ACCESS                                 | tag r/w               | 点位读写属性 false->r<br><br>true->rw                |

### 寄存器区域映射

| **KEPServerEX** | **EMQX Neuron** | **读写** | **说明**                 |
| --------------- | ---------- | ------ | ---------------------- |
| 0               | 0          | 只读     | Coil (线圈)              |
| 1               | 1          | 读写     | Discrete Input (离散输入)  |
| 3               | 3          | 只读     | Input Register (输入寄存器) |
| 4               | 4          | 读写     | Hold Register (保持寄存器)  |

### 数据类型映射

| **KEPServerEX** | **EMQX Neuron** | **说明**  |
| --------------- | ---------- | ------- |
| 1               | 12         | boolean |
| 5               | 4          | uint16  |
| 4               | 3          | int16   |
| 7               | 6          | uint32  |
| 6               | 5          | int32   |
| 8               | 9          | float   |
| 9               | 10         | double  |
| 0               | 13         | string  |

:::tip
EMQX Neuron string 数据类型只支持 128 字节长度，KEPServerEX 支持 240 字节长度。 EMQX Neuron 不支持数组，KEPServerEX 支持数组。
:::

### 分组策略

**EMQX Neuron** 支持在单个驱动下配置多个采集组，每个采集组可以配置不同的采集间隔；采集组下的点位不可单独配置采集间隔，且点位必须属于某一采集组。

**KEPServerEX** 支持点位分组与不分组，并支持分组之下再嵌套子分组（多级层级）。

**KEPServerEX → EMQX Neuron** 的转换逻辑如下：

- 无分组点位：放入 `Global` 采集组。

- 有分组点位：放入 `groupname-subgroupname-…` 采集组（按层级自顶向下用连字符 - 拼接组名）。

- **KEPServerEX** 中每个 Tag 可有独立的采集间隔（interval）。转换时，同一采集组内取该组所有 Tag 的 interval 的最小值作为该组在 EMQX Neuron 中的采集间隔；若无法从配置解析出有效值，则使用转换工具内部默认值。

## 支持的转换协议的特殊说明

### 1. 协议名称 Modbus TCP

EMQX Neuron Modbus TCP 地址格式：`{slave_id}!{area_code}{address}|[.bit|.len]`

- **普通数值类型**：`1!40000`（slave_id=1, Hold Register, address=0）

- **字符串类型**：`1!40000.55H`（55 byte string at address 0）

- **寄存器位类型**：`1!40000.0`（Hold Register address=0, bit 0）

KEPServerEX Modbus TCP 地址规则：`[H|]|{area_code}{address}|[.bit|.len]| [size]`，KEPServerEX 支持10进制和16进制地址寻址。

**KEPServerEX → EMQX Neuron** 的转换逻辑如下：

- 解析出slaveid

- 区别寻址进制

- 获取寄存器区域

- 根据进制转换地址值

- 转换类型值

- 转换读写属性

### 2. 协议名称 OPC UA

- 支持轮询和订阅模式

- **KepServerEX** 不支持证书导出，如果配置了证书，转换为 EMQX Neuron 的时候会使用自生成的证书，后续由用户自行修改。

- **KepServerEX** 密码为加密密码，不支持密码导出，需要由用户自行填入。

### 3. 协议名称 Mitsubishi Ethernet

- 工具根据 **KepServerEX** 中 **Mitsubishi Ethernet** 不同的设备型号，分别映射到 EMQX Neuron 三个不同的驱动。
