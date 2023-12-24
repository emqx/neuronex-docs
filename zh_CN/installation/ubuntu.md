# 使用 deb 包安装

## 下载

根据不同版本及架构下载安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.1.0/neuronex-3.1.0-linux-amd64.deb
```

## 安装

根据不同版本及架构安装，例如：

```bash
$ sudo dpkg -i neuronex-3.1.0-linux-amd64.deb
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
