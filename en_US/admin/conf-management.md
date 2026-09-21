# Startup Parameters and Configuration Files

EMQX Neuron supports modifying EMQX Neuron's configuration parameters through `command line`, `environment variables`, and `configuration files`, which can provide a more flexible way of starting and running. If `command line`, `environment variables`, and `configuration files` are configured at the same time, the priority relationship between the three is: command line > environment variable > configuration file

## Command Line

### `run` command

The `run` command is used to run EMQX Neuron on the console.This command starts EMQX Neuron as a process and displays its output in the terminal.

```shell
-c, --config string   config file path (default "etc/neuronex.yaml")
-k, --disable_kuiper    select whether to disable the rules engine application
```
Eg:

```shell
./bin/neuronex run -c etc/neuronex.yaml -k true
```

This command starts EMQX Neuron as a process and displays its output in the terminal. The EMQX Neuron will not manage the lifecycle of the Rules Engine Application.

### `start` command

The `start` command is used to start EMQX Neuron in daemon mode.This command starts EMQX Neuron as a daemon and runs it in the background.

Eg:

```sh
./bin/neuronex start 
```

This command starts EMQX Neuron as a daemon and runs it in the background. The EMQX Neuron will not manage the lifecycle of EMQX Neuron and Rules Engine Application and will not turn on privilege authentication.

### `stop` command

The `stop` command is used to stop running EMQX Neuron. This command will kill the EMQX Neuron process.

```sh
./bin/neuronex stop
```

### `install` command

The ` install` command is used to register the EMQX Neuron service configuration file in /etc/systemd/system path.

```sh
./bin/neuronex install
```

### `uninstall` command

The ` uninstall` command is used to unregister the EMQX Neuron service configuration file in the /etc/systemd/system path.

```sh
./bin/neuronex uninstall
```

### `reset-password` command

The `reset-password` command is used to change the default user's (admin) password to the default password 0000.

```sh
./bin/neuronex reset-password
```

## Environment Variable

EMQX Neuron supports reading environment variables during the startup process to configure startup parameters. The currently supported environment variables are as follows:

| Configuration name                 | Configuration function                                                                                                                    |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| NEURONEX_DISABLE_AUTH              | Set to 1, EMQX Neuron turns off Token authentication and authentication; set to 0, EMQX Neuron turns on Token authentication and authentication |
| NEURONEX__SERVER__ADMIN__PASSWORD  | Modify the default password of the admin user                                                                                             |
| NEURONEX__SERVER__VIEWER__USERNAME | The username of the newly added viewer user                                                                                               |
| NEURONEX__SERVER__VIEWER__PASSWORD | The password of the newly added viewer user                                                                                               |
| NEURONEX__LOG__MODE                | set to console, neuronex will print log into the console                                                                                  |
| KUIPER__BASIC__CONSOLELOG          | set to true, Rules Engine Application will print log into the console                                                                                      |
| NEURON__LOG__MODE                  | set to console, neuron will print log into the console                                                                                    |

### Environment variables mapping to configuration file

EMQX Neuron supports overwriting configuration file through environment variables. When modifying configuration through environment variables, environment variables need to be set in the specified format. The mapping relationship is as follows:

```
NEURONEX__SERVER__DISABLEAUTH => server.disableAuth in etc/neuronex.yaml
NEURONEX__LOG__MODE => log.mode in etc/neuronex.yaml
```

Environment variables are separated by "__". The first part of the content matches the file name of the configuration file, and the rest of the content matches configuration items at different levels.

EMQX Neuron supports configuring the Rules Engine Application yaml configuration file through environment variables. The mapping relationship is the same as for EMQX Neuron:

```
KUIPER__BASIC__DEBUG => basic.debug in etc/kuiper.yaml
MQTT_SOURCE__DEMO_CONF__QOS => demo_conf.qos in etc/mqtt_source.yaml
EDGEX__DEFAULT__PORT => default.port in etc/sources/edgex.yaml
CONNECTION__EDGEX__REDISMSGBUS__PORT => edgex.redismsgbus.port int etc/connections/connection.yaml
```

