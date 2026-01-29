# Running with Docker

## Get the image

Get the latest Docker image from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Docker), for example:

```bash
## pull NeuronEX
$ docker pull emqx/neuronex:3.7.1
```

::::tip
For more NeuronEX Docker images, please visit [Docker Hub](https://hub.docker.com/r/emqx/neuronex/tags).
::::

## Start

```bash
## run NeuronEX
$ docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m --privileged=true emqx/neuronex:3.7.1
```

- `-p 8085:8085`: Port mapping for accessing the Web UI and HTTP API.
- `--env NEURONEX_DISABLE_AUTH=1`: Optional. Disable authentication.
- `--restart=always`: Optional. Automatically restart the NeuronEX container when the Docker process restarts.
- `--privileged=true`: Optional. Grant the container higher privileges to access host resources (**recommended**).
- `-v /host/path:/container/path`: Optional. Mount a host directory into the container. For example, `/host/dir:/opt/neuronex/data`.
- `--device /dev/ttyUSB0:/dev/ttyS0`: Optional. Map a serial port into Docker. `/dev/ttyUSB0` is the serial device on Linux; `/dev/ttyS0` is the device inside Docker.
- `--log-opt`: Optional. Limit Docker stdout size, for example `--log-opt max-size=100m`.

For more startup parameters, please refer to the [Configuration Management](../admin/conf-management.md).

## Docker Container Python Runtime Environment

NeuronEX provides three types of Docker images:

- **neuronex:3.x.x**

The `neuronex:3.x.x` image includes the Python runtime environment. If you need Python algorithm plugins, please use this type.

```bash
# run NeuronEX by neuronex:3.x.x
docker pull emqx/neuronex:3.7.1
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.7.1
```

- **neuronex:3.x.x-slim**

The `neuronex:3.x.x-slim` image does **not** include the Python runtime environment. It is smaller. If you do not use Python-related algorithm plugins, please use this type.

```bash
# run NeuronEX by neuronex:3.x.x-slim
docker pull emqx/neuronex:3.7.1-slim
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.7.1-slim
```

- **neuronex:3.x.x-ai**

The `neuronex:3.x.x-ai` image includes the Python runtime environment and the Python dependencies for large language models (LLM). If you need natural-language generation of Python plugins and AI data analysis, please use this type.

```bash
# run NeuronEX by neuronex:3.x.x-ai
docker pull emqx/neuronex:3.7.1-ai
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.7.1-ai
```

<!--
- **neuronex:3.x.x-ai-arm64**

The `neuronex:3.x.x-ai-arm64` image includes the Python runtime environment and the Python dependencies for large language models (LLM). If you need natural-language generation of Python plugins and AI data analysis, please use this type.

This image supports arm64 architecture devices.

```bash
# run NeuronEX by neuronex:3.x.x-ai-arm64
docker pull emqx/neuronex:3.7.1-ai-arm64
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.7.1-ai-arm64
```
-->
