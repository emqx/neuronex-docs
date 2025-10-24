# FAQ 

## What systems does EMQX Neuron support?

EMQX Neuron (formerly NeuronEX) supports the following operating systems: CentOS 8.0 and above, Ubuntu 20.04 and above, Debian 11 and above.

If it is a Windows operating system, the following installation methods are supported:

- Use Virtual Box to install Linux system

- Use WSL to install Linux system

- Use Docker Desktop to install and run EMQX Neuron in Docker mode

## Does EMQX Neuron support Android system?

Not supported.

## Does EMQX Neuron support Docker deployment?

EMQX Neuron supports Docker deployment. EMQX Neuron provides two types of Docker installation packages:

- neuronex:3.x.x
    
    The `neuronex:3.x.x` type installation package integrates the Python runtime environment. If you need to use Python algorithm plugins, please use this type of image.

- neuronex:3.x.x-slim
    
    The `neuronex:3.x.x-slim` type installation package does not integrate the Python runtime environment. The installation package size is smaller. If you do not use Python-related algorithm plugins, please use this type of image.

## Does EMQX Neuron support Kubernetes, KubeEdge, and K3S deployment?

EMQX Neuron supports Kubernetes, KubeEdge, and K3S deployment.

## Does EMQX Neuron support cluster deployment?

EMQX Neuron does not currently support cluster deployment. High availability and fault tolerance of EMQX Neuron services can be guaranteed through Kubernetes, K3S, etc.

## What hardware configuration is required for software installation?

The following table lists the minimum hardware requirements for EMQX Neuron to complete data collection at different numbers of data tags (using EMQX Neuron data processing functions will consume additional system resources).

| Number of data tags | Recommended minimum memory | Hardware architecture | Notes |
| --------------------- | --------- | ---------------------------------| --------------------------------- |
| 100 tags | 128M | 64-bit ARM and 64-bit x86 architecture | Raspberry Pi 3 |
| 1,000 tags | 256M | 64-bit ARM and 64-bit x86 architecture | Raspberry Pi 4 |
| 10,000 tags | 512M | 64-bit ARM and 64-bit x86 architecture | Industrial PC, etc. |
| More than 10,000 tags | 1G | 64-bit x86 architecture | Powerful Industrial PC, Server, etc. |

## Is there a free version of EMQX Neuron?

After EMQX Neuron is downloaded from the official website and installed, a free license of 30 points (30 data tags) is provided by default. You can use EMQX Neuron without installing an EMQ business license, and the functional scope includes all data collection drivers (except CNC drivers).

## How to access EMQX Neuron after installation?

After EMQX Neuron is installed, a default access address is provided by default: `http://localhost:8085`, which you can access through a browser.

The default login username and password are: `admin/0000`.

## Which drivers does the software support for data collection?

Please refer to [Data Collection Plugin List](../introduction/plugin-list/plugin-list.md)

## What is the minimum collection interval for data collection?

The minimum collection interval of EMQX Neuron is `100ms`. If you need a lower interval than `100ms`, you can contact EMQ Business for customization.

## Does EMQX Neuron support device control?

Yes. EMQX Neuron supports device control, provides several device control methods such as [RestAPI](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/rw), [MQTT](../configuration/north-apps/mqtt/api.md#写-tag), [edge computing control](../streaming-processing/sink/neuron.md), etc., and supports intelligent control decision-making of industrial equipment.

## Does EMQX Neuron support self-developed drivers?

Yes. EMQX Neuron can be divided into a core framework and multiple driver modules. Southbound and northbound plugin modules can be added and deleted dynamically. EMQX Neuron provides a driver development SDK based on C language.

## How many southbound drivers can be collected at the same time?

If the hardware performance is sufficient, it is recommended that no more than 100 southbound drivers be collected.

## How many data tags can be collected at the same time?

If the hardware performance is sufficient, it is recommended that no more than 100000 data tags be collected. If the number of data tags exceeds 100000, multiple EMQX Neuron instances can be deployed on a single server through Docker.

## Does EMQX Neuron support the collection of Siemens 200, 200smartPLC, and 1500?

Supports data collection of the full range of Siemens PLCs.

## Does EMQX Neuron support offline data caching?

Yes. EMQX Neuron supports northbound MQTT data forwarding. When the network is interrupted, the collected data will be cached locally, and the cached data will be uploaded to the cloud after the network is restored.

## Does EMQX Neuron support storing data locally?

Yes. EMQX Neuron can store data in a local database through data processing functions. The supported database types include MySQL, PostgreSQL, SQLite, SQLServer, Oracle, InfluxDB v1, InfluxDB v2, etc. For details, please refer to [Store Data in SQL](../streaming-processing/sink/sql.md), [Store Data in InfluxDB v1](../streaming-processing/sink/influx.md), [Store Data in InfluxDB v2](../streaming-processing/sink/influx2.md).

## How to forward the data collected by the Modbus TCP driver to the MQTT server?

On the **Data Collection**->**Northbound Application** page, add MQTT plugin, click `add subscription` button , and add the collection group of the Modbus TCP driver.

## How to quickly migrate the configuration after the EMQX Neuron version is upgraded?

Overwrite the `data` folder in the original EMQX Neuron `/opt/neuronex/` directory with the `data` folder in the new EMQX Neuron `/opt/neuronex/` directory, and then restart EMQX Neuron.

## Does EMQX Neuron support video?

EMQX Neuron supports collecting, analyzing, storing, and forwarding picture frames in RSTP video streams.

## Does EMQX Neuron support obtaining database data?

Yes. EMQX Neuron supports collecting, analyzing, storing, and forwarding data in databases such as MySQL, SQL Server, PostgreSQL, and SQLite. Please refer to [SQL](../streaming-processing/sql.md).

## Does EMQX Neuron support obtaining file data?

Yes. EMQX Neuron supports collecting, analyzing, storing, and forwarding data in txt, csv, json, and other format files. Please refer to [File](../streaming-processing/file.md).

## Does EMQX Neuron support AI and ML integrated analysis?

Yes. EMQX Neuron supports user-defined function extension and AI algorithm integration, providing intelligent data analysis capabilities.

## After starting EMQX Neuron on a small gateway, the data collection configuration may be lost?

EMQX Neuron core communication relies on unix socket. Under heavy load, the default configuration of the operating system will cause data packet loss. It is recommended to set the operating system configuration item `net.unix.max_dgram_qlen` to 1024. The setting method is as follows:

Add `net.unix.max_dgram_qlen = 1024` in the **/etc/sysctl.conf** file, and then execute the command `sysctl -p`