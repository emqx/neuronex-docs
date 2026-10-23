# Data Directory and Persistence

What EMQX Neuron persists lives in two directories: `data/` holds databases, runtime state, uploaded files, and user-installed plugins; `etc/` holds the top-level user configuration `neuronex.yaml` and user files such as JWT public keys. An upgrade replaces only program files, so both directories survive it.

## Directory layout

The installation root is `/opt/neuronex` by default.

| Directory | Contents |
| --- | --- |
| `etc/` | User configuration. By default only `neuronex.yaml`; JWT public keys uploaded through the API are also written here |
| `data/neuronex/` | EMQX Neuron itself: `data.db`, `initialed` |
| `data/neuron/` | Collection engine: `sqlite.db` with its `-wal` and `-shm`, `plugins.json`, `neuron.lic`, `neuron-default.lic`, `bacnet_scan/`; user-installed drivers and northbound applications under `plugins/{system,custom}/` |
| `data/ekuiper/` | Data processing engine: `sqliteKV.db`, `checkpoint.db`, `cache.db`, `extState.db`, `trace.db`, `init.json`, plus `sources/`, `sinks/`, `functions/`, `services/`, `connections/`, `uploads/`, and `plugins/` |
| `data/uploads` | Compatibility symlink to `data/ekuiper/uploads`, used when loading ONNX/TFLite models; no separate backup needed |
| `data/.legacy-layout-migration/` | Rollback backup of the old layout created when upgrading from 3.9; can be deleted after validation |
| `plugins/neuron/` | Driver `.so` files, `schema/`, and `tags/` that ship with the package; `system` and `custom` are symlinks to `data/neuron/plugins/` |
| `share/` | Program assets replaced on upgrade: Neuron configuration under `share/neuron/config/`, eKuiper configuration under `share/ekuiper/etc/` |
| `log/`, `run/` | Runtime directories: logs, and the Neuron working-directory anchors rebuilt at startup |

Everything under `plugins/neuron/` except the `system` and `custom` links (`.so` files, `schema/`, `tags/`) ships with the package and does not need backing up. User-installed Neuron plugins actually live in `data/neuron/plugins/`, and rules engine plugins live in `data/ekuiper/plugins/`; both are covered by the `data/` backup.

### Where the configuration files are

- `etc/neuronex.yaml`: the top-level configuration users maintain — ports, authentication, reverse proxies, logging, and HTTPS.
- `share/neuron/config/`: the collection engine's `neuron.json`, `zlog.conf`, database migration scripts `*.sql`, `default_plugins.json`, and certificates. These are program assets.
- `share/ekuiper/etc/`: the data processing engine's `kuiper.yaml`, `mqtt_source.yaml`, `sources/`, `sinks/`, and related files. These are program assets.

Files under `share/` are replaced by the new version on upgrade. Do not edit them directly. Use environment variables for changes that must survive an upgrade — see [Startup Parameters and Configuration Files](./conf-management.md) — or reapply the change after upgrading.

::: tip
Starting with 4.0, `etc/` no longer contains `neuron/` or `ekuiper/`; Neuron and eKuiper program configuration moved to `share/`. If you are upgrading from a 4.0 preview release, manual changes under `etc/neuron` and `etc/ekuiper` are not read by the new version and must be re-created as environment variables or reconfigured.
:::

## Migrating the data layout from 3.9 to 4.0

4.0 changed the data directory layout. Starting with 4.0.1, the Docker entrypoint and the deb and rpm post-install scripts run `scripts/migrate_legacy_data.sh` before the application starts, so the old `data` directory can be reused directly.

Paths migrated automatically:

| 3.9 and earlier | 4.0 |
| --- | --- |
| `data/neuron/persistence/*` | `data/neuron/*` |
| `data/ekuiper/data/*` | `data/ekuiper/*` |
| `data/uploads/*` | `data/ekuiper/uploads/*` |

Migration rules:

- Old data wins: if the target already contains an empty database created by 4.0, the old database replaces it.
- Replaced target files are kept in `data/.legacy-layout-migration/backup-<timestamp>/overwritten/`.
- The old source directories are moved into `legacy/` under the same backup, and the migration record is written to `migration.info`.
- The script is idempotent. Once migration succeeds the old paths are gone, so the next start does not migrate again.

A successful migration logs:

```text
neuronex legacy migration: completed (...); rollback copy kept at ...
```

If migration fails, the application does not start. Fix the cause indicated in the log and restart; do not treat a database created by 4.0 as the old data.

A tar.gz installation has no automatic entrypoint, so run the migration manually before starting:

```bash
sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data
```

::: warning
If `data/uploads` is a non-empty real directory, the migration script merges it into `data/ekuiper/uploads`. If you skip migration and start 4.0 directly, startup fails with `manual migration required` and exits. Do not delete the directory — complete the migration first.
:::

## Deployed with Docker

Removing the container removes everything inside it, so mount both the data and configuration directories onto the host.

```shell
docker run -d --name neuronex -p 8085:8085 \
  -v /host/neuronex/data:/opt/neuronex/data \
  -v /host/neuronex/etc:/opt/neuronex/etc \
  --privileged=true \
  emqx/neuronex:latest
```

- `data` holds databases, uploaded files, and user plugins. It can be empty on first start; EMQX Neuron creates the directories it needs.
- `etc` holds `neuronex.yaml`, JWT public keys, and HTTPS certificates. If it is empty on first start, the container entrypoint seeds the default configuration from `share/defaults/neuronex.yaml` in the image.
- Do not mount `share/` or `run/`: the former contains program assets replaced on upgrade, and the latter is rebuilt at startup.

To upgrade, mount the same `data` and `etc` directories into the new version's container. Starting with 4.0.1, an upgrade from 3.9 migrates the old layout automatically — see the previous section.

::: warning
`etc` must be writable. If it is mounted read-only and empty, the container cannot create `neuronex.yaml` and startup fails.
:::

## Deployed from an installation package

Configuration, data, and plugins all live under the installation root. On upgrade, the program assets under `share/` and `plugins/neuron/` are replaced by the new version, while `etc/` and `data/` are preserved. Take a backup first — see [Backup and Restore](./backup-restore.md#backing-up-the-data-directory).
