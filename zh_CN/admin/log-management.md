# 管理日志


NeuronEX 默认将日志打印到本地文件系统中，并在 Dashboard 上提供日志管理功能。

## 数采驱动 Debug 日志

NeuronEX 数采驱动支持开启/关闭某个驱动节点的 debug 日志，方便用户调试驱动，点击驱动节点的 `更多` -> `开启DEBUG日志`，即可将日志级别设置为 debug，如下图所示。
![调试节点](./assets/neuron_node_debug_zh.png)

此时，该驱动节点开始打印 debug 日志，用户点击该驱动节点下的`下载驱动日志`，即可将日志文件下载到本地。

::: tip 注意
打印节点 debug 日志时会打印很多冗余信息并对性能产生一定影响，当不需要时，请点击`关闭DEBUG日志`及时关闭。
:::

## 日志管理

NeuronEX 支持在 Dashboard 页面一键下载所有日志文件的功能。登录 NeuronEX 后，点击页面左侧的 **管理** -> **日志**， 进入日志管理界面。
![如图所示](./assets/log_manage_zh.png)

### 日志下载

在日志下载部分，支持下载 **数采引擎日志**、**数据处理引擎日志**、**NeuronEX 系统日志**。

以 **下载数采引擎日志** 为例，该功能是把 `/opt/neuronex/software/neuron/logs` 的文件夹打包成 neuron_debug.tar.gz 文件并下载到本地。文件包含所有已创建的驱动及 neuron 核心的日志文件，文件目录级别如下图所示。

<img src="./assets/neuron_logs.png" alt="neuron_logs" style="zoom:50%;" />

  * data-stream-processing.log：数据处理节点日志
  * dlt645.log：驱动日志
  * modbus-plus-tcp.log：驱动日志
  * neuron.log：Neuron 核心日志

### 日志配置

  如果现有日志信息不能满足需要， 在日志配置部分，可以动态设置日志级别，其中 Debug 级别将打印大量调试信息，有助于工程师调试分析程序故障，随着日志级别的升高，日志打印的信息越少。

:::tip  注意

注意此日志级别设置不会持久化，在 NeuronEX 重启后将恢复默认日志级别, 日志打印过多会对性能有一定影响，因此需要及时调整到较高级别。

:::

### 日志上传

  NeuronEX还支持将日志通过 SYSLOG 协议发送到 ECP 的 SYSLOG 服务器中，满足用户长期保存日志需求。

![如图所示](./assets/log_manage_zh.png)

以下参数均为只读，由 ECP 端配置：
* 开启/关闭日志上传 
* Syslog 服务地址 
* Syslog 日志标签 
* 网络协议类型 
* 上传日志等级 

:::tip  注意

