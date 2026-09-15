# Sparkplug B

Sparkplug B 是一种建立在 MQTT 3.1.1 基础上的工业物联网数据传输规范。Sparkplug B 在保证灵活性和效率的前提下，使 MQTT 网络具备状态感知和互操作性，为设备制造商和软件提供商提供了统一的数据共享方式。

EMQX Neuron 从设备采集到的数据可以通过 Sparkplug B 协议从边缘端传输到 Sparkplug B 应用中，用户也可以从应用程序向 EMQX Neuron 发送数据修改指令。

## 添加应用

在**数据采集 -> 北向应用**，点击 **添加应用** 添加 Sparkplug B 客户端节点。

## 应用配置

Sparkplug B 是运行在 MQTT 之上的应用型协议，所以在 EMQX Neuron 中的设置与 MQTT 应用相似。

|  参数         | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| **客户端 ID** | MQTT 客户端 ID，连接的唯一标识                                 |
| **组 ID**  | Sparkplug B 协议中的最顶层逻辑分组，可以代表工厂或车间等实体     |
| **节点 ID**   | Sparkplug B 协议中的边缘节点唯一标识                           |
| **启用别名**   | 启用 Metric 别名，值为 true 时启用，默认关闭               |
| **组 Path**   | 将南向设备的组名称作为指标名称的起始路径，值为 true 时启用, 默认开启 |
| **离线缓存**   | 离线缓存开关。连接断开时缓存 MQTT 消息，连接重建时同步缓存的 MQTT 消息到服务器, 值为 true 时开启，默认关闭 |
| **缓存内存大小** | 当 MQTT 连接异常时，最大的内存缓存大小（单位：MB）。应该小于缓存磁盘大小。 |
| **缓存磁盘大小** | 当 MQTT 连接异常时，最大的磁盘缓存大小（单位：MB）。应该大于缓存内存大小。如果不为 0，缓存内存大小也应该不为 0。 |
| **缓存消息重传间隔**  | 缓存消息重传间隔（MS）,单位毫秒 |
| **服务器地址**      | MQTT Broker 主机                                             |
| **服务器端口**      | MQTT Broker 端口号                                           |
| **用户名**  | 连接到 Broker 时使用的用户名                                  |
| **密码**  | 连接到 Broker 时使用的密码                                    |
| **SSL**       | 是否启用 mqtt ssl，默认 false                                 |
| **CA 证书**        | ca 文件，只在 ssl 值为 true 时启用                            |
| **客户端证书**      | cert 文件，只在 ssl 值为 true 时启用                          |
| **客户端私钥**       | key 文件，只在 ssl 值为 true 时启用                           |
| **私钥密码**   | key 文件密码，只有在 ssl 值为 true 时启用                     |

:::tip
以上参数中只有 **组 ID** 和 **节点 ID** 来源于 Sparkplug B 规范，其余均为 MQTT Broker 的连接参数，可以参阅 [MQTT 概览](../mqtt/overview.md)。
:::

## 订阅南向数据

数据以**组**为单位上报。点击 Sparkplug B 应用卡片进入**组列表**页，点击 **添加订阅** 选择要上报的点位组。完成订阅后，应用开始接收并上报南向数据。订阅的通用说明见[订阅南向数据](../../subscription.md)。

在组列表页还可以为每个组配置**静态点位**——一段 JSON 键值对，随该组的采集数据一并上报，用来描述设备的固定属性：

```json
{"location": "sh", "sn_number": "12345613"}
```

详见[数据上下行格式 · 静态点位](../mqtt/api.md#静态点位)。

## 主题结构

EMQX Neuron 按 Sparkplug B 规范组织主题，命名空间固定为 `spBv1.0`：

| <div style="width:170pt">主题</div> | 说明 |
| --- | --- |
| `spBv1.0/{组 ID}/NBIRTH/{节点 ID}` | 边缘节点上线 |
| `spBv1.0/{组 ID}/DBIRTH/{节点 ID}/{南向驱动名}` | 设备上线，携带该驱动的点位定义 |
| `spBv1.0/{组 ID}/DDATA/{节点 ID}/{南向驱动名}` | 采集数据上报 |
| `spBv1.0/{组 ID}/DDEATH/{节点 ID}/{南向驱动名}` | 设备离线 |
| `spBv1.0/{组 ID}/NDEATH/{节点 ID}` | 边缘节点离线，通过 MQTT 遗嘱消息发出 |

**组 ID** 和**节点 ID** 来自应用配置，`{南向驱动名}` 是被订阅的南向驱动节点名称。协议规范的完整说明见[集成 EMQX](./sparkplug.md)。

## 反控设备

Sparkplug B 应用连接成功后会自动订阅命令主题。上位应用向这些主题发布 CMD 消息即可写点位：

| <div style="width:170pt">主题</div> | 说明 |
| --- | --- |
| `spBv1.0/{组 ID}/DCMD/{节点 ID}/{南向驱动名}` | 向指定南向驱动的点位写值 |
| `spBv1.0/{组 ID}/NCMD/{节点 ID}` | 边缘节点级命令 |

点位需要在南向驱动中带 **write** 属性，见[组与点位 · 点位属性](../../groups-tags/groups-tags.md#点位属性)。

在上位平台中的实际操作见 [Ignition 连接示例](./ignition.md) 和 [Cogent 连接示例](./cogent.md)。

## 应用场景

您可通过 EMQX Neuron Sparkplug B 应用将数据上报到 EMQX，并通过 EMQX 的编解码功能得到正确完整的数据结果，具体结果，见 [集成 EMQX](sparkplug.md)。

您可通过 EMQX Neuron Sparkplug B 应用连接 Ignition 平台，具体步骤，见 [Ignition](./ignition.md)。

您也可通过 EMQX Neuron Sparkplug B 应用连接 Cogent DataHub，具体步骤，见 [Cogent](./cogent.md)。

## 运行与维护

在设备卡片或设备列，您可点击数据统计图表查看应用运行情况以及接收和发送的数据情况。关于统计字段的说明，见[创建北向应用](../north-apps.md)。

如果设备运行出现任何问题，您可点击 DEBUG 日志图表，此时系统将自动打印该节点的 DEBUG 级别日志，十分钟后将切回系统默认级别日志。稍后，您可点击页面顶部功能栏的**系统信息** -> **日志**查看日志，并进行故障诊断。有关系统日志的详细解析，见[管理日志](../../../admin/log-management.md)。
