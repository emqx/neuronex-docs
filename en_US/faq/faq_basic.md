# FAQ 

## What systems does NeuronEX support?

NeuronEX supports the following operating systems: CentOS 7.0 and above, Ubuntu 18.04 and above, and other Linux kernel-based operating systems.

If it is a Windows operating system, the following installation methods are supported:

- Use Virtual Box to install Linux system

- Use WSL to install Linux system

- Use Docker Desktop to install and run NeuronEX in Docker mode

If it is CentOS 7.0 and systemctl is used to start and stop the service, the RPM packages released in 3.5.0 and later are no longer applicable. Users need to download the tar.gz installation package, decompress it and run the ./bin/neuronex install command to use systemctl to start and stop the service. When uninstalling the software, you need to run the ./bin/neuronex uninstall command.

## Does NeuronEX support Android system?

Not supported.

## Does NeuronEX support Docker deployment?

NeuronEX supports Docker deployment. NeuronEX provides two types of Docker installation packages:

- neuronex:3.x.x
    
    The `neuronex:3.x.x` type installation package integrates the Python runtime environment. If you need to use Python algorithm plugins, please use this type of image.

- neuronex:3.x.x-slim
    
    The `neuronex:3.x.x-slim` type installation package does not integrate the Python runtime environment. The installation package size is smaller. If you do not use Python-related algorithm plugins, please use this type of image.

## Does NeuronEX support Kubernetes, KubeEdge, and K3S deployment?

NeuronEX supports Kubernetes, KubeEdge, and K3S deployment.

## Does NeuronEX support cluster deployment?

NeuronEX does not currently support cluster deployment. High availability and fault tolerance of NeuronEX services can be guaranteed through Kubernetes, K3S, etc.

## What hardware configuration is required for software installation?

The following table lists the minimum hardware requirements for NeuronEX to complete data collection at different numbers of data tags (using NeuronEX data processing functions will consume additional system resources).

| Number of data tags | Recommended minimum memory | Hardware architecture | Notes |
| --------------------- | --------- | ---------------------------------| --------------------------------- |
| 100 tags | 128M | 64-bit ARM and 64-bit x86 architecture | Raspberry Pi 3 |
| 1,000 tags | 256M | 64-bit ARM and 64-bit x86 architecture | Raspberry Pi 4 |
| 10,000 tags | 512M | 64-bit ARM and 64-bit x86 architecture | Industrial PC, etc. |
| More than 10,000 tags | 1G | 64-bit x86 architecture | Powerful Industrial PC, Server, etc. |

## Is there a free version of NeuronEX?

After NeuronEX is downloaded from the official website and installed, a free license of 30 points (30 data tags) is provided by default. You can use NeuronEX without installing an EMQ business license, and the functional scope includes all data collection drivers (except CNC drivers).

## How to access NeuronEX after installation?

After NeuronEX is installed, a default access address is provided by default: `http://localhost:8085`, which you can access through a browser.

The default login username and password are: `admin/0000`.

## Which drivers does the software support for data collection?

Please refer to [Data Collection Plugin List](../introduction/plugin-list/plugin-list.md)

## What is the minimum collection interval for data collection?

The minimum collection interval of NeuronEX is `100ms`. If you need a lower interval than `100ms`, you can contact EMQ Business for customization.

## Does NeuronEX support device control?

Yes. NeuronEX supports device control, provides several device control methods such as [RestAPI](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/rw), [MQTT](../configuration/north-apps/mqtt/api.md#写-tag), [edge computing control](../streaming-processing/sink/neuron.md), etc., and supports intelligent control decision-making of industrial equipment.

## Does NeuronEX support self-developed drivers?

Yes. NeuronEX can be divided into a core framework and multiple driver modules. Southbound and northbound plugin modules can be added and deleted dynamically. NeuronEX provides a driver development SDK based on C language.

## How many southbound drivers can be collected at the same time?

If the hardware performance is sufficient, it is recommended that no more than 100 southbound drivers be collected.

## How many data tags can be collected at the same time?

If the hardware performance is sufficient, it is recommended that no more than 100000 data tags be collected. If the number of data tags exceeds 100000, multiple NeuronEX instances can be deployed on a single server through Docker.

## Does NeuronEX support the collection of Siemens 200, 200smartPLC, and 1500?

Supports data collection of the full range of Siemens PLCs.

## Does NeuronEX support offline data caching?

Yes. NeuronEX supports northbound MQTT data forwarding. When the network is interrupted, the collected data will be cached locally, and the cached data will be uploaded to the cloud after the network is restored.

## Does NeuronEX support storing data locally?

Yes. NeuronEX can store data in a local database through data processing functions. The supported database types include MySQL, PostgreSQL, SQLite, SQLServer, Oracle, InfluxDB v1, InfluxDB v2, etc. For details, please refer to [Store Data in SQL](../streaming-processing/sink/sql.md), [Store Data in InfluxDB v1](../streaming-processing/sink/influx.md), [Store Data in InfluxDB v2](../streaming-processing/sink/influx2.md).

## How to forward the data collected by the Modbus TCP driver to the MQTT server?

On the **Data Collection**->**Northbound Application** page, add MQTT plugin, click `add subscription` button , and add the collection group of the Modbus TCP driver.

## How to quickly migrate the configuration after the NeuronEX version is upgraded?

Overwrite the `data` folder in the original NeuronEX `/opt/neuronex/` directory with the `data` folder in the new NeuronEX `/opt/neuronex/` directory, and then restart NeuronEX.

## Does NeuronEX support video?

NeuronEX supports collecting, analyzing, storing, and forwarding picture frames in RSTP video streams.

## Does NeuronEX support obtaining database data?

Yes. NeuronEX supports collecting, analyzing, storing, and forwarding data in databases such as MySQL, SQL Server, PostgreSQL, and SQLite. Please refer to [SQL](../streaming-processing/sql.md).

## Does NeuronEX support obtaining file data?

Yes. NeuronEX supports collecting, analyzing, storing, and forwarding data in txt, csv, json, and other format files. Please refer to [File](../streaming-processing/file.md).

## Does NeuronEX support AI and ML integrated analysis?

Yes. NeuronEX supports user-defined function extension and AI algorithm integration, providing intelligent data analysis capabilities.

