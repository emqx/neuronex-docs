# 使用 rpm 包安装

## 下载

根据不同版本及架构下载安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.5.0/neuronex-3.5.0-linux-amd64.rpm
```

## 安装

根据不同版本及架构安装，例如：

```bash
$ sudo rpm -ivh neuronex-3.5.0-linux-amd64.rpm
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
