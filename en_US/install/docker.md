# 通过 Docker 部署

## 获取镜像

ECP Edge docker 镜像请从 [docker hub](https://hub.docker.com/r/emqx/neuronex/tags) 网站下载。

```bash
## pull NeuronEX
$ docker pull emqx/neuronex:3.0.0
```

## 启动

```bash
## run NeuronEX
$ docker run -d --name neuronex -p 8085:8085  emqx/neuronex:3.0.0
```

* tcp 8085: Port mapping for accessing web and HTTP API ports.
* --env NEURONEX_DISABLE_AUTH=1: Optional parameter used to disable authentication.
* --restart=always: Optional parameter to automatically restart the NeuronEX container when the Docker process restarts.
* --privileged=true: Optional parameter for troubleshooting purposes.
* -v /host/path:/container/path: Optional parameter for mounting the directory /host/path on the host to the directory /container/path within the container. For example, /host/dir:/opt/neuronex/data would mount the local directory /host/dir to /opt/neuronex/data inside the container.
* --device /dev/ttyUSB0:/dev/ttyS0: Optional parameter for mapping a serial port to Docker. /dev/ttyUSB0 is the serial device under Linux, and /dev/ttyS0 is the serial device within Docker.
* --log-opt: Optional parameter to limit the size of Docker's standard output (stdout), for example, --log-opt max-size=10m.
