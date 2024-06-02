# Modbus TCP 驱动性能测试

## 测试目的

在 NeuronEX Modbus TCP 驱动连接设备进行大规模数据采集及数据下发场景下，对 NeuronEX 的资源使用情况进行验证，持续监控包括：CPU，内存，网络 IO 及数据下发延迟等。

## 测试架构

![alt text](_assets/modbus-arch.png)

## 测试环境、机器配置及测试工具

- **PeakHMI Modbus TCP simulator** 是一款用于模拟 Modbus TCP 通信的工具，它允许用户在没有实际硬件的情况下测试和开发基于 Modbus TCP 协议的应用程序。Modbus TCP 是一种常用的工业通信协议，广泛应用于自动化和控制系统中，用于在设备之间传输数据。

- 部署 NeuronEX 的Linux机器硬件资源：

| NeuronEX 版本     | 操作系统 | CPU       | 内存     |  CPU 型号   |
| ---------------- | ------- | ---------| ------ |------ |
| NeuronEX 3.2.1      | Debian GNU/Linux 12      | 4核   | 30Gi | Intel(R) Xeon(R) Platinum 8269CY CPU T 3.10GHz                    |

- 通过 Prometheus 监控 Linux 机器上 NeuronEX 软件的 CPU、内存、网络 IO 等资源的使用情况。

## 测试场景

### 数据采集场景

- 场景一

NeuronEX 配置 1 个 Modbus TCP 驱动，该驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 1 万数据点位

- 场景二

NeuronEX 配置 5 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 5 万数据点位

- 场景三

NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 10 万数据点位

- 场景四

NeuronEX 配置 1 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 1 千数据点位

- 场景五

NeuronEX 配置 5 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 5 千数据点位

- 场景六

NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 1 万数据点位

### 数据下发场景

- 场景七

在 NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 10 万数据点位的情况下，下发100个数据点位。


## 结果概述

### 数据采集性能测试

| 场景 | 驱动数量 | 每个驱动group数 | 每个group点位数 | 采集频率 | 总计点位 | 点位类型 | 内存使用 | CPU 使用 | 网络带宽消耗 |
| ---------------- | ------- | ---------| ------ |------ |------ |------ |------ |------ |------ |
| 场景一           | 1个     | 10       | 1000   | 1秒     | 1w      | Float    | 199MB   | 3%      | receive：13kb/s  transmit：3kb/s |
| 场景二           | 5个     | 10       | 1000   | 1秒     | 5w      | Float    | 327MB   | 13%     | receive：69kb/s  transmit：16kb/s |
| 场景三           | 10个    | 10       | 1000   | 1秒     | 10w     | Float    | 497MB   | 30%     | receive：139kb/s  transmit：32kb/s |
| 场景四           | 1个     | 1        | 1000   | 100ms   | 1000    | Float    | 128MB   | 2%      | receive：9kb/s   transmit：2kb/s  |
| 场景五           | 5个     | 1        | 1000   | 100ms   | 5000    | Float    | 165MB   | 12%     | receive：47kb/s  transmit：12kb/s |
| 场景六           | 10个    | 1        | 1000   | 100ms   | 1w      | Float    | 189MB   | 21%     | receive：94kb/s  transmit：24kb/s |


### 数据下发延迟测试

| 场景 | 下发方式 | 下发点位数 | 测试次数 | 最小响应时间 | 最大响应时间 | 平均响应时间 |
| ---------------- | ------- | --------- | ------ |------ |------ |------ |
| 在 NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 10 万数据点位在正常采集的情况下。 | API 下发 | 100个 | 100次 | 85ms | 778ms | 523ms |

::: tip 注意

- 本测试使用的是模拟器设备，并且采集的数据点位地址均为连续地址段，所以 NeuronEX 与真实设备进行数据采集时，系统资源使用会高于本测试结果。
- 如使用 NeuronEX 数据处理功能，进行数据清洗过滤，边缘计算、算法集成，会额外消耗CPU和内存。

:::

## 具体测试结果

### 场景一

NeuronEX 配置 1 个 Modbus TCP 驱动，该驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 1 万数据点位

- 内存使用：199MB

![alt text](_assets/modbus-memory1.png)

- CPU使用：3%

![alt text](_assets/modbus-cpu1.png)

- 网络 IO 带宽使用： receive:13KB/s; transmit:3KB/s

![alt text](_assets/modbus-io1-1.png)
![alt text](_assets/modbus-io1-2.png)


### 场景二

NeuronEX 配置 5 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 5 万数据点位

- 内存使用：327MB

![alt text](_assets/modbus-memory2.png)

- CPU 使用：13%

![alt text](_assets/modbus-cpu2.png)

网络 IO 带宽使用： receive:69KB/s; transmit:16KB/s

![alt text](_assets/modbus-io2-1.png)
![alt text](_assets/modbus-io2-2.png)


### 场景三

NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 10 个采集组，每个采集组 1 秒 采集 1000个 Float 类型数据，共计 10 万数据点位

- 内存使用：497MB

![alt text](_assets/modbus-memory3.png)

- CPU 使用：30%

![alt text](_assets/modbus-cpu3.png)

- 网络 IO 带宽使用： receive:139KB/s; transmit:32KB/s

![alt text](_assets/modbus-io3-1.png)
![alt text](_assets/modbus-io3-2.png)


### 场景四

NeuronEX 配置 1 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 1 千数据点位

- 内存使用：128MB

![alt text](_assets/modbus-memory4.png)

- CPU 使用：2%

![alt text](_assets/modbus-cpu4.png)

- 网络 IO 带宽使用： receive:9KB/s; transmit:2KB/s

![alt text](_assets/modbus-io4-1.png)
![alt text](_assets/modbus-io4-2.png)


### 场景五

NeuronEX 配置 5 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 5 千数据点位

- 内存使用：165MB

![alt text](_assets/modbus-memory5.png)

- CPU 使用：12%

![alt text](_assets/modbus-cpu5.png)

- 网络 IO 带宽使用：  receive:47KB/s; transmit:12KB/s

![alt text](_assets/modbus-io5-1.png)
![alt text](_assets/modbus-io5-2.png)


### 场景六

NeuronEX 配置 10 个 Modbus TCP 驱动，每个驱动包含 1 个采集组，每个采集组 100 毫秒采集 1000个 Float 类型数据，共计 1 万数据点位

- 内存使用：189MB

![alt text](_assets/modbus-memory6.png)

- CPU 使用：21%

![alt text](_assets/modbus-cpu6.png)

- 网络 IO 带宽使用： receive:94KB/s; transmit:24KB/s

![alt text](_assets/modbus-io6-1.png)
![alt text](_assets/modbus-io6-2.png)