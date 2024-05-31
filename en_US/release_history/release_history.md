# Release history

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


