# 通过 Docker 部署

## 获取镜像


从 [EMQ 官网](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Docker)获取最新的 Docker 安装包，例如：

```bash
## pull EMQX Neuron
$ docker pull emqx/neuronex:3.9.2
```
:::tip
更多 EMQX Neuron Docker 镜像请从 [docker hub](https://hub.docker.com/r/emqx/neuronex/tags) 网站下载。
:::

## 启动

```bash
## run EMQX Neuron
$ docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m --privileged=true emqx/neuronex:3.9.2
```

* tcp 8085：端口映射，用于访问 web 和 http api 端口。
* --env NEURONEX_DISABLE_AUTH=1：可选参数，用于关闭鉴权。
* --restart=always：可选参数，docker 进程重启时，自动重启 EMQX Neuron 容器。
* --privileged=true：可选参数，赋予容器更高的权限，使其能够访问宿主机的资源，**推荐开启**。
* -v /host/path:/container/path：可选参数，用于将主机上的 /host/path 目录挂载到容器内的 /container/path 目录。（例如，/host/dir:/opt/neuronex/data，将本地目录 /host/dir 挂载到容器内的 /opt/neuronex/data）。
* --device /dev/ttyUSB0:/dev/ttyS0：可选参数，用于映射串口到 docker。/dev/ttyUSB0 是 Linux 下串口设备；/dev/ttyS0 是 Docker 下串口设备。
* --log-opt：可选参数，限制 docker 标准输出(stdout)的大小（例如，--log-opt max-size=100m）。

更多启动参数请参考 [启动参数与配置文件](../admin/conf-management.md)。

## Docker 容器 Python 运行环境

EMQX Neuron 提供 2 种类型的 Docker 安装包：
- **neuronex:3.x.x**（标准镜像）

neuronex:3.x.x 标准镜像集成了 Python 运行环境，以及 eKuiper Python SDK（`ekuiper`、`pynng`）。**安装和运行 eKuiper Python 便携插件（含 AI 生成函数插件）必须使用这类镜像。** `*-extend` 镜像基于标准镜像，同样包含该运行时。


```bash
#run EMQX Neuron by neuronex:3.x.x
docker pull emqx/neuronex:3.9.2
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.9.2
```

- **neuronex:3.x.x-slim**

neuronex:3.x.x-slim 类型的安装包不集成 Python 运行环境，体积更小。**不支持** eKuiper Python 便携插件：安装插件时无法拉起 Python 进程完成握手。若不使用 Python 相关算法插件，请使用这类镜像。

:::tip 提示
使用 **数据处理 → 算法集成 → 便携插件**，或 **AI 生成函数** 并部署到 eKuiper 时，请使用标准镜像 `emqx/neuronex:x.y.z`，不要使用 `*-slim`。二进制安装包（tar/deb/rpm）默认也不包含 Python，需自行安装 Python 3 并执行 `pip install ekuiper pynng`，详见 [Python 便携插件扩展示例](../streaming-processing/portable_python.md#部署要求)。
:::

```bash
#run EMQX Neuron by neuronex:3.x.x-slim
docker pull emqx/neuronex:3.9.2-slim
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.9.2-slim
```

## 卸载

卸载 Docker 方式的 EMQX Neuron，一般包括“停止容器、删除容器”，必要时再删除镜像。

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
