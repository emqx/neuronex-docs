# Data Collection

Start here to see which protocols are supported, then add a southbound driver, configure tags, and monitor values. Northbound reporting is covered in [Data Forwarding](./north-apps/north-apps.md).

Read this section in sidebar order:

1. [List of Data Collection Plugins](../introduction/plugin-list/plugin-list.md): which protocols you can connect
2. [Create a Southbound Driver](./south-devices/south-devices.md): create the node, groups, and tags
3. Open a protocol family in the sidebar (Modbus, PLC, OPC, and so on) for parameters and examples
4. [Data Monitoring](../admin/monitoring.md): confirm tags are collecting
5. [Managing Plugins](./ecp_edge_plugin.md): install or replace custom plugins

## Key concepts

### [Plugin](../introduction/plugin-list/plugin-list.md)

Plugins are southbound drivers or northbound applications. Southbound plugins collect device data; northbound plugins send data to a cloud platform or processing engine. You need at least one of each for protocol conversion. For custom development, see the [SDK Tutorial](../dev-guide/sdk-tutorial/sdk-tutorial.md).

### [Node](./south-devices/south-devices.md#add-a-southbound-device)

A node is an instance of a plugin. One EMQX Neuron process can run many nodes; the core framework routes messages between them.

### [Group](./groups-tags/groups-tags.md) and [Tag](./groups-tags/groups-tags.md)

A tag describes a device address, read/write attributes, and metadata such as precision. Tags belong to groups; each group has its own polling interval. Northbound nodes subscribe to southbound groups.

## Configuration process

1. [View available plugins](../introduction/plugin-list/plugin-list.md).
2. [Create a southbound driver](./south-devices/south-devices.md): pick the plugin for the device protocol, create a node, and set connection parameters.
3. [Configure groups and tags](./groups-tags/groups-tags.md). You can also [import tags in batch](./import-export/import-export.md) from Excel.

    :::tip
    Repeat steps 2 and 3 until all required drivers, groups, and tags are created.
    :::

4. To send data to MQTT, the cloud, or a processing engine, go to [Data Forwarding](./north-apps/north-apps.md): create a northbound application and subscribe to southbound groups.

The overall process is shown below:

<img src="./_assets/config.png" alt="Configuration steps" style="zoom:40%;" />

## Configuration specification

| Object | Limit |
| --- | --- |
| Node name length | 128 characters |
| Tag name length | 128 characters |
| Tag address length | 128 characters |
| Tag description length | 256 characters |
| Group name length | 128 characters |
| Maximum groups per southbound driver | 512 |
| Maximum subscribed groups per northbound application | unlimited |
| Plugin module name length | 32 characters |
| Plugin file name length | 64 characters |
| Plugin description length | 512 characters |
| Southbound driver collection interval | minimum 100 milliseconds |
