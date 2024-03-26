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

具体的插件开发教程请参考 [SDK 教程](https://neugates.io/docs/zh/latest/dev-guide/sdk-tutorial/sdk-tutorial.html)。

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
| OPC UA                  | 以太网  |  - |
| OPC DA                  | 以太网  |  - |
| CIP Ethernet/IP         | 以太网  |  CIP –通用工业协议 |
| Profinet IO             | 以太网  |  - |
| SECS GEM HSMS         | 以太网  |  半导体行业协议 |

### PLC 驱动

| <div style="width:120pt">协议名称</div>    | <div style="width:60pt">接口类型</div> | <div style="width:40pt">备注</div> |
| ------------------------------------------------------------ | ------ | ---- |
| Siemens S7 ISO TCP                                          | 以太网    | 连接西门子 S200、S200smart、S1200、S1500 型号的 PLC |
| Siemens S7 ISOTCP for 300/400 | 以太网  | s7-300/400 |
| Siemens MPI | 串口  | 连接支持西门子 MPI 接口的通信协议的设备 |
| Siemens S5 FetchWrite | 以太网  | 用于带有网络扩展模块 CP443 的西门子 PLC 的访问 |
| Allen-Bradley DF1          | 串口  |  - |
| Allen-Bradley CIP EtherNet/IP                       | 以太网    |  CIP – 通用工业协议 |
| Allen-Bradley ControlLogix 5500                              | 以太网   | - |
| Allen-Bradley MicroLogix 1400                             | 以太网     | - |
| Schneider PLC Modbus RTU                                     | 串口    | 通用Modbus RTU |
| Schneider PLC Modbus TCP                                     | 以太网  |  通用Modbus TCP |
| Inovance PLC Modbus TCP                             | 以太网  |  汇川PLC Modbus TCP |
| ABB COMLI                                        | 串口    |  与 ABB 的 PLC通讯 |
| Omron Host Link                                              | 串口    |   HostLink Cmode 方式通过串口网络与欧姆龙 PLC 进行通信。 |
| Omron FINS on TCP                                            | 以太网  |  通过 FINS TCP 协议与欧姆龙 PLC 进行通信。 |
| Omron FINS on UDP                                            | 以太网  | 通过 FINS UDP 协议与欧姆龙 PLC 进行通信。 |
| Mitsubishi 1E           | 以太网  |  对接三菱 A 系列、FX3U、FX3G、iQ-F 系列 PLC |
| Mitsubishi 3E           | 以太网  |  对接三菱 Q 系列（MC）、iQ-F 系列（SLMP）和 iQ-L 系列 PLC |
| Mitsubishi FX           | 串口    |  对接三菱FX0、FX2、FX3 等系列 PLC |
| Panasonic Mewtocol      | 以太网    |  对接松下的 FP-XH、FP0H 系列 PLC |
| Beckhoff ADS            | 以太网  |  对接倍福Beckhoff TwinCAT PLC |
| Keyence CIP Ethernet/IP                                      | 以太网  |  CIP – 通用工业协议 |
| Keyence MC Protocol                                          | 以太网  |  三菱 MC 协议 |
| Delta Modbus TCP                             | 以太网    |  对接台达DVP系列、AS系列PLC |
| KUKA Ethernet KRL TCP                        | 以太网    |  对接库卡设备 |
| GE SRTP                      | 以太网    |  通过 TCP 协议访问支持 SRTP 协议的 GE PLC 设备。 |
| MTconnect                      | 以太网    |  通过 HTTP 协议访问安装有 MTConnect Agent 的设备。 |


### 电力

| 协议名称             |   <div style="width:60pt">接口类型</div>  |  备注     |
| ------------------- | ------ |  ---------- |
| DL/T645-1997          | 串口    | 中国电力仪表标准  |
| DL/T645-2007          | 串口    | 中国电力仪表标准  |
| IEC 60870-5-104     | 以太网    | - |
| IEC 61850           | 以太网    | - |

### 楼宇自动化

| 协议名称        |  <div style="width:60pt">接口类型</div>    | 备注      | 
| -------------- | ------- | ---------- | 
| BACnet IP      | 以太网  | -        | 
| KNXnet IP      | 以太网  | -        | 

### 数控机床和机器人

| 协议名称       |  <div style="width:60pt">接口类型</div>        | 备注      |
| ------------- | ------- | ----- | 
|  Fanuc Focas Ethernet  | 以太网    |    连接Fanuc 0i, 30i, 31i, 32i and 35i系列CNC设备        |
| Mitsubishi CNC    | 以太网    |   连接M70、M80、M700、M800、E70等系列CNC设备 |
| 海德汉 CNC    | 以太网    |   通过 LSV2 协议访问海德汉 TNC640, iTNC530 等系列设备 |

### 其他

| 协议名称       |  <div style="width:60pt">接口类型</div>        | 备注      |
| ------------- | ------- | ----- | 
|  环保 HJ212-2017 协议  | 以太网/串口    |    采集支持环保 HJ212-2017 标准的设备数据        |

## 北向插件列表

### 云连接

| 协议名称                                 | 备注                                 | 
| --------------------------------------- | ----------------------------------- | 
| RESTful API            | -  |
| MQTT                   | -  | 
| MQTT Sparkplug B       | -  | 
| Websocket              | -  | 

### 应用程序

| 协议名称                                 | 备注              | 
| --------------------------------------- | --------------   |
| eKuiper Stream Processing               | 对接数据处理模块  |

