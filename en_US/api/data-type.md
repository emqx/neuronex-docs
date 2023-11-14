# Data collection function data types

## Concepts

### Node

In NeuronEX, each node can connect to a device or a northbound application.

* In the device node, you can add and manage device tags.
* In the northbound node, you can select the data groups that you need to subscribe to.

### Group

You can create multiple data groups under each node to categorize tags. For example, if a device is connected to multiple temperature sensors and multiple humidity sensors, you can create two data groups, temperature and humidity to categorize the collected tags. NeuronEX uploads the collected data to the northbound application by group.

### Tag

You can create multiple collection tags under each group. For example, if a temperature sensor collects multiple temperature values, each temperature value is a tag.

### Plugin

In NeuronEX, each plugin corresponds to an implementation of a protocol. For example, one Modbus TCP protocol corresponds to one plugin, and the MQTT protocol corresponds to one plugin.

## Data types

* INT8   = 1
* UINT8  = 2
* INT16  = 3
* UINT16 = 4
* INT32  = 5
* UINT32 = 6
* INT64  = 7
* UINT64 = 8
* FLOAT  = 9
* DOUBLE = 10
* BIT    = 11
* BOOL   = 12
* STRING = 13
* BYTES  = 14
* ERROR = 15
* WORD = 16
* DWORD = 17
* LWORD = 18

## Serial port

### Baud rate

* 115200 = 0
* 57600  = 1
* 38400  = 2
* 19200  = 3
* 9600   = 4
* 4800   = 5
* 2400   = 6
* 1800   = 7
* 1200   = 8
* 600    = 9

### Parity

* NONE   = 0
* ODD    = 1
* EVEN   = 2
* MARK   = 3
* SPACE  = 4

### Stop bit

* Stop_1 = 0
* Stop_2 = 1

### Data bits

* Data_5 = 0
* Data_6 = 1
* Data_7 = 2
* Data_8 = 3

## Tag attributes

* READ = 0x01

* WRITE = 0x02

* SUBSCRIBE = 0x04

## Node

### Node type

* DRIVER = 1
* APP = 2

### Node control

* START = 0
* STOP = 1

### Node status

* INIT = 1
* READY = 2
* RUNNING = 3
* STOPPED = 4

### Node connection status

* DISCONNECTED = 0
* CONNECTED = 1

## Plugin type

* STATIC = 0
* SYSTEM = 1
* CUSTOM = 2
