# Southbound Drivers

EMQX Neuron talks to field devices through southbound drivers, one per protocol. The tables below list every supported protocol and device model by category; open a page for its connection parameters, address format, and connection examples.

For the generic setup steps, see [Create a Southbound Driver](../../configuration/south-devices/south-devices.md). For a protocol that is not listed, you can write your own driver — see the [SDK Tutorial](../../dev-guide/sdk-tutorial/sdk-tutorial.md).

## Southbound Driver List

### Modbus

| <div style="width:120pt">Protocol Name</div>               | <div style="width:100pt">Communication Interface</div> | <div style="width:80pt">Remark</div> |
| ------------------------------------------------------------ |  ------------ | -------------------------------- |
| [Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)              | Ethernet  |  - |
| [Modbus RTU](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)              | Serial port    |  - |
| [Modbus RTU over TCP](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)     | Ethernet  |  See the Ethernet link option in Modbus RTU |
| [Modbus Ascii](../../configuration/south-devices/modbus-ascii/modbus-ascii.md)           | Serial port  |  - |

### PLC and Motion

| <div style="width:120pt">Protocol Name</div>    | <div style="width:100pt">Communication Interface</div> | <div style="width:40pt">Remark</div> |
| ------------------------------------------------------------ | ------ | ---- |
| [CIP Ethernet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)         | Ethernet  | - |
| [Siemens S7 ISO TCP](../../configuration/south-devices/siemens-s7/s7.md)                                          | Ethernet    | connect to Siemens S200、S200smart、S1200、S1500 PLC |
| [Siemens S7 ISOTCP for 300/400](../../configuration/south-devices/siemens-s7/s7.md) | Ethernet  | s7-300/400 |
| [Siemens MPI](../../configuration/south-devices/siemens-mpi/mpi.md) | Serial port  | Connect to devices that support Siemens MPI protocol |
| [Siemens S5 FetchWrite](../../configuration/south-devices/siemens-fetchwrite/fetchwrite.md) | Ethernet  | connect to Siemens PLCs with network expansion module CP443 |
| [Allen-Bradley DF1](../../configuration/south-devices/df1/df1.md)          | Serial port  |  - |
| [Allen-Bradley CIP EtherNet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)                       | Ethernet    |  - |
| [Allen-Bradley 5000 EtherNet/IP](../../configuration/south-devices/ab-5000/ab-5000.md)                      | Ethernet    |  AB ControlLogix 55xx and CompactLogix 53xx |
| [Allen-Bradley ControlLogix 5500](../../configuration/south-devices/ab-5500/ab-5500.md)                              | Ethernet   | - |
| [Allen-Bradley MicroLogix 1400](../../configuration/south-devices/ab-1400/ab-1400.md)                             | Ethernet     | - |
| [Schneider PLC Modbus RTU](../../configuration/south-devices/modbus-rtu/modbus-rtu.md)                                     | Serial port    | - |
| [Schneider PLC Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)                                     | Ethernet  |  - |
| [Inovance PLC Modbus TCP](../../configuration/south-devices/modbus-hc-tcp/modbus-hc-tcp.md)                             | Ethernet  |  connect to Inovance PLC |
| [XINJE PLC Modbus RTU](../../configuration/south-devices/modbus-xinje-rtu/modbus-xinje-rtu.md)                 | Serial port  |  connect to XINJE XC/XD/XL series PLC |
| [HollySys PLC Modbus TCP](../../configuration/south-devices/modbus-hollysys-tcp/modbus-hollysys-tcp.md)                             | Ethernet  |  HollySys LK/LE series PLC |
| [HollySys PLC Modbus RTU](../../configuration/south-devices/modbus-hollysys-rtu/modbus-hollysys-rtu.md)                             | Serial port  |  HollySys LK/LE series PLC |
| [ABB COMLI](../../configuration/south-devices/comli/comli.md)                                        | Serial port    |  connect to ABB PLC |
| [Omron Host Link](../../configuration/south-devices/hostlink/hostlink-cmode.md)                      | Serial port    |   connect to Omron PLC with HostLink Cmode |
| [Omron FINS on TCP](../../configuration/south-devices/omron-fins/omron-fins.md)         | Ethernet  |  connect to Omron PLC with FINS TCP |
| [Omron FINS on UDP](../../configuration/south-devices/omron-fins/omron-fins-udp.md)                     | Ethernet  | connect to Omron PLC with FINS UDP  |
| [Mitsubishi 1E](../../configuration/south-devices/mitsubishi-1e/mitsubishi-1e.md)           | Ethernet  |  connect to Mitsubishi A series、FX3U、FX3G、iQ-F series PLC |
| [Mitsubishi 3E](../../configuration/south-devices/mitsubishi-3e/overview.md)           | Ethernet  |  connect to Mitsubishi Q series（MC）、iQ-F series（SLMP）and iQ-L series PLC |
| [Mitsubishi 4E](../../configuration/south-devices/mitsubishi-4e/overview.md)           | Ethernet  |  connect to Mitsubishi iQ-F Series (SLMP), and iQ-R Series PLC |
| [Mitsubishi FX](../../configuration/south-devices/mitsubishi-fx/overview.md)           | Serial port    |  connect to Mitsubishi FX0、FX2、FX3 series PLC |
| [Panasonic Mewtocol](../../configuration/south-devices/panasonic-mewtocol/overview.md)      | Ethernet    |  connect to Panasonic FP-XH、FP0H series PLC |
| [Beckhoff ADS](../../configuration/south-devices/ads/ads.md)            | Ethernet  |  connect to Beckhoff TwinCAT PLC |
| [Keyence CIP Ethernet/IP](../../configuration/south-devices/ethernet-ip/ethernet-ip.md)                                      | Ethernet  |  - |
| [Keyence MC Protocol](../../configuration/south-devices/mitsubishi-3e/overview.md)                                          | Ethernet  |  Mitsubishi MC Protocol |
| [Delta Modbus TCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md)                  | Ethernet    |   connect to Delta DVP series、AS series PLC |
| [KUKA Ethernet KRL TCP](../../configuration/south-devices/kuka/kuka.md)                        | Ethernet    |  connect to Kuka Devices|
| [GE SRTP](../../configuration/south-devices/srtp/srtp.md)      | Ethernet    |  Access GE PLC devices that support SRTP protocol through TCP protocol. |
| [MTConnect](../../configuration/south-devices/mtconnect/mtconnect.md)          | Ethernet    |  Access devices installed with MTConnect Agent through the HTTP protocol. |
| [Codesys V3](../../configuration/south-devices/codesys3/codesys3.md)         | Ethernet  |  Codesys V3 platform |



