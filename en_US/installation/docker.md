# Docker

## Choosing an image

| <div style="width:140pt">Image</div> | Notes |
| --- | --- |
| `emqx/neuronex:x.y.z` | Standard image. Includes the Python runtime and the rules engine Python SDK (`ekuiper`, `pynng`). **Required for Python portable plugins** |
| `emqx/neuronex:x.y.z-extend` | Based on the standard image, with the same Python runtime |
| `emqx/neuronex:x.y.z-slim` | No Python runtime, smaller footprint. **Does not support** Python portable plugins — plugin install cannot start a Python process for the handshake |

When in doubt, use the standard image. The full tag list is on [Docker Hub](https://hub.docker.com/r/emqx/neuronex/tags), and images are also linked from the [download page](https://www.emqx.com/en/downloads-and-install/neuronex?os=Docker).

## Starting the container

```bash
docker pull emqx/neuronex:3.9.2

docker run -d --name neuronex \
  -p 8085:8085 \
  -v /host/neuronex-data:/opt/neuronex/data \
  --ulimit nofile=65535:65535 \
  --log-opt max-size=100m \
  emqx/neuronex:3.9.2
```

Open `http://localhost:8085` and sign in with the default account **admin** / **0000**.

::: warning Always mount the data directory
`-v` maps a host directory onto the container's `/opt/neuronex/data`. **Without it, removing the container also destroys your driver configuration, tag lists, and rules.**
:::

## Runtime options

| <div style="width:170pt">Option</div> | Purpose |
| --- | --- |
| `-p 8085:8085` | Port mapping for the web console and the HTTP API |
| `-v <host dir>:/opt/neuronex/data` | Persist configuration and data — see the warning above |
| `--ulimit nofile=65535:65535` | Raise the file descriptor limit; needed with many nodes, see [below](#raising-the-file-descriptor-limit-for-larger-deployments) |
| `--log-opt max-size=100m` | Cap the size of the container's stdout log |
| `--restart=always` | Restart the container automatically when the Docker daemon restarts |
| `--device <host device>:<container device>` | Map a serial port or other device, see [Connecting serial devices](#connecting-serial-devices) |

For more startup parameters, see [Startup Parameters and Configuration File](../admin/conf-management.md).

## Connecting serial devices

To collect over serial protocols such as Modbus RTU or DL/T645, map the host's serial port into the container:

```bash
docker run -d --name neuronex \
  -p 8085:8085 \
  --device /dev/ttyUSB0:/dev/ttyS0 \
  emqx/neuronex:3.9.2
```

`/dev/ttyUSB0` is the device on the host and `/dev/ttyS0` is its path inside the container — use the container path in the driver's **serial device** parameter. Repeat `--device` for each additional port.

## Raising the file descriptor limit for larger deployments

Every running node consumes a number of file descriptors. With many nodes configured, the total exceeds the container's default limit of 1024, which shows up as nodes failing to connect or disconnecting repeatedly.

The direct fix is to raise the limit:

```bash
--ulimit nofile=65535:65535
```

`--privileged=true` also works, since it lifts the container's restrictions including the descriptor limit — but it grants the container privileges close to host root. **Use it only when you actually need it**; `--ulimit` is enough for this case.

## Uninstalling

Stop and remove the container:

```bash
docker stop neuronex || true
docker rm neuronex || true
```

To remove the image as well:

```bash
docker rmi emqx/neuronex:<tag>
```

::: tip
If you mounted a host directory with `-v`, removing the container leaves that data in place. Delete the directory yourself if you no longer need it.
:::
