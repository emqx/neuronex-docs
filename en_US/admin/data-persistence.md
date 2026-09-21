# Data Directory and Persistence

What EMQX Neuron persists falls into two parts: **configuration and runtime data** under `data/`, and **plugins the user installed** under `plugins/`. An upgrade replaces only program files, so both survive it.

## Directory layout

The installation root is `/opt/neuronex` by default.

| Directory | Contents |
| --- | --- |
| `data/neuronex/` | EMQX Neuron itself: `data.db`, `initialed` |
| `data/neuron/` | Data collection engine: `sqlite.db`, `plugins.json`, license files, BACnet scan results |
| `data/ekuiper/` | Rules engine: the `.db` files, plus `sources/`, `sinks/`, `functions/`, `services/`, `connections/`, `uploads/` |
| `plugins/neuron/system/`, `plugins/neuron/custom/` | Southbound drivers and northbound applications the user installed |
| `plugins/ekuiper/` | Rules engine plugins the user installed: `sources/`, `sinks/`, `functions/`, `portable/` |

Everything else under `plugins/neuron/` (`libplugin-*.so`, `schema/`, `tags/`) ships with the installation package and is replaced by the new version on upgrade, so it does not need backing up.

Configuration files live under `etc/`: `neuronex.yaml`, `neuron/neuron.json`, `ekuiper/kuiper.yaml`. If you have edited any of them, keep a copy before upgrading.

The remaining directories are program assets: `bin/`, `lib/`, `share/`, `log/`, `run/`, `web/`, `locales/`, `api-docs/`.

## Deployed with Docker

Removing the container removes everything inside it, so mount the data directory onto the host.

```shell
docker run -d --name neuronex -p 8085:8085 \
  -v /host/neuronex-data:/opt/neuronex/data \
  emqx/neuronex:latest
```

The host directory can be empty the first time; EMQX Neuron fills it on startup. To upgrade, mount the same directory into the new container and the earlier configuration is still there.

## Deployed from an installation package

Configuration, data, and plugins all live under the installation root. An upgrade does not overwrite the directories in the table above, but take a backup first — see [Backup and Restore](./backup-restore.md#backing-up-the-data-directory).
