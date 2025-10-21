# Running with Docker

## Get the image

The EMQX Neuron (formerly NeuronEX) docker image can be downloaded from the [docker hub](https://hub.docker.com/r/emqx/neuronex/tags) website.

```bash
## pull EMQX Neuron
$ docker pull emqx/neuronex:latest
```

## Start

```bash
## run EMQX Neuron
$ docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m --privileged=true emqx/neuronex:latest
```

* tcp 8085: Port mapping for accessing web and HTTP API ports.
* --env NEURONEX_DISABLE_AUTH=1: Optional parameter used to disable authentication.
* --restart=always: Optional parameter to automatically restart the EMQX Neuron container when the Docker process restarts.
* --privileged=true: Optional parameter that grants the container higher privileges, allowing it to access the host's resources. It is recommended to enable this.
* -v /host/path:/container/path: Optional parameter for mounting the directory /host/path on the host to the directory /container/path within the container. For example, /host/dir:/opt/neuronex/data would mount the local directory /host/dir to /opt/neuronex/data inside the container.
* --device /dev/ttyUSB0:/dev/ttyS0: Optional parameter for mapping a serial port to Docker. /dev/ttyUSB0 is the serial device under Linux, and /dev/ttyS0 is the serial device within Docker.
* --log-opt: Optional parameter to limit the size of Docker's standard output (stdout), for example, --log-opt max-size=100m.

For more startup parameters, please refer to the [Configuration Management](../admin/conf-management.md).

## Docker Container Python Runtime Environment

EMQX Neuron provides four types of Docker installation packages:

- **neuronex:3.x.x**

The installation package of type neuronex:3.x.x integrates the Python runtime environment. If you want to use Python-related algorithm plugins, please use this type of image.

```bash
#run EMQX Neuron by neuronex:3.x.x
docker pull emqx/neuronex:3.6.0
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.6.0
```

- **neuronex:3.x.x-slim**

The installation package of type neuronex:3.x.x-slim does not integrate the Python runtime environment. It has a smaller package size. If you do not use Python-related algorithm plugins, please use this type of image.

```bash
#run EMQX Neuron by neuronex:3.x.x-slim
docker pull emqx/neuronex:3.6.0-slim
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.6.0-slim
```

- **neuronex:3.x.x-ai**

The installation package of type neuronex:3.x.x-ai integrates the Python runtime environment and the Python dependencies for running large language models (LLM). If you have a need to use Python plugins for natural language generation and AI data analysis, please use this type of image.

This image supports x86_64 architecture devices.

```bash
#run EMQX Neuron by neuronex:3.x.x-ai
docker pull emqx/neuronex:3.6.0-ai
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.6.0-ai
```

- **neuronex:3.x.x-ai-arm64**   

The installation package of type neuronex:3.x.x-ai-arm64 integrates the Python runtime environment and the Python dependencies for running large language models (LLM). If you have a need to use Python plugins for natural language generation and AI data analysis, please use this type of image.

This image supports arm64 architecture devices.

```bash
#run EMQX Neuron by neuronex:3.x.x-ai-arm64
docker pull emqx/neuronex:3.6.0-ai-arm64
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.6.0-ai-arm64
```
