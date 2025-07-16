# Release history

## v3.6.0

Release Date: 2025-06-11

### Enhancements

- **Integrated Time Series Data Storage**

  - Package Integration: NeuronEX now includes packaged integration of Datalayers time series database, supporting multiple installation package formats including deb, rpm, zip, docker, etc. Datalayers does not start with NeuronEX by default; users can enable it as needed in system configuration.

  - Automatic Initialization: After enabling the Datalayers service for the first time, NeuronEX will automatically create the required neuronex database and corresponding data type tables (neuron_int, neuron_float, neuron_bool, neuron_string).

  - Configuration and Management: Users can configure enabling or disabling Datalayers storage and TTL (data retention period) on the system configuration page, and view its running status (Running/Stopped), runtime duration, storage space usage, and other information on the system information page.

  - DataStorage Northbound Plugin

    - Supports gRPC batch writing of data to Datalayers.

    - Application configuration (such as IP, port) can be modified and used for external Datalayers storage mode.

    - Array type data collection tags are stored as strings.

    - Provides data caching and discarding mechanisms for high data throughput scenarios.

  - Data Statistics and Logs: Provides data statistics detail page for data storage scenarios, displays write error information, and supports downloading data storage logs.

- [**Data Query and Analysis**](../datainsights/data_analysis.md)

  - Unified Entry: The new "Data Analysis" page integrates data browsing, SQL query, and result display functions.

  - Tree Directory Structure: The left side displays drivers, collection groups, and tag information with storage enabled in a clear tree structure, showing the data types (Int, Float, Bool, String) stored in the database for each tag.

    - Supports refresh and tag name search.

    - Provides SQL query examples such as Query Column, Query Period, Query Max for data tag by default.

    - Supports AI Query combined with LLM, allowing users to input query requirements in natural language and receive complex SQL query results from LLM.

  - Smart SQL Input Area

    - Provides SQL keyword hints, syntax highlighting, and line number display.

    - Supports single SQL query execution.

    - Only accepts query-type SQL, does not support create, insert, delete, and other operations.

  - Result Display Area

    - Each SQL query result is displayed in this area in table or chart format.

    - Table Display: Shows query results by default.

    - Chart Display: If results contain timestamps, supports chart display of data.

      - Supports two chart types: line chart and bar chart.

      - Supports chart zooming, downloading.

