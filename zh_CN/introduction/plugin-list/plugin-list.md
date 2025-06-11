# 数采插件列表

数采插件可以分为北向应用插件和南向驱动插件。北向插件通常用于连接到云平台或数据处理模块。南向插件是实现特定协议以访问外部设备的通信驱动程序。为了实现协议格式转换，至少需要一个北向插件和一个南向插件分别用于数据传递和数据采集。

登录 NeuronEX 后，您可点击**数据采集** -> **插件**查看系统的插件列表。您也可点击左上角的**添加插件**按钮安装自定义插件。

## 查看可用插件模块

插件管理页面显示所有可用的可插拔模块和详细信息，包括插件名称、关联节点类型、和描述信息，如下图所示，您可从下拉框中选择北向应用或南向设备的插件。

插件类型包括：

* System：不可删除，软件自带
* Custom：可删除，用户自己开发或者是定制开发的

## 添加新的可插拔模块

在插件页面，点击左上角的**添加插件**按钮，上传本地的插件 .so 文件和.json文件。

具体的插件开发教程请参考 [SDK 教程](../../dev-guide/sdk-tutorial/sdk-tutorial.md)。

## 替换已有插件模块

在插件页面，点击每个插件卡片上的**替换**按钮，上传本地的插件 .so 文件和.json文件。

