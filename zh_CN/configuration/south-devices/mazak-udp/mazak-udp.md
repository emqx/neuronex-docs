# Mazak CNC

Mazak CNC 驱动通过被动 UDP 监听方式采集 Mazak CNC 的实时运行数据。Mazak CNC 通过 UDP 发送状态数据包，驱动将数据包中的各个字段解析为独立的数据点位。该驱动不会向 CNC 发送任何请求，仅监听传入的 UDP 数据。

通用配置步骤见[添加南向驱动](../south-devices.md)与[组与点位](../../groups-tags/groups-tags.md)。

::: tip
Mazak CNC 驱动为只读驱动，仅支持数据采集（读取），不支持反向控制（写入）。
:::

## 添加驱动

在 **数据采集 → 南向设备** 页点击 **添加设备**，驱动类型选择 **Mazak CNC**。

## 连接参数

点击驱动卡片进入**设备配置**页填写：

| <div style="width:100pt">参数</div> | 说明                                                                |
| ----------------------------------- | ------------------------------------------------------------------- |
| **Bind IP**                         | 绑定 UDP 监听的本地 IP 地址。默认为 `0.0.0.0`（监听所有网络接口）。 |
| **Port**                            | 监听的 UDP 端口号，取值 1~65535。默认为 `51001`。                   |
| **连接超时时间 (ms)**               | UDP 接收超时时间，取值 1~60000。默认为 `3000`。                     |

## 点位配置

以下为本驱动支持的数据类型与地址格式。

::: tip
Mazak CNC 驱动仅支持点位属性为**只读**。所有点位地址均为扁平字符串名称，不区分数据区域或索引。
:::

### 数据类型

* STRING
* INT32

### 地址格式

Mazak CNC 驱动定义了固定的点位地址集合，每个地址对应从 UDP 数据包中解析出的特定字段。

| 地址              | 数据类型 | 属性 | 说明                                                   |
| ----------------- | -------- | ---- | ------------------------------------------------------ |
| machine_name      | STRING   | 只读 | 机床名称                                               |
| machine_ip        | STRING   | 只读 | 机床 IP 地址                                           |
| status            | STRING   | 只读 | 机床状态（STOPPED, ACTIVE, FEED_HOLD）                 |
| mode              | STRING   | 只读 | 操作模式（AUTOMATIC, MANUAL_DATA_INPUT, MANUAL, EDIT） |
| program_number    | STRING   | 只读 | 当前程序号                                             |
| program_name      | STRING   | 只读 | 当前程序名称                                           |
| subprogram_number | STRING   | 只读 | 当前子程序号                                           |
| subprogram_name   | STRING   | 只读 | 当前子程序名称                                         |
| alarm_number      | STRING   | 只读 | 报警编号                                               |
| alarm_message     | STRING   | 只读 | 报警信息文本                                           |
| alarm_fore_color  | STRING   | 只读 | 报警前景色                                             |
| alarm_back_color  | STRING   | 只读 | 报警背景色                                             |
| part_count        | INT32    | 只读 | 加工计件数                                             |
| tool              | STRING   | 只读 | 当前刀具标识                                           |
| rapid_rate        | INT32    | 只读 | 快移倍率                                               |
| feed_sp_rate      | INT32    | 只读 | 进给/主轴倍率                                          |
| feed_rate          | INT32    | 只读 | 进给速率                                           |

#### 状态值

`status` 地址返回以下字符串值之一：

| 值        | 含义         |
| --------- | ------------ |
| STOPPED   | 机床已停止   |
| ACTIVE    | 机床正在运行 |
| FEED_HOLD | 进给保持     |
| UNKNOWN   | 未知状态     |

#### 模式值

`mode` 地址返回以下字符串值之一：

| 值                | 含义                    |
| ----------------- | ----------------------- |
| AUTOMATIC         | 自动操作模式            |
| MANUAL_DATA_INPUT | MDI（手动数据输入）模式 |
| MANUAL            | 手动操作模式            |
| EDIT              | 程序编辑模式            |
| UNKNOWN           | 未知操作模式            |

### 地址示例

| 地址           | 数据类型 | 说明         |
| -------------- | -------- | ------------ |
| machine_name   | STRING   | 机床名称     |
| status         | STRING   | 机床状态     |
| mode           | STRING   | 操作模式     |
| program_number | STRING   | 当前程序号   |
| alarm_number   | STRING   | 报警编号     |
| alarm_message  | STRING   | 报警信息文本 |
| part_count     | INT32    | 加工计件数   |
| tool           | STRING   | 当前刀具标识 |
| rapid_rate     | INT32    | 快移倍率     |
| feed_rate      | INT32    | 进给速率     |
