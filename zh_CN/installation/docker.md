# 通过 Docker 部署

## 获取镜像

NeuronEX Docker 镜像请从 [docker hub](https://hub.docker.com/r/emqx/neuronex/tags) 网站下载。

```bash
## pull NeuronEX
$ docker pull emqx/neuronex:latest
```

## 启动

```bash
## run NeuronEX
$ docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:latest
```

* tcp 8085：端口映射，用于访问 web 和 http api 端口。
* --env NEURONEX_DISABLE_AUTH=1：可选参数，用于关闭鉴权。
* --restart=always：可选参数，docker 进程重启时，自动重启 NeuronEX 容器。
* --privileged=true：可选参数，开启后 NeuronEX Crash 后会生成 Dump 文件，用于排查问题（Dump文件覆盖，只会存储一个Dump文件）。
* -v /host/path:/container/path：可选参数，用于将主机上的 /host/path 目录挂载到容器内的 /container/path 目录。（例如，/host/dir:/opt/neuronex/data，将本地目录 /host/dir 挂载到容器内的 /opt/neuronex/data）。
* --device /dev/ttyUSB0:/dev/ttyS0：可选参数，用于映射串口到 docker。/dev/ttyUSB0 是 Linux 下串口设备；/dev/ttyS0 是 Docker 下串口设备。
* --log-opt：可选参数，限制 docker 标准输出(stdout)的大小（例如，--log-opt max-size=100m）。

更多启动参数请参考 [配置管理](../admin/conf-management.md)。

## Docker 容器 Python 运行环境

NeuronEX提供两种类型的 Docker 安装包：
- **neuronex:3.x.x**

neuronex:3.x.x类型的安装包，集成了 Python 运行环境，如果您有 Python 算法的使用需求，请用这类镜像。


```bash
#run NeuronEX by neuronex:3.x.x
docker pull emqx/neuronex:3.2.0
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.2.0
```

- **neuronex:3.x.x-slim**

neuronex:3.x.x-slim类型的安装包，不集成 Python 运行环境,安装包体积更小，如果您不使用 Python 相关的算法插件，请使用这类镜像。

```bash
#run NeuronEX by neuronex:3.x.x-slim
docker pull emqx/neuronex:3.2.0-slim
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.2.0-slim
```

