# 卸载 NeuronEX

NeuronEX 支持多种安装方式，不同安装方式对应不同的卸载方法。建议卸载前先停止 NeuronEX 服务。

## 使用 .tar.gz 包安装

### 仅解压运行（未注册 systemd 服务）

如果你只是解压后通过 `./bin/neuronex start` 运行 NeuronEX，则卸载本质是删除解压目录。

```bash
# 停止（如果是从解压目录启动的）
./bin/neuronex stop

# 删除解压目录
rm -rf ./neuronex-<x.y.z>-linux-<arch>
```

### 已注册 systemd 服务

如果你执行过 `./bin/neuronex install` 将 NeuronEX 注册为 systemd 服务，请在删除目录前先取消注册：

```bash
# 取消 systemd 服务注册
./bin/neuronex uninstall

# 删除安装目录
rm -rf /opt/neuronex

# 如果你使用一键安装脚本（tar.gz 默认会创建软链接），也需要移除软链接
rm -f /usr/local/bin/neuronex
```

## 使用 deb 包（Ubuntu/Debian）

卸载前先停止服务（如果已安装为 systemd 服务）：

```bash
sudo systemctl stop neuronex || true
```

- 卸载但保留配置文件、日志文件和数据文件：

```bash
sudo dpkg -r neuronex
```

- 卸载并清除所有文件：

```bash
sudo dpkg -P neuronex
```

## 使用 rpm 包（CentOS/RHEL）

卸载前先停止服务（如果已安装为 systemd 服务）：

```bash
sudo systemctl stop neuronex || true
```

卸载 NeuronEX：

```bash
sudo rpm -e neuronex
```

如果你的系统使用的是 `dnf/yum`，也可以尝试使用包管理器卸载，例如：

```bash
sudo dnf remove -y neuronex
# 或
sudo yum remove -y neuronex
```

## 使用 Docker 部署

卸载 Docker 方式的 NeuronEX，一般包括“停止容器、删除容器”，必要时再删除镜像。

```bash
# 停止容器
docker stop neuronex || true

# 删除容器
docker rm neuronex || true
```

如需删除镜像（可选）：

```bash
docker rmi emqx/neuronex:<tag>
```

如果你在启动容器时使用了 `-v` 挂载宿主机目录，那么卸载容器不会删除宿主机上的数据，请根据挂载路径自行清理对应数据目录。

