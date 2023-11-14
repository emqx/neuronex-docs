# 安装 NeuronEX

NeuronEX 在基于 Linux 的操作系统上支持 64位 ARM 和 64位 X86 架构，并提供以下安装包格式：
- tar 软件包方式，适用于所有 Linux 操作系统
- zip 软件包方式，适用于所有 Linux 操作系统
<!-- - Debian 软件包（.deb）格式，用于基于 Debian、Ubuntu Linux 的操作系统（即将支持）
- Redhat 包管理器（.rpm）格式，适用于基于 RedHat、CentOS Linux 的操作系统（即将支持） -->

## 下载安装包

NeuronEX 软件包可从 [官网](https://www.emqx.com/zh/try?product=neuronex) 下载。

## NeuronEX 支持的操作系统

NeuronEX 支持以下操作系统：
- CentOS 8.0 及以上版本，Ubuntu 20.04 及以上版本，其他基于 Linux 内核的操作系统

:::tip 提示
如果是 Windows 操作系统，支持以下几种安装方式:
- 使用 Virtual Box安装相应的 Linux 系统
- 使用 WSL 安装相应的 Linux 系统
- 使用 Docker Desktop，以 Docker 的方式安装和运行 NeuronEX
:::

## 硬件要求

NeuronEX 支持运行在 X86，ARM 等硬件架构的设备上以及支持容器化的部署，如 Kubernetes、KubeEdge 等，可以部署在工业现场各类**工控机**、**网关设备**及**服务器**等硬件。在硬件资源有限的设备上也能达到**100 毫秒**的高频数据采集，以及极低的采集延迟。在硬件资源充足的服务器上，NeuronEX 也能充分利用多核 CPU，能够同时对几十万的点位进行高频率的数据采集以及点位写入控制。

下表列出了 NeuronEX 在不同点位数量下的完成数采功能最低硬件要求（对采集的数据进行数据处理与计算，会额外消耗系统资源）。

| 点位数                | 建议最小内存 | 硬件架构                             | 备注                              |
| --------------------- | ------------ | ------------------------------------ | --------------------------------- |
| 100 tags              | 128M   | 64-bit ARM 和 64-bit x86 架构         | Raspberry Pi 3                    |
| 1,000 tags            | 256M   | 64-bit ARM 和 64-bit x86 架构         | Raspberry Pi 4                    |
| 10,000 tags           | 512M   | 64-bit ARM 和 64-bit x86 架构         | Industrial PC 等                  |
| 超过 10,000 tags | 1G     | 64-bit x86 架构                       | Powerful Industrial PC, Server 等 |

:::tip
NeuronEX 没有点位数量上限。取决于分配的 CPU 和内存资源。以下提供一些 NeuronEX 的性能测试结果供用户参考，这些测试数据仍然不是上限。更强大的服务器支持配置更多的数据点位。

Platform                         : Intel(R) Xeon(R) Gold 6266C@3.00GHz<br>
Memory                           : 4G<br>
Architecture                     : x86<br>
OS Support                       : Ubuntu 20.04<br>
No. of connections               : 1000 connections<br>
No. of tags for each connection  : 300 tags<br>
Total tags                       : 300,000 tags<br>
Memory Usage                     : 300M<br>
CPU Usage                        : 90%<br>

:::

<!-- ## Debian 软件包

| 下载文件                       | 架构  |
| ------------------------------ | ----- |
| neuronex-x.y.z-linux-amd64.deb | AMD64 |
| neuronex-x.y.z-linux-armhf.deb | ARMHF |
| neuronex-x.y.z-linux-arm64.deb | ARM64 |


## Redhat 软件包管理工具

| 下载文件                       | 架构  |
| ------------------------------ | ----- |
| neuronex-x.y.z-linux-amd64.rpm | AMD64 |
| neuronex-x.y.z-linux-armhf.rpm | ARMHF |
| neuronex-x.y.z-linux-arm64.rpm | ARM64 |


## Tape Archive（tar）

| 下载文件                       | 架构  |
| ------------------------------ | ----- |
| neuronex-x.y.z-linux-amd64.rpm | AMD64 |
| neuronex-x.y.z-linux-armhf.rpm | ARMHF |
| neuronex-x.y.z-linux-arm64.rpm | ARM64 | -->


## Docker 镜像

| 下载文件              | 架构   |
| --------------------- | ------ |
| emqx/neuronex:x.y.z       | Docker |
| emqx/neuronex:x.y.z-python       | Docker |

## 版本号说明

- x 为主要版本号：一般情况下，该版本会引入一些重大功能，如引入架构性的更改，主版本升级不保证与老版本之间的兼容性；
- y 是次要版本号：一般情况下，该类型版本会引入一些新功能，但是会保证在该主要版本号下的兼容性；
- z 是维护版本号：一般情况下，该版本只包含软件中错误修复的补丁等。
