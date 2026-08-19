# Using deb packages

## Download

Download the installation package for different versions and CPU architectures from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), for example:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.9.2/neuronex-3.9.2-linux-amd64.deb
```

## Install

Install based on your version and architecture, for example:

```bash
$ sudo dpkg -i neuronex-3.9.2-linux-amd64.deb
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

* Uninstall but keep configuration files, log files, and data files.
```bash
$ sudo dpkg -r neuronex
```
* Uninstall and remove all files.
```bash
$ sudo dpkg -P neuronex
```

## Upgrade

Stop the current EMQX Neuron service:

```bash
$ sudo systemctl stop neuronex
```

Uninstall the current EMQX Neuron:

```bash
$ sudo dpkg -r neuronex
```

Download the new EMQX Neuron installation package and install it:

```bash
$ sudo dpkg -i neuronex-3.x.x-linux-amd64.deb
```

After running the above commands, the new version of EMQX Neuron will retain the previous configurations.
Start the new EMQX Neuron service:

```bash
$ sudo systemctl start neuronex
```

::: tip
Alternatively, you can manually copy and back up the files in the `/opt/neuronex/data/` directory of the old EMQX Neuron version, then import these files into the same directory of the new EMQX Neuron version to restore the configurations.
:::