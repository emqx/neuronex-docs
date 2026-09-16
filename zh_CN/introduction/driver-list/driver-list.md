# 南向驱动

EMQX Neuron 通过南向驱动按协议与现场设备通信。下表按类别列出全部已支持的协议和设备型号，点击进入对应页面可查看连接参数、地址格式和连接示例。

添加驱动的通用步骤见[添加南向驱动](../../configuration/south-devices/south-devices.md)。表中没有的协议可以自行开发，见 [SDK 教程](../../dev-guide/sdk-tutorial/sdk-tutorial.md)。

## 南向驱动列表

### Modbus 系列

| <div style="width:120pt">协议名称</div>                 | <div style="width:60pt">接口类型</div> | <div style="width:80pt">备注</div> |
| ------------------------------------------------------------ |  ------------ | -------------------------------- |
| [Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)              | 以太网  |  - |
| [Modbus RTU](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)              | 串口    |  - |
| [Modbus RTU over TCP](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)     | 以太网  |  见 Modbus RTU 的以太网链路 |
| [Modbus Ascii](../../configuration/south-devices/modbus-ascii/modbus-ascii.md)            | 串口  |  - |


### PLC 与运动控制

| <div style="width:120pt">协议名称</div>    | <div style="width:60pt">接口类型</div> | <div style="width:40pt">备注</div> |
| ------------------------------------------------------------ | ------ | ---- |
| [CIP Ethernet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)         | 以太网  |  CIP –通用工业协议 |
| [Siemens S7 ISO TCP](../../configuration/south-devices/siemens-s7/s7.md)                                          | 以太网    | 连接西门子 S200、S200smart、S1200、S1500 型号的 PLC |
| [Siemens S7 ISOTCP for 300/400](../../configuration/south-devices/siemens-s7/s7.md) | 以太网  | s7-300/400 |
| [Siemens MPI](../../configuration/south-devices/siemens-mpi/mpi.md) | 串口  | 连接支持西门子 MPI 接口的通信协议的设备 |
| [Siemens FetchWrite](../../configuration/south-devices/siemens-fetchwrite/fetchwrite.md) | 以太网  | 用于带有网络扩展模块 CP443 的西门子 PLC 的访问 |
| [Allen-Bradley DF1](../../configuration/south-devices/df1/df1.md)          | 串口  |  - |
| [Allen-Bradley CIP EtherNet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)                       | 以太网    |  CIP – 通用工业协议 |
| [Allen-Bradley 5000 EtherNet/IP](../../configuration/south-devices/ab-5000/ab-5000.md)                      | 以太网    |  支持 AB ControlLogix 55xx系列，以及CompactLogix 53xx系列 PLC |
| [Allen-Bradley ControlLogix 5500](../../configuration/south-devices/ab-5500/ab-5500.md)                              | 以太网   | - |
| [Allen-Bradley MicroLogix 1400](../../configuration/south-devices/ab-1400/ab-1400.md)                             | 以太网     | - |
| [Schneider PLC Modbus RTU](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)                                     | 串口    | 通用Modbus RTU |
| [Schneider PLC Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)                                     | 以太网  |  通用Modbus TCP |
| [Inovance PLC Modbus TCP](../../configuration/south-devices/modbus-hc-tcp/modbus-hc-tcp.md)                             | 以太网  |  汇川PLC Modbus TCP |
| [XINJE PLC Modbus RTU](../../configuration/south-devices/modbus-xinje-rtu/modbus-xinje-rtu.md)                             | 串口  |  支持信捷 XC/XD/XL 系列 PLC |
| [HollySys PLC Modbus TCP](../../configuration/south-devices/modbus-hollysys-tcp/modbus-hollysys-tcp.md)                             | 以太网  |  支持HollySys LK/LE 系列 PLC |
| [HollySys PLC Modbus RTU](../../configuration/south-devices/modbus-hollysys-rtu/modbus-hollysys-rtu.md)                             | 串口  |  支持HollySys LK/LE 系列 PLC |
| [ABB COMLI](../../configuration/south-devices/comli/comli.md)                                        | 串口    |  与 ABB 的 PLC通讯 |
| [Omron Host Link](../../configuration/south-devices/hostlink/hostlink-cmode.md)                        | 串口    |   HostLink Cmode 方式通过串口网络与欧姆龙 PLC 进行通信。 |
| [Omron FINS on TCP](../../configuration/south-devices/omron-fins/omron-fins.md)                       | 以太网  |  通过 FINS TCP 协议与欧姆龙 PLC 进行通信。 |
| [Omron FINS on UDP](../../configuration/south-devices/omron-fins/omron-fins-udp.md)                        | 以太网  | 通过 FINS UDP 协议与欧姆龙 PLC 进行通信。 |
| [Mitsubishi 1E](../../configuration/south-devices/mitsubishi-1e/mitsubishi-1e.md)           | 以太网  |  对接三菱 A 系列、FX3U、FX3G、iQ-F 系列 PLC |
| [Mitsubishi 3E](../../configuration/south-devices/mitsubishi-3e/overview.md)           | 以太网  |  对接三菱 Q 系列（MC）、iQ-F 系列（SLMP）和 iQ-L 系列 PLC |
| [Mitsubishi 4E](../../configuration/south-devices/mitsubishi-4e/overview.md)           | 以太网  |  对接三菱 iQ-F 系列（SLMP）和 IQ-R 系列 PLC |
| [Mitsubishi FX](../../configuration/south-devices/mitsubishi-fx/overview.md)           | 串口    |  对接三菱FX0、FX2、FX3 等系列 PLC |
| [Panasonic Mewtocol](../../configuration/south-devices/panasonic-mewtocol/overview.md)      | 以太网    |  对接松下的 FP-XH、FP0H 系列 PLC |
| [Beckhoff ADS](../../configuration/south-devices/ads/ads.md)            | 以太网  |  对接倍福Beckhoff TwinCAT PLC |
| [Keyence CIP Ethernet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)                                      | 以太网  |  CIP – 通用工业协议 |
| [Keyence MC Protocol](../../configuration/south-devices/mitsubishi-3e/overview.md)                                          | 以太网  |  三菱 MC 协议 |
| [Delta Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)                             | 以太网    |  对接台达DVP系列、AS系列PLC |
| [KUKA Ethernet KRL TCP](../../configuration/south-devices/kuka/kuka.md)                        | 以太网    |  对接库卡设备 |
| [GE SRTP](../../configuration/south-devices/srtp/srtp.md)                      | 以太网    |  通过 TCP 协议访问支持 SRTP 协议的 GE PLC 设备。 |
| [MTconnect](../../configuration/south-devices/mtconnect/mtconnect.md)                      | 以太网    |  通过 HTTP 协议访问安装有 MTConnect Agent 的设备。 |
| [Codesys V3](../../configuration/south-devices/codesys3/codesys3.md)         | 以太网  |  CODESYS V3 平台 |

