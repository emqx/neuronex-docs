# Product Overview

EMQX Neuron (formerly NeuronEX) is a powerful Industrial Connectivity Gateway designed for digital transformation in industrial sectors. Deployed in manufacturing, energy, building, and other industrial sites, its core mission is to bridge the gap between the physical and digital worlds, enabling:

- **Massive Device Connectivity and Data Ingestion**: It unifies data collection from OT devices like PLCs, CNCs, robots, instrumentation, and various industrial systems through extensive protocol support.
- **Edge Intelligent Processing and Analysis**: At the edge, close to the data source, it performs real-time data filtering, cleansing, aggregation, computation, and AI-driven analysis, transforming raw data into valuable information.
- **Seamless Multi-system Integration and Linkage**: It efficiently and securely connects processed data to industrial internet platforms, cloud services, and enterprise applications (such as MES, SCADA), facilitating data flow and business collaboration.

EMQX Neuron breaks down the technical barriers between OT and IT, providing an end-to-end solution for industrial scenarios—from data collection, processing, and analysis to integration. It is a core component for enterprises building stable, efficient, and intelligent edge data infrastructure.

## Product Advantages

- **Rich Protocol Integration**

    Diverse industrial protocols cater to various industrial scenarios, enabling real-time data collection and unified access for equipment data such as PLCs, CNC machines, robots, Scada systems, and smart sensors.

- **Low-Latency Data Processing**

    Designed specifically for industrial fields, EMQX Neuron offers low-latency data access and processing, facilitating rapid data transmission between multiple systems for real-time monitoring and decision-making.


- **Lightweight and Flexible Deployment**
    
    EMQX Neuron is lightweight, low-memory, and supports multiple CPU architectures. It can be deployed in Docker or Kubernetes containers.

- **Comprehensive Data Analysis Capabilities**
    - **Real-time Analytics**: A powerful built-in stream computing engine offers over 160 functions to support extraction, transformation, filtering, and aggregation of real-time data streams.
    - **Historical Insights**: The new "Data Explorer" feature, built upon Datalayers (a built-in time-series database), provides a unified data analysis interface and an intelligent SQL editor. This allows users to easily query and explore historical data stored at the edge.
    - **Visual Monitoring**: The newly added "Dashboard" visualization feature enables users to intuitively display key real-time and historical data in chart form through simple drag-and-drop configurations, creating customized edge monitoring centers.

- **AI/ML Analysis**
    
    EMQX Neuron supports user-defined function extensions and AI/ML algorithm integration. The newly introduced AI Data Analysis Assistant allows users to generate SQL queries through natural language interaction and intelligently refine them based on execution feedback. This lowers the barrier to data analysis and accelerates insight generation.

- **Platform Integration**
        
    EMQX Neuron integrates with MQTT, SparkplugB, HTTP, and other protocols to integrate data into local data centers, IIoT platforms, or cloud services.

## Function List

| <div style="width:40pt">Function</div> | Description    | <div style="width:140pt">Function list</div>                       |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Data Collection                           | EMQX Neuron supports one-stop device connection, data collection, device reverse control, MQTT protocol conversion, and southbound data collection monitoring for dozens of industrial protocols, giving industrial equipment critical interconnection capabilities in the Industry 4.0 era.| [Create southbound driver](./configuration/south-devices/south-devices.md)<br /><br />[Connect southbound device](./configuration/groups-tags/groups-tags.md) <br /><br />[Data monitoring](./admin/monitoring.md)|
| Data forwarding                           | After completing the collection of device data, EMQX Neuron supports users to forward the data to the cloud platform or external processing engine through northbound applications. | [create northbound application](./configuration/north-apps/north-apps.md)<br /><br />[subscribe southbound data](./configuration/subscription.md) |
| Data Processing                         | EMQX Neuron integrates a stream processing engine to provide low-latency data processing and analysis, and can transfer data between multiple systems more quickly. Combined with AI/ML algorithms, it can achieve intelligent decision-making and control. In addition, edge-end analysis can also perform data preprocessing and edge computing to reduce cloud-edge communication load and back-end storage pressure. | [Source Connectors](./streaming-processing/source.md)<br /><br />[Rules](./streaming-processing/rules.md)<br /><br />[Sink Connectors](./streaming-processing/sink/sink.md)<br /><br />[Extensions](./streaming-processing/extension.md) |
| Data Storage and Query | EMQX Neuron integrates the Datalayers time-series database, supporting persistent storage of edge data. It provides a graphical SQL query interface, making it easy for users to perform instant analysis and exploration of historical data. | [Data Storage Configuration](./admin/sys-configuration.md#data-storage-configuration)<br /><br />[Data Analysis and SQL Query](./datainsights/data_analysis.md)|
| AI Data Analysis Assistant | Interact with the AI assistant using natural language to automatically generate SQL query statements. The AI can understand user intent and intelligently adjust and correct queries based on database schema and execution feedback, simplifying the data analysis process. | [AI Data Analysis](./datainsights/data_analysis.md#5-ai-data-analysis-assistant-integration)|
| Visual Dashboards | Provides customizable visual dashboard functionality. Users can easily create and configure charts (line charts, bar charts, tables, statistical values, etc.) to intuitively display stored or real-time data, supporting dynamic time ranges and automatic refresh. | [Dashboards](./datainsights/dashboards.md)|
| System Management                           | EMQX Neuron provides a one-stop operation, maintenance and management platform. You can perform system configuration management, log download, view system information and other operations through the web page. | [Log Management](./admin/log-management.md)<br /><br />[Data Statistics](./admin/data-statistics.md)<br /><br />[System Configuration](./admin/sys-configuration.md) |
