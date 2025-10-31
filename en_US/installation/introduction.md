# Install EMQX Neuron

EMQX Neuron (formerly NeuronEX) supports 32-bit/64-bit ARM and 64-bit X86 architectures on Linux-based operating systems. It provides the following installation package formats:

- tar package: Suitable for all Linux operating systems.
- Debian package (.deb) format: Used for Debian and Ubuntu Linux-based operating systems.
- Redhat Package Manager (.rpm) format: Suitable for RedHat and CentOS Linux-based operating systems.

## Download the installation package

Neuron software packages can be downloaded from the [Website](https://www.emqx.com/en/try?tab=self-managed). 

## The supported operating systems

EMQX Neuron supports the following operating systems:

- CentOS 8.0 and above, Ubuntu 20.04 and above, Debian 11 and above.

:::tip
For Windows operating systems, the following installation methods are supported:

- Install the corresponding Linux system using Virtual Box.
- Install the corresponding Linux system using WSL (Windows Subsystem for Linux).
- Use Docker Desktop to install and run EMQX Neuron in a Dockerized environment.
:::

## Hardware Requirements

EMQX Neuron supports running on x86, ARM and other hardware architectures as well as container deployment, such as Kubernetes, KubeEdge, etc. It can be deployed on various hardware in industrial settings, including **industrial control machines**, **gateway devices**, and **servers**. On devices with limited hardware resources, it can also achieve data collection of 100 ms. On servers with sufficient hardware resources, EMQX Neuron can fully utilize multi-core CPUs to simultaneously perform high-frequency data collection and control tag writing for tens of thousands of data tags.

**The following table lists the hardware conditions required for the minimum demand of EMQX Neuron at different number of tags.（Processing and storing collected data, as well as using AI features, will consume additional system resources.）**

|Tag Limits             | Minimum Memory Recommendation| Hardware Architecture  | Remarks                             |
| :-------------------- | :---------  | :-------------------------------------- | :---------------------------------- |
| 100 tags              | 128M memory | 64-bit ARM and 64-bit x86 architectures | Raspberry Pi 3                      |
| 1,000 tags            | 256M memory | 64-bit ARM and 64-bit x86 architectures | Raspberry Pi 4                      |
| 10,000 tags           | 512M memory | 64-bit ARM and 64-bit x86 architectures | Industrial PC, etc                  |
| More than 10,000 tags | 1G memory   | 64-bit x86 architectures                | Powerful Industrial PC, Server, etc |

:::tip
EMQX Neuron has no upper limitation on the number of tags. It depends on the allocated CPU and memory resources. The following figures are the results of Neuron performance test for your reference and these benchmark results are still not the upper limits. A more powerful server can be used for more tags.

|Platform                         | Intel(R) Xeon(R) Gold 6266C@3.00GHz<br>|
| :-------------------- | :---------  |
|Memory                           | 4G<br>  |
|Architecture                     | x86<br>  |
|OS Support                       | Ubuntu 20.04<br>  |
|No. of Connections               | 500 connections of Modbus TCP driver<br>  |
|No. of Tags for Each Connection  | 30 tags<br>  |
|Collection Interval              | 1 second<br>  |
|Total Tags                       | 15,000 tags<br>  |
|Memory Usage                     | 300M<br>  |
|CPU Usage                        | 0.9 * 1 core<br>  |

:::

:::tip
Provided the hardware performance is sufficient, it is recommended that the total number of data tags collected should not exceed **100,000**, and the recommended configuration should not exceed **100 southbound drivers**. 

If the number of data tags or southbound drivers exceeds the above recommended configuration, multiple EMQX Neuron instances can be deployed to meet the requirements.

:::

## Debian 

| Download files                 | Architecture  |
| ------------------------------ | ------------- |
| neuronex-x.y.z-linux-amd64.deb | AMD64         |
| neuronex-x.y.z-linux-arm.deb   | ARM           |
| neuronex-x.y.z-linux-arm64.deb | ARM           |


## Redhat

| Download files                 | Architecture  |
| ------------------------------ | ------------- |
| neuronex-x.y.z-linux-amd64.rpm | AMD64         |
| neuronex-x.y.z-linux-arm64.rpm | ARM           |


## Tape Archive（tar）

| Download files                     | Architecture  |
| ---------------------------------- | ------------- |
| neuronex-x.y.z-linux-amd64.tar.gz  | AMD64         |
| neuronex-x.y.z-linux-armhf.tar.gz  | ARM           |
| neuronex-x.y.z-linux-arm64.tar.gz  | ARM           |

## Docker Image

| Download files               | Architecture   |
| ---------------------------- | -------------- |
| emqx/neuronex:x.y.z          | Docker         |
| emqx/neuronex:x.y.z-slim     | Docker         |

## Version Number Explanation

- x is the major release number: the change in this number means that the software architecture has changed. Therefore, upgrading to a major release does not guarantee compatibility with the previous major release.

- y is the minor release number: the change in this number introduces some new features. Upgrading to a minor release would ensure backward compatibility.

- z is the maintenance release number: this new release number only contains patches, bug fixes, etc.
