# FAQ 常见问题解答

## 软件安装环境支持哪些系统？

NeuronEX 支持以下操作系统，CentOS 7.0 及以上版本，Ubuntu 18.04 及以上版本，其他基于 Linux 内核的操作系统。

如果是 Windows 操作系统，支持以下几种安装方式:

- 使用 Virtual Box安装相应的 Linux 系统
- 使用 WSL 安装相应的 Linux 系统
- 使用 Docker Desktop，以 Docker 的方式安装和运行 NeuronEX

如果是 CentOS 7.0 并用 systemctl 来启动、停止服务，那么在 3.5.0 及以后发布的 RPM 包已不适用，用户需要下载 tar.gz 安装包，将其解压后运行 ./bin/neuronex install 命令，才能使用 systemctl 来启动、停止服务。在卸载软件时，需要运行 ./bin/neuronex uninstall 命令。

## 是否支持国产操作系统？

NeuronEX 已适配 ARM64 架构的欧拉系统，NeuronEX RPM 安装包可直接安装使用。

NeuronEX 已适配 ARM64 架构的麒麟系统，NeuronEX DEB 安装包可直接安装使用。

NeuronEX 已适配统信系统，NeuronEX 安装包可直接安装使用。

鸿蒙系统暂未适配，可能需要 NeuronEX 单独编译打包。

## 是否支持安卓系统？

不支持。

## 是否支持 Docker 容器化部署？

NeuronEX 支持 Docker 容器化部署，NeuronEX提供两种类型的 Docker 安装包：

- neuronex:3.x.x
    `neuronex:3.x.x`类型的安装包，集成了 Python 运行环境，如果您有 Python 算法的使用需求，请用这类镜像。
- neuronex:3.x.x-slim
    `neuronex:3.x.x-slim`类型的安装包，不集成 Python 运行环境,安装包体积更小，如果不使用 Python 相关的算法插件，请使用这类镜像。

## 是否支持 Kubernetes、KubeEdge、K3S 部署？

NeuronEX 支持 Kubernetes、KubeEdge、K3S 部署。

## 是否支持集群部署？

NeuronEX暂不支持集群部署。可通过Kubernetes、K3S等方式，保证 NeuronEX 服务的高可用及容错性。

## 软件安装需要的硬件配置？

下表列出了 NeuronEX 在不同点位数量下的完成数采功能最低硬件要求（使用 NeuronEX 数据处理功能，会额外消耗系统资源）。

| 点位数                | 建议最小内存 | 硬件架构                           | 备注                              |
| --------------------- | --------- | ---------------------------------| --------------------------------- |
| 100 tags              | 128M      | 64-bit ARM 和 64-bit x86 架构     | Raspberry Pi 3                    |
| 1,000 tags            | 256M      | 64-bit ARM 和 64-bit x86 架构     | Raspberry Pi 4                    |
| 10,000 tags           | 512M      | 64-bit ARM 和 64-bit x86 架构     | Industrial PC 等                  |
| 超过 10,000 tags       | 1G       | 64-bit x86 架构                    | Powerful Industrial PC, Server 等 |

## NeuronEX 是否有免费版本？

NeuronEX 官网下载安装包安装后，默认提供了 30 个点（30 个数据标签）的免费额度 License。您可在不安装 EMQ 商务许可证的情况下使用 NeuronEX，功能范围包括所有数采驱动（CNC 驱动除外）。

## NeuronEX 安装后如何访问？

NeuronEX 安装后，默认提供了一个默认的访问地址：`http://localhost:8085`，您可以通过浏览器访问该地址。

默认登录用户名和密码为：`admin/0000`。

## 软件支持采集哪些驱动？

请参考[数采插件列表](../introduction/plugin-list/plugin-list.md)

## 数据采集最低采集周期是多少？

NeuronEX 标准产品最低采集周期是 `100ms`，如果有更低的采集频率需求，可联系 EMQ 商务进行定制。

## 是否支持设备反控？

支持。NeuronEX 支持设备反控功能，提供[RestAPI](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html#tag/rw)、[MQTT](../configuration/north-apps/mqtt/api.md#写-tag)、[边缘计算结果反控](../streaming-processing/sink/neuron.md)等多种设备反控方式，支持工业设备智能控制决策。

## 是否支持自行开发驱动？

支持。NeuronEX 可以分为核心框架和多种可插拔模块，南向、北向的插件模块可动态添加和删除。NeuronEX 提供基于C语言的驱动开发 SDK。

## 最多支持多少个南向驱动同时采集？

在硬件性能足够的情况下，建议不超过100个南向驱动。

## 最多支持多少个数据点位同时采集？

在硬件性能足够的情况下，建议不超过10万个数据采集点。如果数据点位数量超过10万个，可通过 Docker 方式在单台服务器部署多个 NeuronEX 实例。

## 支持采集西门子200、200smartPLC、1500吗？

支持西门子全系列PLC的数据采集。

## 是否支持离线缓存数据？

支持。NeuronEX 支持北向 MQTT 数据上报网络中断时，将采集到的数据缓存到本地，网络恢复后再将缓存的数据上传到云端。

## 是否支持将数据存储在本地？

支持。NeuronEX 通过数据处理功能，可将数采数据存储到本地数据库，支持的数据库类型有 MySQL、PostgreSQL、SQLite、SQLServer、Oracle、InfluxDB v1、InfluxDB v2等。详情请参考[数据存储到SQL](../streaming-processing/sink/sql.md)、[数据存储到InfluxDB v1](../streaming-processing/sink/influx.md)、[数据存储到InfluxDB v2](../streaming-processing/sink/influx2.md)。

## 如何将 Modbus TCP 驱动采集数据转发到 MQTT 服务器？

在**数据采集**->**北向应用**页面，添加 MQTT 插件，并添加订阅，将 Modbus TCP 驱动的采集 group 添加进来。

## NeuronEX 版本升级后，如何快速迁移配置？

将原 NeuronEX `/opt/neuronex/` 目录下的data文件夹覆盖掉新的 NeuronEX `/opt/neuronex/` 目录下的data文件夹，然后重启 NeuronEX 即可。

## 是否支持视频数据接入？

NeuronEX 支持将 RTSP 视频流中的图片帧进行采集，并进行分析、存储及转发。

## 是否支持获取数据库数据？

支持。NeuronEX 支持将数据库MySQL、SQL Server、PostgreSQL、SQLite中的数据进行采集，并进行分析、存储及转发。请参考[SQL](../streaming-processing/sql.md)。

## 是否支持获取文件数据？

支持。NeuronEX 支持将txt、csv、json等格式文件中的数据进行采集，并进行分析、存储及转发。请参考[文件](../streaming-processing/file.md)。

## 是否支持AI、ML 集成分析？

支持。NeuronEX 支持用户自定义函数扩展和 AI 算法集成，提供智能数据分析能力。

## 在小型网关上 NeuronEX 启动后，数据采集配置可能丢失的问题？

NeuronEX 核心通讯依赖 unix socket，在负载大的情况下，操作系统默认配置会导致数据包丢失，建议将操作系统配置项`net.unix.max_dgram_qlen`设置为1024。设置方法如下：

在 **/etc/sysctl.conf** 文件中添加`net.unix.max_dgram_qlen = 1024`，然后执行命令 `sysctl -p`
