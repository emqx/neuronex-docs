# Operation and Maintenance Guide

This chapter is designed to help administrators and operation and maintenance personnel effectively manage and maintain NeuronEX. In this chapter, we'll explore various management tasks and provide comprehensive guidance and best practices to ensure your NeuronEX runs smoothly and efficiently.

## Log in

Open a web browser and enter the gateway address and port number running NeuronEX to enter the management console page. The default port number is 8085.

Access address, http://x.x.x.x:8085 where x.x.x.x represents the gateway address where NeuronEX is installed.

After the page opens, the login interface is entered. The user can log in using the initial username and password (initial username: admin, initial password: 0000).

If the page cannot be opened, please execute the following command in the terminal to detect:

* Use the `ping` command to test whether the network is accessible.
* Use the `telnet` command to test whether port 8085 is accessible.
* Execute the following command to view the process status of NeuronEX.

```
$ systemctl status neuron
```

## manage

Please see the following pages for specific management functions:

* [Configuration Management](./conf-management.md)
* [Log Management](./log-management.md)
* [Change password](./password.md)