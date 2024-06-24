# Using deb packages

## Download

Download the installation package according to different versions and architectures, E.g:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.3.0/neuronex-3.3.0-linux-amd64.deb
```

## Install

```bash
$ sudo dpkg -i neuronex-3.3.0-linux-amd64.deb
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

* Uninstall but retain configuration files, log files, and data files.
```bash
$ sudo dpkg -r neuronex
```
* Uninstall and remove all files.
```bash
$ sudo dpkg -P neuronex
```
