# Monitor and Alert Management

NeuronEX provides monitoring and alerts to help you understand the status of NeuronEX in real time and detect abnormalities in a timely manner.

## Monitoring

NeuronEX provides a variety of metrics for you to monitor, including.

- Data collection engine metrics, such as the number of north-south drives, drive connection status, and abnormal drives.
- Data processing engine metrics, such as the number of rule log inputs and outputs, and the number of stop rules.
- System resource metrics, such as CPU, memory, and so on.

Users can specify which metrics are needed when distributing monitoring configuration. There are two ways to get these metrics data:

1. Configure the [pushgatway](https://github.com/prometheus/pushgateway) address (Pushgateway is a component of Prometheus, an open source combination of system monitoring, alarms, and time series databases), and NeuronEX will automatically push the metrics data to the specified pushgatway.
2. Query metrics data via API

NeuronEX disables the monitoring function by default, users can call the API to send the monitoring configuration and query the related content, please check the [link](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/monitor/operation/MetricConfig) for details.

## Alerts

NeuronEX determines the occurrence of alarm events by polling. Currently, there are 3 types of alarms, after users send alarm configuration, they can specify which rules are needed and the number of times (i.e., N-value, P-value) that each alarm event is triggered or recovered, and NeuronEX will generate alarm triggers or alarm recovery events according to the configuration.

| Alarm Types                                                  | Alarm Objects             | Alarm Trigger Conditions                            | Alarm Trigger Event Generation Conditions | Alarm Resume Event Generation Conditions          |
| ------------------------------------------------------------ | ------------------------- | --------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| Numeric mining driver node anomaly alarm (including southbound and northbound) | Single driver             | Driver is running but not connected                 | Continuous monitoring N times             | Continuous monitoring non-anomalous state P times |
| Stream Processing Engine Rule Exception Alarm                | Single Rule               | Any source, op, sink of a rule increased abnormally | Continuously monitor N times              | Continuously monitor non-exception status P times |
| NeuronEX Restart Alarms                                      | Current NeuronEX Instance | NeuronEX Restart                                    | Monitored only 1 time                     | None                                              |

There are two ways to get these alerts :
1. Configure a webhook address and NeuronEX will automatically push alert events to the specified webhook. 
2. Query the API for the most recently generated alert events.

NeuronEX disables the alarm function by default. Users can call the API to send the alarm configuration and query the related content, please refer to the [link](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/monitor/operation/AlertRuleConfig) for details.

## Monitor Alarm Status

You can view "Log Push Status", "Monitor Push Status" and "Alarm Push Status" in the System Information page under Admin.
