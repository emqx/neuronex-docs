# Backup and Restore

EMQX Neuron offers three levels of backup, differing in scope and in when they apply.

| Method | Scope | When it applies |
| --- | --- | --- |
| [System backup and restore](#system-backup-and-restore) | All configuration and user data: southbound and northbound settings, tag lists, rules, uploaded files such as models, and user-installed plugins | Before an upgrade, whole-instance migration, disaster recovery |
| [Southbound device import and export](#southbound-device-import-and-export) | Southbound driver configuration and tags only | Migrating just the collection layer, promoting a test configuration to the plant |
| [Backing up the data directory](#backing-up-the-data-directory) | The user assets under `etc/` and `data/` | A cold backup taken during a maintenance window |

## System backup and restore

Performed on **Administration → System Configuration**. Backup exports the user assets under `etc/` and `data/` to a single file; restore imports that file and **overwrites** the current configuration.

::: warning
EMQX Neuron restarts automatically during a restore, interrupting collection and forwarding. Perform it inside a maintenance window.
:::

## Southbound device import and export

Performed at the top right of **Data Collection → South Devices**, exporting a JSON file. The scope is limited to southbound driver connection settings and tags; northbound applications, rules, and certificates are not included. See [Bulk Configuration and Migration](../configuration/bulk-config.md#southbound-device-import-and-export).

## Backing up the data directory

Stop the service and back up `etc/` and `data/`. This is a cold backup independent of runtime state; restore it by copying the directories back to the same paths.

```bash
sudo systemctl stop neuronex
sudo tar -C /opt/neuronex -czf neuronex-backup-$(date +%F).tar.gz etc data
sudo systemctl start neuronex
```

```text
/opt/neuronex/etc/        top-level configuration neuronex.yaml, plus user files such as JWT public keys and HTTPS certificates
/opt/neuronex/data/       databases, runtime state, uploaded files such as models, and user-installed plugins
```

::: warning
**Backing up `data/` alone is not enough.** `etc/neuronex.yaml`, JWT public keys, and HTTPS certificates are not under `data/`; without them the configuration has to be re-created after a restore.
:::

`plugins/neuron/{system,custom}` are symlinks to `data/neuron/plugins/`, and rules engine plugins live in `data/ekuiper/plugins/`; all of them are already covered by the `data/` backup, so do not copy these paths separately. The `.so` files, `schema/`, and `tags/` under `plugins/neuron/`, as well as the program assets under `bin/`, `lib/`, and `share/`, ship with the installation package and do not need backing up.

`data/uploads` is a compatibility symlink to `data/ekuiper/uploads`; a backup keeps it as a link, and if it is missing after a restore, EMQX Neuron recreates it at startup.

In a container deployment `etc` and `data` are mounted on the host with `-v`, so backing up the host directories is enough. See [Data Directory and Persistence](./data-persistence.md).

## When to take a backup

- **Before an upgrade.** An upgrade does not overwrite the user assets under `etc/` and `data/`, but a backup allows a direct restore if you need to roll back. See [Install from a Package · Upgrade](../installation/package.md#upgrading).
- **Before a bulk tag change.** [Excel import](../configuration/import-export/import-export.md) overwrites tags of the same name, so export the current configuration first.
- **In a master-backup deployment.** Both instances need identical collection configuration; synchronize them with southbound device import and export. See [Master-Backup Mode](../best-practise/master-backup.md).
- **After commissioning.** Export and archive the final configuration so it can be restored quickly if hardware is replaced.
