# Release history

## v3.1.1

Release Date： 2024-01-12

## Enhancements

- enable redis source
- modify the log page
- the new password cannot be the same as the old password
- add filter search and pagination for north driver and north group
- store ecp related data(liveness、syslog、password) into sqlite

## Bug Fixes

- fix view rule to edit rule and set runImmediately is true
- delete no node or group bug in DataMonitoring
- set interval is disabled when set loop is false in rule test
- fix that can't check hexadecimal data
- fix: tls certificates are not verified .
- fix rule exception for multiple op.
- syslog request body validate
- check ekuiper liveness when setting log level
- liveness report to ecp do not work except reboot neuronex



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


