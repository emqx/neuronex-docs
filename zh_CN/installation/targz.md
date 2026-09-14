# 使用 .tar.gz 包安装

## 下载

从 [EMQ 官网](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Linux)下载不同版本及架构的安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.tar.gz
```

## 安装

```bash
$ tar -zxvf neuronex-3.9.2-linux-amd64.tar.gz
$ cd neuronex-3.9.2-linux-amd64
```

::: tip 
GLIBC 需要 2.31 以上版本。
:::

## 启动

执行如下指令启动 EMQX Neuron：

```bash
$ ./bin/neuronex start
```

更多启动参数请参考 [启动参数与配置文件](../admin/conf-management.md)。

## 卸载

### 仅解压运行（未注册 systemd 服务）

如果你只是解压后通过 `./bin/neuronex start` 运行 EMQX Neuron，则卸载本质是删除解压目录。

```bash
# 停止（如果是从解压目录启动的）
./bin/neuronex stop

# 删除解压目录
rm -rf ./neuronex-<x.y.z>-linux-<arch>
```

### 已注册 systemd 服务

如果你执行过 `./bin/neuronex install` 将 EMQX Neuron 注册为 systemd 服务，请在删除目录前先取消注册：

```bash
# 取消 systemd 服务注册
./bin/neuronex uninstall

# 删除安装目录
rm -rf /opt/neuronex

# 如果你使用一键安装脚本（tar.gz 默认会创建软链接），也需要移除软链接
rm -f /usr/local/bin/neuronex
```
