# Using .tar.gz package

## Download

Download the installation package for different versions and CPU architectures from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), for example:

```bash
$ wget https://www.emqx.com/zh/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.tar.gz
```

## Install

```bash
$ tar -zxvf neuronex-3.9.2-linux-amd64.tar.gz
$ cd neuronex-3.9.2-linux-amd64
```

:::: tip
GLIBC requires version 2.31 or above.
::::

## Start

Run the following command to start EMQX Neuron:

```bash
$ ./bin/neuronex start
```

For more startup parameters, please refer to [Startup Parameters and Configuration Files](../admin/conf-management.md).

## Uninstall

### Only extracted and running (no systemd service registration)

If you only extracted the package and ran EMQX Neuron via `./bin/neuronex start`, uninstalling mainly means deleting the extracted directory.

```bash
# Stop (if started from the extracted directory)
./bin/neuronex stop

# Delete extracted directory
rm -rf ./neuronex-<x.y.z>-linux-<arch>
```

### systemd services have been registered

If you executed `./bin/neuronex install` to register EMQX Neuron as a systemd service, cancel the registration before deleting the directory:

```bash
# Unregister systemd service
./bin/neuronex uninstall

# Delete installation directory
rm -rf /opt/neuronex

# If you used the one-click installer (tar.gz default creates a symlink), remove the link too
rm -f /usr/local/bin/neuronex
```
