# Upgrading to 4.0

Automatic migration is supported from 4.0.1: before any application process starts, the upgrade migrates the legacy data, so the existing `data` and `etc` directories can be reused as they are — no manual file moving is required.

Before upgrading, back up `etc/` and `data/`. The cold backup requires the service to be stopped; use the commands for your deployment method — see [Backup and Restore](../admin/backup-restore.md#backing-up-the-data-directory). For the directory layout and the 3.9 legacy data migration details, see [Data Directory and Persistence](../admin/data-persistence.md).

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

Mount `etc` as well: `neuronex.yaml`, JWT public keys, and HTTPS certificates live there. If the mounted `etc` is empty, 4.0 creates a default `neuronex.yaml` at startup.

Check the logs for `neuronex legacy migration: completed`:

```bash
docker logs -f neuronex-4.0
```

Do not remove the old container or data volumes until the new container is verified, so you can roll back. With Docker Compose or Kubernetes, keep the volumes and update the image tag only.

## Package

### deb

```bash
sudo dpkg -i neuronex-4.0.x-linux-amd64.deb
```

If the service was running before the upgrade, `postinst` stops it, runs the data migration, then restarts it; if it was stopped, it stays stopped, and you can start it after the upgrade with `sudo systemctl start neuronex`. Make sure `etc/` is backed up before upgrading, and check after the upgrade that custom port, authentication, reverse proxy, and TLS settings are still correct.

### rpm

```bash
sudo systemctl stop neuronex
sudo rpm -Uvh neuronex-4.0.x-linux-amd64.rpm
sudo systemctl enable neuronex
sudo systemctl start neuronex
```

The rpm `%post` runs the migration before the service starts, and `etc/` is protected by `%config(noreplace)`, so existing configuration is not overwritten.

### tar.gz

The tar.gz package has no install scripts, so stop the service, replace the program files, and run the migration manually. The commands below assume the default installation directory `/opt/neuronex` and a systemd-managed service; adjust them to your actual installation path:

```bash
sudo systemctl stop neuronex

# Move etc aside so the new package's default neuronex.yaml does not overwrite yours
sudo mv /opt/neuronex/etc /opt/neuronex/etc.user

tar -zxvf neuronex-4.0.x-linux-amd64.tar.gz
sudo cp -a neuronex-4.0.x-linux-amd64/. /opt/neuronex/

# Restore the user configuration
sudo rm -rf /opt/neuronex/etc
sudo mv /opt/neuronex/etc.user /opt/neuronex/etc

sudo /opt/neuronex/scripts/migrate_legacy_data.sh /opt/neuronex/data

sudo systemctl start neuronex
```

If tar.gz was installed for direct run with `./bin/neuronex`, replace the `systemctl stop/start` commands with `./bin/neuronex stop/start` in the installation root.

::: warning
A tar.gz upgrade must run the migration helper manually, otherwise 4.0 cannot recognize the legacy database. If the migration fails, do not start 4.0; resolve the cause indicated in the log first.
:::
