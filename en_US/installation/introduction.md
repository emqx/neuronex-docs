# Install NeuronEX

NeuronEX supports 64-bit ARM and 64-bit X86 architectures on Linux-based operating systems. It provides the following installation package formats:

- tar package: Suitable for all Linux operating systems.
- zip package: Suitable for all Linux operating systems.
<!-- - Debian package (.deb) format: Used for Debian and Ubuntu Linux-based operating systems (coming soon).
- Redhat Package Manager (.rpm) format: Suitable for RedHat and CentOS Linux-based operating systems (coming soon). -->

## Download the installation package

Neuron software packages can be downloaded from the [Website](https://www.emqx.com/en/try?product=neuronex). 

## The supported operating systems

The NeuronEX supports the following operating systems:

- CentOS 8.0 and above, Ubuntu 20.04 and above, and other operating systems based on the Linux kernel.

:::tip
For Windows operating systems, the following installation methods are supported:

- Install the corresponding Linux system using Virtual Box.
- Install the corresponding Linux system using WSL (Windows Subsystem for Linux).
- Use Docker Desktop to install and run NeuronEX in a Dockerized environment.
:::

## Hardware Requirements

NeuronEX supports running on x86, ARM and other hardware architectures as well as container deployment, such as Kubernetes, KubeEdge, etc. It can be deployed on various hardware in industrial settings, including **industrial control machines**, **gateway devices**, and **servers**. On devices with limited hardware resources, it can also achieve data collection of 100 ms. On servers with sufficient hardware resources,  NeuronEX can fully utilize multi-core CPUs to simultaneously perform high-frequency data collection and control tag writing for tens of thousands of data tags.

The following table lists the hardware conditions required for the minimum demand of NeuronEX at different number of tags.

|Tag Limits|Minimum Memory Recommendation|Hardware Architecture|Remarks|
| :-------------------- | :------------------------------ | :---------------------------------- | :----------------------------------- |
| 100 tags    | 128M memory | 64-bit ARM and 64-bit x86 architectures | Raspberry Pi 3 |
| 1,000 tags  | 256M memory | 64-bit ARM and 64-bit x86 architectures | Raspberry Pi 4 |
| 10,000 tags | 512M memory | 64-bit ARM and 64-bit x86 architectures | Industrial PC, etc |
| More than 10,000 tags | 1G memory | 64-bit x86 architectures | Powerful Industrial PC, Server, etc |

:::tip
NeuronEX has no upper limitation on the number of tags. It depends on the allocated CPU and memory resources. The following figures are the results of Neuron performance test for your reference and these benchmark results are still not the upper limits. A more powerful server can be used for more tags.

Platform                         : Intel(R) Xeon(R) Gold 6266C@3.00GHz<br>
Memory                           : 4G<br>
Architecture                     : x86<br>
OS Support                       : Ubuntu 20.04<br>
No. of connections               : 1000 connections<br>
No. of tags for each connection  : 300 tags<br>
Total tags                       : 300,000 tags<br>
Memory Usage                     : 300M<br>
CPU Usage                        : 90%<br>

:::

<!-- ## Debian 软件包

| Download files                 | Architecture  |
| ------------------------------ | ------------- |
| neuronex-x.y.z-linux-amd64.deb | AMD64         |
| neuronex-x.y.z-linux-armhf.deb | ARMHF         |
| neuronex-x.y.z-linux-arm64.deb | ARM64         |


## Redhat 软件包管理工具

| Download files                 | Architecture  |
| ------------------------------ | ------------- |
| neuronex-x.y.z-linux-amd64.rpm | AMD64         |
| neuronex-x.y.z-linux-armhf.rpm | ARMHF         |
| neuronex-x.y.z-linux-arm64.rpm | ARM64         |


## Tape Archive（tar）

| Download files                 | Architecture  |
| ------------------------------ | ------------- |
| neuronex-x.y.z-linux-amd64.rpm | AMD64         |
| neuronex-x.y.z-linux-armhf.rpm | ARMHF         |
| neuronex-x.y.z-linux-arm64.rpm | ARM64         | -->

## Docker Image

| Download files               | Architecture   |
| ---------------------------- | -------------- |
| emqx/neuronex:x.y.z          | Docker         |
| emqx/neuronex:x.y.z-python   | Docker         |

## Version Number Explanation

- x is the major release number: the change in this number means that the software architecture has changed. Therefore, upgrading to a major release does not guarantee compatibility with the previous major release.

- y is the minor release number: the change in this number introduces some new features. Upgrading to a minor release would ensure backward compatibility.

- z is the maintenance release number: this new release number only contains patches, bug fixes, etc.
