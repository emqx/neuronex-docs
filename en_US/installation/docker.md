# Running with Docker

## Get the image

Get the latest Docker image from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Docker), for example:

```bash
## pull EMQX Neuron
$ docker pull emqx/neuronex:3.9.2
```

::::tip
For more EMQX Neuron Docker images, please visit [Docker Hub](https://hub.docker.com/r/emqx/neuronex/tags).
::::

## Start

```bash
## run EMQX Neuron
$ docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m --privileged=true emqx/neuronex:3.9.2
```

- `-p 8085:8085`: Port mapping for accessing the Web UI and HTTP API.
- `--env NEURONEX_DISABLE_AUTH=1`: Optional. Disable authentication.
- `--restart=always`: Optional. Automatically restart the EMQX Neuron container when the Docker process restarts.
- `--privileged=true`: Optional. Grant the container higher privileges to access host resources (**recommended**).
- `-v /host/path:/container/path`: Optional. Mount a host directory into the container. For example, `/host/dir:/opt/neuronex/data`.
- `--device /dev/ttyUSB0:/dev/ttyS0`: Optional. Map a serial port into Docker. `/dev/ttyUSB0` is the serial device on Linux; `/dev/ttyS0` is the device inside Docker.
- `--log-opt`: Optional. Limit Docker stdout size, for example `--log-opt max-size=100m`.

For more startup parameters, please refer to [Startup Parameters and Configuration Files](../admin/conf-management.md).

## Docker Container Python Runtime Environment

EMQX Neuron provides two types of Docker images:

- **neuronex:3.x.x** (standard image)

The `neuronex:3.x.x` standard image includes the Python runtime and the rules engine Python SDK (`ekuiper`, `pynng`). **Use this image to install and run Python portable plugins.** The `*-extend` image is based on the standard image and includes the same runtime.

```bash
# run EMQX Neuron by neuronex:3.x.x
docker pull emqx/neuronex:3.9.2
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.9.2
```

- **neuronex:3.x.x-slim**

The `neuronex:3.x.x-slim` image does **not** include the Python runtime. It is smaller. **It does not support** Python portable plugins: plugin install cannot start a Python process for handshake. Use this image only if you do not need Python algorithm plugins.

::: tip
To use **Data Processing → Extensions → Portable Plugins**, use the standard image `emqx/neuronex:x.y.z`. Do not use `*-slim`. Binary packages (tar/deb/rpm) also omit Python by default; install Python 3 and run `pip install ekuiper pynng`. See [Python portable plugin example](../streaming-processing/portable_python.md#deployment-requirements).
:::

```bash
# run EMQX Neuron by neuronex:3.x.x-slim
docker pull emqx/neuronex:3.9.2-slim
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:3.9.2-slim
```

## Uninstall

Uninstalling the Docker deployment generally includes stopping the container and removing it. Deleting the image is optional.

```bash
# Stop the container
docker stop neuronex || true

# Remove the container
docker rm neuronex || true
```

Optionally remove the image:

```bash
docker rmi emqx/neuronex:<tag>
```

If you started the container with `-v` bind mounts, removing the container will not delete the host data. Clean up the corresponding directories on the host manually if needed.
