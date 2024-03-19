# Log Management


NeuronEX prints logs to the local file system by default and provides a one-click download button in the Web to obtain the packaged logs.
In addition, it also supports sending logs to the user's own SYSLOG server through the SYSLOG protocol to meet the user's long-term log storage needs.
Based on the user scenario, here are examples of how to obtain logs.

## Debug log of node

NeuronEX supports the debug log of a data collection node. There is a `DEBUG log` button of each node, as shown in the figure below. Click to set the log level to debug.
![debug](./assets/neuron_node_debug_en.png)

At this time, the node starts to store debug logs. Users can choose to download the logs by the `Download Driver Log` button and view the logs of the corresponding node. 

::: tip
When enabling the node debug log, a lot of redundant log will be printed and it will have a certain impact on performance. When it is not needed, it must be closed in time.
:::

## Log Management

NeuronEX supports the function of one-click download of all log files on the web page. After logging in to NeuronEX, click **Administration** -> **Logs** on the left side of the page to enter the log management page.
![image](./assets/log_manage_en.png)

In the log download section, click the **Download Data Collection Engine Log** button to download the log of the data collection module (Neuron).
If the existing log information cannot meet the needs, in the log configuration section, you can dynamically set the log level. The Debug level will print a large amount of debugging information, which is helpful for engineers to debug and analyze program failures. As the log level increases, the information printed by the log will The less.
Note that this log level setting will not be persistent and will be restored to the default log level after NeuronEX is restarted. Printing too many logs will have a certain impact on performance, so it needs to be adjusted to a higher level in time.

### Data Collection Engine Log

Let me explain the data collection engine log mentioned earlier. Its function is to package the /opt/neuronex/software/neuron/logs folder into a neuron_debug.tar.gz file and download it to the web page. The file contains all created driver and neuron log files. An example of the file directory level is as shown in the figure below.
<img src="./assets/neuron_logs.png" alt="neuron_logs" style="zoom:50%;" />

* data-stream-processing.log：Data processing configuration
* dlt645.log： Northbound application configuration
* modbus-plus-tcp.log：Southbound device configuration
* neuron.log：Neuron Log

## Syslog upload

NeuronEX supports sending logs to the designated log receiving server through the SYSLOG protocol, and the configuration location is the log upload section.
This configuration is persisted and takes precedence over the [configuration file](./conf-management.md#log) syslogForward section.


The following parameters need to be configured
* Button to turn this function on or off
* SYSLOG service address, IP address or domain name can be used, only one address is supported
* Network protocol type, currently only supports udp
* Upload log level, the lower the level setting, the more information

## View logs in the backend

n addition to downloading logs on the front end, users can also observe log output in real time in the background.

The command to view the data mining engine log is

```shell
 tail -f tail -f /opt/neuronex/software/neuron/logs/neuron.log
```

The command to view the log of a southbound node of the data mining engine is

```shell
 tail -f tail -f modbus-plus-tcp.log
```

The command to view the data processing engine log is

```shell
  tail -f /opt/neuronex/software/ekuiper/log/stream.log
```

The NeuronEX log viewing command is

```shell
  tail -f /opt/neuronex/log/neuronex.log 
```

If deployed through Docker, the command to view the log is ``docker exec <container_name> <command>``

The command to view the data mining engine log is

```shell
 docker exec neuronex tail -f /opt/neuronex/software/neuron/logs/neuron.log
```