- [**AI Data Analysis Assistant**](../datainsights/data_analysis.md#5-ai-data-analysis-assistant-integration)

  - UI Entry: Integrated in the AI data analysis button on the "Data Analysis" page, as well as AI Query in tag operation items.

  - AI Interaction Box

    - Default Page: Provides guidance prompts, informing users that NeuronEX stores data by data type in separate tables (neuron_float, neuron_int, neuron_bool, neuron_string), and suggests users provide tag names and data types. Provides clickable query examples to quickly start analysis.

    - Tag AI Query: Automatically obtains tag names and corresponding data tables (such as neuron_float, tag='tag1') from UI context and pre-fills them into the AI dialog box.

  - AI Data Analysis Output

    - Main goal is to help users generate correct SQL for complex data analysis.

    - When SQL execution fails, LLM can intelligently analyze errors and use tools for multi-round iterative correction until generating successfully executable SQL queries.

    - Due to LLM context token limitations, currently does not send all SQL query results to LLM for complete data analysis.

  - Configuration and Management

    - Users can configure enabling or disabling AI Agent service on the system configuration page, and view AI Agent running status (Running/Stopped), runtime duration, and other information on the system information page.

    - On the System Configuration -> AI Model Configuration page, users need to configure and enable AI models to use AI data analysis and AI plugin writing functions.

  - In NeuronEX 3.6.0, the Docker images emqx/neuronex:3.6.0-ai and emqx/neuronex:3.6.0-ai-arm64 include Python dependency libraries required for LLM operation by default, allowing users to use this feature directly. When using deb, rpm, zip, or other Docker images, users need to manually configure Python dependency libraries before using NeuronEX AI features. For detailed dependency library configuration, please refer to [AI Feature Environment Configuration Guide](../admin/sys-configuration.md#ai-feature-environment-configuration-guide).

- [**Dashboard**](../datainsights/dashboards.md)

  - Main Page: Lists existing dashboards, supports search, pagination, create, edit, copy, delete, enter, and other operations.

  - Inside Dashboard

    - Time Range Selector: Supports preset time ranges (Last 1 minute, 1 hour, 1 day, etc.) and custom time periods.

    - Refresh Mechanism: Supports manual refresh and setting automatic refresh intervals (e.g., 30s, 1m, etc.).

    - Add Panel

      - Supports adding panels, configurable panel name, chart type (Line, Bar, Stat, Table), semantic type/unit (e.g., °C, displayed on chart).

      - SQL Query

        - Each panel can contain one or more queries. Note: Table type only supports one query.

        - Supports enabling/disabling "SQL query uses $timeFilter variable".

        - When enabled: User SQL must include $timeFilter field, backend will replace it with current dashboard selected time range for efficient querying.

        - When disabled: NeuronEX will automatically append dashboard time range to current user input SQL statement before executing SQL query.

        - If $timeFilter is enabled but missing in SQL, error prompt will be displayed.

      - Alias By: Specify alias display for each query result curve. Specifying alias requires current SQL query result to contain only timestamp and one value column.

      - Supports adding multiple queries in one panel, each query corresponds to one curve in the chart.

    - Panel Configuration

      - Supports editing, copying, deleting panels.

      - Supports dragging panels on dashboard to adjust size and position.

      - Supports curve filtering (click legend to show/hide corresponding curves).

      - Dashboard uses grid system for alignment.

- [**Node-RED Integration**](../application/nodered.md)

  - In NeuronEX 3.6.0, the Docker images `emqx/neuronex:3.6.0-ai` and `emqx/neuronex:3.6.0-ai-arm64` include Node-RED v4.0.9 by default. Users can enable Node-RED service as needed in the application list (disabled by default).

  - Supports pushing data to Node-RED through northbound `Websocket` applications and data processing module `REST Sink` for data processing.

- NeuronHUB Software (upgraded version of NeuOPC): NeuronHUB integrates multiple data collection plugins that depend on Windows environment for conversion collection (including OPCDA, Syntec CNC, and Mitsubishi CNC), and introduces License management functionality for OPCDA plugin.

- SparkplugB application adds support for static tags.

- Southbound devices support filtering driver nodes based on Status and Connection Status, and sorting driver nodes based on Status, Connection Status, and Delay Time.

- Northbound application page supports filtering application nodes based on Status and Connection Status, and sorting application nodes based on Status and Connection Status.

- Northbound application add subscription page supports inputting keywords to search southbound drivers and collection groups.

- BACnet/IP driver supports tag scanning functionality.

- OPCUA, DNP3, Siemens S7 drivers support tracing functionality.

- Data processing module adds Kafka Source.

- Data processing module adds WebSocket Source.

### Changes

- From NeuronEX v3.6.0, SparkplugB plugin only sets the `name` attribute of metric in `NBIRTH` and `DBIRTH` messages, and does not carry the `name` attribute in subsequent `NDATA`, `DDATA`, `NCMD`, and `DCMD` messages, only using `alias` to identify metrics, which may affect existing systems and integrations.

## v3.5.4

Release Date: 2025-07-16

### Enhancements

- **Northbound Subscription**:

  - Added support for **selecting all** and **deselecting all** collection groups.

  - When filtering collection groups by a keyword, "select all" will now only select the filtered collection groups.

- **Southbound Driver Page**:

  - Supports retaining selected drivers from previous pages after pagination.

  - When some drivers are already selected and then filtered by plugin type or keyword, the filtered-out drivers will remain selected.

  - Exporting the driver JSON configuration will include all selected drivers, even those filtered out.

  - Similar to the **Southbound Driver page**, the Southbound Device **Group List** page and the **Tag List** page have also been optimized with the same "retain selection after pagination" and "maintain selection after filtering" features.

- **Data Collection Module (Neuron Core Code) Optimization**:

  - Optimized the Neuron core code in the data collection module to **improve collection performance** and **optimize memory usage** when a single collection group has a large number of data points.

### Fixes

- Fixed an issue where the lag function's default value did not take effect when using four parameters.
- Fixed an issue where rules using the lag function reported errors when QoS was configured.
- Fixed an issue where the source end of a shared stream did not participate in checkpointing when QoS (Quality of Service) was configured for shared stream checkpoints.
- Fixed an error that occurred when sending special data in shared streams with multiple rules.
- Fixed an issue where random empty data might appear when there are two shared stream rules and one of them selects more data.
- Fixed a random state exception issue that might occur after shared stream rule updates, which is more easily triggered when two shared stream rules are updated simultaneously.
- Fixed a rule state management issue where attempting to start a rule that was already stopping would cause the rule to enter an infinite loop.
- Fixed an issue where specific time formats failed to parse.
- Fixed an issue where running rules could not receive data after a Portable source plugin hot update.
- Fixed issues with the display and calculation of incremental window metrics.
- Fixed an issue where portable plugins could not start due to a missing pynng.so file.


## v3.5.3

Release Date: 2025-06-24

### Enhancements

- Modbus TCP/RTU driver Double/Int64/Uint64 data types support full byte order configuration
- Allen-Bradley 5000 EtherNet/IP driver adapts to single-tag read services of other AB PLC models
- Print Monitor process logs to NeuronEX log files

### Fixes

- Fixed the problem of abnormal exit when multiple northbound drivers subscribe to a southbound driver at the same time
- Fixed the problem that NeuronEX did not exit normally when the Neuron process exited

## v3.5.2

Release Date: 2025-05-22

### Enhancements

- The OPCUA driver supports the subscription mode, and a new configuration item is added: Update mode. By configuring the Subscribe mode, it supports obtaining server data through the OPCUA standard subscription interface. Through this mode, the server data can be obtained in real time.
- SparkplugB application has a new configuration item: Group Path, which supports configuring whether the tag is spliced ​​with the collection group name.
- SparkplugB application supports offline caching.
- When there are many rules, optimize and reduce the memory usage when creating rules
- Limit and optimize cache data of trace function

### Fixes

- Fix the problem of downloading the driver log when the driver node name is in Chinese
- Fix the problem of no data caused by updating rule of the shared stream
- Fix the problem of occasional update failure of the Portable plugin
- Fix the problem of monitoring the write event of File Source and ignoring empty files
- Fixed the problem that trace function reports an error after Dataprocessing node is manually closed
- Fixed the problem that rule reports an error "cannot parse JSON" after trace function is enabled
- Fixed the problem that Span splicing is wrong when northbound MQTT and DataProcessing are traced at the same time

### Changes

- The interface for downloading the driver log has been changed to /api/log/neuron?node=node_name

## v3.5.1

Release Date: 2025-04-18

### Enhancements

- Added new feature: AI Generate Python Function(only supported by Docker image `emqx/neuronex:3.5.1-ai` and `emqx/neuronex:3.5.1-ai-amd64`), please refer to [Document](https://docs.emqx.com/en/neuronex/latest/best-practise/llm-portable-plugin.html) for details.
- Data processing engine configuration supports enabling indicator collection and downloading  indicator logs, please refer to [Document](https://docs.emqx.com/en/neuronex/latest/admin/sys-configuration.html#enable-metrics-collection) for details.
- DLT645-2007 Added support for signed integer data types
- Mitsubishi 3E extended support for string length to 256
- Siemens S7 driver supports WSTRING data type

### Fixes

- Fixed OPCUA driver successfully writes data to some third-party OPC servers but returns an error code
- Fixed OPCUA driver would get stuck when executing operations in some cases
- SparkplugB write tag adapts to the newly added is_value_in_range series of rules in the core
- Fixed the get_keyed_state function always returns nil when the default value is not passed
- Fixed attribute error after rule restart
- Fixed Kafka sink batch is not sent when it is 0
- Fixed manually shutting down the rule to change the state twice
- Fixed the MQTT v5 dynamic attribute does not change
- Fixed the panic problem when the Portable plugin fails


## v3.4.5

Release Date: 2025-03-20

### Fixes

- Writing a float value like "121.0" through NeuronEX API to OPCUA Server fails, while values like 120.9 or 121.1 work correctly.

## v3.4.4

Release Date: 2025-03-12

### Enhancements

- FINS TCP/UDP optimized read size
- Modbus driver data processing optimization
- SparkplugB write tag adaption neuron core rule
- Data processing module adds sync cache metrics

### Fixes

- Fix CNC License display abnormality
- Fix SparkplugB node DBIRTH trigger incorrect issue after startup
- Fix SparkplugB NDEATH and DDEATH trigger incorrect issue
- Fix DLT645 driver crash issue
- Fix FINS TCP/UDP driver crash issue
- Fix sink bufferLength configuration not taking effect
- Fix last_agg_hit_time() not updating value when used alone in having
- Fix change deletion connection rule failure text, clearly indicate that there is a rule in use
- Fix sink omitEmpty property not taking effect when send single, non-nil but no data

## v3.5.0

Release Date: 2025-02-25

### Enhancements

- Added new southbound driver: KND CNC driver  
- Added new southbound driver: Mitsubishi 4E  
- MQTT driver supports customizable data upload formats 
- MQTT driver supports a new data reporting format：ECP-format
- MQTT driver supports parameter configuration for reporting tag error code  
- IEC61850 driver updates:  
  - Supports three reporting modes: general interrogation, scheduled interval reporting, and data change reporting  
  - Supports CID file import (automatically generates tags for sp and sg type)  
  - Adjusted data reporting format, with each tag including timestamp and quality fields  
- Northbound application supports configuration of static tags  
- OPC UA driver supports extended object type  
- OPC UA driver supports BIT data type  
- OPC UA driver optimizes tag browser functionality, allowing directly scanned OPC UA Server tags to be added to southbound group  
- ModbusTCP driver supports configuration of primary and backup ModbusTCP Servers  
- FINS TCP/UDP driver adds a parameter to configure the maximum number of bytes read at once  
- Video data source adds video format and encoding configuration options  
- Data processing functionality supports ONNX plugin integration  
- SQL editor supports keyword suggestions  
- MQTT Sink supports MQTT version 5 and includes tracing functionality  
- File data source adds support for raw type data  
- Rule functionality adds support for incremental window calculation  
- Rule general configuration supports SendNilField configuration  
- Timeout for external function calls in rules is configurable  
- License page supports license reset

### Fixes

- Fix the display error of the CNC License on the license page.
- Fix the abnormal export issue of the backup function.

## v3.4.3

Release Date: 2025-01-02

### Enhancements

- Refine OPCUA driver error code 10007-10027, indicating that the tag quality is in bad state
- Mitsubishi 3E and Mewtocol drivers support trace function

### Fixes

- Fix the timeout error caused by importing tags exceeding the license limit
- Fix the OPCUA driver maxAge parameter setting is too large, causing individual OPCUA Servers to not refresh data.
- Fix the OPCUA driver Array type tag write empty array, reporting an error tag type mismatch
- Fix the Modbus driver response duplication problem
- Fix the Mewtocol driver tag merging error
- Fix security scan related vulnerability issues
- Fix the problem that file sink ignoreEndline is easy to cause confusion when it is large
- Solve the problem that the shared stream stops some rules and causes the buffer of the remaining running rules to be full
- Solve the problem that when slidingWindow(ss, 5, 10) triggers to obtain the previous and next data, the timer unit error makes it difficult to trigger
- Delete the log on the SQL source hot path to prevent high CPU during high throughput
- Fix the sink cache initialization problem to prevent the disk cache from being loaded incorrectly
- After configuring to close the log, no console or other logs will be output
- TLS certificate initialization, configure skip secure verify to still perform certificate parsing
- Solve the error handling problem of parallel nodes (codec, encryption and other attributes), the error is reflected in metrics and prints logs
- Solve the problem that REST sink dynamic headers are only parsed once
- REST sink "No connection" error is identified as a recoverable error (if resend is configured, the resend process will be entered)
- Adjust the sqlite version and fix the arm v7 deployment error


## v3.4.2

Release Date: 2024-12-03

### Enhancements

- OPCUA driver supports reading BIT type
- OPCUA supports array type reading and writing
- MQTT driver relaxes port restrictions
- Modbus RTU/TCP driver supports tracing
- SRTP driver optimizes timeout processing
- Siemens S7 driver supports string array reading and writing
- SparkplugB supports ddeath after southbound driver disconnection and dbirth after reconnection
- Tag list page displays group name
- Kafka sink supports compression configuration
- Httppull source supports configuration of access header
- Neuron no longer sends errors continuously after the connection is disconnected. It only sends once when connected to disconnection, and does not send when reconnection fails to prevent excessive log/exception
- Duration related configurations are migrated at startup, for example, cacheTTL numbers are automatically migrated to duration strings
- Conf configures key verification to prevent XSS attacks
- Neuron Sink supports calling multi-tag write API

### Fixes

- fixed decimal verification failed
- OPCUA driver reads Kepserver and intermittent data expires
- When MQTT reports data in tags-format, the transferPrecision field appears incorrectly
- Fixed the writing problem of String type tag with decimal configuration
- SQL Source supports reading Null fields
- Data source page translation error
- Occasional connection status lock acquisition problem, NPE may occur
- Clear status after shared stream configuration fails
- Fixed Kafka sink, key/headers dynamic template attribute ineffective problem

## v3.4.1

Release Date: 2024-10-31

### Fixes
- Fix neuronStream buffer overflow error
- Fix the error that the neuronStream data could not be obtained during rule debugging
- Support parameter sendError in rule options
- Fixed the error when ECP manage NeuronEX with https enabled

## v3.4.0

Release Date: 2024-10-24

### Enhancements

- Added southbound driver DNP 3.0
- Added southbound driver HollySys Modbus TCP
- Added southbound driver HollySys Modbus RTU
- Added southbound driver Allen-Bradley 5000 EtherNet/IP
- Added southbound driver Allen-Bradley DF1
- MQTT driver supports reporting southbound driver status to MQTT topics
- MQTT driver supports MQTT 5.0 version
- Focas driver PMC read optimization
- DLT645 driver supports reading data from address area 05
- ModbusTCP and Inovance Modbus TCP drivers added parameter `Check Header`
- ModbusTCP and ModbusRTU drivers support device degradation
- Southbound driver and northbound application pages support pagination display of node information
- Added environment variable `NEURON_SUB_FILTER_ERROR` and configuration parameter `sub_filter_error`, which can configure `Subscribe` attributes to only detect normally reported values
- Data processing module adds connection management function, supporting configuration of MQTT and SQL connectors, with automatic reconnection support
- File source supports reading CIME files in the power industry
- Split source/sink operators
- Added rule statistics indicators
- Rule running indicators can still be viewed after the rule is stopped
- Portable plugin adds status and error information display
- Supports complete backup and recovery of NeuronEX
- UI supports password hiding
- Supports choosing whether to start the data processing engine when starting NeuronEX
- NeuronEX supports HTTPS API
- Supports modifying the admin password and Viewer account in the configuration file `neuronex.yaml`
- Parameters in the configuration file `neuronex.yaml` support mapping for use as environment variables
- Added OpenTelemetry tracing function, supporting the following features:
  - API and downstream MQTT control command tracing
  - Data collection link tracing
  - Rule calculation link tracing
- Supports outputting logs to the console via environment variables
- The time-related configuration items of the data processing module now use the go duration string format
- Add judgment conditions when deleting a Source, and the Source referenced by the rule cannot be deleted
- SQL Source no longer supports reading null data


### Fixes
- Fixed the issue of reading data errors in the Panasonic Mewtocol driver
- Adjusted Docker installation package system parameter `net.unix.max_dgram_qlen` = 1024
- Fix SQL source scan for some column type for different databases
- Window accomodate time shift back
- Fix metrics for batch operator
- Fix csv format output to avoid e-notation for float
- Operand nil in an operation always return nil (e.g. a + b, if a == nil, result is nil)
- Fix random memory source failure when restarting rule
- Fix log rotate count when logs rotate too much
- Neuron connection remove size limit (may drop when payload is bigger than 1MB)

## v3.3.3

Release Date: 2024-10-22

### Enhancements
- DLT645 driver supports reading data from address area 05
- SparkplugB supports southbound driver disconnection ddeath, and reconnection after dbirth
- SparkplugB supports ndeath for device power failure

### Fixes
- Fixed the issue of reading data errors in the Panasonic Mewtocol driver
- Fixed the issue of reading Decimal type data errors in SQL source

## v3.3.2

Release Date： 2024-09-02

### Enhancements
- Southbound device and northbound application pages support driver paging and total number display.
- Source and rule action support custom source and sink types in portable plugins.
- Delete offline cache data when delete MQTT node.
- Optimize the disk usage of NeuronEX docker image.

### Fixes
- Fixed Mitsubishi 3E plugin reading incorrect value of bit tag.
- Fixed Mitsubishi plugin filter unexpected reponse.
- Fixed the problem of duplicate names in fields of rule action.
- Fixed the front-end prompt error of Modbus TCP plugin Check Header parameter.
- Fixed the problem that the prompt information of file source Columns parameter was not fully displayed.
- Fixed the invalid source type filtering function on the source configuration key page.
- Fixed the problem that the portable plugin customized source and configuration group page displayed incomplete information.
- Fixed BatchOp metric: calculate time batch outputs
- Fixed BatchOp metrics: do not calculate empty time batch outputs

## v3.3.1

Release Date： 2024-07-31

### Enhancements
- Focas driver PMC reading optimization
- Data monitoring page optimization
- Optimize data collection core module log
- Add dataField and Field fields to action property configuration items
- File source supports cime file type
- When logging into NeuronEX for the first time, the browser language is used as the default language
- Tag subscribe attribute, triggers subscribe to report data only when normal data changes.

### Fixes
- Dataprocessing node communication error after NeuronEX starts
- Southbound driver imports API, and the error caused by importing points exceeding the license limit
- When northbound application contains Chinese, garbled characters appear in the downloaded log file
- The style of the drop-down multi-select input box on the action page is messy
- Fix the ECP update portable plugin package is invalid
- Fix some issues with the single sign-on function
- Fix the problem of REST Sink when the Content-type is application/vnd.microsoft.servicebus.json

## v3.3.0

Release Date： 2024-06-24

### Enhancements

- Added Modbus ASCII southbound driver
- Added XINJE Modbus RTU southbound driver
- Added Codesys V3 southbound driver
- Added IEC 60870-5-101 southbound driver
- Added IEC 60870-5-102 southbound driver
- Added IEC 60870-5-103 southbound driver
- Added AWS IOT northbound application
- Added Azure IOT northbound application
- OPCUA driver supports data tag discovery
- OPCUA driver supports localizedtext data type
- IEC 61850 driver supports asynchronous read and write
- IEC 60870-5-104 driver adjusted to standard version, and supports providing private - customized version
- DLT645 supports multi-data reading
- Supports uploading CNC files
- Data tag supports offset
- Support tag test when adding data tags (currently only supports Modbus TCP driver)
- Data monitoring page supports filtering to display only error tags
- Data monitoring page supports tags paging display
- Optimize decimal display of floating data tags
- Add CAN Source
- Support for Javascript custom functions
- Add Image Sink
- Neuron Sink supports writing multiple tags in data template
- Data source redis, influxdb v1/v2 support connection test
- Add RBAC user management, support two roles of administrator and viewer
- Support network connection test
- Support display of system CPU and memory load
- Optimize SQL Source parameter configuration
- Optimize time display on rule status page
- Optimize SSO function
- Optimize MQTT Northbound applications generate default clientid and topic
- In the default configuration of rule retry, the delay is changed to 5000ms, and the - multiplier is changed to 1
- Add some rules SQL usage examples
- Support custom hiding of left and top menu bars

### Fixes

- Fix the growth of ekuiper log after NeuronEX Log Level is set to debug
- Fix the names of southbound drivers, resulting in configuration export errors
- Fix the tag descriptions that all become the last edited content when adding multiple tags
- Fix the problem of inaccurate statistics of southbound driver nodes
- Fix the driver exception caused by modbus batch writing tags

## v3.2.2

Release Date： 2024-06-28

### Enhancements
- Inovance Modbus supports coil area merge reading and writing
- Optimize Siemens S7 driver performance
- Optimize neuron core module log
- Display of floating point data, remove invalid suffixes
- In the default configuration of rule retry, the delay is changed to 5000ms, and the - multiplier is changed to 1

### Fixes
- opc ua cannot correctly connect to the third-party opc server
- Inaccurate display of group tags in driver statistics
- Issuing wrong configuration causes neuron to exit
- Too many "tag not changed" logs
- Issue of inconsistency between rule status and import configuration after rule import
- Using non-existent httppull lookuptable address, the rule still runs normally
- Kafka sink writes to multiple partitions when the same key pub is used
- Add multiple points at one time, and when adding descriptions, all become the last edited content.
- After the northbound application is stopped, the trans_data_message statistical indicator does not return to 0
- Incorrect display of floating point numbers on the data monitoring page


## v3.2.1

Release Date： 2024-04-26

### Enhancements
- Focas driver supports more function
- SECS/GEM driver tag resolution to specific values
- Inovance Modbus driver supports collecting TIME and DATA_AND_TIME data types
- Siemens S7 driver supports collecting DATA_AND_TIME data type
- Modbus driver configuration items support configuration endian
- Modbus driver configuration items support configuring the starting address 0 or 1
- Added file upload function
- Optimize the creation page of northbound node
- Optimize sources,  extensions and configuration pages
- The default log collection level is adjusted to error
- Add some SQL examples
- When creating a rule, generate a random Rule ID
- When copying drivers and rules, a default name is generated
- Adjust the operation position of rule status statistics
- On the southbound driver data statistics page, the timestamp of the collection error information is displayed as local time.
- Remove clock check for trial license
- NeuronEX server optimizes 100-continue response
- MQTT sink password is hidden and not displayed

### Fixes
- Fixed the issue where after the rules are imported, the page needs to be refreshed to see the new rules.
- Fixed the issue where the portable plugin list display is empty and the list interface returns data.
- Fixed data template multi-line display error during rule testing.
- Fixed the problem that the portable plugin re-upload function is invalid.
- Fixed the issue where influxdb v2 line protocol selects true and submits sink error.
- Fixed the issue where OPCUA driver bool value would fail when writing false.
- Fixed OPCUA driver, memory growth problem.
- Fixed cli reset password function.
- Fixed ECP managed NeuronEX by agent being unable to use the log monitoring function


## v3.2.0

Release Date： 2024-03-18

### Enhancements

- Added MTConnect southbound driver.
- Added Siemens MPI southbound driver.
- Added Heidenhain CNC southbound driver.
- Added import and export functionality for southbound driver.
- Added data processing Kafka Sink.
- Added support for calling third-party AI algorithm services.
- Added southbound driver replication.
- Added Single Sign-On (SSO) support.
- Added agent connection to ECP platform.
- Added support for `Array` type in OPCUA driver.
- Optimized asynchronous read/write performance in OPCUA driver.
- Inovance Modbus TCP driver supports AM series and AC series medium-sized PLCs.
- Added function features to Focas driver.
- Added support for `wstring` type in S7 driver.
- Enhanced data collection plugin update, replacement, and deletion functionality.
- MQTT, SQL, Kafka Source/Sink support for connection testing.
- Source and Sink configurations support direct import of certificate files.
- Redesigned and optimized UI pages.
- Optimized southbound driver creation page.
- Optimized rule debugging page.
- Optimized data statistics page for drivers and rules.
- Optimized data processing Sink configuration page.
- Enhanced search and query functionality for multiple UI pages.
- UI supports downloading portable plugin examples.
- Optimized Dump file generation.
- Adjusted built-in license functionality; data processing functionality is available, but rules will stop after 60 minutes.
- Changed docker installation package naming convention; `neuronex:latest` and `neuronex:3.2.0` - standard installation packages include Python basic environment, while `neuronex:3.2.0-slim` lightweight version does not include Python environment.
- Removed southbound driver template functionality.

### Fixes

- Fixed an issue where the default timeout for Mitsubishi drivers was too short, causing abnormal disconnection when the data volume was large.
- Fixed an issue where the .so file and .json file did not match when uploading plugins.
- Fixed an issue where the connection status of Mitsubishi PLC 3E was inaccurate.
- Fixed an issue where spaces and carriage returns were transmitted to the backend in rule debugging data templates.

## v3.1.2

Release Date： 2024-03-06

### Enhancements
- Increased the data tag name length limit to 128 bits.
- Added support for single-point and multi-point reading and writing in the Inovance Modbus TCP driver's I address area.
- Modified the default byte order in the Inovance Modbus TCP driver to match with the device.
- Enhanced OPC UA asynchronous read and write performance.
- Added support for Q/M named address input specification in the S7 driver.

### Fixes
- Fixed abnormal disconnection issue in the Mitsubishi driver when handling large amounts of data.
- Fixed error 3008 in the 104 protocol.
- Addressed the problem of excessive dump file generation.


## v3.1.1

Release Date： 2024-01-12

### Enhancements

- Added Redis source.
- Optimized the log monitoring page.
- Implemented password change validation to ensure old and new passwords cannot be the same.
- Added filter search and pagination for the North Apps page and North Group List page.
- Stored ECP related data (liveness, syslog, password) into SQLite.
- Set the `runImmediately` option to `true` by default when creating a rule.

### Bug Fixes

- Fixed SQL database password validation error.
- Fixed node/group display error in Data Monitoring page.
- Fixed error that occurred when creating rules while rule testing is in progress.
- Fixed hexadecimal writing data tag error.
- Fixed TLS certificates validation error.
- Fixed rule exception for multiple operators.
- Fixed syslog body validation.
- Fixed eKuiper liveness check when setting log level.
- Fixed liveness report to ECP not working except reboot NeuronEX.



## v3.1.0

Release Date： 2023-12-22

### Enhancements
- Support for Centos 7, Ubuntu 18.04 and Debian-10 operating systems

- Support for ARM V7

- Support for RPM and DEB installation

- Support for Inovance Modbus TCP southbound driver

- Support for HOSTLINK southbound driver

- Support for adding and replacing southbound and northbound drivers

- The driver template adds the Interval field of group

- New source in the data processing module: HTTP Pull, HTTP Push, SQL, File, Video, Simulator

- New sink in the data processing module: REST, SQL, InfluxDB V1, InfluxDB V2, File

- Added rule testing function

- Optimize Add Sink page

- Optimize rule options UI and Sink configuration UI

- Optimize the configuration process between data collection and data processing modules

- NeuronEX logs, metrics, alarms support docking with ECP

- Add log monitoring 

- Support for downloading single southbound and northbound driver log

- Support for downloading data processing module log

- Support for starting and stopping data processing module

- UI displays system architecture information

- Support for command line to reset login password

- Optimize NeuronEX storage directory


## v3.0.1

Release Date: 2023-11-3

### Enhancements

- Added configuration function to limit the size and quantity of log files.

- Added the function of modifying the log level, and added the log configuration function on the page.

- Added password restrictions when changing passwords on the UI page.


### Fixes

- Fixed log-related issues such as garbled logs and format errors.



## v3.0.0

Release Date: 2023-10-24

### Enhancements

- Realize functional integration of data collection and data stream processing

- Added unified authentication service

- Added unified API

- Added support for syslog service (Support syslog server)

- Added support for yaml format configuration files

- Added support for environment variables and command line settings to run

- Added support for large-scale hardware bundling license distribution

- Added floating license

- Optimize front-end display


