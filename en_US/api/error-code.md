# Error codes

This document describes the error codes that the data collection function will respond with when calling HTTP API and MQTT API.

## API request error codes

* 1000    Common error
* 1001    Internal error
* 1002    Invalid request body
* 1003    Invalid request param
* 1004    Missing token
* 1005    Token decoding error
* 1006    Token expired
* 1007    Token validation error
* 1008    Invalid token
* 1009    Username or password error
* 1010    Server busy
* 1011    File not found
* 1012    Password length too short or too long
* 1013    Password repeated
* 1014    Command execution failed
* 1015    IP address is invalid
* 1016    IP address is already in use
* 1017    Username is invalid
* 1018    Password is invalid

## Add/delete/update node/tag/plugin/group error codes

* 2002    Node already exists
* 2003    Node does not exist
* 2004    Node settings are invalid
* 2005    Node settings not found
* 2006    Node is not ready
* 2007    Node is running
* 2008    Node is not running
* 2009    Node is stopped
* 2010    Node name is too long
* 2011    Node is not allowed to be deleted
* 2012    Node is not allowed to be subscribed
* 2013    Node is not allowed to be updated
* 2014    Node does not support graph
* 2015    Node name is not allowed to be empty

* 2101    Group is already subscribed
* 2102    Group is not subscribed
* 2103    Group is not allowed
* 2104    Group already exists
* 2105    Group parameters are invalid
* 2106    Group does not exist
* 2107    Group name is too long
* 2108    Group exceeds the maximum number under one node

* 2201    Tag does not exist
* 2202    Tag name conflict
* 2203    Tag attributes are not supported
* 2204    Tag type is not supported
* 2205    Tag address format is invalid
* 2206    Tag name is too long
* 2207    Tag address is too long
* 2208    Tag description is too long
* 2209    Tag precision is invalid
* 2210    Tag already exists

* 2301    Library not found
* 2302    Library information is invalid
* 2303    Library name conflict
* 2304    Library open failed
* 2305    Library module is invalid
* 2306    System library is not allowed to be deleted
* 2307    Plugin is not allowed to be instantiated
* 2308    Plugin does not support this architecture
* 2309    Plugin in using
* 2310    Plugin add failed
* 2311    Plugin already exit
* 2312    Plugin not exist
* 2313    Plugin type no support
* 2314    Plugin version not match with core
* 2315    Plugin name error
* 2316    Plugin not match with c lib
* 2317    Plugin update failed

* 2400    License not found
* 2401    License is invalid
* 2402    License is expired
* 2403    License does not enable the plugin
* 2404    Reached the maximum number of nodes authorized by the license
* 2405    Reached the maximum number of points authorized by the license
* 2406    Hardware does not match the license
* 2407    License detects an abnormal clock
* 2408    License module is invalid
* 2409    License hardware token not found

* 2500    Template already exists
* 2501    Template does not exist
* 2502    Template name is too long

## Common plugin error codes

* 3000    Plugin read failed
* 3001    Plugin write failed
* 3002    Plugin is not connected
* 3003    Plugin tag is not allowed to read
* 3004    Plugin tag is not allowed to write
* 3007    Plugin tag type mismatch
* 3008    Plugin tag value is invalid
* 3009    Plugin protocol parsing failed
* 3010    Plugin is not running
* 3011    Plugin tag is not ready
* 3012    Plugin message disorder
* 3013    Plugin name is too long
* 3014    Plugin does not exist
* 3015    Plugin device is not responding
* 3016    Plugin does not support template
* 3017    Plugin does not support writing points
* 3018    Plugin does not support synchronous reading

## FILE error codes

* 4100   String is too long
* 4101   Failed to open file
* 4102   Failed to read file
* 4103   Failed to write file

## OPCUA error codes

* 10001    opcua tag does not exist
* 10002    opcua connection configuration error
* 10003    opcua access timeout
* 10004    opcua tag is not readable
* 10005    opcua tag is not writable
* 10006    opcua tag is not supported
* 10007    opcua error
* 10008    The value is bad but no specific reason is known
* 10009    There was nothing to do because the client passed a list of operations with no elements
* 10010    The request could not be processed because it specified too many operations
* 10011    User does not have permission to perform the requested operation
* 10012    The timestamps to return parameter is invalid
* 10013    Communication with the data source is defined, but not established, and there is no last known value available
* 10014    The syntax of the node id is not valid
* 10015    The node id refers to a node that does not exist in the server address space
* 10016    The attribute is not supported for the specified Node
* 10017    The syntax of the index range parameter is invalid
* 10018    No data exists within the range of indexes specified
* 10019    The data encoding is invalid
* 10020    The server does not support the requested data encoding for the node
* 10021    The access level does not allow reading or subscribing to the Node
* 10022    The access level does not allow writing to the Node
* 10023    The value was out of range
* 10024    The max age parameter is invalid
* 10025    The server does not support writing the combination of value, status and timestamps provided
* 10026    The value supplied for the attribute is not of the same type as the attribute's value
* 10027    The operation is not permitted over the current secure channel

## S7COMM error codes

* 10101   Hardware error
* 10103   Object has no access permission
* 10105   Invalid address
* 10106   Data type is not supported
* 10107   Data types are inconsistent
* 10110   Object does not exist
* 10150  COTP connection disconnected
* 10151  S7 connection disconnected
* 10152  No value
* 10153  Value length is too short

