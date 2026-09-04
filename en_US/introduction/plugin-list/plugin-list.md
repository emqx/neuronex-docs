# Southbound Drivers

Southbound plugins collect device data by protocol. Northbound plugins send data to a cloud platform or processing engine. You need at least one of each for protocol conversion.

For the generic setup steps, see [Create a Southbound Driver](../../configuration/south-devices/south-devices.md). To install or replace a custom plugin, see [Managing plugins](../../configuration/ecp_edge_plugin.md). For custom development, see the [SDK Tutorial](../../dev-guide/sdk-tutorial/sdk-tutorial.md).

## Southbound Plugin List

### Global Standards

| <div style="width:120pt">Protocol Name</div>               | <div style="width:100pt">Communication Interface</div> | <div style="width:80pt">Remark</div> |
| ------------------------------------------------------------ |  ------------ | -------------------------------- |
| Modbus TCP              | Ethernet  |  - |
| Modbus RTU              | Serial port    |  - |
| Modbus RTU over TCP     | Ethernet  |  - |
| Modbus Ascii           | Serial port  |  - |
| OPC UA                  | Ethernet  |  - |
| OPC DA                  | Ethernet  |  - |
| CIP Ethernet/IP         | Ethernet  | - |
| SECS GEM HSMS         | Ethernet  |  Semiconductor Industry Protocol |

### PLC Drivers

| <div style="width:120pt">Protocol Name</div>    | <div style="width:100pt">Communication Interface</div> | <div style="width:40pt">Remark</div> |
| ------------------------------------------------------------ | ------ | ---- |
| Siemens S7 ISO TCP                                          | Ethernet    | connect to Siemens S200、S200smart、S1200、S1500 PLC |
| Siemens S7 ISOTCP for 300/400 | Ethernet  | s7-300/400 |
| Siemens MPI | Serial port  | Connect to devices that support Siemens MPI protocol |
| Siemens S5 FetchWrite | Ethernet  | connect to Siemens PLCs with network expansion module CP443 |
| Allen-Bradley DF1          | Serial port  |  - |
| Allen-Bradley CIP EtherNet/IP                       | Ethernet    |  - |
| Allen-Bradley 5000 EtherNet/IP                      | Ethernet    |  AB ControlLogix 55xx and CompactLogix 53xx |
| Allen-Bradley ControlLogix 5500                              | Ethernet   | - |
| Allen-Bradley MicroLogix 1400                             | Ethernet     | - |
| Schneider PLC Modbus RTU                                     | Serial port    | - |
| Schneider PLC Modbus TCP                                     | Ethernet  |  - |
| Inovance PLC Modbus TCP                             | Ethernet  |  connect to Inovance PLC |
| XINJE PLC Modbus RTU                 | Serial port  |  connect to XINJE XC/XD/XL series PLC |
| HollySys PLC Modbus TCP                             | Ethernet  |  HollySys LK/LE series PLC |
| HollySys PLC Modbus RTU                             | Serial port  |  HollySys LK/LE series PLC |
| ABB COMLI                                        | Serial port    |  connect to ABB PLC |
| Omron Host Link                      | Serial port    |   connect to Omron PLC with HostLink Cmode |
| Omron FINS on TCP         | Ethernet  |  connect to Omron PLC with FINS TCP |
| Omron FINS on UDP                     | Ethernet  | connect to Omron PLC with FINS UDP  |
| Mitsubishi 1E           | Ethernet  |  connect to Mitsubishi A series、FX3U、FX3G、iQ-F series PLC |
| Mitsubishi 3E           | Ethernet  |  connect to Mitsubishi Q series（MC）、iQ-F series（SLMP）and iQ-L series PLC |
| Mitsubishi 4E           | Ethernet  |  connect to Mitsubishi iQ-F Series (SLMP), and iQ-R Series PLC |
| Mitsubishi FX           | Serial port    |  connect to Mitsubishi FX0、FX2、FX3 series PLC |
| Panasonic Mewtocol      | Ethernet    |  connect to Panasonic FP-XH、FP0H series PLC |
| Beckhoff ADS            | Ethernet  |  connect to Beckhoff TwinCAT PLC |
| Keyence CIP Ethernet/IP                                      | Ethernet  |  - |
| Keyence MC Protocol                                          | Ethernet  |  Mitsubishi MC Protocol |
| Delta Modbus TCP                  | Ethernet    |   connect to Delta DVP series、AS series PLC |
| KUKA Ethernet KRL TCP                        | Ethernet    |  connect to Kuka Devices|
| GE SRTP      | Ethernet    |  Access GE PLC devices that support SRTP protocol through TCP protocol. |
| MTConnect          | Ethernet    |  Access devices installed with MTConnect Agent through the HTTP protocol. |
| Codesys V3         | Ethernet  |  Codesys V3 platform |



