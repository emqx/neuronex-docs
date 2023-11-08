# 快速开始

本章节将指导用户从下载安装开始，以 Modbus TCP 驱动协议为例，快速开始使用 ECP Edge 采集模拟 Modbus 设备的数据，并将数据上传到 MQTT Broker。

## 安装 ECP Edge

ECP Edge 提供多种安装方式，用户可在 [安装](../install/introduction.md) 中查看详细的安装方式。本实例采用容器化部署的方式，以便于最快开始体验 ECP Edge。

获取 Docker 镜像

```
$ docker pull emqx/neuron:latest
```

启动 Docker 容器

```
$ docker run -d --name neuron -p 7000:7000 --privileged=true --restart=always emqx/neuron:latest
```

## 安装 Modbus 模拟器

安装 PeakHMI Slave Simulators 软件，安装包可在 [PeakHMI 官网](https://hmisys.com) 中下载。

安装后，运行 Modbus TCP slave EX。设置模拟器点位数值及站点号，如下图所示。

![modbus-simulator](./_assets/modbus-simulator.png)

:::tip 须保证 ECP Edge 与模拟器运行在同一局域网内。

Windows 中尽量关闭防火墙，否则可能会导致 ECP Edge 连接不上模拟器。 

:::

## 登录 ECP Edge

打开 Web 浏览器，输入运行 ECP Edge 的网关地址和端口号，即可进入到管理控制台页面，默认端口号为 7000。访问格式，http://x.x.x.x:7000。x.x.x.x 代表安装 ECP Edge 的网关地址。

页面打开后，进入到登录界面，用户可使用初始用户名与密码登录（初始用户名：admin，初始密码：0000），如下图所示。

![login](./_assets/login.png)

## 添加南向设备

创建南向设备卡片可用于 ECP Edge 与设备建立连接、设备驱动协议的选择及设备数据采集点位的配置。

在 `配置` 菜单中选择 `南向设备管理`，进入到南向设备管理界面，单击 `添加设备` 按键新增设备，如下图所示。

![south-add](./_assets/south-add.png)

添加一个新的南向设备：

- 名称：填写设备名称，例如 modbus-tcp-1；
- Plugin：下拉框选择 modbus-tcp 的插件；
- 点击 `创建` 按键新增设备。

### 设置南向设备参数

配置 ECP Edge 与设备建立连接所需的参数。

单击南向设备卡片上的 `设备配置` 按键进入设备配置界面，如下图所示。

![south-setting](./_assets/south-setting.png)

- Host：填写安装 PeakHMI Slave Simulators 软件的 PC 端 IP 地址。
- 点击 `提交`，完成设备配置，设备卡片自动进入 **运行中** 的工作状态；

:::tip 

每个设备所需的配置参数有所不同，详细南向设备参数说明可参考 [模块配置](../configuration/south-devices/south-devices.md)。 

:::

## 建立通信

ECP Edge 支持通过设备点位的设置与南向设备建立通信，设置点位前，需要线创建组，用于设备采集点位的归类。

单击设备节点卡片任意空白处，进入 Group 列表管理界面，点击 `创建` 按键，弹出 `创建 Group` 的对话框，如下图所示。

![group-add](./_assets/group-add.png)

为设备节点创建一个组：

- Group 名称：填写 Group 名称，例如 group-1；
- 点击 `创建`，完成组的创建。

添加需要采集的设备点位，包括点位地址，点位属性，数据类型等。

点击组中的 `Tag 列表` 图标，进入 Tag 列表管理界面，如下图所示。

![tag-list-null](./_assets/tag-list-null.png)

选择 `创建` 按键，进入添加标签页面。

![tags-add](./_assets/tags-add.png)

手动为组创建标签：

- 名称：填写 Tag 名称，例如，tag1；
- 属性：下拉选择 Tag 属性，例如，read，write；
- 类型：下拉选择数据类型，例如，int16；
- 地址：填写驱动地址，例如，1!40001。1 代表 Modbus 模拟器中设置的点位站点号，40001 代表点位寄存器地址，详细的驱动地址使用说明请参阅 [模块配置](../configuration/south-devices/south-devices.md)；
- 点击`创建`按键，完成 Tag 的创建；

点位创建完成后，设备卡片的工作状态处于 **运行中**，连接状态应处于 **已连接**。若此时连接状态仍然处于 **未连接** 的状态，请先在 ECP Edge 运行环境终端执行以下指令，以确认 ECP Edge 运行环境能否访问到到对应的 IP 及端口：

```
$ telnet <运行 Modbus 模拟器 PC 端的 IP> 502
```

用户请确认在设备配置时 IP 与 Port 是否正确设置，防火墙是否关闭。 :::

## 查看采集数据

在`监控`菜单下选择`数据监控`，进入数据监控界面，查看已创建点位读取到的数值，如下图所示。

![data-monitoring](./_assets/data-monitoring.png)

数据监控以组为单位显示数值：

- 南向设备：下拉框选择想要查看的南向设备，例如，选择上面步骤已经创建好的 modbus-tcp-1;
- Group 名称：下拉框选择想要查看所选南向设备下的组，例如，选择上面步骤已经创建好的 group-1；
- 选择完成，页面将会展示读取到组底下每一个标签的值；

## 添加北向插件模块

创建北向应用卡片用于 ECP Edge 与北向应用建立连接并将采集到的设备数据上传到 MQTT Broker。

在`配置`菜单中选择`北向应用管理`，单击 `添加应用` 按键添加应用，如下图所示。

![north-add](./_assets/north-add.png)

添加一个 MQTT 云连接模块：

- 名称：填写应用名称，例如，mqtt；
- Plugin：下拉框选择 mqtt 的插件；
- 点击 `创建` 按键新增应用。

### 设置北向应用参数

配置 ECP Edge 与北向应用建立连接所需的参数。

点击应用卡片上的 `应用配置` 按键进入应用配置界面，如下图所示。

![mqtt-config](./_assets/mqtt-config.png)

设置 MQTT 连接：

- 使用默认的上报主题（/ECP Edge/mqtt/upload）；
- 使用默认的公共的 EMQX Broker（broker.emqx.io）；
- 点击`提交`，完成北向应用的配置，应用卡片自动进入 **运行中** 的工作状态。

## 订阅南向标签组

采集到的数据都是以组为单位上传云端的，用户需要选择上传哪些组的数据。

点击应用节点卡片任意空白处，进入订阅 Group 界面，点击右上角的 `添加订阅` 按键添加订阅，如下图所示。

![subscriptions-add](./_assets/subscription-add.png)

订阅南向设备的数据组：

- 南向设备：下拉框选择已创建的南向设备，例如，modbus-tcp-1；
- Group：点击下拉框选择所要订阅的 Group，例如，group-1；
- 点击`提交`，完成订阅。

## 在 MQTT 客户端查看数据

订阅完成后，用户可以使用 MQTT 客户端（推荐使用 MQTTX，可在[官网](https://www.emqx.com/zh/products/mqttx)中下载）连接到公共的 EMQX 代理来查看上报的数据，如下图所示。

![mqttx](./_assets/mqttx.png)

订阅成功之后可以看到 MQTTX 可以一直接收到 ECP Edge 采集并上报过来的数据。

- 打开 MQTTX 添加新的连接，正确填写名称与公共 EMQX Broker 的 Host 与 Port，完成连接;
- 添加新的订阅，Topic 要与设置北向应用参数中的 Upload topic 保持一致，例如，填写 `/ecpedge/mqtt/upload`。

:::tip 

默认的上传 Topic 的主题格式为 `/ecpedge/{node_name}/upload`，其中 {node_name} 为创建的北向应用的名称。用户也可自定义上报主题。

:::

接下来，我们将演示如何通过编辑规则，例如，在一个温度和湿度传感器场景中，当一个时间窗口内平均温度大于 30 摄氏度时发出警报。我们可以通过以下几个步骤为上述场景编写规则。

## 定义流

1. 在**数据流处理** -> **源管理**页面，点击 **创建流** 按钮。
2. 创建一个名为 `demo` 的流，消费 DATASOURCE 属性中指定的 MQTT `demo` 主题。MQTT 源将连接到 MQTT 服务器，默认地址是 `tcp://localhost:1883`。如果你的 MQTT 服务器地址不同，点击 `添加配置键` 来设置一个新的配置并使用。
   ![创建流](/Users/lena/Documents/GitHub/Lena Pan/ekuiper/docs/zh_CN/resources/create_stream.png)
3. 点击`提交`。你应该在流列表中找到 `demo` 流。

## 编写规则

1. 进入**规则**页面，点击 "创建规则"。
2. 写下规则的ID、名称和SQL，如下所示。然后点击 "添加" 来添加动作。SQL是`SELECT count(*), avg(temperature) AS avg_temp, max(hum) AS max_hum FROM demo GROUP BY TUMBLINGWINDOW(ss, 5) HAVING avg_temp > 30`。
   ![创建规则](/Users/lena/Documents/GitHub/Lena Pan/ekuiper/docs/zh_CN/resources/create_rule.png)
3. 添加 MQTT 动作并填写配置，如下所示。在 Sink 类型下拉菜单中选择 `mqtt`。将服务器地址设为你的服务器，并将主题设为 `result/rule1`。ClientID 是可选的，如果没有设置，将自动分配一个 uuid。如果设置了，请确保该 ID 是唯一的，并且只在一条规则中使用。根据你的 MQTT 服务器的配置，设置其他属性，如用户名、密码。
   ![add mqtt action](/Users/lena/Documents/GitHub/Lena Pan/ekuiper/docs/zh_CN/resources/mqtt_action.png)
4. 点击 "提交"。你应该在规则列表中找到`myRule`规则并开始使用。

现在，我们已经通过指定 SQL 作为业务逻辑创建了一条规则，并添加了一个 MQTT 动作。正如你所看到的，这些动作可以有很多个，你可以添加更多的动作，如日志、REST和文件来发出警报动作。

## 测试规则

现在，规则引擎已准备就绪，可以接收来自 MQTT `demo` 主题的事件。 要对其进行测试，只需使用 MQTT 客户端将消息发布到 `demo` 主题即可。 该消息应为 json 格式，如下所示：

```json
{"temperature":31.2, "humidity": 77}
```

由于我们将警报发布到 MQTT 主题 `result/myRule`，我们可以使用 MQTT 客户端来订阅该主题。如果5秒钟的平均温度大于30，我们应该收到消息。

下面是一个数据例子和 MQTTX 中的输出。

![result](/Users/lena/Documents/GitHub/Lena Pan/ekuiper/docs/zh_CN/resources/result.png)
