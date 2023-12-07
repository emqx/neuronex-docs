# Product Overview

NeuronEX is software designed for the industrial sector, specializing in device data collection and edge intelligent analysis. It is primarily deployed in industrial settings, facilitating industrial protocol data collection, industrial system data integration, edge data filtering and analysis, AI algorithm integration, and integration with  IIoT platforms. It provides low-latency data access management and intelligent analytical services for industrial scenarios. It helps users quickly understand business trends, improve operational efficiency, and achieve sustainability.

## Product Advantages

- Rich Protocol Integration

    Diverse industrial protocols cater to various industrial scenarios, enabling real-time data collection and unified access for equipment data such as PLCs, CNC machines, robots, Scada systems, and smart sensors.

- Low-Latency Data Processing

    Designed specifically for industrial fields, NeuronEX offers low-latency data access and processing, facilitating rapid data transmission between multiple systems for real-time monitoring and decision-making.


- Lightweight and Flexible Deployment
    
    NeuronEX is lightweight, low-memory, and supports multiple CPU architectures. It can be deployed in Docker or Kubernetes containers.

- Stream Processing and Analysis

    With robust stream processing and analytical capabilities, NeuronEX enables functions like data filtering, cleaning, standardization, analytical inspections, and real-time alerts.

- AI/ML Analysis
    
    NeuronEX supports user-defined function extensions and AI algorithm integration, providing intelligent data analysis capabilities.

- Platform Integration
        
    NeuronEX integrates with MQTT, SparkplugB, HTTP, and other protocols to integrate data into local data centers, IIoT platforms, or cloud services.

## Function List

| <div style="width:40pt">Function</div> | Description    | <div style="width:140pt">Function list</div>                       |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Data Collection                           | NeuronEX supports one-stop device connection, data collection, device reverse control, MQTT protocol conversion, and southbound data collection monitoring for dozens of industrial protocols, giving industrial equipment critical interconnection capabilities in the Industry 4.0 era.| [Create southbound driver](./configuration/south-devices/south-devices.md)<br /><br />[Connect southbound device](./configuration/groups-tags/groups-tags.md) <br /><br />[Data monitoring](./admin/monitoring.md)|
| Data forwarding                           | After completing the collection of device data, NeuronEX supports users to forward the data to the cloud platform or external processing engine through northbound applications. | [create northbound application](./configuration/north-apps/north-apps.md)<br /><br />[subscribe southbound data](./configuration/subscription.md) |
| Data Processing                         | NeuronEX integrates a stream processing engine to provide low-latency data processing and analysis, and can transfer data between multiple systems more quickly. Combined with AI/ML algorithms, it can achieve intelligent decision-making and control. In addition, edge-end analysis can also perform data preprocessing and edge computing to reduce cloud-edge communication load and back-end storage pressure. | [Source Connectors](./streaming-processing/source.md)<br /><br />[Rules](./streaming-processing/rules.md)<br /><br />[Sink Connectors](./streaming-processing/sink/sink.md)<br /><br />[Extensions](./streaming-processing/extension.md) |
| System Management                           | NeuronEX provides a one-stop operation, maintenance and management platform. You can perform system configuration management, log download, view system information and other operations through the web page. | [Log Management](./admin/log-management.md)<br /><br />[Data Statistics](./admin/data-statistics.md)<br /><br />[Conf Management](./admin/conf-management.md) |
