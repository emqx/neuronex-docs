# Uninstall NeuronEX

NeuronEX supports multiple installation methods. The uninstall steps depend on how you installed it. It is recommended to stop NeuronEX before uninstalling.

## Uninstall the .tar.gz installation

### Only extracted and running (no systemd service registration)

If you only extracted the package and ran NeuronEX via `./bin/neuronex start`, uninstalling mainly means deleting the extracted directory.

```bash
# Stop (if started from the extracted directory)
./bin/neuronex stop

# Delete extracted directory
rm -rf ./neuronex-<x.y.z>-linux-<arch>
```

### systemd services have been registered

If you executed `./bin/neuronex install` to register NeuronEX as a systemd service, cancel the registration before deleting the directory:

```bash
# Unregister systemd service
./bin/neuronex uninstall

# Delete installation directory
rm -rf /opt/neuronex

# If you used the one-click installer (tar.gz default creates a symlink), remove the link too
rm -f /usr/local/bin/neuronex
```

## Uninstall the deb package (Ubuntu/Debian)

Stop the service first (if installed as a systemd service):

```bash
sudo systemctl stop neuronex || true
```

Uninstall while keeping configuration, log, and data files:

```bash
sudo dpkg -r neuronex
```

Uninstall and remove all files:

```bash
sudo dpkg -P neuronex
```

## Uninstall the rpm package (CentOS/RHEL)

Stop the service first (if installed as a systemd service):

```bash
sudo systemctl stop neuronex || true
```

Uninstall NeuronEX:

```bash
sudo rpm -e neuronex
```

If your system uses `dnf/yum`, you can also uninstall via the package manager:

```bash
sudo dnf remove -y neuronex
# or
sudo yum remove -y neuronex
```

## Uninstall the Docker deployment

Uninstalling the Docker deployment generally includes stopping the container and removing it. Deleting the image is optional.

```bash
# Stop the container
docker stop neuronex || true

# Remove the container
docker rm neuronex || true
```

Optionally remove the image:

```bash
docker rmi emqx/neuronex:<tag>
```

If you started the container with `-v` bind mounts, removing the container will not delete the host data. Clean up the corresponding directories on the host manually if needed.

