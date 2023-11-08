# 插件

插件可以分为北向应用和南向驱动程序。北向插件通常用于连接到云平台或像处理引擎这样的外部应用程序。南向插件是实现特定协议以访问外部设备的通信驱动程序。为了实现协议格式转换，至少需要一个北向插件和一个南向插件分别用于数据传递和数据采集。

登录 ECP Edge 后，您可点击**配置** -> **插件**查看系统的插件列表。您也可点击左上角的**添加插件**按钮安装自定义插件。

## 查看可用插件模块

插件管理页面显示所有可用的可插拔模块和详细信息，包括插件名称、关联节点类型、和描述信息，如下图所示，您可从下拉框中选择北向应用或南向设备的插件。

插件类型包括以下三种模式：

* Static：不可删除
* System：不可删除，软件自带
* Custom：可删除，用户自己开发或者是定制开发的

## 添加新的可插拔模块

在插件页面，点击左上角的**添加插件**按钮，在弹出的对话框中进行如下配置：

填写需要添加的 .so 文件的路径和文件名。

单击**创建**按钮将 .so 文件添加到构建目录。


请确保已将自己编写的 .so 插件文件放置在 ecpedge/build/plugins 目录下，再进行添加。具体的插件开发教程请参考 [SKD 教程](https://neugates.io/docs/zh/latest/dev-guide/sdk-tutorial/sdk-tutorial.html)。

## 南向插件列表

### 全球标准

| <div style="width:80pt">协议名称</div>                 | <div style="width:40pt">连接</div> | <div style="width:40pt">类型</div> | <div style="width:60pt">是否可用</div> | <div style="width:80pt">备注</div> |
| ------------------------------------------------------------ | ------ | ---- | ------------ | -------------------------------- |
| Modbus TCP              | 以太网  | 开源 | 是            | - |
| Modbus RTU              | 串口    | 开源 | 是           | - |
| Modbus RTU over TCP     | 以太网  | 开源 | 是            | - |
| OPC UA                  | 以太网  | 商业 | 是            | - |
| CIP Ethernet/IP         | 以太网  | 商业 | 是             | CIP –通用工业协议 |

### PLC 驱动

| 协议名称                                                      | <div style="width:40pt">连接</div> | <div style="width:40pt">类型</div> | 是否可用      | <div style="width:40pt">备注</div> |
| ------------------------------------------------------------ | ------ | ---- | ------------ | -------------------------------- |
| Siemens 3964R/RK512                                          | 串口    | 商业 | 仅 V1.x 可用  | 用于 S5 和 S7 |
| Siemens Industrial Ethernet ISO for S7-200/300/400/1200/1500 | 以太网  | 商业 | 是            | - |
| Siemens Fetch Write for S7-300/400 and CP443 module          | 以太网  | 商业 | 是  | - |
| Allen-Bradley DF1 half-duplex                       | 串口    | 商业 | 是  | 用于 PLC2 和 PLC5                |
| Allen-Bradley CIP EtherNet/IP                                | 以太网  | 商业 | 是            | CIP – 通用工业协议 |
| Schneider PLC Modbus RTU                                     | 串口    | 商业 | 是  | - |
| Schneider PLC Modbus TCP                                     | 以太网  | 商业 | 是  | - |
| Schneider Telemecanique UNI-TE                               | 串口    | 商业 | 仅 V1.x 可用  | - |
| ABB SattControl Comli                                        | 串口    | 商业 | 是  | - |
| Omron Host Link                                              | 串口    | 商业 | 仅 V1.x 可用  | 用于单连接和多连接 |
| Omron FINS on Host Link                                      | 串口    | 商业 | 仅 V1.x 可用  | - |
| Omron FINS on TCP                                            | 以太网  | 商业 | 是            | - |
| Omron FINS on UDP                                            | 以太网  | 商业 | 是            | - |
| Mitsubishi MC Protocol for Q series and C24 module           | 串口    | 商业 | 仅 V1.x 可用  | - |
| Mitsubishi MC Protocol for Q series and E71 module           | 以太网  | 商业 | 是            | 3E frame |
| Mitsubishi FX Series                                         | 串口    | 商业 | 仅 V1.x 可用  | - |
| Mitsubishi FX3U-ENET-ADP                                     | 以太网  | 商业 | 是            | 1E frame   |
| Mitsubishi 232ADP/485BD: Serial/RS485                        | 串口    | 商业 | 否           | - |
| Panasonic FP series MEWTOCOL-COM                             | 串口    | 商业 | 否            | - |
| Panasonic FP series MEWTOCOL-COM                             | 以太网  | 商业 | 是            | - |
| Panasonic FP series MEWTOCOL-DAT                             | 以太网  | 商业 | 否            | - |
| Beckhoff ADS/AMS TCPIP                                       | 以太网  | 商业 | 是            | - |
| Keyence CIP Ethernet/IP                                      | 以太网  | 商业 | 是            | CIP – 通用工业协议 |
| Keyence MC Protocol                                          | 以太网  | 商业 | 是            | 三菱 MC 协议 |
| Delta DVP communication protocol                             | 串口    | 商业 | 否            | - |
| Delta Modbus TCP                                             | 以太网  | 商业 | 是            | - |
| Delta CIP Ethernet/IP                                        | 以太网  | 商业 | 是            | CIP – 通用工业协议 |
| Fatek FACON serial                                           | 串口    | 商业 | 否            | - |
| Fatek FACON ethernet                                         | 以太网  | 商业 | 否            | - |
| GE FANUC 90-30 SNPX                                          | 串口    | 商业 | 否            | - |
| GE FANUC 90-30 Ethernet SRTP                                 | 以太网  | 商业 | 否            | - |

### 电力

| 协议名称             | 连接    | 类型       | 是否可用   | 备注     |
| ------------------- | ------ | --------- | --------- | ---------- |
| DL/T645-1997          | 串口    | 商业       | 是       | 中国电力仪表标准  |
| DL/T645-2007          | 串口    | 商业       | 是       | 中国电力仪表标准  |
| IEC 60870-5-101     | 串口     | 商业      | 否         | - |
| IEC 60870-5-102     | 串口     | 商业      | 否         | - |
| IEC 60870-5-103     | 串口     | 商业      | 否         | - |
| IEC 60870-5-104     | 以太网  | 商业       | 是        | - |
| IEC 61850           | 以太网  | 商业       | 是        | - |
| DNP3                | 以太网  | 商业       | 否        | - |

### 楼宇自动化

| 协议名称        | 连接      | 类型       | 是否可用  |
| -------------- | ------- | ---------- | -------- |
| BACnet IP      | 以太网  | 商业        | 是        |
| KNXnet IP      | 以太网  | 商业        | 是        |
| BACnet MS/TP    | 串口   | 商业       | 否         |
| LON            | 以太网  | 商业        | 否        |

### 数控机床和机器人

| 协议名称       | 连接     | 类型   | 是否可用   |
| ------------- | ------- | ----- | --------- |
| MTConnect      | 以太网    | 商业    | 否         |
| Fanuc 0i, 30i, 31i, 32i and 35i      | 以太网    | 商业    | 是         |
| Mitsubishi M800/M80      | 以太网    | 商业    | 否         |
| Siemens 840D、810、828D      | 以太网    | 商业    | 否         |

## 北向插件列表

### 云连接

| 协议名称                                 | 类型                                 | 是否可用                                |
| --------------------------------------- | ----------------------------------- | -------------------------------------- |
| RESTful API            | 开源   | 是       |
| MQTT                   | 开源   | 是       |
| MQTT Sparkplug B     | 商业   | 是       |
| Websocket              | 商业   | 是       |

### 应用程序

| 协议名称                                                            | 类型                                  | 是否可用                                 |
| ----------------------------------------------------------------- | ------------------------------------- | --------------------------------------- |
| eKuiper Stream Processing   | 开源    | 是         |

