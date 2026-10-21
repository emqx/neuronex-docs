# Upgrading to 4.0

Automatic migration is supported from 4.0.1: before any application process starts, the upgrade migrates the legacy data, so the existing `data` and `etc` directories can be reused as they are — no manual file moving is required. Back up the `data` directory and `etc/neuronex.yaml` before upgrading.

## Docker

Reuse the existing mounted directories and switch the image to 4.0.x:

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

Check the logs for `neuronex legacy migration: completed`:

```bash
docker logs -f neuronex-4.0
```

With Docker Compose or Kubernetes, keep the volumes and update the image tag only.

## Package

### deb

```bash
sudo dpkg -i neuronex-4.0.x-linux-amd64.deb
```

`postinst` stops the service, migrates the data and restarts the service.

### rpm

```bash
sudo systemctl stop neuronex
sudo rpm -Uvh neuronex-4.0.x-linux-amd64.rpm
sudo systemctl enable neuronex  
sudo systemctl start neuronex
```

### tar.gz

The tar.gz package has no install scripts, so run the migration manually. The commands below use the default installation directory `/opt/neuronex`; adjust them to your actual installation path:

```bash
sudo systemctl stop neuronex

tar -zxvf neuronex-4.0.x-linux-amd64.tar.gz
sudo cp -a neuronex-4.0.x-linux-amd64/. /opt/neuronex/

sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data

sudo systemctl start neuronex
```

::: warning
A tar.gz upgrade must run the migration helper manually, otherwise 4.0 cannot recognize the legacy database.
:::
