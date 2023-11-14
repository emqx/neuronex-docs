# 使用 .tar.gz 包安装

## 下载

根据不同版本及架构下载安装包，例如：

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.0.1/neuronex-3.0.1-linux-amd64.tar.gz
```

## 安装

```bash
$ tar -zxvf neuronex-3.0.1-linux-amd64.tar.gz
$ cd neuronex-3.0.1-linux-amd64
```

::: tip 
GLIC 需要 2.31 以上版本。
:::

## 启动

执行如下指令启动 NeuronEX：

```bash
$ ./bin/neuronex run
```

更多启动参数请参考 [配置管理](../admin/conf-management.md)。