For example, if you want to increase the timeout for calling external algorithm functions (default 5s), you can set the following environment variable `KUIPER__PORTABLE__RECVTIMEOUT => recvTimeout in etc/kuiper.yaml`:

```
# Docker Deployment
docker run -d --name neuronex -p 8085:8085 -e KUIPER__PORTABLE__RECVTIMEOUT=20s emqx/neuronex:latest

```


### Rules Engine Application configuration items

The main configuration file of the Rules Engine Application is `/opt/neuronex/etc/ekuiper/kuiper.yaml`, and every item in it carries a comment. The commonly used items are listed below by group. Use either the file or the environment variables — the environment variable wins.

#### basic — logging and services

| Item | Default | Description |
| --- | --- | --- |
| `logLevel` | `info` | Log level: debug, info, warn, error, fatal, panic |
| `debug` | `false` | Prints more debug information at debug level |
| `consoleLog` | `false` | Write the log to the console |
| `fileLog` | `true` | Write the log to a file |
| `rotateTime` | `24` | Hours between log file splits |
| `maxAge` | `72` | Hours a log file is kept |
| `rotateSize` | `10485760` | Maximum size of one log file, in bytes. When set, `maxAge` no longer applies |
| `rotateCount` | `3` | Number of log files kept |
| `restPort` | `9081` | REST service port |
| `timezone` | `Local` | Time zone, a name from the IANA database; `Local` follows the system |
| `ignoreCase` | `false` | Whether SQL processing ignores case. Names of custom plugin functions are always case-sensitive |
| `pluginHosts` | `https://packages.emqx.net` | Where pre-built plugins are downloaded from |
| `rulePatrolInterval` | `10s` | Interval between rule patrols |
| `sql.maxConnections` | `0` | Maximum connections to one database instance shared by sources and sinks; 0 means unlimited |
| `gracefulShutdownTimeout` | `10s` | How long a graceful shutdown waits |

#### rule — default rule options

Each rule can override these values.

| Item | Default | Description |
| --- | --- | --- |
| `qos` | `0` | 0 at most once, 1 at least once, 2 exactly once. Above 0 the checkpoint mechanism saves state so a rule can recover from an interruption or a restart, at some cost to performance |
| `checkpointInterval` | `300s` | How often the checkpoint runs |
| `sendError` | `false` | Whether errors are sent to the actions |

#### sink — action cache for network outages

| Item | Default | Description |
| --- | --- | --- |
| `enableCache` | `false` | Whether the cache is enabled |
| `memoryCacheThreshold` | `1024` | Maximum messages cached in memory |
| `maxDiskCache` | `1024000` | Maximum messages cached on disk |
| `bufferPageSize` | `256` | Messages per page written to or read from disk in one batch, to avoid frequent IO |
| `resendInterval` | `0s` | Interval between resends of cached messages |
| `cleanCacheAtStop` | `false` | Whether the cache is cleared when the rule stops |

#### source — HTTP service for the httppush source

| Item | Default | Description |
| --- | --- | --- |
| `httpServerIp` | `0.0.0.0` | Address the HTTP data service listens on |
| `httpServerPort` | `10081` | Port of the HTTP data service |

#### store — state storage

| Item | Default | Description |
| --- | --- | --- |
| `type` | `sqlite` | State store: `sqlite` or `redis` |
| `extStateType` | `sqlite` | Store used for external state |
| `sqlite.name` | empty | SQLite file name; `sqliteKV.db` when left empty |
| `redis.host` | `localhost` | Redis host |
| `redis.port` | `6379` | Redis port |
| `redis.timeout` | `1s` | Redis connection timeout |

#### portable — Python plugins

