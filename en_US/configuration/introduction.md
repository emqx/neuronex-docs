# data collection

This section mainly introduces how to add southbound devices in NeuronEX, bidirectional communication with the devices, and connect them to external applications such as cloud platforms or data processing module.

## Capabilities of data collection

### Multi-device connection
NeuronEX provides a variety of plug-in modules, such as Modbus, OPC UA, EtherNet/IP, IEC104, BACnet, Siemens, Mitsubishi, etc. Some of these plug-ins are widely used in discrete manufacturing, building automation, CNC machine tools, robots, electricity, and various PLC communications.

### Low latency collection and control
NeuronEX is a real-time asynchronous processing server that makes full use of low-latency network methods at the edge to achieve 100 millisecond high-speed collection and data distribution.

### Large-scale concurrency
NeuronEX can connect to different industrial devices simultaneously. Thanks to the decoupled modular architecture design, each connection can be run independently. The number of concurrent connections depends on hardware resources.

### Portable deployment
The NeuronEX data collection function has a very low memory footprint, less than 10M of memory at startup, and is suitable for running on low-configuration architecture devices, such as X86, ARM and RISC-V. NeuronEX also supports Docker containerized deployment, as well as running in a Kubernetes environment.

### Better integration
NeuronEX supports seamless integration with industrial Internet platforms, public cloud platforms, and third-party applications. NeuronEX can connect to private cloud, EMQX Cloud, AWS, Microsoft Azure or local servers through various methods such as MQTT, SparkPlugB, API, etc., and seamlessly flow real-time industrial data directly to industrial applications, such as MES, ERP, big data, analysis software, to realize various complex data processing and storage scenarios.

### Unified data operations
NeuronEX helps traditional industrial devices deliver data messages asynchronously as edge nodes specified in the SparkplugB standard. SparkPlugB is an open, unified, interoperable industrial data exchange standard for data exchange between industrial information systems such as ERP, MES, SCADA and history via the MQTT broker.


## Key concepts

### [Plugin](../introduction/plugin-list/plugin-list.md)

Plugins can be divided into northbound applications and southbound drivers. Northbound plugins are typically used to connect to cloud platforms. Southbound plug-ins are communication drivers that implement specific protocols to access external devices. In order to implement protocol format conversion, at least one northbound plugin and one southbound plugin are required for data transmission and data collection respectively.

All plug-in modules are written based on C language, and SDK files are provided for users who want secondary development. For specific plugin development tutorials, please refer to [SKD Tutorial](https://neugates.io/docs/zh/latest/dev-guide/sdk-tutorial/sdk-tutorial.html).

### [Node](./groups-tags/groups-tags.md)

In NeuronEX, nodes are instantiations of plugins. In a single NeuronEX running instance, multiple nodes containing various plugins can be created for mutual communication. NeuronEX's core framework is responsible for managing message routing between these nodes. NeuronEX has powerful performance and supports the simultaneous operation of hundreds of nodes.

### [Data point (Tag)](./groups-tags/groups-tags.md)

Data points are descriptors that describe the storage location, operational attributes, and metadata of data within a device, helping users access and manipulate data. 

The data point defines the data storage location and data operation properties in the device. It also contains some metadata information about the data, such as scaling, accuracy, and read/write properties. Point information helps describe an item and allows it to be found in a device or processed for automatic reading/writing. The user will identify those points of interest in the device to read data from or write data to the device.

### [Group](./groups-tags/groups-tags.md)

Data Points will be assigned to groups. Each group has an independent polling frequency to read data from the device. The collection of points in the device that the user is interested in is divided into several groups for better management. The routing mechanism is based on these groups being exchanged between nodes as units of information. A northbound node can subscribe to any group in any southbound node. These subscriptions will be used to route data messages between nodes. Additionally, there is a Group Polling Frequency that controls the time interval at which devices are polled.

## Configuration process

The following is the workflow of how to set up NeuronEX to convert various industrial protocols and then complete data transmission and collection.

1. [View all available plugins](../introduction/plugin-list/plugin-list.md): The data collection and transmission functions of NeuronEX can be realized using various protocol plug-ins.

2. [Create southbound driver](./south-devices/south-devices.md): According to the protocol type of the device, select the southbound plug-in driver on NeuronEX and create a node. Configure the parameters of the driver to establish a communication connection between NeuronEX and the device.

3. [Establish communication between device and NeuronEX](./groups-tags/groups-tags.md): First add groups and points for the southbound driver. Once the group and point are created, the real-time value of the point can be obtained from data monitoring. To facilitate user operations, NeuronEX supports related configuration information through offline Excel files [batch import] (./import-export/import-export.md).

    :::tip

    Repeat steps 2 and 3 until all necessary drives, groups, and points have been created.
    :::

4. [Create a northbound application and subscribe to a southbound device](./north-apps/north-apps.md): Select the required northbound plug-in to realize data transmission. Each northbound plug-in can only connect to one destination, such as stream processing module, EMQX message middleware, industrial Internet platform, etc. After creating the northbound device, you need to subscribe to the group. In this step, there is no need to set up groups and points. Northbound nodes can subscribe to any group created in southbound nodes. After the subscription is established, the data of the corresponding group will be continuously published to the northbound node according to the frequency of the group.

The overall process is shown in the figure below:

<img src="./_assets/config.png" alt="Configuration steps" style="zoom:40%;" />