### OPC

| <div style="width:120pt">协议名称</div> | <div style="width:60pt">接口类型</div> | <div style="width:80pt">备注</div> |
| ------------- | ------ | ---- |
| [OPC UA](../../configuration/south-devices/opc-ua/overview.md)                  | 以太网  |  - |
| [OPC DA](../../configuration/south-devices/neuhub/opcda.md)                  | 以太网  |  通过 NeuronHUB 访问 |

### 电力与能源

| 协议名称             |   <div style="width:60pt">接口类型</div>  |  备注     |
| ------------------- | ------ |  ---------- |
| [DL/T645-1997](../../configuration/south-devices/dlt645-1997/dlt645-1997.md)          | 串口    | 中国电力仪表标准  |
| [DL/T645-2007](../../configuration/south-devices/dlt645-2007/dlt645-2007.md)          | 串口    | 中国电力仪表标准  |
| [IEC 60870-5-101](../../configuration/south-devices/iec-101/iec-101.md)     | 串口、以太网    | - |
| [IEC 60870-5-102](../../configuration/south-devices/iec-102/iec-102.md)     | 串口、以太网    | - |
| [IEC 60870-5-103](../../configuration/south-devices/iec-103/iec-103.md)     | 串口、以太网    | - |
| [IEC 60870-5-104](../../configuration/south-devices/iec-104/iec-104.md)     | 以太网    | - |
| [IEC 61850](../../configuration/south-devices/iec61850/overview.md)           | 以太网    | - |
| [DNP 3.0](../../configuration/south-devices/dnp3/dnp3.md)         | 以太网  |  - |

### CNC 与机床

