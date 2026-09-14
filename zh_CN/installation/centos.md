# 使用 rpm 包安装

## 下载

从 [EMQ 官网](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Linux)下载不同版本及架构的安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.rpm
```

## 安装

根据不同版本及架构安装，例如：

```bash
$ sudo rpm -ivh neuronex-3.9.2-linux-amd64.rpm
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

```bash
$ sudo rpm -e neuronex
```

## 卸载

卸载前先停止服务（如果已安装为 systemd 服务）：

```bash
sudo systemctl stop neuronex || true
```

卸载 EMQX Neuron：

```bash
sudo rpm -e neuronex
```

如果你的系统使用的是 `dnf/yum`，也可以尝试使用包管理器卸载，例如：

```bash
sudo dnf remove -y neuronex
# 或
sudo yum remove -y neuronex
```
