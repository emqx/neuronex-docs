# 4.0 版本升级说明

从 4.0.1 开始支持自动迁移：升级时程序会在应用进程启动前自动迁移旧数据，原来的 `data`、`etc` 目录可以直接复用，不需要手工搬文件。升级前请备份 `data` 目录和 `etc/neuronex.yaml`。

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

启动后查看日志，出现 `neuronex legacy migration: completed` 表示迁移完成：

```bash
docker logs -f neuronex-4.0
```

使用 Docker Compose 或 Kubernetes 时，保持卷不变，只更新镜像 tag 即可。

## 通过安装包升级

### deb

```bash
sudo dpkg -i neuronex-4.0.x-linux-amd64.deb
```

`postinst` 会自动停止服务、迁移数据并重新启动。

### rpm

```bash
sudo systemctl stop neuronex
sudo rpm -Uvh neuronex-4.0.x-linux-amd64.rpm
sudo systemctl enable neuronex  
sudo systemctl start neuronex
```

### tar.gz

tar.gz 没有安装脚本，需要手动执行迁移。下面的命令以默认安装目录 `/opt/neuronex` 为例，请根据实际安装路径调整：

```bash
sudo systemctl stop neuronex

tar -zxvf neuronex-4.0.x-linux-amd64.tar.gz
sudo cp -a neuronex-4.0.x-linux-amd64/. /opt/neuronex/

sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data

sudo systemctl start neuronex
```

::: warning
tar.gz 升级必须手动执行迁移脚本，否则 4.0 无法识别旧数据库。
:::