此配置会持久化并且优先级高于[配置文件](./conf-management.md#log) syslogForward 部分。

:::

<!-- ## 日志监控
NeuronEX 支持实时查看日志信息。登录 NeuronEX 后，点击页面左侧的 **管理** -> **日志**， 进入日志监控界面。
![如图所示](./assets/log_monitor_zh.png)

### 日志过滤
支持对服务类型和日志级别进行过滤。服务类型支持 All、NeuronEX、数据处理引擎，日志级别支持 All、Debug、Info、Notice、Warn、Error、Fatal。
![如图所示](./assets/log_monitor_filter_zh.png) -->

## 后台查看日志

除了在前端下载日志，用户还可以在后台实时观察日志输出。

数采引擎日志查看命令为

```shell
 tail -f tail -f /opt/neuronex/software/neuron/logs/neuron.log
```

数采引擎某南向节点日志查看命令为

```shell
 tail -f tail -f modbus-plus-tcp.log
```

数据处理模块日志查看命令为

```shell
  tail -f /opt/neuronex/software/ekuiper/log/stream.log
```

NeuronEX 日志查看命令为

```shell
  tail -f /opt/neuronex/log/neuronex.log 
```

如果通过 Docker 部署，那么查看日志的命令为 ``docker exec <container_name> <command>``

数采引擎日志查看命令为

```shell
 docker exec neuronex tail -f /opt/neuronex/software/neuron/logs/neuron.log
```

## NeuronEX 异常退出日志

NeuronEX 异常退出时，会打印异常退出日志，用户可以通过查看异常退出日志，了解 NeuronEX 异常退出的原因。或者将日志信息提供给 EMQ 技术支持团队，以便快速定位问题。

- NeuronEX Docker 部署异常退出日志查看

```shell
docker logs <容器名>
```

```shell
admin@192 ~ % docker logs  neuronex-test
time="2024-12-16T08:57:55Z" level=info msg="trigger eKuiper with command: GOTRACEBACK=crash KUIPER__BASIC__RESTIP=127.0.0.1 KUIPER__BASIC__PROMETHEUS=true KUIPER__BASIC__PROMETHEUSPORT=9081 /opt/neuronex/software/ekuiper/bin/kuiperd -loadFileType absolute -etc /opt/neuronex/software/ekuiper/etc -data /opt/neuronex/data/ekuiper/data -log /opt/neuronex/software/ekuiper/log -plugins /opt/neuronex/data/ekuiper/plugins\n" file="process_control/process.go:87" func=monitor/process_control.get_ekuiper_Process
time="2024-12-16T08:57:55Z" level=info msg="trigger NeuronEX with command: /opt/neuronex/bin/neuronex alone\n" file="process_control/process.go:67" func=monitor/process_control.get_neuronex_Process
time="2024-12-16T08:57:55Z" level=info msg="trigger neuron with command: cd /opt/neuronex/software/neuron/ && ./neuron --log --disable_auth\n\n" file="process_control/process.go:98" func=monitor/process_control.get_neuron_Process
time="2024-12-16T08:57:56Z" level=info msg="set server total memory 2082197504 success" file="memory/mem.go:40"
time="2024-12-16T08:57:56Z" level=info msg="Set config 'kuiper.basic.prometheusport' to '9081' by environment variable" file="conf/load.go:141"
time="2024-12-16T08:57:56Z" level=info msg="Set config 'kuiper.basic.prometheus' to 'true' by environment variable" file="conf/load.go:141"
time="2024-12-16T08:57:56Z" level=info msg="Set config 'kuiper.basic.restip' to '127.0.0.1' by environment variable" file="conf/load.go:141"
```

- NeuronEX RPM/DEB 部署异常退出日志查看

```shell
journalctl -xeu neuronex
```

```shell
Dec 26 23:02:50 middleware02 bash[14275]: time="2024-12-26T23:02:50+08:00" level=info msg="trigger NeuronEX with command: /opt/neuronex/bin/neuronex alone\n" file="process_control/process.go:67" func=monitor/process_control.get_neuronex_Process
Dec 26 23:02:50 middleware02 bash[14275]: time="2024-12-26T23:02:50+08:00" level=info msg="trigger eKuiper with command: GOTRACEBACK=crash KUIPER__BASIC__RESTIP=127.0.0.1 KUIPER__BASIC__PROMETHEUS=true KUIPER__BASIC__PROMETHEUSPORT=9081 /opt/neuronex/software/ekuiper/bin/kuiperd -loadFileType absolute -etc /opt/neuronex/software/ekuiper/etc -data /opt/neuronex/data/ekuiper/data -log /opt/neuronex/software/ekuiper/log -plugins /opt/neuronex/data/ekuiper/plugins\n" file="process_control/process.go:87" func=monitor/process_control.get_ekuiper_Process
Dec 26 23:02:50 middleware02 bash[14275]: time="2024-12-26T23:02:50+08:00" level=info msg="trigger neuron with command: cd /opt/neuronex/software/neuron/ && ./neuron --log --disable_auth\n\n" file="process_control/process.go:98" func=monitor/process_control.get_neuron_Process
Dec 26 23:02:51 middleware02 bash[14275]: time="2024-12-26T23:02:51+08:00" level=info msg="set server total memory 33739272192 success" file="memory/mem.go:40"
Dec 26 23:02:51 middleware02 bash[14275]: time="2024-12-26T23:02:51+08:00" level=info msg="Set config 'kuiper.basic.prometheus' to 'true' by environment variable" file="conf/load.go:141"
Dec 26 23:02:51 middleware02 bash[14275]: time="2024-12-26T23:02:51+08:00" level=info msg="Set config 'kuiper.basic.prometheusport' to '9081' by environment variable" file="conf/load.go:141"
Dec 26 23:02:51 middleware02 bash[14275]: time="2024-12-26T23:02:51+08:00" level=info msg="Set config 'kuiper.basic.restip' to '127.0.0.1' by environment variable" file="conf/load.go:141"
Dec 27 00:59:38 middleware02 bash[14275]: panic: runtime error: slice bounds out of range [71:63]
Dec 27 00:59:38 middleware02 bash[14275]: goroutine 4770 [running]:
Dec 27 00:59:38 middleware02 bash[14275]: github.com/emqx/neuronex-go/logic/monitor/alert/rule_processor.(*StrQueue).RemoveHalf(...)
```
