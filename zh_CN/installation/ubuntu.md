# 使用 deb 包安装

## 下载

从 [EMQ 官网](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Linux)下载不同版本及架构的安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.deb
```

## 安装

根据不同版本及架构安装，例如：

```bash
$ sudo dpkg -i neuronex-3.9.2-linux-amd64.deb
```

## 运行

```bash
$ sudo systemctl start neuronex
```

## 状态

```bash
$ sudo systemctl status neuronex
```

## 停止

```bash
$ sudo systemctl stop neuronex
```

## 卸载

* 卸载但保留配置文件、日志文件和数据文件
```bash
$ sudo dpkg -r neuronex
```
* 卸载并清除所有文件
```bash
$ sudo dpkg -P neuronex
```

## 升级

关闭当前 EMQX Neuron 服务：

```bash
$ sudo systemctl stop neuronex
```

卸载当前 EMQX Neuron：

```bash
$ sudo dpkg -r neuronex
```

下载新的 EMQX Neuron 安装包：

```bash
$ sudo dpkg -i neuronex-3.x.x-linux-amd64.deb
```

运行后，新版本的 EMQX Neuron 将保留之前的配置。

```bash
$ sudo systemctl start neuronex
```

::: tip
也可以手动复制并保存老版本EMQX Neuron `/opt/neuronex/data/` 目录下的文件，并导入到新版本 EMQX Neuron 的相同目录下，可恢复配置。
:::