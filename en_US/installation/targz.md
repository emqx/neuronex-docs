# Using .tar.gz package

## Download

Download the installation package for different versions and CPU architectures from the [EMQ website](https://www.emqx.com/en/downloads-and-install/neuronex?os=Linux), for example:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.7.0/neuronex-3.7.0-linux-amd64.tar.gz
```

## Install

```bash
$ tar -zxvf neuronex-3.7.0-linux-amd64.tar.gz
$ cd neuronex-3.7.0-linux-amd64
```

:::: tip
GLIBC requires version 2.31 or above.
::::

## Start

Run the following command to start NeuronEX:

```bash
$ ./bin/neuronex start
```

For more startup parameters, please refer to the [Configuration Management](../admin/conf-management.md).

