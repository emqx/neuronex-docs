# Configuration Management

NeuronEX supports modifying Neuron's configuration parameters through `command line`, `environment variables`, and `configuration files`, which can provide a more flexible way of starting and running. If `command line`, `environment variables`, and `configuration files` are configured at the same time, the priority relationship between the three is: command line > environment variable > configuration file

## Command Line

### `run` command

The `run` command is used to run NeuronEX on the console.This command starts NeuronEX as a process and displays its output in the terminal.

```shell
-c, --config string   config file path (default "etc/neuronex.yaml")
-k, --disable_kuiper    select whether to disable ekuiper
```
Eg:

```shell
./bin/neuronex run -c etc/neuronex.yaml -k true
```

This command starts NeuronEX as a process and displays its output in the terminal. The NeuronEX will not manage the lifecycle of Ekuiper.

### `start` command

The `start` command is used to start NeuronEX in daemon mode.This command starts NeuronEX as a daemon and runs it in the background.

Eg:

```sh
./bin/neuronex start 
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

### `reset-password` command

The `reset-password` command is used to change the default user's (admin) password to the default password 0000.

```sh
./bin/neuronex reset-password
```

## Environment Variable

NeuronEX supports reading environment variables during the startup process to configure startup parameters. The currently supported environment variables are as follows:

| Configuration name                 | Configuration function                                                                                                                    |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| NEURONEX_DISABLE_AUTH              | Set to 1, NeuronEX turns off Token authentication and authentication; set to 0, NeuronEX turns on Token authentication and authentication |
| NEURONEX__SERVER__ADMIN__PASSWORD  | Modify the default password of the admin user                                                                                             |
| NEURONEX__SERVER__VIEWER__USERNAME | The username of the newly added viewer user                                                                                               |
| NEURONEX__SERVER__VIEWER__PASSWORD | The password of the newly added viewer user                                                                                               |
| NEURONEX__LOG__MODE                | set to console, neuronex will print log into the console                                                                                  |
| KUIPER__BASIC__CONSOLELOG          | set to true, ekuiper will print log into the console                                                                                      |
| NEURON__LOG__MODE                  | set to console, neuron will print log into the console                                                                                    |

### Environment variables mapping to configuration file

NeuronEX supports overwriting configuration file through environment variables. When modifying configuration through environment variables, environment variables need to be set in the specified format. The mapping relationship is as follows:

```
NEURONEX__SERVER__DISABLEAUTH => server.disableAuth in etc/neuronex.yaml
NEURONEX__LOG__MODE => log.mode in etc/neuronex.yaml
```

Environment variables are separated by "__". The first part of the content matches the file name of the configuration file, and the rest of the content matches configuration items at different levels.

NeuronEX supports configuring the eKuiper yaml configuration file through environment variables. Get more information about [eKuiper global configurations](https://ekuiper.org/docs/en/latest/configuration/global_configurations.html).The mapping relationship is as follows:

```
KUIPER__BASIC__DEBUG => basic.debug in etc/kuiper.yaml
MQTT_SOURCE__DEMO_CONF__QOS => demo_conf.qos in etc/mqtt_source.yaml
EDGEX__DEFAULT__PORT => default.port in etc/sources/edgex.yaml
CONNECTION__EDGEX__REDISMSGBUS__PORT => edgex.redismsgbus.port int etc/connections/connection.yaml
```

For example, if you want to increase the timeout for calling external algorithm functions (default 5s), you can set the following environment variable `KUIPER__PORTABLE__RECVTIMEOUT => recvTimeout in etc/kuiper.yaml`:

```
# Docker Deployment
docker run -d --name neuronex -p 8085:8085 -e KUIPER__PORTABLE__RECVTIMEOUT=20s neuronex/neuronex:latest

