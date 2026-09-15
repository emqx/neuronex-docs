# 通过 Docker 部署

## 选择镜像

| <div style="width:130pt">镜像</div> | 说明 |
| --- | --- |
| `emqx/neuronex:x.y.z` | 标准镜像。集成 Python 运行环境和规则引擎的 Python SDK（`ekuiper`、`pynng`），**使用 Python 便携插件必须用这个** |
| `emqx/neuronex:x.y.z-extend` | 基于标准镜像，同样包含 Python 运行时 |
| `emqx/neuronex:x.y.z-slim` | 不含 Python 运行环境，体积更小。**不支持** Python 便携插件——安装插件时无法拉起 Python 进程完成握手 |

不确定选哪个就用标准镜像。完整 tag 列表见 [Docker Hub](https://hub.docker.com/r/emqx/neuronex/tags)，也可以从[官网下载页](https://www.emqx.com/zh/downloads-and-install/neuronex?os=Docker)获取。

## 启动

```bash
docker pull emqx/neuronex:3.9.2

docker run -d --name neuronex \
  -p 8085:8085 \
  -v /host/neuronex-data:/opt/neuronex/data \
  --ulimit nofile=65535:65535 \
  --log-opt max-size=100m \
  emqx/neuronex:3.9.2
```

启动后浏览器打开 `http://localhost:8085`，用初始账号 **admin** / **0000** 登录。

::: warning 一定要挂载数据目录
`-v` 把宿主机目录挂到容器的 `/opt/neuronex/data`。**不挂载的话，删除容器会连同驱动配置、点位表、规则一起丢失。**
:::

## 启动参数

| <div style="width:170pt">参数</div> | 说明 |
| --- | --- |
| `-p 8085:8085` | 端口映射，用于访问 Web 控制台和 HTTP API |
| `-v <宿主机目录>:/opt/neuronex/data` | 持久化配置与数据，见上方提示 |
| `--ulimit nofile=65535:65535` | 提高文件描述符上限，节点较多时需要，见[下文](#节点较多时提高文件描述符上限) |
| `--log-opt max-size=100m` | 限制容器标准输出日志的大小 |
| `--restart=always` | Docker 守护进程重启时自动拉起容器 |
| `--device <宿主机设备>:<容器设备>` | 映射串口等设备，见[连接串口设备](#连接串口设备) |

更多启动参数见[启动参数与配置文件](../admin/conf-management.md)。

## 连接串口设备

采集 Modbus RTU、DL/T645 等串口协议时，需要把宿主机的串口映射进容器：

```bash
docker run -d --name neuronex \
  -p 8085:8085 \
  --device /dev/ttyUSB0:/dev/ttyS0 \
  emqx/neuronex:3.9.2
```

`/dev/ttyUSB0` 是宿主机上的串口设备，`/dev/ttyS0` 是容器内的路径——在南向驱动的**串口设备**参数里填容器内的这个路径。多个串口就重复使用 `--device`。

## 节点较多时提高文件描述符上限

每个节点运行时都会占用若干文件描述符。当配置的节点数较多时，总量会超过容器默认的 1024 上限，表现为节点连不上或频繁断开。

推荐直接调高上限：

```bash
--ulimit nofile=65535:65535
```

也可以用 `--privileged=true`，它会解除容器的各项限制（包括文件描述符），但同时赋予容器接近宿主机 root 的权限。**只在确有需要时使用**，一般场景用 `--ulimit` 即可。

## 卸载

停止并删除容器：

```bash
docker stop neuronex || true
docker rm neuronex || true
```

如需一并删除镜像：

```bash
docker rmi emqx/neuronex:<tag>
```

::: tip
用 `-v` 挂载过宿主机目录的话，删除容器不会清掉宿主机上的数据，需要自行删除对应目录。
:::
