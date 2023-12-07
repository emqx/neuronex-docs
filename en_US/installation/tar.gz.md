# Using .tar.gz package

## Download

Download the installation package according to different versions and architectures, for example:

```bash
$ wget https://www.emqx.com/en/downloads/neuronex/3.0.1/neuronex-3.0.1-linux-amd64.tar.gz
```

## Install

```bash
$ tar -zxvf neuronex-3.0.1-linux-amd64.tar.gz
$ cd neuronex-3.0.1-linux-amd64
```

::: tip 
GLIBC requires version 2.31 or above.
:::

## Run

The following command can be executed to start NeuronEX:

```bash
$ ./bin/neuronex run
```

For more startup parameters, please refer to the [Configuration Management](../admin/conf-management.md).