```


## Configuration File

NeuronEX provides a YAML format file located at `/opt/neuronex/etc/neuronex.yaml` to configure personalized parameters related to NeuronEX.

### server

The `server` section defines the port number of the NeuronEX server.

- `port`: port number of the NeuronEX server, default value is 8085.
- `disableAuth`: whether to disable TOKEN authentication.
- `disableKuiper`: whether to disable eKuiper.
- `tls`: 
  - `certFile`: the certificate file location when enable TLS.
  - `keyFile`: the key file location when enable TLS.
- `admin`: administrator user
  - `password`: administrator password
- `viewer`: viewer user
  - `username`: viewer username
  - `password`: viewer password

### neuron

The `neuron` section defines the version number and reverse proxy configuration for Neuron.

- `version`: the version number of Neuron.
- `reverseProxies`: list of reverse proxy configurations for Neuron. Each reverse proxy configuration consists of two key-value pairs, `location` and `proxyPath`.
  - `location`: Neuron's path.
  - `proxyPath`: path to Neuron's backend server.

### ekuiper

The `ekuiper` section defines the version number and reverse proxy configuration of Ekuiper.

- `version`: the version number of eKuiper.
- `reverseProxies`: list of reverse proxy configurations for Ekuiper. Each reverse proxy configuration is the same as the `neuron.reverseProxies` configuration.
  - `location`: eKuiper's path.
  - `proxyPath`: path to Ekuiper's backend server.
  - `location`: eKuiper's ws service.
  - `proxyPath`: path to eKuiper's ws server.

### log

The `log` section defines the logging configuration of the NeuronEX server.

- `mode`: log output mode, options are `console` (output to console) and `file` (output to file).
- `level`: log level, options are `debug`, `info`, `warn`, `error` and `fatal`.
- `file`: path to the log file.
- `maxSize`: maximum size in megabytes of the log file before it gets rotated.
- `maxBackups`:  the maximum number of old log files to retain.
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
  disableAuth: false
  disableKuiper: false
  # tls:
  #   certFile: "etc/certs/neuronex.crt"
  #   keyFile: "etc/certs/neuronex.key"
#  admin:
#    password: "0000"
#  viewer:
#    username: "test"
#    password: "0000"

neuron:
  reverseProxies:
    - location: /api/neuron
      proxyPath: http://127.0.0.1:7000/api/v2

ekuiper:
  reverseProxies:
    - location: /api/ekuiper
      proxyPath: http://127.0.0.1:9081
    - location: /ws/ekuiper
      proxyPath: ws://127.0.0.1:10081

log:
  mode: file
  level: error
  file: log/neuronex.log
  maxSize: 20  # maximum size in megabytes of the log file before it gets rotated
  maxBackups: 5 # MaxBackups is the maximum number of old log files to retain
  syslog:
    enable: false
    # fatal/error/warning/notice/info/debug
    priority: "info"
    # now only support udp4
    network: "udp4"
    remoteAddr: ""
    # syslog protocol tag field, used for syslog server to identify which neuronex client send the syslog message
    tag: "neuronex"

official:
  url: https://neuronex-licenses.emqx.com
```

## HTTPS Functionality Usage

NeuronEX now supports HTTPS functionality, providing a more secure communication method. This feature allows users to access the dashboard and API through encrypted connections, enhancing the security and privacy of data transmission. NeuronEX supports both HTTP and HTTPS on the same port (8085).

### Enable HTTPS Functionality

Uncomment the following fields in the configuration file and place your certificate and private key in the corresponding directory.

```yaml
tls:
  certFile: "etc/certs/neuronex.crt"
  keyFile: "etc/certs/neuronex.key"
```
### Access Methods

- Web Dashboard Access
  - HTTP Access: http://your-server:8085
  - HTTPS Access: https://your-server:8085
- API Access
  - HTTP Access: http://your-server:8085/api/endpoint
  - HTTPS Access: https://your-server:8085/api/endpoint

### Client Configuration

- Method 1: If using a self-signed certificate, add the certificate file (neuronex.crt) to the client's trust store.
- Method 2: Disable certificate verification on the client.

## JWT Token Authentication 

By default, the REST API exposed by NeuronEX requires JWT Token authentication. NeuronEX supports users to place the authentication public key in the etc folder in the NeuronEX installation directory to achieve JWT Token authentication.

If NeuronEX is deployed using Docker, you need to map the local directory to the etc directory of NeuronEX in the container. Note that the local directory cannot be empty when mapping for the first time, and must have a `neuronex.yaml` configuration file and a public key file.

When upgrading or migrating NeuronEX software, you need to consider the backup and recovery of the etc directory.

## Dump File

By default, NeuronEX does not generate dump files upon crashing after installation and startup. If dump files are required for troubleshooting purposes, you need to execute the following command to enable dump file storage.

```shell
#!/bin/sh

set -e

core_pattern_path="/proc/sys/kernel/core_pattern"
target_pattern="/tmp/core-%e-%s"
sudo echo $target_pattern | sudo tee $core_pattern_path

core_pid_path="/proc/sys/kernel/core_uses_pid"
target_pid="0"
sudo echo $target_pid | sudo tee $core_pid_path

core_pattern=$(cat $core_pattern_path)
core_pid=$(cat $core_pid_path)

if [ "$core_pattern" = "$target_pattern" ] && [ "$core_pid" = "$target_pid" ];then
  echo "setting success"
else
  echo "setting failed"
fi

```