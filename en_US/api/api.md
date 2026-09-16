# HTTP API

EMQX Neuron provides REST APIs for management and monitoring, following the OpenAPI (Swagger) 3.1 specification and covering system administration, collection configuration, and runtime statistics.

Once the service is running, open `http://<gateway address>:8085/api-docs/index.html` for the full interface documentation, where requests can also be issued directly from the Swagger UI. An online copy is available as the [API reference](https://docs.emqx.com/en/neuronex/latest/api/api-docs.html).

| Page | Contents |
| --- | --- |
| [JWT Authentication](./jwt.md) | The API uses JWT authentication; this page covers obtaining and using a token |
| [Driver and Application Settings](./plugin-setting.md) | The parameter structure for configuring each southbound driver and northbound application through the API |
| [Data Types](./data-type.md) | How tag data types are represented in the API |
| [Error Codes](./error-code.md) | Every error code and its meaning, for diagnosing failed calls |

::: tip
For a worked example of controlling a device through the API, see [Data Monitoring and Device Control](../admin/monitoring.md#device-control).
:::
