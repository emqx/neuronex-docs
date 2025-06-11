# System Configuration

NeuronEX supports customization of relevant functions on the Dashboard.

## Data Processing Engine Configuration

### Enable Data Processing Engine
After logging into NeuronEX, click on **Administration** -> **System Configuration** on the left side to enter the system configuration page. You can manually enable or disable the data processing engine.

![start_ekuiper_en](assets/start_ekuiper_en.png)

:::tip 

Closing the data processing engine will render the data processing function unavailable, so please operation with caution!

:::

### Enable Metrics Collection

When the metrics collection is enabled, the metrics of the data processing engine will be collected and stored in the local file directory.

When the metrics collection is enabled, on the **Logs** -> **Log Management** page, click the **Download Data Processing Engine Logs** button to download the complete logs and metrics files. Click the **Download Custom Log Metrics File** button to select the logs or metrics files to download.

![metrics_en](assets/metrics_en.png)

## Data Storage Configuration

Starting from NeuronEX v3.6.0, the Datalayers time-series database is integrated to persistently store collected data at the edge. You can configure data storage-related parameters here.

![data_storage_config_en](assets/data_storage_config_en.png)

*   **Time-Series Database (Datalayers):**
    *   **Toggle Switch:** Use this switch to **enable or disable** the operation of the built-in Datalayers service.
        *   **Enabled:** NeuronEX will start the integrated Datalayers service, and southbound driver data subscribed to in the northbound DataStorage plugin will be written to this database. This will allow you to use the features of the Data Insights module (Data Analysis, Dashboards).
        *   **Disabled:** The Datalayers service will stop, and data will no longer be stored in the built-in database. Stored data will be inaccessible while the service is stopped.

:::tip Note
Enabling the Datalayers service will consume certain system resources (CPU, memory, disk). Please decide whether to enable it based on your hardware configuration and business needs. Datalayers does not start with NeuronEX by default.
:::

*   **Data Storage TTL (Days):**
    *   **Input Field:** Used to set the retention period (Time To Live) for data in Datalayers, in "days". For example, entering `10` means data will be retained for 10 days, and older data will be automatically cleared.
    *   **+/- Buttons:** Used to conveniently increase or decrease the TTL in days.
    *   **Minimum Value:** (Please specify the minimum effective TTL value based on actual conditions, e.g., 1 day)

*   **Save Data Storage TTL Configuration:**
    *   **Button:** After modifying the "Data Storage TTL (Days)" value, you need to click this button to save the changes and apply the new TTL settings.

:::tip Note
*   After enabling the Datalayers service for the first time, NeuronEX will automatically create the required `neuronex` database and corresponding tables for data types (`neuron_int`, `neuron_float`, `neuron_bool`, `neuron_string`).
*   Properly configuring TTL is crucial for managing disk space usage. Please set an appropriate TTL value based on your data volume, disk capacity, and historical data query needs.
:::

## AI Agent

The AI Agent service is a core component for the [**AI Data Analysis Assistant**](../datainsights/data_analysis.md) and [**AI Generate Function**](../best-practise/llm-portable-plugin.md) features in NeuronEX, responsible for interacting with configured AI models.

