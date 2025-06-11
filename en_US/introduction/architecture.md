# NeuronEX Architecture

NeuronEX is a software designed for device data collection and edge intelligent analysis in the industrial sector. It is primarily deployed in industrial settings to achieve industrial equipment communication, industrial bus protocol collection, integration of industrial system data, edge data filtering analysis, and AI algorithm integration. Additionally, it facilitates integration with industrial IoT platforms. NeuronEX delivers low-latency data access management and intelligent analytical services tailored for industrial scenarios.

<img src="./_assets/architect.png" alt="架构" style="zoom:100%;" />

As shown in the diagram, NeuronEX is primarily divided into modules such as Data Collection, Data Processing and Analysis, Data Forwarding and Storage, and System Management.

## Data Collection Module

In the realm of data collection, NeuronEX not only supports industrial equipment data collection but also facilitates the integration of multi-source data from the industrial site.

### Industrial Equipment Data Collection

NeuronEX supports various industrial protocols through plugins, including Modbus, OPC UA, EtherNet/IP, IEC104, BACnet, Siemens PLC, and Mitsubishi PLC. This meets the data collection needs of diverse industries such as smart manufacturing, oil and gas, steel and metallurgy, energy, and building automation.

### Integration of Multi-Source Data
NeuronEX also possesses the capability to flexibly acquire various types of data. In industrial settings, it can support:

- **Integration with MES, WMS, and ERP Systems**
  
  Integration with MES, WMS, and ERP systems is achieved through [HTTP Pull](../streaming-processing/http_pull.md) and [HTTP Push](../streaming-processing/http_push.md), facilitating bidirectional data exchange.

- **Database Integration**
  
  NeuronEX supports data retrieval from databases like SQLite, MySQL, SQL Server, and others.

- **Enterprise Service Bus (ESB) Integration**
  
  Bidirectional integration with the Enterprise Service Bus (ESB) is achieved [HTTP Pull](../streaming-processing/http_pull.md) and [HTTP Push](../streaming-processing/http_push.md), enabling data push and pull operations with the ESB.
    
- **[File](../streaming-processing/file.md) Data Collection**
  
  NeuronEX supports data collection from files in CSV, JSON, and other formats.

- **Video Stream Access and Analysis**

## Data Processing and Analysis Module

The core value of NeuronEX lies in its powerful edge data processing and analysis capabilities, which transform raw, chaotic data into standardized, valuable insights.

- **Data Standardization and Cleansing**: With over 160 built-in [functions](../streaming-processing/sqls/functions/overview.md), it supports operations like data type conversion, unit standardization, format restructuring, filtering, sorting, and aggregation to meet various data preprocessing needs.
- **Real-time Stream Processing**: A powerful stream processing engine enables millisecond-level real-time handling of data streams, satisfying low-latency scenarios such as real-time data collaboration between multiple systems and closed-loop control.
- **AI/ML Algorithm Integration**: Supports user integration of [custom functions](../streaming-processing/extension.md) and [AI/ML algorithm models](../streaming-processing/portable_python.md) written in Python, C/C++, etc., for low-latency intelligent inference at the edge. The revolutionary "AI Data Analysis Assistant" introduced in version 3.6.0 allows users to generate SQL queries using natural language and can intelligently iterate and correct them, significantly lowering the barrier to data analysis.
- **Data Insights and Visualization**:
  - **Built-in Time-Series Storage**: Features a built-in Datalayers time-series database, providing out-of-the-box edge data persistence.
  - **Interactive Data Analysis**: Offers a unified [data analysis interface](../datainsights/data_analysis.md) where users can deeply query and explore stored historical data using a smart SQL editor or the AI assistant.
  - **Customizable Dashboards**: The [all-new "Dashboard" feature](../datainsights/dashboards.md) allows users to intuitively display key data in chart form through simple drag-and-drop configuration, creating customized edge monitoring centers.

## Data Forwarding and Storage Module

NeuronEX acts as a powerful bridge connecting the edge to the cloud and on-premises systems, offering flexible options for data forwarding and storage.

- **Data Forwarding**: Supports seamless data handoff to public cloud IoT platforms, private clouds, or on-premises data centers via standard protocols like MQTT, SparkplugB, HTTP, and WebSocket. Furthermore, the integrated [Node-RED](../application/nodered.md) allows for the easy creation of complex forwarding and automation workflows.
- **Data Storage**: In addition to the built-in Datalayers database, NeuronEX also supports writing data to various external databases and message queues, such as MySQL, InfluxDB, and Kafka, to meet diverse data persistence requirements.

## System Management Module

NeuronEX provides a complete and user-friendly set of system management functions to ensure its stable, secure, and reliable operation in industrial environments.

- **System Configuration**: Offers a clean Web UI for convenient configuration management of all modules, including drivers, data processing rules, and northbound applications.
- **Security and Authentication**: Supports username/password-based access control and TLS/SSL encrypted transmission to guarantee system and data security.
- **Logging and Monitoring**: Provides detailed operational logs, performance metrics, and status monitoring, including real-time status monitoring of core components like data storage and AI services, to facilitate user operations and troubleshooting.

For guidance on using NeuronEX's System Management Module, refer to the [Operations Guide](../admin/introduction.md).
