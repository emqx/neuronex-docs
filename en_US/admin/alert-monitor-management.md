# Monitoring and Alert Management

EMQX Neuron provides metric monitoring and alert events, for tracking the state of an instance and being notified when something goes wrong.

::: tip
Both are **disabled by default** and are currently configured and queried through the HTTP API only; there is no configuration screen in the console. Once configured, the push status can be seen on **Administration → System Information**.
:::

## Monitoring metrics

The metrics that can be collected fall into three categories:

| Category | Contents |
| --- | --- |
| Collection engine | Number of southbound and northbound drivers, driver link states, number of drivers in error |
| Data processing engine | Records in and out per rule, number of stopped rules |
| System resources | CPU, memory, and so on |

The monitoring configuration selects which metrics are wanted. They can be retrieved two ways:

| Method | Description |
| --- | --- |
| Push to Pushgateway | With a [Pushgateway](https://github.com/prometheus/pushgateway) address configured, EMQX Neuron pushes metrics to it for Prometheus to scrape |
| API query | Read the current metrics directly from the API |

For the configuration and query endpoints, see the [Monitor API](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/monitor/operation/MetricConfig).

## Alert events

EMQX Neuron evaluates alert conditions by polling. The alert configuration selects which rules are enabled and how many consecutive polls are required to raise and to clear an alert — **N** is the number of consecutive abnormal polls before the event is raised, and **P** the number of consecutive normal polls before it clears.

| Alert type | Subject | Trigger condition | Raised after | Cleared after |
| --- | --- | --- | --- | --- |
| Driver node abnormal (southbound and northbound) | A single driver | The driver is running but not connected | N consecutive polls | P consecutive normal polls |
| Stream processing rule abnormal | A single rule | The error count of any source, operator, or sink in the rule increases | N consecutive polls | P consecutive normal polls |
| EMQX Neuron restart | The current instance | EMQX Neuron restarts | 1 poll | Not applicable |

Alert events can be retrieved two ways:

| Method | Description |
| --- | --- |
| Push to a webhook | With a webhook address configured, EMQX Neuron pushes alert events to it |
| API query | Query the most recent alert events |

For the configuration and query endpoints, see the [Alert Rule API](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html#tag/monitor/operation/AlertRuleConfig).

## Checking push status

**Administration → System Information** shows the current log, monitoring, and alert push status, which confirms whether the configuration has taken effect.
