# Using rpm packages
## Download

Download the installation package according to different versions and architectures, E.g:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.1.0/neuronex-3.1.0-linux-amd64.rpm
```

## Install

```bash
$ sudo rpm -ivh neuronex-3.1.0-linux-amd64.rpm
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
$ sudo rpm -e neuron
```
