# Installing from a Package

This page covers deploying EMQX Neuron from a deb, rpm, or tar.gz package. If you are not sure which to pick, use the [one-click install script](./introduction.md#quick-install) — it detects your system and chooses for you.

## Choosing a package format

| <div style="width:70pt">Format</div> | Systems | Notes |
| --- | --- | --- |
| **.deb** | Debian, Ubuntu, Kylin, and other Debian-based systems | Preferred. Registers a systemd service automatically |
| **.rpm** | RedHat, CentOS, openEuler, and other RPM-based systems | Same as above |
| **.tar.gz** | Any Linux distribution | No package manager needed. Run from the extracted directory, or register a systemd service yourself |

## Downloading

Pick a version and architecture on the [download page](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), or fetch it directly:

```bash
# 3.9.2 on amd64 as an example — change the extension for .rpm or .tar.gz
wget https://www.emqx.com/en/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.deb
```

File names follow `neuronex-<version>-linux-<arch>.<format>`, where the architecture is `amd64`, `arm`, or `arm64`.

## Installing

| Format | Command |
| --- | --- |
| **.deb** | `sudo dpkg -i neuronex-3.9.2-linux-amd64.deb` |
| **.rpm** | `sudo rpm -ivh neuronex-3.9.2-linux-amd64.rpm` |
| **.tar.gz** | `tar -zxvf neuronex-3.9.2-linux-amd64.tar.gz && cd neuronex-3.9.2-linux-amd64` |

::: tip
All three formats require GLIBC 2.31 or later. On older distributions, check first with `ldd --version`.
:::

## Starting and managing

### deb and rpm

The package registers a systemd service:

```bash
sudo systemctl start neuronex     # start
sudo systemctl status neuronex    # check status
sudo systemctl stop neuronex      # stop
```

### tar.gz

There are two ways to run it. Straight from the extracted directory:

```bash
./bin/neuronex start
./bin/neuronex stop
```

Or register a systemd service first, after which it behaves like the deb and rpm installs:

```bash
./bin/neuronex install
sudo systemctl start neuronex
```

For startup parameters, see [Startup Parameters and Configuration File](../admin/conf-management.md).

## Upgrading

The flow is the same for all three formats: stop the service, install the new package, start it again. Configuration and runtime data live in `/opt/neuronex/data/` and the plugins you installed live under `/opt/neuronex/plugins/`; neither is overwritten.

```bash
sudo systemctl stop neuronex

# deb
sudo dpkg -i neuronex-<new-version>-linux-amd64.deb
# rpm
sudo rpm -Uvh neuronex-<new-version>-linux-amd64.rpm
# tar.gz: extract the new package over the existing directory

sudo systemctl start neuronex
```

::: tip
Back up the data directory and the user plugin directories before upgrading — for the exact scope, see [Backup and Restore](../admin/backup-restore.md#backing-up-the-data-directory). To roll back, copy the backup into the same paths of the new version and the configuration is restored.
:::

## Uninstalling

| Format | Command | Notes |
| --- | --- | --- |
| **.deb** | `sudo dpkg -r neuronex` | Keeps configuration, logs, and data |
| | `sudo dpkg -P neuronex` | Removes everything |
| **.rpm** | `sudo rpm -e neuronex` | Or `sudo dnf remove neuronex` / `sudo yum remove neuronex` |
| **.tar.gz** | `rm -rf <extracted directory>` | For the run-in-place case; stop it first with `./bin/neuronex stop` |
| | `./bin/neuronex uninstall` | If you registered a systemd service, unregister before deleting |

Stop the service before uninstalling:

```bash
sudo systemctl stop neuronex || true
```

A tar.gz installed by the one-click script also leaves a symlink in `/usr/local/bin`. Remove it too:

```bash
sudo rm -rf /opt/neuronex
sudo rm -f /usr/local/bin/neuronex
```
