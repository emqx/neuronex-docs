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
* 10797    EtherNet/IP has no CIP connection
* 10798    EtherNet/IP data type mismatch
* 10799    EtherNet/IP is not registered session

## Profinet IO error codes

* 10800    Profinet IO is not recognized
* 10801    Profinet IO is not connected
* 10802    Profinet IO is not ready
* 10803    Profinet IO parameters are not ready
* 10804    Profinet IO does not have write permission
* 10805    Profinet IO is waiting for HELLO response