### OPC

| <div style="width:120pt">Protocol Name</div> | <div style="width:100pt">Communication Interface</div> | <div style="width:80pt">Remark</div> |
| ------------- | ------ | ---- |
| [OPC UA](../../configuration/south-devices/opc-ua/overview.md)                  | Ethernet  |  - |
| [OPC DA](../../configuration/south-devices/neuhub/opcda.md)                  | Ethernet  |  Access via NeuronHUB |

### Power and Energy

| Protocol Name             |   <div style="width:100pt">Communication Interface</div>  |  Remark     |
| ------------------- | ------ |  ---------- |
| [DL/T645-1997](../../configuration/south-devices/dlt645-1997/dlt645-1997.md)          | Serial port    | China Electric Power Instrument Standard  |
| [DL/T645-2007](../../configuration/south-devices/dlt645-2007/dlt645-2007.md)          | Serial port    | China Electric Power Instrument Standard  |
| [IEC 60870-5-101](../../configuration/south-devices/iec-101/iec-101.md)     | Ethernet/Serial port   | - |
| [IEC 60870-5-102](../../configuration/south-devices/iec-102/iec-102.md)     | Ethernet/Serial port    | - |
| [IEC 60870-5-103](../../configuration/south-devices/iec-103/iec-103.md)     | Ethernet/Serial port    | - |
| [IEC 60870-5-104](../../configuration/south-devices/iec-104/iec-104.md)     | Ethernet    | - |
| [IEC 61850](../../configuration/south-devices/iec61850/overview.md)           | Ethernet    | - |
| [DNP 3.0](../../configuration/south-devices/dnp3/dnp3.md)         | Ethernet  |  - |

### CNC

