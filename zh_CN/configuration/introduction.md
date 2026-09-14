# 数据采集与转发

先安装或确认所需驱动，再添加南向驱动、配点和监控。本节涵盖从设备采集、点位配置、数据监控到北向转发的完整流程。各协议参数和示例见 [南向驱动](../introduction/driver-list/driver-list.md)。

建议按侧边栏顺序阅读：

1. [添加南向驱动](./south-devices/south-devices.md)：建节点、组和点位
2. [数据监控](../admin/monitoring.md)：确认点位已采到
3. [Modbus TCP Server 模拟器](./modbus-simulator.md)：无硬件环境下测试采集
4. [数据转发](../application/overview.md)：创建北向应用并订阅南向数据

## 关键概念

### 驱动与应用 (Driver and Application)

南向驱动按协议采集设备数据；北向应用把数据送到云平台或处理引擎。协议转换至少需要各一个。二次开发见 [SDK 教程](../dev-guide/sdk-tutorial/sdk-tutorial.md)。

### [节点 (Node)](./south-devices/south-devices.md#添加南向设备)

节点是驱动或应用的实例。一个 EMQX Neuron 进程里可以同时跑多类节点，由核心框架做消息路由。

### [组 (Group)](./groups-tags/groups-tags.md) 与 [点位 (Tag)](./groups-tags/groups-tags.md)

点位描述设备里的地址、读写属性和精度等元数据。点位归到组，每组有独立采集频率。北向节点按组订阅南向数据。

## 配置流程

1. [创建南向驱动](./south-devices/south-devices.md)：按设备协议选驱动、建节点并填写连接参数。
2. [配置组与点位](./groups-tags/groups-tags.md)：添加采集组和点位。也可用 Excel [批量导入](./import-export/import-export.md)。

   :::tip
   重复步骤 1 和 2，直到所有必要的驱动、组和点位都建好。
   :::

3. 要把数据送到 MQTT、云或处理引擎时，转到 [数据转发](./north-apps/north-apps.md)：创建北向应用并订阅南向组。

整体流程如下图：

<img src="./_assets/config.png" alt="配置步骤" style="zoom:40%;" />

## 配置规范

| 对象 | 规范限制 |
| --- | --- |
| 节点(Node)名长度 | 最大 128 字符 |
| 点位(Tag)名长度 | 最大 128 字符 |
| 点位(Tag)地址长度 | 最大 128 字符 |
| 点位(Tag)描述信息长度 | 最大 256 字符 |
| 组(Group)名长度 | 最大 128 字符 |
| 单个南向驱动最大 Group 数 | 最大 512 个 |
| 北向应用最大订阅 Group 数 | 无限制 |
| 驱动或应用模块名长度 | 最大 32 字符 |
| 驱动或应用文件名长度 | 最大 64 字符 |
| 驱动或应用描述长度 | 最大 512 字符 |
| 南向驱动采集周期 | 最快 100 毫秒 |
