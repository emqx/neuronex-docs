# Configuration Management

NeuronEX supports modifying Neuron's configuration parameters through `command line`, `environment variables`, and `configuration files`, which can provide a more flexible way of starting and running. If `command line`, `environment variables`, and `configuration files` are configured at the same time, the priority relationship between the three is: environment variable > command line > configuration file

## Command Line

### `run` command

The `run` command is used to run NeuronEX on the console.This command starts NeuronEX as a process and displays its output in the terminal.

```shell
-c, --config string   config file path (default "etc/neuronex.yaml")
-e, --disable_auth    select whether to enable authentication
-h, --help            help for run
-m, --manage          manage the lifecycle of eKuiper and Neuron (default true)
```
Eg:

```shell
./bin/neuronex run -c etc/neuronex.yaml -m false -e false
```

This command starts NeuronEX as a process and displays its output in the terminal. The NeuronEX will not manage the lifecycle of Neuron and Ekuiper and will not turn on privilege authentication.

### `start` command

The `start` command is used to start NeuronEX in daemon mode.This command starts NeuronEX as a daemon and runs it in the background.

```
-c, --config string   config file path (default "etc/neuronex.yaml")
-e, --disable_auth    select whether to enable authentication
-h, --help            help for run
-m, --manage          manage the lifecycle of eKuiper and Neuron (default true)
```

Eg:

```sh
./bin/neuronex start -c etc/neuronex.yaml -m false -e false
```

This command starts NeuronEX as a daemon and runs it in the background. The NeuronEX will not manage the lifecycle of Neuron and Ekuiper and will not turn on privilege authentication.

### `stop` command

The `stop` command is used to stop running NeuronEX. This command will kill the NeuronEX process.

```sh
./bin/neuronex stop
```

### `install` command

The ` install` command is used to register the NeuronEX service configuration file in /etc/systemd/system path.

```sh
./bin/neuronex install
```

### `uninstall` command

The ` uninstall` command is used to unregister the NeuronEX service configuration file in the /etc/systemd/system path.

```sh
./bin/neuronex uninstall
```

## 环境变量

## Environment Variables

NeuronEX supports reading environment variables during the startup process to configure startup parameters. The currently supported environment variables are as follows:

| Configuration name             | Configuration function                                                            |
| ------------------------------ | --------------------------------------------------------------------------------- |
| NEURONEX_DISABLE_AUTH          | Set to 1, NeuronEX turns off Token authentication and authentication; set to 0, NeuronEX turns on Token authentication and authentication   |
| NEURON_DAEMON                  | Set to 1, the Neuron daemon runs; set to 0, Neuron runs normally                   |
| NEURON_CONFIG_DIR              | Neuron configuration file directory                                                |
| NEURON_PLUGIN_DIR              | Neuron plug-in file directory                                                      |
## Configuration File

NeuronEX provides a YAML format file to configure personalized parameters related to NeuronEX.

### server

The `server` section defines the port number of the NeuronEX server.

- `port`: port number of the NeuronEX server, default value is 8085.

### neuron

The `neuron` section defines the version number and reverse proxy configuration for Neuron.

- `version`: the version number of Neuron.
- `reverseProxies`: list of reverse proxy configurations for Neuron. Each reverse proxy configuration consists of two key-value pairs, `location` and `proxyPath`.
  - `location`: Neuron's path.
  - `proxyPath`: path to Neuron's backend server.

### ekuiper

The `ekuiper` section defines the version number and reverse proxy configuration of Ekuiper.

- `version`: the version number of Ekuiper.
- `reverseProxies`: list of reverse proxy configurations for Ekuiper. Each reverse proxy configuration is the same as the `neuron.reverseProxies` configuration.
  - `location`: Ekuiper's path.
  - `proxyPath`: path to Ekuiper's backend server.

### log

The `log` section defines the logging configuration of the NeuronEX server.

- `mode`: log output mode, options are `console` (output to console) and `file` (output to file).
- `level`: log level, options are `debug`, `info`, `warn`, `error` and `fatal`.
- `file`: path to the log file.
- `maxSize`: maximum size in megabytes of the log file before it gets rotated.
- `maxBackups`:  the maximum number of old log files to retain.
- `listenAddr`: log listener address for remote log collection.
- `syslogForward`: log remote forwarding configuration.
  - `enable`: whether to enable log remote forwarding.
  - `priority`：options are emerg,alert,crit,err,warning,notice,info,debug now.
  - `network`: now only support udp4
  - `remoteAddr`: log remote forwarding address.
  - `tag`: log remote forwarding tag.

### official

The `official` section defines ecosy license official server address information.

- `url`: ecosy license official server address.

 The default configuration is as follows:

```yaml
server:
  port: 8085

neuron:
  version: 2.6.0
  reverseProxies:
    - location: /api/neuron
      proxyPath: http://127.0.0.1:7000/api/v2

ekuiper:
  version: 1.10.2
  reverseProxies:
    - location: /api/ekuiper
      proxyPath: http://127.0.0.1:9081

log:
  mode: file
  level: info
  file: log/neuronex.log
  # maximum size in megabytes of the log file before it gets rotated
  maxSize: 50000
  # MaxBackups is the maximum number of old log files to retain
  maxBackups: 3
  listenAddr: "localhost:10514"
  syslogForward:
    enable: false
    # emerg/alert/crit/err/warning/notice/info/debug
    priority: "info"
    # now only support udp4
    network: "udp4"
    remoteAddr: ""
    # syslog protocol tag field, used for syslog server to identify which neuronex client send the syslog message
    tag: "neuronex"

official:
  url: https://license-test.mqttce.com
```