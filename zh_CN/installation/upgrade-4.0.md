# 4.0 版本升级说明

从 4.0.1 开始支持自动迁移：升级时程序会在应用进程启动前迁移旧数据，原来的 `data`、`etc` 目录可以直接复用，不需要手工搬文件。

升级前请先备份 `etc/` 与 `data/`。冷备份需要在服务停止后进行，命令按部署方式选择，见[备份与恢复](../admin/backup-restore.md#备份数据目录)。目录结构与 3.9 旧数据布局的迁移说明见[数据目录与持久化](../admin/data-persistence.md)。

## 通过 Docker 升级

复用原来的挂载目录，把镜像换成 4.0.x：

```bash
docker stop -t 30 neuronex
docker run -d --name neuronex-4.0 \
  -p 8085:8085 \
  -v /srv/neuronex/data:/opt/neuronex/data \
  -v /srv/neuronex/etc:/opt/neuronex/etc \
  --ulimit nofile=65535:65535 \
  --restart=always \
  emqx/neuronex:4.0.x
```

`etc` 建议一并挂载：`neuronex.yaml`、JWT 公钥和 HTTPS 证书都在这里。如果挂载的 `etc` 为空，4.0 启动时会自动生成默认的 `neuronex.yaml`。

启动后查看日志，出现 `neuronex legacy migration: completed` 表示迁移完成：

```bash
docker logs -f neuronex-4.0
```

确认新容器运行正常前，不要删除旧容器和旧的数据卷，以便回滚。使用 Docker Compose 或 Kubernetes 时，保持卷不变，只更新镜像 tag 即可。

## 通过安装包升级

### deb

```bash
sudo dpkg -i neuronex-4.0.x-linux-amd64.deb
```

升级前服务在运行时，`postinst` 会先停止服务、执行数据迁移，再恢复服务；服务原本未运行时保持停止，此时可在升级后执行 `sudo systemctl start neuronex`。升级前请确认 `etc/` 已备份，升级后检查端口、鉴权、反向代理和 TLS 等自定义配置仍然正确。

### rpm

```bash
sudo systemctl stop neuronex
sudo rpm -Uvh neuronex-4.0.x-linux-amd64.rpm
sudo systemctl enable neuronex
sudo systemctl start neuronex
```

rpm 的 `%post` 会在服务启动前执行迁移脚本，`etc/` 由 `%config(noreplace)` 保护，已有配置不会被覆盖。

### tar.gz

tar.gz 没有安装脚本，需要手动停止服务、覆盖程序文件并执行迁移。下面的命令以默认安装目录 `/opt/neuronex`、systemd 管理服务为例，请根据实际安装路径调整：

```bash
sudo systemctl stop neuronex

# 先移出 etc，避免被新包中的默认 neuronex.yaml 覆盖
sudo mv /opt/neuronex/etc /opt/neuronex/etc.user

tar -zxvf neuronex-4.0.x-linux-amd64.tar.gz
sudo cp -a neuronex-4.0.x-linux-amd64/. /opt/neuronex/

# 恢复用户配置
sudo rm -rf /opt/neuronex/etc
sudo mv /opt/neuronex/etc.user /opt/neuronex/etc

sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data

sudo systemctl start neuronex
```

如果 tar.gz 是直接运行 `./bin/neuronex` 安装的，把上面的 `systemctl stop/start` 换成在安装根目录执行 `./bin/neuronex stop/start`。

::: warning
tar.gz 升级必须手动执行迁移脚本，否则 4.0 无法识别旧数据库。迁移脚本失败时不要启动 4.0，先根据日志处理。
:::