*   **Enable AI Agent:**
    *   **Toggle Switch:** Use this switch to **enable or disable** the AI Agent service.
        *   **Enabled:** The AI Agent service will start, allowing users to use the AI Data Analysis feature in the Data Analysis module.
        *   **Disabled:** The AI Agent service will stop, and the AI Data Analysis feature will be unavailable.
    *   **Dependencies:** To successfully use the AI Agent service, you also need to correctly configure and enable at least one AI model in the "System Configuration" -> [**AI Model Configuration**](#ai-model-configuration) tab.
    *   **Environment:** Using the AI Agent requires a corresponding Python runtime environment and related dependencies. In Docker images (such as `emqx/neuronex:3.6.0-ai` and `emqx/neuronex:3.6.0-ai-arm64`), the Python runtime environment and related dependencies are pre-installed, allowing users to use this feature directly. If using other NeuronEX installation packages, please ensure that the Python runtime environment and related dependencies have been correctly configured according to the [AI Feature Environment Configuration Guide](#ai-feature-environment-configuration-guide).

:::tip Note
*   Disabling the AI Agent service will make the **AI Data Analysis** and **AI Generate Function** features unusable. Please ensure this service is enabled when needed and that AI models are correctly configured.
*   Enabling the AI Agent service will consume certain system resources (CPU, memory). Please decide whether to enable it based on your hardware configuration and business needs.
*   Ensure network connectivity between NeuronEX and the configured AI models.
:::

### AI Feature Environment Configuration Guide

1.  Download the corresponding installation package according to the current environment, for example: `neuronex-3.6.0-linux-amd64.deb`.
2.  Refer to the documentation [Install NeuronEX](../installation/introduction.md).
3.  Navigate to the AI feature module directory. The default directory for AI features in a systemd-managed NeuronEX is: `/opt/neuronex/software/neuronex-ai`.
4.  NeuronEX AI features use `uv` as the project management tool. If `uv` is not installed, you need to install it first. For details, refer to: [Installing uv](https://docs.astral.sh/uv/getting-started/installation/).
5.  After `uv` is successfully installed, use the following command to test if the AI features can start normally: `uv sync && cd src/apps_entry && uv run main.py`.
6.  If the above command displays the following prompt, it means the AI-related dependency libraries have been successfully installed:
    ![neuronex ai hint](./assets/neuronex-ai-install.png)
7.  If your environment cannot install `uv` and its dependencies normally, you can look for available domestic mirror repositories, or use NeuronEX container images with the `-ai` or `-ai-arm64` suffix to deploy the NeuronEX service. These images already have the complete AI features.


## SSO Configuration

NeuronEX utilizes the OAuth 2.0 protocol to implement single sign-on functionality.

### AIoT

Configure the Single Sign-On (SSO) URL address for NeuronEX on the AIoT platform in the format: [NeuronEX Access Address]/web/common. e.g, http://127.0.0.1:8085/web/common.

The AIoT platform provides the client identifier (App Key) and client secret (App Secret) for the NeuronEX configuration page.

On the NeuronEX page, you need to configure the access address of the SSO service and the related parameters.

![AIoT](./assets/AIoT.png)

:::tip

The fields for Scope, Grant Type, Request Method, and Content Type need to be filled out according to the platform requirements.

:::

### Azure

On the Azure platform, navigate to Microsoft Entra ID -> App registrations page, find the corresponding App, and fill in the Single Sign-On (SSO) URL address for NeuronEX in the same format as before.

![azure](./assets/azure-1.png)

On the Overview page, obtain the client identifier (client id) and provide it to the NeuronEX configuration page.

On the Certificates & secrets page, obtain the client secret and provide it to the NeuronEX configuration page.

On the Overview -> Endpoints page, obtain the authorization endpoint URL and token endpoint URL.

![azure](./assets/azure-2.png)

On the NeuronEX page, you need to configure the SSO service access address and the related parameters.

![azure](./assets/azure.png)

:::tip

The fields for Scope, Grant Type, Request Method, and Content Type need to be filled out according to the platform requirements.

:::

## Network Connection Test

Enter the device IP to confirm whether NeuronEX can access the device IP address:

![alt text](./_assets/network-test.png)

## Backup and Restore

Backup refers to the complete export of all configurations of NeuronEX; restore refers to re-importing the exported backup, which will overwrite the original configuration.

All configurations include nodes, tags, rules, files, certificates, and all other configuration information.

:::tip 
During the restore process, NeuronEX will automatically restart.
:::

## Agent Configuration

When there is an IP change or network address translation after NeuronEX is deployed, and the ECP cannot directly access the NeuronEX service through the IP address, by configuring the agent function, the NeuronEX side configures the connection information on the ECP side, actively initiates the connection, and the ECP realizes Subsequent remote management function.

### Enable Agent Function

In the above situation in order to be managed by ECP, the agent function needs to be enabled on NeuronEX. Click `Administration` -> `System Configuration` -> `Agent Configuration`, click the `Enable Agent` and edit the MQTT information connected to ECP, as shown in the figure below.
![agent config](./assets/ecp_agent_connect.png)

* **ECP Service Address**: NeuronEX communicates with ECP through the MQTT protocol. Fill in the MQTT Broker connection address deployed by ECP here.
* **Username**: Authentication information filled in through username and password authentication when connecting to MQTT Broker.
* **Password**: Same as above.
* **Description**: The registration description information of the NeuronEX to facilitate the ECP side to identify the NeuronEX.

In addition, if MQTT Broker requires mutual certificate authentication, the SSL/TLS function needs to be enabled. As shown below.
![agent config tls](./assets/ecp_agent_connect_tls.png)

When the above information is confirmed to be correct, click `Save Agent Configuration` and NeuronEX will register with ECP. Users can manage this NeuronEX after activating it on the ECP side.

### Disable Agent Function

Users can disable agent function by turning off the `Enable Agent` button and clicking `Save Agent Configuration`.


## Traces

The traces function is used to trace the detailed processing of data collection, processing analysis, and forwarding in NeuronEX. It can be applied to the following scenarios:

- Downstream MQTT Control Command Tracing

    NeuronEX can combine with EMQX V5 to perform full link tracing of MQTT control commands issued to the application side, monitoring the delay of the entire link control and analyzing the delay information of each node, applicable to scenarios with high requirements for control delay, for fault analysis.

- NeuronEX API Control Command Tracing

    It can record the detailed process of control commands issued by NeuronEX API, analyzing the complete link and delay from NeuronEX sending commands to the device to receiving the device's response, applicable to scenarios with high reliability requirements for control command issuance, for fault analysis.

- Data Collection Tracing

    It can record data collection, data calculation, and data tracing combined with EMQX, applicable to scenarios such as collection delay detection and data loss detection.

- Edge Computing Data Tracing

    It can record the detailed process of each operator's computation during edge computing, as well as the data results after processing by each operator.

### Configuration Instructions
- **Enable OpenTelemetry Tracing**: Enable the tracing function.
- **OpenTelemetry Service Address**: Fill in the OpenTelemetry service address, and NeuronEX will send tracing data to this address. EMQX ECP integrates the OpenTelemetry service, and users can directly use the OpenTelemetry service address of EMQX ECP.

::: tip

The OpenTelemetry service address of EMQX ECP should use the [ip]:[port] format, such as `192.168.1.100:4318`, without the `http://` prefix.

:::

- **Service Name**: Fill in the service name. When NeuronEX reports tracing data, it will use this service name to distinguish the tracing data reported by different NeuronEX.
- **Tracing API and Downstream MQTT Control Commands**: Enable tracing for API and downlink MQTT control commands. If using downlink MQTT control commands, the MQTT plugin's MQTT version must be set to 5.0 on the northbound application page.
- **Tracing Data Collection Messages**: Enable tracing for data collection messages. Once enabled, NeuronEX will report all tracing data of southbound driver collection messages to the OpenTelemetry service. (Currently only supports FINS TCP、FINS UDP、Mitsubishi 3E、Mewtocol、Modbus RTU/TCP  drivers)
- **Tracing Data Sampling Rate**: Fill in the tracking data sampling rate. Range: `0-1`.  1 indicates a 100% sampling rate for full tracing, while 0.1 indicates a 10% sampling rate for tracing. This parameter is only valid when `Tracing Data Collection Messages` is enabled.

:::tip 
Enabling traces function will incur certain performance overhead for NeuronEX, please enable it according to actual needs.
:::

![traces_en](assets/traces_en.png)

### Enable Rule Tracing Separately
On the rules page, click the `Enable Tracing` button in the rule operation column to directly enable tracing for that rule.

![rule_traces_en](assets/rule_traces_en.png)

### NeuronEX API Control Command Tracing

When sending API requests to NeuronEX, the `tracestate: tracer=start` parameter must be added to the Header for NeuronEX to record the tracing data of that API request. For example, in Postman, as shown in the figure below.

![trace_postman](assets/trace_postman.png)

After enabling the traces function, on the NeuronEX data monitoring page, click `write` to send data to the device, which will automatically record the tracing data for that API request.

:::tip Note

Other API operations performed on the NeuronEX Dashboard will not record tracing data.

:::

### Downstream MQTT Control Command Tracing

To implement downstream MQTT control command tracing, the following conditions must be met:

- The northbound application page must set the MQTT plugin's MQTT version to 5.0, as shown in the figure:

![mqtt_version_en](assets/mqtt_version_en.png)

- Use EMQX V5 and enable OpenTelemetry Traces function, configured as shown in the figure:

![trace_emqx_en](assets/trace_emqx_en.png)

- The third-party MQTT client must support the MQTT V5.0 protocol and, when sending MQTT messages, add the following attribute in the user properties:
`traceparent: 00-cce3a024ca134a7cb4b41e048e8d98de-cef47eaa4ebc3fae-01`

    For example, using MQTTX, as shown in the figure below:

![trace_mqttx](assets/trace_mqttx.png)

## AI Model Configuration

NeuronEX supports configuring AI models in the system configuration page, and using AI models to generate Python plugins.

In the NeuronEX **System Configuration** -> **AI Model Configuration** page, add a LLM model, including the LLM model type, API Key, Endpoint address, and model name. Currently, NeuronEX supports the following models:

| <div style="width:100pt">Model Vendor</div> | <div style="width:120pt">Endpoint Address</div> | <div style="width:120pt">Model Name</div> |
| ------------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| DeepSeek | `https://api.deepseek.com` | `deepseek-chat` <br> `deepseek-reasoner` |
| SiliconFlow | - | `Pro/deepseek-ai/DeepSeek-V3` <br> `deepseek-ai/DeepSeek-V3` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o` <br> `o1-mini` <br>  `o3-mini` |
| Azure OpenAI | Obtain from Azure official website | `gpt-4o` <br> `gpt-4.1` <br> `o1` <br> `o3-mini` <br> `gpt-4.5-preview` <br> `gpt-4.1-mini` <br> `o4-mini` |

You can obtain API Keys from the official websites of these model vendors, add model configurations on the NeuronEX page, and enable them. Multiple large models can be configured on the page simultaneously, but only one model can be enabled for use.

![alt text](_assets/llm-config-en.png)

::: tip
1. Please ensure that NeuronEX can connect to the internet normally and access the model's API.
2. Small models or excessively outdated models will affect the quality of generated Python plugins. The models in the above table are recommended, and new models released by various vendors can also be used in the future.
:::