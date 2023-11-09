# 管理日志


NeuronEX 默认将日志打印到本地文件系统中，并在 Web 中提供一键下载按钮获取打包好的日志。
除此之外还支持将日志通过 SYSLOG 协议发送到用户自己的 SYSLOG 服务器中，满足用户长期保存日志需求。
根据用户场景，现举例说明如何获取日志。



## 通过 Web 获取日志

NeuronEX 支持在 web 页面一键下载所有日志文件的功能。登录 NeuronEX 后，点击页面左侧的 **管理** -> **日志**， 进入日志管理界面。
![如图所示](./assets/log_manage_zh.jpg)

在日志下载部分，点击 **下载数采引擎日志** 按钮，即可下载数据采集引擎模块的日志。
如果现有日志信息不能满足需要， 在日志配置部分，可以动态设置日志级别，其中 Debug 级别将打印大量调试信息，有助于工程师调试分析程序故障，随着日志级别的升高，日志打印的信息越少。
注意此日志级别设置不会持久化，在 NeuronEX 重启后将恢复默认日志级别, 日志打印过多会对性能有一定影响，因此需要及时调整到较高级别。


### 数采引擎日志

针对前面提到的数据采集引擎日志做一下说明，其完成的功能是把 /opt/neuronex/software/neuron/logs 的文件夹打包成 neuron_debug.tar.gz 文件并下载到网页上。文件包含所有已创建的驱动及 neuron 的日志文件，文件目录级别示例，如下图所示。

<img src="./assets/neuron_logs.png" alt="neuron_logs" style="zoom:50%;" />

* data-stream-processing.log：数据处理配置
* dlt645.log：北向应用配置
* modbus-plus-tcp.log：南向设备配置
* neuron.log：Neuron 日志

#### 打印单节点的 debug 日志

NeuronEX 支持设置打印某个节点的 debug 日志，在每个节点的 `更多` 操作按键中都有一个 `DEBUG 日志` 的操作按键，如下图所示，点击即可将日志级别设置为 debug。
![调试节点](./assets/neuron_node_debug_zh.jpg)

此时，该节点开始打印 debug 日志，用户可选择在十分钟后下载日志，查看对应节点的日志，也可以选择在  /opt/neuronex/software/neuron/logs 下实时查看节点打印的日志。

::: tip
打印节点 debug 日志时会打印很多冗余信息并对性能产生一定影响，当不需要时，要及时关闭。
:::

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

数据处理引擎日志查看命令为

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


## SYSLOG 日志上传

NeuronEX 支持通过 SYSLOG 协议发送日志到指定日志接收服务器，配置位置为日志上传部分。
此配置会持久化并且优先级高于[配置文件](./conf-management.md#log) syslogForward 部分。

![如图所示](./assets/log_manage_zh.jpg)

需配置以下参数
* 此功能开启与否按钮
* SYSLOG 服务地址，IP 地址、域名均可，仅支持一个地址
* 网络协议类型，目前仅支持 udp
* 上传日志等级，等级设置越低，信息越多