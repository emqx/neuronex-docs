# Release history

## v3.4.0

Release Date: 2024-10-22

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


### Fixes
- Fixed the issue of reading data errors in the Panasonic Mewtocol driver
- Adjusted Docker installation package system parameter `net.unix.max_dgram_qlen` = 128
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


