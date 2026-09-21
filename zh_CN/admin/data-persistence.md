# 数据目录与持久化

EMQX Neuron 的持久化内容分两部分：**配置与运行数据**在 `data/` 下，**用户安装的插件**在 `plugins/` 下。升级只替换程序文件，这两部分都保留。

## 目录结构

安装根目录默认为 `/opt/neuronex`。

| 目录 | 内容 |
| --- | --- |
| `data/neuronex/` | EMQX Neuron 自身：`data.db`、`initialed` |
| `data/neuron/` | 数采引擎：`sqlite.db`、`plugins.json`、许可证文件、BACnet 扫描结果 |
| `data/ekuiper/` | 规则引擎：各类 `.db` 文件，以及 `sources/`、`sinks/`、`functions/`、`services/`、`connections/`、`uploads/` |
| `plugins/neuron/system/`、`plugins/neuron/custom/` | 用户安装的南向驱动与北向应用 |
| `plugins/ekuiper/` | 用户安装的规则引擎插件：`sources/`、`sinks/`、`functions/`、`portable/` |

`plugins/neuron/` 下的其余内容（`libplugin-*.so`、`schema/`、`tags/`）随安装包发布，升级时由新版本替换，不需要备份。

配置文件在 `etc/` 下：`neuronex.yaml`、`neuron/neuron.json`、`ekuiper/kuiper.yaml`。改过其中任何一个的话，升级前一并留一份。

其余目录都是程序资产：`bin/`、`lib/`、`share/`、`log/`、`run/`、`web/`、`locales/`、`api-docs/`。

## 通过 Docker 部署

容器删除后容器内的数据一并消失，所以要把数据目录挂到宿主机上。

```shell
docker run -d --name neuronex -p 8085:8085 \
  -v /host/neuronex-data:/opt/neuronex/data \
  emqx/neuronex:latest
```

宿主机目录首次可以为空，EMQX Neuron 启动时会填充。升级时把同样的目录挂到新容器上，之前的配置继续可用。

## 通过安装包部署

配置、数据和插件都在安装根目录下。升级不会覆盖上表中的目录，但升级前建议先备份，见[备份与恢复](./backup-restore.md#备份数据目录)。
