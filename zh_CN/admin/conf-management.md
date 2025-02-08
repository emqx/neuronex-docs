# 配置管理

NeuronEX 支持通过`命令行`、`环境变量`、`配置文件`的方式，对 NeuronEX 的配置参数进行修改，可以提供更加灵活的启动和运行方式。
如果同时配置了`命令行`、`环境变量`、`配置文件`，三者的优先级关系为：命令行 > 环境变量 > 配置文件 

## 命令行

NeuronEX 的命令行位于 `/bin/neuronex`，它提供了以下的常用选项：

### `run` 命令

`run`  命令用于在控制台上运行 NeuronEX。该命令将 NeuronEX 作为一个进程启动，并在终端中显示其输出。

```shell
-c, --config 配置文件路径, 默认为 "etc/neuronex.yaml"
-k, --disable_kuiper 选择是否停用 eKuiper, 默认为 false, 即启用
```

例如：
```sh
./bin/neuronex run -c etc/neuronex.yaml -k true
```

该命令将 NeuronEX 作为进程启动，并在终端中显示其输出, NeuronEX 不会启动 eKuiper

### `start` 命令

`start ` 命令用于在守护进程模式下启动 NeuronEX，该命令将 NeuronEX 作为守护进程启动并在后台运行。

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

### `reset-password` 命令

`reset-password` 命令用于将默认用户 admin 的密码修改为默认密码 0000。

```sh
./bin/neuronex reset-password
```

## 环境变量

NeuronEX 支持在启动过程中读取环境变量来配置启动参数，目前支持的环境变量如下:

| 配置名                                | 配置作用                                                     |
|------------------------------------|----------------------------------------------------------|
| NEURONEX_DISABLE_AUTH              | 设置为 1，NeuronEX 关闭 Token 鉴权认证；设置为0，NeuronEX 开启 Token 鉴权认证 |
| NEURONEX__SERVER__ADMIN__PASSWORD  | 修改 admin 用户默认密码                                          |
| NEURONEX__SERVER__VIEWER__USERNAME | 新添加 viewer 用户的用户名                                        |
| NEURONEX__SERVER__VIEWER__PASSWORD | 新添加 viewer 用户的密码                                         |
| NEURONEX__LOG__MODE                | 设置为 console, NeuronEX 会把日志打印到标准输出                        |
| KUIPER__BASIC__CONSOLELOG          | 设置为 true, ekuiper 会把日志打印到标准输出                            |
| NEURON__LOG__MODE                  | 设置为 console, Neuron 会把日志打印到标准输出                          |


### 环境变量映射为配置文件

NeuronEX 支持通过环境变量覆盖配置文件中的配置，当通过环境变量修改配置时，环境变量需要按照规定的格式设置。映射关系如下：

  ```
  NEURONEX__SERVER__DISABLEAUTH => server.disableAuth in etc/neuronex.yaml
  NEURONEX__LOG__MODE => log.mode in etc/neuronex.yaml
  ```

环境变量之间用“__”分隔，分隔后第一部分的内容匹配配置文件的文件名，其余内容匹配不同级别的配置项。

