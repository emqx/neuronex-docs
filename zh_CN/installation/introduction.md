# 安装与部署

EMQX Neuron 运行在基于 Linux 的操作系统上，支持 32/64 位 ARM 和 64 位 x86 架构，也支持 Docker、Kubernetes、KubeEdge 等容器化部署。

## 快速安装

```bash
curl -fsSL emqx.sh/neuron | bash
```

![一键安装脚本的运行输出](_assets/oneclick-install.png)

脚本在 `.deb`、`.rpm`、`tar.gz`、Docker 之间自动选择，并在有校验文件时做 SHA256 校验。以 `tar.gz` 为例，默认装到 `/opt/neuronex`，同时把 `neuronex` 软链接到 `/usr/local/bin`，装完即可直接用命令启动。

### 指定安装行为

通过环境变量控制脚本，无需手工下载安装包：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `INSTALL_METHOD` | `auto` | 指定安装方式，可选 `deb`、`rpm`、`targz`、`docker` |
| `NEURONEX_VERSION` | 最新版 | 安装指定版本 |
| `ROOT` | `/opt` | 安装根目录，实际装到 `$ROOT/neuronex` |
| `BIN_LINK_DIR` | `/usr/local/bin` | 可执行文件软链接目录 |
| `DOCKER_IMAGE` | `emqx/neuronex:latest` | 仅 `INSTALL_METHOD=docker` 时使用 |
| `DOCKER_PORT` | `8085` | 仅 Docker 方式，映射到宿主机的端口 |
| `DOCKER_NAME` | `neuronex` | 仅 Docker 方式，容器名称 |

例如强制用 Docker 方式安装指定版本：

```bash
curl -fsSL emqx.sh/neuron -o install_neuronex.sh
INSTALL_METHOD=docker NEURONEX_VERSION=3.9.2 bash install_neuronex.sh
```

## 选择安装方式

如果需要指定安装方式，或者脚本不适用于你的环境：

| <div style="width:80pt">方式</div> | 适用场景 | 详见 |
| --- | --- | --- |
| **.deb** | Debian、Ubuntu、麒麟等 Debian 系发行版，首选 | [使用安装包安装](./package.md) |
| **.rpm** | RedHat、CentOS、欧拉等 RPM 系发行版 | [使用安装包安装](./package.md) |
| **.tar.gz** | 任意 Linux 发行版，不依赖包管理器 | [使用安装包安装](./package.md) |
| **Docker** | 快速试用、容器化部署、CI 环境 | [通过 Docker 部署](./docker.md) |

安装包从[官网下载页](https://www.emqx.com/zh/try?tab=self-managed)获取，文件名形如 `neuronex-x.y.z-linux-amd64.rpm`——`x.y.z` 是版本号，`amd64` / `arm` / `arm64` 是架构。

## 操作系统要求

| 类别 | 已适配的系统 | 安装方式 |
| --- | --- | --- |
| 国际发行版 | CentOS 8.0 及以上、Ubuntu 20.04 及以上、Debian 11 及以上 | 对应的 rpm / deb / tar.gz 包 |
| 国产操作系统 | 欧拉（ARM64） | RPM 包直接安装 |
| | 麒麟（ARM64） | DEB 包直接安装 |
| | 统信 | 安装包直接安装 |

::: tip Windows
EMQX Neuron 不提供 Windows 原生安装包。在 Windows 上可以通过 Docker Desktop 运行，或用 WSL、VirtualBox 装一个 Linux 环境。
:::

## 硬件要求

EMQX Neuron 可以部署在工控机、网关设备和服务器上。在资源有限的设备上仍能做到 **100 毫秒**的采集周期；资源充足时可以利用多核 CPU 同时采集大量点位。

下表是完成数据采集所需的最低内存（启用数据处理会额外消耗资源）：

| 点位数 | 建议最小内存 | 硬件架构 | 参考机型 |
| --- | --- | --- | --- |
| 100 | 128 MB | 64 位 ARM / x86 | 树莓派 3 |
| 1,000 | 256 MB | 64 位 ARM / x86 | 树莓派 4 |
| 10,000 | 512 MB | 64 位 ARM / x86 | 工控机 |
| 10,000 以上 | 1 GB 起 | 64 位 x86 | 高性能工控机、服务器 |

点位数没有硬性上限，取决于分配的 CPU 和内存。各驱动的实测数据见[性能测试](../performance/performance.md)。

::: tip 单实例推荐规模
硬件充足时，单个实例建议不超过 **10 万个点位**、**100 个南向驱动**。超出这个规模，建议拆成多个 EMQX Neuron 实例。
:::

## 版本号说明

版本号形如 `x.y.z`：

- **x** 主版本号：引入架构性变更，不保证与旧版本兼容。
- **y** 次版本号：引入新功能，在同一主版本号内保持兼容。
- **z** 维护版本号：只含缺陷修复。

## 下一步

- **安装后验证** —— [快速入门](../quick-start/quick-start.md)，五步完成从采集到转发的完整链路。
- **配置许可证** —— 默认自带 30 点位免费额度，超出需要申请，见[许可证](./license.md)。
- **生产环境高可用** —— 见[主备模式](../best-practise/master-backup.md)。