| CNC Vendor | CNC Model | <div style="width:60pt">Interface</div> | <div style="width:100pt">EMQX Neuron Protocol</div> | Remark |
| ------------- | ------- | ----- | ----- |----- |
| FANUC | Fanuc 0i, 30i, 31i, 32i and 35i | Ethernet | [Fanuc Focas Ethernet](../../configuration/south-devices/fanuc-focas/fanuc-focas.md) | Serial interface for Fanuc devices is not supported yet |
| Siemens | 802D SL, 808 | Ethernet | [Siemens MPI](../../configuration/south-devices/siemens-mpi/mpi.md) | |
| Siemens | 828D, 840DSL | Ethernet | [OPC UA](../../configuration/south-devices/opc-ua/overview.md) | CNC software version >= 4.5 SP3 |
| Mitsubishi | M70, M80, M700, M800, E70 | Ethernet | [NeuronHUB](../../configuration/south-devices/neuhub/mitsubishi-cnc.md) | |
| HEIDENHAIN | TNC640, iTNC530 | Ethernet | [HEIDENHAIN CNC](../../configuration/south-devices/heidenhain-cnc/heidenhain-cnc.md) | |
| KND | K2000, K1000 C/Ci/F/Fi, K1000TTCi | Ethernet | [KND CNC](../../configuration/south-devices/knd/knd.md) | |
| GSK | GSK-980 and others | Ethernet | [ModbusTCP](../../configuration/south-devices/modbus-tcp/modbus-tcp.md) | |
| SYNTEC | SYNTEC CNC devices | Ethernet | [NeuronHUB](../../configuration/south-devices/neuhub/syntec-cnc.md) | |
| DMG MORI | DMG MORI devices | Ethernet | [MTconnect](../../configuration/south-devices/mtconnect/dmg-mori.md) | Devices that support the MTconnect protocol |
| Brother | Brother CNC devices | Ethernet | [Brother CNC](../../configuration/south-devices/brother-cnc/brother-cnc.md) | |
| Mazak | Mazak CNC devices | Ethernet | [Mazak CNC](../../configuration/south-devices/mazak-udp/mazak-udp.md) | |

### Building and Environment

| Protocol Name         |  <div style="width:100pt">Communication Interface</div>    | Remark      | 
| -------------- | ------- | ---------- | 
| [BACnet IP](../../configuration/south-devices/bacnet-ip/bacnet-ip.md)      | Ethernet  | -        | 
| [KNXnet IP](../../configuration/south-devices/knxnet-ip/knxnet-ip.md)      | Ethernet  | -        | 
| [HJ212-2017](../../configuration/south-devices/hj212-2017/hj212-2017.md) | Ethernet / serial | Chinese environmental monitoring standard |

### Others

| Protocol Name | <div style="width:100pt">Communication Interface</div> | Remark |
| ------------- | ------- | ----- |
| [NON A11](../../configuration/south-devices/nona11/nona11.md) | Serial port | Agricultural machinery standard |
| [SECS GEM HSMS](../../configuration/south-devices/secs-gem/secs-gem.md)         | Ethernet  |  Semiconductor Industry Protocol |
| [SNMP](../../configuration/south-devices/snmp/snmp.md) | Ethernet | Collect status from switches, servers, and other network devices |
| [NeuronHUB](../../configuration/south-devices/neuhub/neuhub.md) | Ethernet | Windows-side agent for OPC DA, OPC AE, GE Historian, and some CNC controllers |

::: tip
Measured tag counts and polling intervals are published for the Modbus TCP, OPC UA, and Siemens S7 drivers — see [Performance](../../performance/performance.md).

For northbound applications (MQTT, Sparkplug B, OPC UA Server, AWS IoT, Azure IoT, Kafka, and more), see [Northbound Applications](../../configuration/north-apps/catalog.md).
:::

## Next steps

- **Found your driver** — create the node following [Create a Southbound Driver](../../configuration/south-devices/south-devices.md), then configure collection groups per [Groups and Tags](../../configuration/groups-tags/groups-tags.md).
- **Many devices to configure** — create them in bulk with templates or Excel. See [Bulk Configuration and Migration](../../configuration/bulk-config.md).
- **Where the collected data goes** — see [Northbound Applications](../../configuration/north-apps/catalog.md).
- **Your protocol is not listed** — write your own driver with the C SDK. See [Driver SDK Tutorial](../../dev-guide/sdk-tutorial/sdk-tutorial.md).