NeuronEX 支持通过环境变量配置数据处理模块 eKuiper 的 yaml 配置文件，详细配置项请参考[eKuiper 配置](https://ekuiper.org/docs/zh/latest/configuration/global_configurations.html)。 eKuiper配置文件与环境变量映射关系和 NeuronEX 相同，如下：

```
KUIPER__BASIC__DEBUG => basic.debug in etc/kuiper.yaml
MQTT_SOURCE__DEMO_CONF__QOS => demo_conf.qos in etc/mqtt_source.yaml
EDGEX__DEFAULT__PORT => default.port in etc/sources/edgex.yaml
CONNECTION__EDGEX__REDISMSGBUS__PORT => edgex.redismsgbus.port int etc/connections/connection.yaml
```
举例，如要调大调用外部算法函数的超时时间（默认为5s），可以设置如下环境变量`KUIPER__PORTABLE__RECVTIMEOUT => recvTimeout in etc/kuiper.yaml`：
```
# Docker 部署方式
docker run -d --name neuronex -p 8085:8085 -e KUIPER__PORTABLE__RECVTIMEOUT=20s neuronex/neuronex:latest

```


## 配置文件

NeuronEX 提供 YAML 格式文件，位于`/opt/neuronex/etc/neuronex.yaml`，用于配置与 NeuronEX 相关的参数。

### server

` server`  部分定义了 NeuronEX 服务器的端口号。

- ` port`：NeuronEX 服务器的端口号，默认值为 8085。
- ` disableAuth`：NeuronEX 是否关闭 Token 认证。
- ` disableKuiper`：NeuronEX 是否停用 eKuiper
- `tls`: 开启 TLS 认证
  - `certFile`: 开启 TLS 认证后，证书文件位置
  - `keyFile`: 开启 TLS 认证后，密钥文件位置
- `admin`: 管理员账号
  - `password`: 管理员账户密码
- `viewer`: 添加查看者账号
  - `username`: 查看者账号用户名
  - `password`: 查看者账号密码

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
  - `location`: ekuiper ws服务路径。
  - `proxyPath`: ekuiper ws服务路径。

### log

日志 "部分定义了 NeuronEX 服务器的日志配置。

- ` mode` ：日志输出模式，选项为 console（输出到控制台）和 file（输出到文件）。
- ` level`：日志级别，选项包括 debug,info,warn,error ,fatal。
- ` file`：日志文件路径。
- `maxSize`：日志文件轮换前的最大容量（以 MB 为单位）。
- `maxAge`： 根据文件名中编码的时间戳保留旧日志文件的最长天数。
- `maxBackups`： 保留的旧日志文件的最大数量。
- `syslogForward`：日志远程转发配置。
  - `enable`：是否启用日志远程转发。
  - `priority`：选项包括 emerg,alert,crit,err,warning,notice,info,debug。
  - `network`：现在只支持 udp4
  - `remoteAddr`: 记录远程转发地址。
  - `tag`：记录远程转发标签。

### official

- `offcial` 部分定义生态 license 官网服务器信息。
  - `url`：生态 license 官网服务器地址。

 默认配置如下

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

## HTTPS 功能使用

NeuronEX现已支持HTTPS功能，提供了更安全的通信方式。此功能允许用户通过加密连接访问dashboard和API，增强了数据传输的安全性和隐私保护。NeuronEX 使用相同的端口（8085）同时支持HTTP和HTTPS。

### 开启 HTTPS 功能

在配置文件中取消注释以下字段，并在对应目录放入您的证书和私钥。

```yaml
tls:
  certFile: "etc/certs/neuronex.crt"
  keyFile: "etc/certs/neuronex.key"
```
### 访问方式
- Web Dashboard访问
  - HTTP访问：http://your-server:8085
  - HTTPS访问：https://your-server:8085
- API访问
  - HTTP访问：http://your-server:8085/api/endpoint
  - HTTPS访问：https://your-server:8085/api/endpoint

### 客户端配置

- 方式一：如使用自签名证书，将证书文件（neuronex.crt）添加到客户端的信任存储中
- 方式二：客户端禁用证书验证

## JWT Token 认证公钥

默认情况下 NeuronEX 对外暴露的 REST API 需要 JWT Token 认证， NeuronEX 支持用户将认证公钥放置在 NeuronEX 安装目录下的 etc 文件夹下，以实现 JWT Token 认证。

如果 NeuronEX 采用 Docker 部署的方式，则需要将本地目录映射进容器内 NeuronEX 的 etc 目录。注意首次映射时本地目录不能为空, 必须具有 neuronex.yaml 配置文件以及公钥文件。

在 NeuronEX 软件升级或者迁移时，需要考虑到 etc 目录的备份和恢复。

## Dump文件

NeuronEX 默认安装启动后，发生 Crash 不生成 dump 文件。如需 dump 文件进行故障排查。需要生成dump文件的话，需要执行以下命令后开启dump文件存储。

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


