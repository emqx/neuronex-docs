# 配置管理

NeuronEX 支持通过`命令行`、`环境变量`、`配置文件`的方式，对 NeuronEX 的配置参数进行修改，可以提供更加灵活的启动和运行方式。
如果同时配置了`命令行`、`环境变量`、`配置文件`，三者的优先级关系为：环境变量 > 命令行 > 配置文件

## 命令行

NeuronEX 的命令行位于 `/bin/neuronex`，它提供了以下的常用选项：
```shell
-c, --config 配置文件路径（默认为 "etc/neuronex.yaml"）
-e, --disable_auth 选择是否启用身份验证（默认为 true）
-h, --help 运行帮助
-m, --manage 管理 eKuiper 和 Neuron 的生命周期（默认为 true）
```

### `run` 命令

`run`  命令用于在控制台上运行 NeuronEX。该命令将 NeuronEX 作为一个进程启动，并在终端中显示其输出。

例如：
```sh
./bin/neuronex run -c etc/neuronex.yaml -m false -e false
```

该命令将 NeuronEX 作为进程启动，并在终端中显示其输出。NeuronEX 不会管理 Neuron 和 eKuiper 的生命周期，也不会开启权限验证。

### `start` 命令

`start ` 命令用于在守护进程模式下启动 NeuronEX，该命令将 NeuronEX 作为守护进程启动并在后台运行。

例如

```sh
./bin/neuronex start -c etc/neuronex.yaml -m false -e false
```

该命令将 NeuronEX 作为守护进程启动，并在后台运行。NeuronEX 不会管理 Neuron 和 eKuiper 的生命周期，也不会开启权限验证。

### `stop` 命令

`stop` 命令用于停止运行 NeuronEX。该命令将杀死 NeuronEX 进程。

```sh
./bin/neuronex stop
```

### `install` 命令

`install` 命令用于在 /etc/systemd/system path 中注册 NeuronEX 服务配置文件。

```sh
./bin/neuronex install
```

### `uninstall` 命令

`uninstall` 命令用于在 /etc/systemd/system path 中取消注册 NeuronEX 服务配置文件。

```sh
./bin/neuronex uninstall
```

## 环境变量

NeuronEX 支持在启动过程中读取环境变量来配置启动参数，目前支持的环境变量如下:

| 配置名                          | 配置作用                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------- |
| NEURONEX_DISABLE_AUTH          | 设置为 1，NeuronEX 关闭 Token 鉴权认证；设置为0，NeuronEX 开启 Token 鉴权认证                |
| NEURON_DAEMON                  | 设置为1，Neuron 守护进程运行；设置为0，Neuron 正常运行                                   |
| NEURON_CONFIG_DIR              | Neuron 配置文件目录                                                                  |
| NEURON_PLUGIN_DIR              | Neuron 插件文件目录                                                                  |
## 配置文件

NeuronEX 提供 YAML 格式文件，用于配置与 NeuronEX 相关的个性化参数。

### server

` server`  部分定义了 NeuronEX 服务器的端口号。

- ` port`：NeuronEX 服务器的端口号，默认值为 8085。

### neuron

` neuron ` 部分定义 Neuron 的版本号和反向代理配置。

- ` version`：Neuron 的版本号。
- ` reverseProxies`：Neuron 的反向代理配置列表。
  - ` location`： Neuron 的路径： Neuron 的路径。
  - ` proxyPath` ：Neuron 后端服务器的路径。

### eKuiper

` ekuiper ` 部分定义了 eKuiper 的版本号和反向代理配置。

- ` version`：eKuiper 的版本号。
- ` reverseProxies` ：eKuiper 的反向代理配置列表。
  - ` location`：eKuiper 的路径： eKuiper 的路径。
  - ` proxyPath` ：eKuiper 后端服务器的路径。

### log

日志 "部分定义了 NeuronEX 服务器的日志配置。

- ` mode` ：日志输出模式，选项为 console（输出到控制台）和 file（输出到文件）。
- ` level`：日志级别，选项包括 debug,info,warn,error ,fatal。
- ` file`：日志文件路径。
- `maxSize`：日志文件轮换前的最大容量（以 MB 为单位）。
- `maxAge`： 根据文件名中编码的时间戳保留旧日志文件的最长天数。
- `maxBackups`： 保留的旧日志文件的最大数量。
- `listenAddr`：用于远程日志收集的日志监听器地址。
- `syslogForward`：日志远程转发配置。
  - `enable`：是否启用日志远程转发。
  - `priority`：选项包括 emerg,alert,crit,err,warning,notice,info,debug。
  - `network`：现在只支持 udp4
  - `remoteAddr`: 记录远程转发地址。
  - `tag`：记录远程转发标签。

### official

`offcial` 部分定义生态 license 官网服务器信息。

- `url`：生态 license 官网服务器地址。

 默认配置如下

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
