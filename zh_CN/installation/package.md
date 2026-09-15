# 使用安装包安装

本文介绍用 deb、rpm、tar.gz 三种安装包部署 EMQX Neuron。如果不确定选哪种，或者想省事，用[一键安装脚本](./introduction.md#快速安装)即可，它会自动判断并选择。

## 选择包格式

| <div style="width:70pt">格式</div> | 适用系统 | 说明 |
| --- | --- | --- |
| **.deb** | Debian、Ubuntu、麒麟等 Debian 系 | 首选。装完自动注册 systemd 服务 |
| **.rpm** | RedHat、CentOS、欧拉等 RPM 系 | 同上 |
| **.tar.gz** | 任意 Linux 发行版 | 不依赖包管理器。可解压即用，也可手动注册为 systemd 服务 |

## 下载

从 [EMQ 官网下载页](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Linux)选择版本和架构，或直接用 `wget`：

```bash
# 以 3.9.2、amd64 为例，把扩展名换成 .rpm 或 .tar.gz 即可下载其他格式
wget https://www.emqx.com/zh/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.deb
```

文件名格式为 `neuronex-<版本号>-linux-<架构>.<格式>`，架构可选 `amd64`、`arm`、`arm64`。

## 安装

| 格式 | 命令 |
| --- | --- |
| **.deb** | `sudo dpkg -i neuronex-3.9.2-linux-amd64.deb` |
| **.rpm** | `sudo rpm -ivh neuronex-3.9.2-linux-amd64.rpm` |
| **.tar.gz** | `tar -zxvf neuronex-3.9.2-linux-amd64.tar.gz && cd neuronex-3.9.2-linux-amd64` |

::: tip
三种格式都要求 GLIBC 2.31 及以上。在较老的发行版上安装前先确认：`ldd --version`。
:::

## 启动与管理

### deb 和 rpm

安装包会自动注册 systemd 服务：

```bash
sudo systemctl start neuronex     # 启动
sudo systemctl status neuronex    # 查看状态
sudo systemctl stop neuronex      # 停止
```

### tar.gz

解压后有两种用法。直接从解压目录运行：

```bash
./bin/neuronex start
./bin/neuronex stop
```

或者先注册成 systemd 服务，之后就和 deb/rpm 一样用 `systemctl` 管理：

```bash
./bin/neuronex install
sudo systemctl start neuronex
```

更多启动参数见[启动参数与配置文件](../admin/conf-management.md)。

## 升级

三种格式的升级流程一致：停服务、装新包、再启动。配置和数据保存在 `/opt/neuronex/data/`，不会被覆盖。

```bash
sudo systemctl stop neuronex

# deb
sudo dpkg -i neuronex-<新版本>-linux-amd64.deb
# rpm
sudo rpm -Uvh neuronex-<新版本>-linux-amd64.rpm
# tar.gz：解压新包到原目录即可

sudo systemctl start neuronex
```

::: tip
升级前建议备份 `/opt/neuronex/data/` 目录。万一需要回滚，把备份复制回新版本的相同目录即可恢复配置。
:::

## 卸载

| 格式 | 命令 | 说明 |
| --- | --- | --- |
| **.deb** | `sudo dpkg -r neuronex` | 保留配置、日志和数据文件 |
| | `sudo dpkg -P neuronex` | 一并清除所有文件 |
| **.rpm** | `sudo rpm -e neuronex` | 也可用 `sudo dnf remove neuronex` 或 `sudo yum remove neuronex` |
| **.tar.gz** | `rm -rf <解压目录>` | 解压即用的情况，先 `./bin/neuronex stop` |
| | `./bin/neuronex uninstall` | 注册过 systemd 服务的，先取消注册再删目录 |

卸载前先停止服务：

```bash
sudo systemctl stop neuronex || true
```

用一键脚本装的 tar.gz 还会在 `/usr/local/bin` 下留一个软链接，一并删除：

```bash
sudo rm -rf /opt/neuronex
sudo rm -f /usr/local/bin/neuronex
```