## KNX error codes

* 10200   Device does not exist

## NONA11 error codes

* 10400   Invalid address

## FINS error codes

* 10500    fins connection disconnected
* 10501    fins error
* 10502    Local node error
* 10503    Target node error
* 10504    Controller error
* 10505    Service is not supported
* 10506    Routing table error
* 10507    Command format error
* 10508    Parameter error
* 10509    Cannot read
* 10510    Cannot write
* 10511    Current mode cannot be executed
* 10512    Unit does not exist
* 10513    Cannot start/stop
* 10514    Unit error
* 10515    Command error
* 10516    Access permission error
* 10517    Abort

## FOCAS error codes

* 10600    focas error

## EtherNet/IP error codes

* 10701    10744 EtherNet/IP error
* 10704    Incorrect tag address
* 10797    EtherNet/IP has no CIP connection
* 10798    EtherNet/IP data type mismatch
* 10799    EtherNet/IP is not registered session

<!-- ## Profinet IO error codes

* 10800    Profinet IO is not recognized
* 10801    Profinet IO is not connected
* 10802    Profinet IO is not ready
* 10803    Profinet IO parameters are not ready
* 10804    Profinet IO does not have write permission
* 10805    Profinet IO is waiting for HELLO response -->

## License error codes (Extended)

* 13000    Invalid license file
* 13001    Please upload the license file
* 13002    License file read failed
* 13003    License has expired
* 13004    License write failed
* 13005    License exceeds activation validity period
* 13006    The license has expired and cannot perform the current operation
* 13007    License error
* 13008    Allocated tag count is less than in use
* 13009    Neuron detected clock abnormality
* 13010    Neuron invalid license module
* 13011    Neuron internal error
* 13012    Breaking away from ECP management beyond its validity period, modification, addition, or operation is not allowed
* 13013    Not virtual license, not removable
* 13014    License not exist
* 13015    Virtual license delete failed
* 13016    Hardware identification mismatch
* 13017    Prohibit uploading license due to NeuronEX being activated by ECP's floating license
* 13018    Prohibit activating license due to NeuronEX being activated by ECP's floating license
* 13019    The current license does not support stream processing engines function
* 13020    Registration code error
* 13021    The hardware is already registered
* 13022    Fail to register
* 13023    Exceeded the maximum number of registered devices
* 13024    Ecosy license network connection not working
* 13025    Ecosy license tag is insufficient
* 13026    Ecosy license request fail
* 13027    License does not enable plugin
* 13028    Reset license failed, please confirm that tag usage is less than 30 tags
* 13029    Reset trial license failed

## Edge service template error codes

* 17000    Export of edge service template failed
* 17001    Unsupported Edge Service version
* 17002    Unsupported Edge Service Type
* 17003    Failed to distribute the edge service template
* 17004    Failed to distribute the edge service template
* 17005    Failed to distribute the edge service template, tag insufficient
* 17006    Tag attribute not supported
* 17007    Tag type not supported
* 17008    Tag address format invalid
* 17009    Tag name too long
* 17010    Tag address too long
* 17011    Tag description too long
* 17012    Tag precision invalid
* 17013    Node name too long
* 17014    Group parameter invalid
* 17015    Group name too long
* 17016    Library failed to open
* 17017    Plugin name too long
* 17018    Plugin does not support requested operation
* 17019    Library not found
* 17020    Plugin not found
* 17021    Tag name conflict
* 17022    Library does not allow instance creation
* 17023    Server is busy

## Alert and monitoring configuration error codes

* 18000    Alert config missing parameters
* 18001    Metric config missing parameters
* 18002    Webhook url invalid
* 18003    Rule id invalid
* 18004    Configuration alert config failed
* 18005    Configuration metric config failed
* 18006    Configuration liveness config failed
* 18007    Configuration syslog config failed
* 18008    Configuration credentials config failed
* 18009    Syslog config missing parameters
* 18010    Metric id invalid

## SSO configuration error codes

* 19000    Add ssoConfiguration failed
* 19001    Update ssoConfiguration failed
* 19002    Configuration name not found in the query
* 19003    Delete ssoConfiguration failed
* 19004    Configuration already exists
* 19005    Get access_token failed
* 19006    Get user information failed

## Server internal error codes

* 20000    Server internal error
* 20001    Data acquisition function service error
* 20002    Neuron code error
* 20003    Data flow processing function service error
* 20004    Neuron load not ready
* 20005    Datalayers load not ready

## Request parameter error codes

* 20100    Request body invalid
* 20101    Parameter error
* 20102    Exec time out
* 20103    JSON format error
* 20104    Loglevel not support
* 20105    The directory does not exist or is empty
* 20106    The file is not valid for data restore
* 20107    The Neuron CID request is not valid
* 20108    The Datalayers Query SQL is not valid
* 20109    The Datalayers Query SQL execute fail
* 20110    Name already exist
* 20111    ID not exist
* 20112    Timefilter not exist
* 20113    Timefilter should not exist
* 20114    More than one ai model enable
* 20115    THE SQL should be Query SQL
* 20116    Datalayers authentication failed

## User authentication error codes

* 20200    Invalid username or password
* 20201    Username not correct
* 20202    Password not correct
* 20203    Missing token
* 20204    Token not correct
* 20205    No access rights
* 20206    Username already exist
