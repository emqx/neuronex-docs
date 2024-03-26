# System Configuration

NeuronEX supports customization of relevant functions on the Dashboard.

## Data Processing Engine Configuration
After logging into NeuronEX, click on **Administration** -> **System Configuration** on the left side to enter the system configuration page. You can manually enable or disable the data processing engine.

![sys_configuraion](./assets/sys_configuraion_en.png)

:::tip 

Closing the data processing engine will render the data processing function unavailable, so please operation with caution!

:::

## SSO Configuration

NeuronEX utilizes the OAuth 2.0 protocol to implement single sign-on functionality. Users need to configure NeuronEX's single sign-on URL address on the SSO service first. For example, http://127.0.0.1:8085/web/common.

On the NeuronEX dashboard, the access address and relevant parameters of the SSO service need to be configured.

![sso](./assets/sso.png)

:::tip

The Client ID and Client Secret are to be retrieved from the SSO service and must be filled in correctly.
:::
