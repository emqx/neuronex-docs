# 订阅南向数据

北向节点可以订阅在南向节点中创建的任何组。建立订阅后，相应组的数据将按照组的频率持续发布到北向节点。本节将介绍如何订阅组。

采集点位是以组为单位进行数据上传的，订阅选择要上传的点位组。

点击 MQTT 节点卡片，进入组列表，点击 `添加订阅` 选择要订阅的点位组，订阅南向设备的点位组。

![subscriptions-add](./_assets/subscription-add.png)

* 南向设备：选择要订阅的南向设备，例如，modbus-tcp-1；
* 组：选择南向设备下的某个组，例如，group-1。