具体的插件替换更新，请联系[EMQ商务](https://www.emqx.com/zh/contact?product=neuronex)团队。

## 南向插件列表

### 全球标准

| <div style="width:120pt">协议名称</div>                 | <div style="width:60pt">接口类型</div> | <div style="width:80pt">备注</div> |
| ------------------------------------------------------------ |  ------------ | -------------------------------- |
| Modbus TCP              | 以太网  |  - |
| Modbus RTU              | 串口    |  - |
| Modbus RTU over TCP     | 以太网  |  - |
| Modbus Ascii            | 串口  |  - |
| OPC UA                  | 以太网  |  - |
| OPC DA                  | 以太网  |  - |
| CIP Ethernet/IP         | 以太网  |  CIP –通用工业协议 |
| SECS GEM HSMS         | 以太网  |  半导体行业协议 |


### PLC 驱动

| <div style="width:120pt">协议名称</div>    | <div style="width:60pt">接口类型</div> | <div style="width:40pt">备注</div> |
| ------------------------------------------------------------ | ------ | ---- |
| Siemens S7 ISO TCP                                          | 以太网    | 连接西门子 S200、S200smart、S1200、S1500 型号的 PLC |
| Siemens S7 ISOTCP for 300/400 | 以太网  | s7-300/400 |
| Siemens MPI | 串口  | 连接支持西门子 MPI 接口的通信协议的设备 |
| Siemens FetchWrite | 以太网  | 用于带有网络扩展模块 CP443 的西门子 PLC 的访问 |
| Allen-Bradley DF1          | 串口  |  - |
| Allen-Bradley CIP EtherNet/IP                       | 以太网    |  CIP – 通用工业协议 |
| Allen-Bradley 5000 EtherNet/IP                      | 以太网    |  支持 AB ControlLogix 55xx系列，以及CompactLogix 53xx系列 PLC |
| Allen-Bradley ControlLogix 5500                              | 以太网   | - |
| Allen-Bradley MicroLogix 1400                             | 以太网     | - |
| Schneider PLC Modbus RTU                                     | 串口    | 通用Modbus RTU |
| Schneider PLC Modbus TCP                                     | 以太网  |  通用Modbus TCP |
| Inovance PLC Modbus TCP                             | 以太网  |  汇川PLC Modbus TCP |
| XINJE PLC Modbus RTU                             | 串口  |  支持信捷 XC/XD/XL 系列 PLC |
| HollySys PLC Modbus TCP                             | 以太网  |  支持HollySys LK/LE 系列 PLC |
| HollySys PLC Modbus RTU                             | 串口  |  支持HollySys LK/LE 系列 PLC |
| ABB COMLI                                        | 串口    |  与 ABB 的 PLC通讯 |
| Omron Host Link                        | 串口    |   HostLink Cmode 方式通过串口网络与欧姆龙 PLC 进行通信。 |
| Omron FINS on TCP                       | 以太网  |  通过 FINS TCP 协议与欧姆龙 PLC 进行通信。 |
| Omron FINS on UDP                        | 以太网  | 通过 FINS UDP 协议与欧姆龙 PLC 进行通信。 |
| Mitsubishi 1E           | 以太网  |  对接三菱 A 系列、FX3U、FX3G、iQ-F 系列 PLC |
| Mitsubishi 3E           | 以太网  |  对接三菱 Q 系列（MC）、iQ-F 系列（SLMP）和 iQ-L 系列 PLC |
| Mitsubishi 4E           | 以太网  |  对接三菱 iQ-F 系列（SLMP）和 IQ-R 系列 PLC |
| Mitsubishi FX           | 串口    |  对接三菱FX0、FX2、FX3 等系列 PLC |
| Panasonic Mewtocol      | 以太网    |  对接松下的 FP-XH、FP0H 系列 PLC |
| Beckhoff ADS            | 以太网  |  对接倍福Beckhoff TwinCAT PLC |
| Keyence CIP Ethernet/IP                                      | 以太网  |  CIP – 通用工业协议 |
| Keyence MC Protocol                                          | 以太网  |  三菱 MC 协议 |
| Delta Modbus TCP                             | 以太网    |  对接台达DVP系列、AS系列PLC |
| KUKA Ethernet KRL TCP                        | 以太网    |  对接库卡设备 |
| GE SRTP                      | 以太网    |  通过 TCP 协议访问支持 SRTP 协议的 GE PLC 设备。 |
| MTconnect                      | 以太网    |  通过 HTTP 协议访问安装有 MTConnect Agent 的设备。 |
| Codesys V3         | 以太网  |  CODESYS V3 平台 |

### 电力

| 协议名称             |   <div style="width:60pt">接口类型</div>  |  备注     |
| ------------------- | ------ |  ---------- |
| DL/T645-1997          | 串口    | 中国电力仪表标准  |
| DL/T645-2007          | 串口    | 中国电力仪表标准  |
| IEC 60870-5-101     | 串口、以太网    | - |
| IEC 60870-5-102     | 串口、以太网    | - |
| IEC 60870-5-103     | 串口、以太网    | - |
| IEC 60870-5-104     | 以太网    | - |
| IEC 61850           | 以太网    | - |
| DNP 3.0         | 以太网  |  - |

### 楼宇自动化

| 协议名称        |  <div style="width:60pt">接口类型</div>    | 备注      | 
| -------------- | ------- | ---------- | 
| BACnet IP      | 以太网  | -        | 
| KNXnet IP      | 以太网  | -        | 

### 数控机床和机器人

| CNC 厂商       |  CNC型号      | <div style="width:60pt">接口类型</div>|  <div style="width:100pt">对应 NeuronEX 协议</div>      |    备注      |
| ------------- | ------- | ----- | ----- |----- |
| 发那科 FANUC      | Fanuc 0i, 30i, 31i, 32i and 35i      |以太网    | Fanuc Focas Ethernet      |   Fanuc 设备，串口方式，暂不支持采集     |
| 西门子 Siemens    | 802D SL、 808   |以太网    |  Siemens MPI |           |
| 西门子 Siemens    | 828D、840DSL   |以太网    | OPC UA |    CNC 软件版本 >= 4.5 SP3       |
| 三菱 Mitsubishi    | M70、M80、M700、M800、E70    |以太网    |  NeuronHUB |           |
| 海德汉 HEIDENHAIN    | TNC640, iTNC530     |以太网    |  HEIDENHAIN CNC |           |
| 凯恩帝 KND   | K2000、K1000 C/Ci/F/Fi、K1000TTCi    |以太网    |   KND CNC |         |
| 广州数控    | GSK-980等    |以太网    |  ModbusTCP   |         |
| 新代 SYNTEC  | 新代 CNC 设备    |以太网    | NeuronHUB |         |

### 其他

| 协议名称       |  <div style="width:60pt">接口类型</div>        | 备注      |
| ------------- | ------- | ----- | 
|  环保 HJ212-2017 协议  | 以太网/串口    |    采集支持环保 HJ212-2017 标准的设备数据        |

## 北向插件列表

### 云连接

| 协议名称                                 | 备注                                 | 
| --------------------------------------- | ----------------------------------- | 
| RESTful API            | 提供标准的 RESTful API 接口   |
| MQTT                   | 对接 MQTT 协议   | 
| SparkplugB       | SparkplugB 是一种建立在 MQTT 3.1.1 基础上的工业物联网数据传输规范  | 
| Azure IOT                   | 对接 Azure IOT Hub 平台  | 
| AWS IOT                   | 对接 AWS IOT Core 平台  | 
| Websocket              | -  | 

### 应用程序

| 协议名称                                 | 备注              | 
| --------------------------------------- | --------------   |
| DataProcessing               | 对接数据处理模块  |
| DataStorage              | 对接数据存储模块  |

