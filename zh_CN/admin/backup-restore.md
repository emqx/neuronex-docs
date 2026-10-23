# 备份与恢复

EMQX Neuron 提供三种粒度的备份方式，覆盖范围与适用场景不同。

| 方式 | 覆盖范围 | 适用场景 |
| --- | --- | --- |
| [系统备份与恢复](#系统备份与恢复) | 全部配置与用户数据：南北向配置、点表、规则、模型等上传文件、用户安装的插件 | 升级前留底、整机迁移、故障恢复 |
| [南向设备导入导出](#南向设备导入导出) | 仅南向驱动配置与点位 | 只迁移数采部分、测试环境向现场推配置 |
| [备份数据目录](#备份数据目录) | `etc/` 与 `data/` 下的用户资产 | 停机维护窗口内的冷备份 |

## 系统备份与恢复

在 **管理 → 系统配置** 页面执行。备份将 `etc/` 与 `data/` 下的用户资产导出为一个文件；恢复将该文件重新导入，**覆盖**现有配置。

::: warning
恢复过程中 EMQX Neuron 会自动重启，期间采集与转发中断。请在维护窗口内操作。
:::

## 南向设备导入导出

在 **数据采集 → 南向设备** 页面右上角执行，导出为 JSON 文件。范围仅限南向驱动的连接配置与点位，不含北向应用、规则和证书。详见[批量配置与迁移](../configuration/bulk-config.md#南向设备导入导出)。

## 备份数据目录

停止服务后备份 `etc/` 与 `data/`。这是与运行状态无关的冷备份，恢复时复制回同一路径即可。**必须在进程停止后再打包**：运行中直接复制 SQLite 及其 `-wal`、`-shm`，可能得到不一致的快照。

备份内容是安装根目录下的：

```text
etc/        顶层配置 neuronex.yaml，以及 JWT 公钥、HTTPS 证书等用户文件
data/       数据库、状态、模型等上传文件，以及用户安装的插件
```

不同部署方式的停止和启动命令不同，按实际部署方式选择：

### deb / rpm（systemd）

```bash
sudo systemctl stop neuronex
sudo tar -C /opt/neuronex -czf neuronex-backup-$(date +%F).tar.gz etc data
sudo systemctl start neuronex
```

### Docker

宿主机挂载目录以 `/host/neuronex`、容器名以 `neuronex` 为例，请替换为实际值：

```bash
docker stop neuronex
sudo tar -C /host/neuronex -czf neuronex-backup-$(date +%F).tar.gz etc data
docker start neuronex
```

使用 Docker Compose 时，把 `docker stop` / `docker start` 换成 `docker compose stop` / `docker compose start`。

### tar.gz 直接运行

在安装根目录执行：

```bash
./bin/neuronex stop
sudo tar -C "$PWD" -czf neuronex-backup-$(date +%F).tar.gz etc data
./bin/neuronex start
```

如果已通过 `./bin/neuronex install` 注册为 systemd 服务，按上面的 systemd 方式操作。

::: warning
**不要只备份 `data/`。** `etc/neuronex.yaml`、JWT 公钥和 HTTPS 证书都不在 `data/` 下，漏掉后恢复时需要重新配置。
:::

`plugins/neuron/{system,custom}` 是指向 `data/neuron/plugins/` 的软链接，规则引擎插件在 `data/ekuiper/plugins/`，都已包含在 `data/` 备份中，不需要单独复制。`plugins/neuron/` 下的 `.so`、`schema/`、`tags/`，以及 `bin/`、`lib/`、`share/` 下的程序资产随安装包发布，不需要备份。

`data/uploads` 是指向 `data/ekuiper/uploads` 的兼容软链接，备份时会按链接保留；如果恢复后缺失，程序启动时会自动重建。

各部署方式的挂载路径与目录职责见[数据目录与持久化](./data-persistence.md)。

## 建议执行备份的时机

- **升级前**——升级不会覆盖 `etc/` 与 `data/` 下的用户资产，但留一份备份可在需要回滚时直接恢复，见[使用安装包安装 · 升级](../installation/package.md#升级)。
- **批量调整点表前**——[Excel 批量导入](../configuration/import-export/import-export.md)会覆盖同名点位，导入前先导出一份现有配置。
- **主备部署时**——主备两台实例的数采配置需要保持一致，用南向设备导入导出同步，见[主备模式](../best-practise/master-backup.md)。
- **现场交付后**——把最终配置导出留存，便于设备更换时快速恢复。
