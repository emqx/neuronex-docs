# Release history

## v3.1.2

Release Date： 2024-03-06

### Enhancements
- Data tag name length limit increased to 128 bits
- Added support for single-point and multi-point reading and writing in Inovance Modbus TCP driver I address area
- Inovance Modbus TCP driver modifies the default byte order and matches it with the device
- Improve OPC UA asynchronous read and write performance
- S7 driver supports Q/M named address input specification

### Fixes
- Fixed Mitsubishi driver of abnormal disconnection when the amount of data is large
- Fixed 104 protocol, error 3008 problem
- Fixed the problem of excessive dump file generation


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


