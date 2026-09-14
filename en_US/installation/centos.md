# Using rpm packages

## Download

Download the installation package for different versions and CPU architectures from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), for example:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.rpm
```

## Install

```bash
$ sudo rpm -ivh neuronex-3.9.2-linux-amd64.rpm
```

## Start

```bash
$ sudo systemctl start neuronex
```

## Status

```bash
$ sudo systemctl status neuronex
```

## Stop

```bash
$ sudo systemctl stop neuronex
```

## Uninstall

```bash
$ sudo rpm -e neuronex
```

## Uninstall

Stop the service first (if installed as a systemd service):

```bash
sudo systemctl stop neuronex || true
```

Uninstall EMQX Neuron:

```bash
sudo rpm -e neuronex
```

If your system uses `dnf/yum`, you can also uninstall via the package manager:

```bash
sudo dnf remove -y neuronex
# or
sudo yum remove -y neuronex
```
