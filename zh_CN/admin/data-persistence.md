# 数据目录与持久化

EMQX Neuron 的持久化内容集中在两个目录：`data/` 保存数据库、运行状态、上传文件与用户安装的插件，`etc/` 保存顶层用户配置 `neuronex.yaml` 以及 JWT 公钥等用户文件。升级只替换程序文件，这两个目录都会保留。

## 目录结构

安装根目录默认为 `/opt/neuronex`。

| 目录 | 内容 |
| --- | --- |
| `etc/` | 用户配置。默认只有 `neuronex.yaml`，通过接口上传的 JWT 公钥也写在这里 |
| `data/neuronex/` | EMQX Neuron 自身：`data.db`、`initialed` |
| `data/neuron/` | 数采引擎：`sqlite.db` 及其 `-wal`、`-shm`，`plugins.json`、`neuron.lic`、`neuron-default.lic`、`bacnet_scan/`，用户安装的驱动与北向应用在 `plugins/{system,custom}/` |
| `data/ekuiper/` | 数据处理引擎：`sqliteKV.db`、`checkpoint.db`、`cache.db`、`extState.db`、`trace.db`、`init.json`，以及 `sources/`、`sinks/`、`functions/`、`services/`、`connections/`、`uploads/`、`plugins/` |
| `data/uploads` | 指向 `data/ekuiper/uploads` 的兼容软链接，供 ONNX/TFLite 模型加载使用，不需要单独备份 |
| `data/.legacy-layout-migration/` | 从 3.9 升级时生成的旧布局回滚备份，业务验证通过后可以删除 |
| `plugins/neuron/` | 随安装包发布的驱动 `.so`、`schema/`、`tags/`；其中 `system`、`custom` 是指向 `data/neuron/plugins/` 的软链接 |
| `share/` | 程序资产，随版本升级替换：Neuron 配置在 `share/neuron/config/`，eKuiper 配置在 `share/ekuiper/etc/` |
| `log/`、`run/` | 运行目录：日志，以及启动时重建的 Neuron 工作目录锚点 |

`plugins/neuron/` 下的 `.so`、`schema/`、`tags/` 随版本升级替换，不需要备份。用户安装的 Neuron 插件真实位于 `data/neuron/plugins/`，规则引擎插件位于 `data/ekuiper/plugins/`，都随 `data/` 一起备份。

### 配置文件在哪里

- `etc/neuronex.yaml`：用户维护的顶层配置，端口、鉴权、反向代理、日志、HTTPS 等都在这里。
- `share/neuron/config/`：数采引擎的 `neuron.json`、`zlog.conf`、数据库迁移脚本 `*.sql`、`default_plugins.json` 和证书目录，属于程序资产。
- `share/ekuiper/etc/`：数据处理引擎的 `kuiper.yaml`、`mqtt_source.yaml`、`sources/`、`sinks/` 等，属于程序资产。

`share/` 下的文件会随版本升级被新版本覆盖，不要直接修改。需要长期保留的调整请改用环境变量，见[启动参数与配置文件](./conf-management.md)，或在升级后重新应用。

::: tip
4.0 起 `etc/` 下不再有 `neuron/`、`ekuiper/` 子目录，Neuron 与 eKuiper 的程序配置统一放在 `share/`。如果从 4.0 预览版升级，`etc/neuron`、`etc/ekuiper` 中的手工修改不会被新版本读取，需要迁移为环境变量或重新配置。
:::

## 3.9 升级到 4.0 的数据布局迁移

4.0 调整了数据目录布局。从 4.0.1 开始，Docker 启动脚本、deb 安装脚本和 rpm 安装脚本会在程序启动前自动执行 `scripts/migrate_legacy_data.sh`，旧 `data` 目录可以直接复用。

自动迁移的路径：

| 3.9 及更早版本 | 4.0 |
| --- | --- |
| `data/neuron/persistence/*` | `data/neuron/*` |
| `data/ekuiper/data/*` | `data/ekuiper/*` |
| `data/uploads/*` | `data/ekuiper/uploads/*` |

迁移规则：

- 旧数据优先：目标位置已有 4.0 新生成的空数据库时，旧数据库会覆盖它。
- 被覆盖的目标文件保存在 `data/.legacy-layout-migration/backup-<时间戳>/overwritten/`。
- 旧源目录整体移动到同一次备份的 `legacy/` 下，迁移记录写入 `migration.info`。
- 脚本可重复执行。迁移完成后旧路径消失，再次启动不会重复迁移。

迁移完成时日志会输出：

```text
neuronex legacy migration: completed (...); rollback copy kept at ...
```

如果迁移失败，程序不会继续启动。按日志提示处理后再重启，不要手工把 4.0 新生成的数据库当作旧数据使用。

使用 tar.gz 安装包时没有自动执行入口，需要在启动前手动运行：

```bash
sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data
```

::: warning
如果 `data/uploads` 是一个非空真实目录，迁移脚本会把它合并到 `data/ekuiper/uploads`。手工跳过迁移直接启动 4.0 时，启动会报 `manual migration required` 并退出。此时不要删除目录，先完成迁移。
:::

## 通过 Docker 部署

容器删除后容器内的数据一并消失，所以要把数据目录和配置目录挂到宿主机上。

```shell
docker run -d --name neuronex -p 8085:8085 \
  -v /host/neuronex/data:/opt/neuronex/data \
  -v /host/neuronex/etc:/opt/neuronex/etc \
  --privileged=true \
  emqx/neuronex:latest
```

- `data` 保存数据库、上传文件和用户插件。首次挂载可以为空，EMQX Neuron 启动时会创建所需目录。
- `etc` 保存 `neuronex.yaml`、JWT 公钥和 HTTPS 证书。首次挂载为空时，容器启动脚本会从镜像内的 `share/defaults/neuronex.yaml` 生成默认配置。
- 不要挂载 `share/` 和 `run/`：前者是随版本升级的程序资产，后者是启动时重建的运行目录。

升级时把原来的 `data`、`etc` 挂到新版本容器即可。从 3.9 升级时，4.0.1 起会自动迁移旧数据布局，见上一节。

::: warning
`etc` 需要可写。以只读方式挂载且目录为空时，容器无法生成 `neuronex.yaml`，启动会失败。
:::

## 通过安装包部署

配置、数据和插件都在安装根目录下。升级时 `share/` 以及 `plugins/neuron/` 下的程序资产由新版本替换，`etc/` 与 `data/` 保留。升级前建议先备份，见[备份与恢复](./backup-restore.md#备份数据目录)。