| Item | Default | Description |
| --- | --- | --- |
| `pythonBin` | `python` | The Python executable. Set it when the system has more than one Python |
| `initTimeout` | `60s` | Plugin initialization timeout; the plugin is terminated when it is exceeded |
| `sendTimeout` | `5s` | Send timeout |
| `recvTimeout` | `5s` | Receive timeout |

#### openTelemetry — tracing

| Item | Default | Description |
| --- | --- | --- |
| `enableRemoteCollector` | `false` | Whether traces are reported to a remote collector |
| `remoteEndpoint` | `localhost:4318` | Address of the remote collector |
| `localTraceCapacity` | `2048` | Number of traces kept locally |
| `enableLocalStorage` | `false` | Whether traces are written to disk |

For how to turn tracing on, see [System Configuration · Traces](./sys-configuration.md#traces).

## Configuration File

EMQX Neuron provides a YAML format file located at `/opt/neuronex/etc/neuronex.yaml` to configure personalized parameters related to EMQX Neuron.

### server

The `server` section defines the port number of the EMQX Neuron server.

- `port`: port number of the EMQX Neuron server, default value is 8085.
- `disableAuth`: whether to disable TOKEN authentication.
- `disableKuiper`: whether to disable Rules Engine Application.
- `tls`: 
  - `certFile`: the certificate file location when enable TLS.
  - `keyFile`: the key file location when enable TLS.
- `admin`: administrator user
  - `password`: administrator password
- `viewer`: viewer user
  - `username`: viewer username
  - `password`: viewer password

### neuron

The `neuron` section defines the version number and reverse proxy configuration for EMQX Neuron.

- `version`: the version number of EMQX Neuron.
- `reverseProxies`: list of reverse proxy configurations for EMQX Neuron. Each reverse proxy configuration consists of two key-value pairs, `location` and `proxyPath`.
  - `location`: EMQX Neuron's path.
  - `proxyPath`: path to EMQX Neuron's backend server.

### Rules Engine Application

The `ekuiper` section defines the version number and reverse proxy configuration of the Rules Engine Application.

- `version`: the version number of Rules Engine Application.
- `reverseProxies`: list of reverse proxy configurations for the Rules Engine Application. Each reverse proxy configuration is the same as the `neuron.reverseProxies` configuration.
  - `location`: Rules Engine Application's path.
  - `proxyPath`: path to Rules Engine Application's backend server.
  - `location`: Rules Engine Application's ws service.
  - `proxyPath`: path to Rules Engine Application's ws server.

### log

The `log` section defines the logging configuration of the EMQX Neuron server.

- `mode`: log output mode, options are `console` (output to console) and `file` (output to file).
- `level`: log level, options are `debug`, `info`, `warn`, `error` and `fatal`.
- `file`: path to the log file.
- `maxSize`: maximum size in megabytes of the log file before it gets rotated.
- `maxBackups`:  the maximum number of old log files to retain.

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

official:
  url: https://neuronex-licenses.emqx.com
```

## HTTPS Functionality Usage

EMQX Neuron now supports HTTPS functionality, providing a more secure communication method. This feature allows users to access the dashboard and API through encrypted connections, enhancing the security and privacy of data transmission. EMQX Neuron supports both HTTP and HTTPS on the same port (8085).

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

By default, the REST API exposed by EMQX Neuron requires JWT Token authentication. EMQX Neuron supports users to place the authentication public key in the etc folder in the EMQX Neuron installation directory to achieve JWT Token authentication.

If EMQX Neuron is deployed using Docker, you need to map the local directory to the etc directory of EMQX Neuron in the container. Note that the local directory cannot be empty when mapping for the first time, and must have a `neuronex.yaml` configuration file and a public key file.

When upgrading or migrating EMQX Neuron software, you need to consider the backup and recovery of the etc directory.

## Dump File

By default, EMQX Neuron does not generate dump files upon crashing after installation and startup. If dump files are required for troubleshooting purposes, you need to execute the following command to enable dump file storage.

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