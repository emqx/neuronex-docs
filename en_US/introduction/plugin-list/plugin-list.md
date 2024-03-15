# Data collection plugin list

Data collection plugins can be categorized into southbound driver plugins and northbound application plugins. Southbound plugins are communication drivers that implement specific protocols to access external devices. Northbound plugins are typically used to connect to cloud platforms or data stream processing modules. To achieve protocol format conversion, at least one southbound plugin and one northbound plugin are required for data transmission and collection, respectively.

After logging into NeuronEX, you can click on **Data Collection** -> **Plugin** to view the system's plugin list. You can also click the Add Plugin button in the upper-left corner to install custom plugins.

## View Available Plugin Modules

The plugin management page displays all available pluggable modules and detailed information, including the plugin name, associated node type, and description. As shown in the figure below, you can select plugins for northbound applications or southbound devices from the drop-down menu.

Plugin types include:

* System: Non-removable, comes with the software.
* Custom: Removable, developed by users or custom developers.

## Add New Pluggable Modules

On the plugin page, click the **Add Plugin** button in the upper-left corner to upload the plugin file.

For specific plugin development tutorials, please refer to the [SDK Tutorial](https://neugates.io/docs/zh/latest/dev-guide/sdk-tutorial/sdk-tutorial.html).

## Replace Existing Plugin Modules

On the plugin page, click the **Replace** button on each plugin card to upload the local plugin file.

For specific instructions on replacing and updating plugins, please contact the EMQ business team.

## Southbound Plugin List

### Global Standards

| <div style="width:120pt">Protocol Name</div>                 | <div style="width:100pt">Communication Interface</div> | <div style="width:80pt">Remark</div> |
| ------------------------------------------------------------ |  ------------ | -------------------------------- |
| Modbus TCP              | Ethernet  |  - |
| Modbus RTU              | Serial port    |  - |
| Modbus RTU over TCP     | Ethernet  |  - |
| OPC UA                  | Ethernet  |  - |
| OPC DA                  | Ethernet  |  - |
| CIP Ethernet/IP         | Ethernet  | - |
| Profinet IO             | Ethernet  |  - |
| SECS GEM HSMS         | Ethernet  |  Semiconductor Industry Protocol |

### PLC 驱动

| <div style="width:120pt">Protocol Name</div>    | <div style="width:100pt">Communication Interface</div> | <div style="width:40pt">Remark</div> |
| ------------------------------------------------------------ | ------ | ---- |
| Siemens S7 ISO TCP                                          | Ethernet    | connect to Siemens S200、S200smart、S1200、S1500 PLC |
| Siemens S7 ISOTCP for 300/400 | Ethernet  | s7-300/400 |
| Siemens MPI | Serial port  | Connect to devices that support Siemens MPI protocol |
| Siemens S5 FetchWrite | Ethernet  | connect to Siemens PLCs with network expansion module CP443 |
| Allen-Bradley DF1          | Serial port  |  - |
| Allen-Bradley CIP EtherNet/IP                       | Ethernet    |  - |
| Allen-Bradley ControlLogix 5500                              | Ethernet   | - |
| Allen-Bradley MicroLogix 1400                             | Ethernet     | - |
| Schneider PLC Modbus RTU                                     | Serial port    | - |
| Schneider PLC Modbus TCP                                     | Ethernet  |  - |
| ABB COMLI                                        | Serial port    |  connect to ABB PLC |
| Omron Host Link                                              | Serial port    |   connect to Omron PLC with HostLink Cmode |
| Omron FINS on TCP                                            | Ethernet  |  connect to Omron PLC with FINS TCP |
| Omron FINS on UDP                                            | Ethernet  | connect to Omron PLC with FINS UDP  |
| Mitsubishi 1E           | Ethernet  |  connect to Mitsubishi A series、FX3U、FX3G、iQ-F series PLC |
| Mitsubishi 3E           | Ethernet  |  connect to Mitsubishi Q series（MC）、iQ-F series（SLMP）and iQ-L series PLC |
| Mitsubishi FX           | Serial port    |  connect to Mitsubishi FX0、FX2、FX3 series PLC |
| Panasonic Mewtocol      | Ethernet    |  connect to Panasonic FP-XH、FP0H series PLC |
| Beckhoff ADS            | Ethernet  |  connect to Beckhoff TwinCAT PLC |
| Keyence CIP Ethernet/IP                                      | Ethernet  |  - |
| Keyence MC Protocol                                          | Ethernet  |  Mitsubishi MC Protocol |
| Delta Modbus TCP                             | Ethernet    |   connect to Delta DVP series、AS series PLC |
| KUKA Ethernet KRL TCP                        | Ethernet    |  connect to Kuka Devices|
| GE SRTP                      | Ethernet    |  Access GE PLC devices that support SRTP protocol through TCP protocol. |
| MTConnect                      | Ethernet    |  Access devices installed with MTConnect Agent through the HTTP protocol. |



### electricity

| Protocol Name             |   <div style="width:100pt">Communication Interface</div>  |  Remark     |
| ------------------- | ------ |  ---------- |
| DL/T645-1997          | Serial port    | China Electric Power Instrument Standard  |
| DL/T645-2007          | Serial port    | China Electric Power Instrument Standard  |
| IEC 60870-5-104     | Ethernet    | - |
| IEC 61850           | Ethernet    | - |

### building automation

| Protocol Name         |  <div style="width:100pt">Communication Interface</div>    | Remark      | 
| -------------- | ------- | ---------- | 
| BACnet IP      | Ethernet  | -        | 
| KNXnet IP      | Ethernet  | -        | 

### CNC

| Protocol Name        |  <div style="width:100pt">Communication Interface</div>        | Remark      |
| ------------- | ------- | ----- | 
|  Fanuc Focas Ethernet  | Ethernet    |    connect to Fanuc 0i, 30i, 31i, 32i and 35i series CNC        |
| Mitsubishi CNC    | Ethernet    |     connect to M70、M80、M700、M800、E70 series CNC |
| Heidenhain CNC    | Ethernet    |     connect to Heidenhain TNC640, iTNC530 and others through the LSV2 protocol |

## Northbound plugins

| Protocol Name                                  | Remark                                 | 
| --------------------------------------- | ----------------------------------- | 
| RESTful API            | -  |
| MQTT                   | -  | 
| MQTT Sparkplug B       | -  | 
| Websocket              | -  | 
| eKuiper               | push data to data processing module  |