### Electricity

| Protocol Name             |   <div style="width:100pt">Communication Interface</div>  |  Remark     |
| ------------------- | ------ |  ---------- |
| DL/T645-1997          | Serial port    | China Electric Power Instrument Standard  |
| DL/T645-2007          | Serial port    | China Electric Power Instrument Standard  |
| IEC 60870-5-101     | Ethernet/Serial port   | - |
| IEC 60870-5-102     | Ethernet/Serial port    | - |
| IEC 60870-5-103     | Ethernet/Serial port    | - |
| IEC 60870-5-104     | Ethernet    | - |
| IEC 61850           | Ethernet    | - |
| DNP 3.0         | Ethernet  |  - |

### Building Automation

| Protocol Name         |  <div style="width:100pt">Communication Interface</div>    | Remark      | 
| -------------- | ------- | ---------- | 
| BACnet IP      | Ethernet  | -        | 
| KNXnet IP      | Ethernet  | -        | 

### CNC and Robots

| CNC Vendor | CNC Model | <div style="width:60pt">Interface</div> | <div style="width:100pt">EMQX Neuron Protocol</div> | Remark |
| ------------- | ------- | ----- | ----- |----- |
| FANUC | Fanuc 0i, 30i, 31i, 32i and 35i | Ethernet | Fanuc Focas Ethernet | Serial interface for Fanuc devices is not supported yet |
| Siemens | 802D SL, 808 | Ethernet | Siemens MPI | |
| Siemens | 828D, 840DSL | Ethernet | OPC UA | CNC software version >= 4.5 SP3 |
| Mitsubishi | M70, M80, M700, M800, E70 | Ethernet | NeuronHUB | |
| HEIDENHAIN | TNC640, iTNC530 | Ethernet | HEIDENHAIN CNC | |
| KND | K2000, K1000 C/Ci/F/Fi, K1000TTCi | Ethernet | KND CNC | |
| GSK | GSK-980 and others | Ethernet | ModbusTCP | |
| SYNTEC | SYNTEC CNC devices | Ethernet | NeuronHUB | |
| DMG MORI | DMG MORI devices | Ethernet | MTconnect | Devices that support the MTconnect protocol |
| Brother | Brother CNC devices | Ethernet | Brother CNC | |
| Mazak | Mazak CNC devices | Ethernet | Mazak CNC | |

### Other

| Protocol Name | <div style="width:100pt">Communication Interface</div> | Remark |
| ------------- | ------- | ----- |
| HJ212-2017 | Ethernet / serial | Devices that support the HJ212-2017 environmental protocol |

## Northbound Plugins

### Cloud Connection

| Protocol Name                                  | Remark                                 |
| --------------------------------------- | ----------------------------------- |
| RESTful API            | Provides standard RESTful API interfaces   |
| MQTT                   | MQTT protocol integration   |
| SparkplugB       | SparkplugB is an industrial IoT data transfer specification built on MQTT 3.1.1   |
| Azure IOT                   | Integration with Azure IoT Hub   |
| AWS IOT                   | Integration with AWS IoT Core   |
| Websocket              | WebSocket protocol integration   |
| OPC UA Server          | Exposes OPC UA server services   |
| Kafka              | Kafka protocol integration; publish collected data to Kafka for further processing   |

### Applications

| Protocol Name                                  | Remark              |
| --------------------------------------- | ------------------- |
| DataProcessing               | Integration with data processing module   |
| DataStorage              | Integration with external Datalayers   |


