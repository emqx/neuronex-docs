# Operation and Maintenance Guide

This chapter aims to assist administrators and operations personnel in effectively managing and maintaining NeuronEX. In this chapter, we will explore various management tasks and provide comprehensive guidance and best practices to ensure smooth and efficient operation of NeuronEX.

## Log in

Open a web browser and enter the gateway address and port number running NeuronEX to enter the dashboard. The default port number is 8085.

Access address, http://x.x.x.x:8085 where x.x.x.x represents the gateway address where NeuronEX is installed.

After the login page is opened. The user can log in using the initial username and password (initial username: `admin`, initial password: `0000`).

If the page cannot be opened, please execute the following command in the terminal to detect:

* Use the `ping` command to test whether the network is accessible.
* Use the `telnet` command to test whether port 8085 is accessible.
* Execute the following command to view the process status of NeuronEX.

```
$ systemctl status neuron
```

## Management

Please see the following pages for specific management functions:

* [Configuration Management](./conf-management.md)
* [Log Management](./log-management.md)
* [Change password](./password.md)