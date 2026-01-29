# Using rpm packages

## Download

Download the installation package for different versions and CPU architectures from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), for example:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.7.0/neuronex-3.7.0-linux-amd64.rpm
```

## Install

```bash
$ sudo rpm -ivh neuronex-3.7.0-linux-amd64.rpm
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
