# Backup and Restore

EMQX Neuron offers three levels of backup, differing in scope and in when they apply.

| Method | Scope | When it applies |
| --- | --- | --- |
| [System backup and restore](#system-backup-and-restore) | All configuration: southbound driver and northbound application settings, tag lists, rules, files, and certificates | Before an upgrade, whole-instance migration, disaster recovery |
| [Southbound device import and export](#southbound-device-import-and-export) | Southbound driver configuration and tags only | Migrating just the collection layer, promoting a test configuration to the plant |
| [Backing up the data directory](#backing-up-the-data-directory) | Everything under `data/`, plus the plugins the user installed | A cold backup taken during a maintenance window |

## System backup and restore

Performed on **Administration → System Configuration**. Backup exports all configuration to a single file; restore imports that file and **overwrites** the current configuration.

::: warning
EMQX Neuron restarts automatically during a restore, interrupting collection and forwarding. Perform it inside a maintenance window.
:::

## Southbound device import and export

Performed at the top right of **Data Collection → South Devices**, exporting a JSON file. The scope is limited to southbound driver connection settings and tags; northbound applications, rules, and certificates are not included. See [Bulk Configuration and Migration](../configuration/bulk-config.md#southbound-device-import-and-export).

## Backing up the data directory

Stop the service and copy the directories below. This is a cold backup independent of runtime state; restore it by copying them back to the same paths.

```
/opt/neuronex/data/                        configuration and runtime data
/opt/neuronex/plugins/neuron/system/       southbound drivers and northbound applications the user installed
/opt/neuronex/plugins/neuron/custom/
/opt/neuronex/plugins/ekuiper/             rules engine plugins the user installed
```

::: warning
**Backing up `data/` alone is not enough.** The plugins the user installed do not live under `data/`. Leave out the three `plugins/` directories above and those drivers, applications, and plugins are gone after a restore.
:::

`libplugin-*.so`, `schema/`, and `tags/` under `plugins/neuron/` ship with the installation package and do not need backing up. If you have edited anything under `etc/`, keep a copy of that too. For the directory layout, see [Data Directory and Persistence](./data-persistence.md).

In a container deployment these directories are mounted on the host with `-v`, so backing up the host directories is enough. See [Deploy with Docker](../installation/docker.md#starting-the-container).

## When to take a backup

- **Before an upgrade.** An upgrade does not overwrite the data or user plugin directories, but a backup allows a direct restore if you need to roll back. See [Install from a Package · Upgrade](../installation/package.md#upgrading).
- **Before a bulk tag change.** [Excel import](../configuration/import-export/import-export.md) overwrites tags of the same name, so export the current configuration first.
- **In a master-backup deployment.** Both instances need identical collection configuration; synchronize them with southbound device import and export. See [Master-Backup Mode](../best-practise/master-backup.md).
- **After commissioning.** Export and archive the final configuration so it can be restored quickly if hardware is replaced.