| CNC 厂商       |  CNC型号      | <div style="width:60pt">接口类型</div>|  <div style="width:100pt">对应 EMQX Neuron 协议</div>      |    备注      |
| ------------- | ------- | ----- | ----- |----- |
| 发那科 FANUC      | Fanuc 0i, 30i, 31i, 32i and 35i      |以太网    | [Fanuc Focas Ethernet](../../configuration/south-devices/fanuc-focas/fanuc-focas.md)      |   Fanuc 设备，串口方式，暂不支持采集     |
| 西门子 Siemens    | 802D SL、 808   |以太网    |  [Siemens MPI](../../configuration/south-devices/siemens-mpi/mpi.md) |           |
| 西门子 Siemens    | 828D、840DSL   |以太网    | [OPC UA](../../configuration/south-devices/opc-ua/overview.md) |    CNC 软件版本 >= 4.5 SP3       |
| 三菱 Mitsubishi    | M70、M80、M700、M800、E70    |以太网    |  [NeuronHUB](../../configuration/south-devices/neuhub/mitsubishi-cnc.md) |           |
| 海德汉 HEIDENHAIN    | TNC640, iTNC530     |以太网    |  [HEIDENHAIN CNC](../../configuration/south-devices/heidenhain-cnc/heidenhain-cnc.md) |           |
| 凯恩帝 KND   | K2000、K1000 C/Ci/F/Fi、K1000TTCi    |以太网    |   [KND CNC](../../configuration/south-devices/knd/knd.md) |         |
| 广州数控    | GSK-980等    |以太网    |  [ModbusTCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)   |         |
| 新代 SYNTEC  | 新代 CNC 设备    |以太网    | [NeuronHUB](../../configuration/south-devices/neuhub/syntec-cnc.md) |         |
| 德玛吉森精机 DMG MORI | DMG MORI 设备    |以太网    | [MTconnect](../../configuration/south-devices/mtconnect/dmg-mori.md) | 支持 MTconnect 协议的设备        |
|兄弟 Brother | Brother CNC 设备    |以太网    | [Brother CNC](../../configuration/south-devices/brother-cnc/brother-cnc.md) |        |
|马扎克 Mazak | Mazak CNC 设备    |以太网    | [Mazak CNC](../../configuration/south-devices/mazak-udp/mazak-udp.md) |         |

### 楼宇与环保

| 协议名称        |  <div style="width:60pt">接口类型</div>    | 备注      | 
| -------------- | ------- | ---------- | 
| [BACnet IP](../../configuration/south-devices/bacnet-ip/bacnet-ip.md)      | 以太网  | -        | 
| [KNXnet IP](../../configuration/south-devices/knxnet-ip/knxnet-ip.md)      | 以太网  | -        | 
| [HJ212-2017](../../configuration/south-devices/hj212-2017/hj212-2017.md) | 以太网/串口 | 环保行业标准 |

### 其他

| 协议名称       |  <div style="width:60pt">接口类型</div>        | 备注      |
| ------------- | ------- | ----- |
| [NON A11](../../configuration/south-devices/nona11/nona11.md) | 串口 | 农业机械标准 |
| [SECS GEM HSMS](../../configuration/south-devices/secs-gem/secs-gem.md)         | 以太网  |  半导体行业协议 |
| [SNMP](../../configuration/south-devices/snmp/snmp.md) | 以太网 | 采集交换机、服务器等网络设备状态 |
| [NeuronHUB](../../configuration/south-devices/neuhub/neuhub.md) | 以太网 | Windows 侧代理，用于 OPC DA、OPC AE、GE Historian 及部分 CNC |

::: tip
Modbus TCP、OPC UA、Siemens S7 三个驱动有实测的点位规模与采集周期数据，见[性能测试](../../performance/performance.md)。

北向应用（MQTT、Sparkplug B、OPC UA Server、AWS IoT、Azure IoT、Kafka 等）见[北向应用](../../configuration/north-apps/catalog.md)。
:::

## 下一步

- **找到了对应的驱动** —— 按[添加南向驱动](../../configuration/south-devices/south-devices.md)建节点，再按[组与点位](../../configuration/groups-tags/groups-tags.md)配置采集组。
- **设备数量多** —— 用模板或 Excel 批量建，见[批量配置与迁移](../../configuration/bulk-config.md)。
- **采集到的数据发往何处** —— 见[北向应用](../../configuration/north-apps/catalog.md)。
- **表里没有需要的协议** —— 可用 C SDK 自行开发，见[驱动开发 SDK 教程](../../dev-guide/sdk-tutorial/sdk-tutorial.md)。
