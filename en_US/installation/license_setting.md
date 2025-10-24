# License Management

EMQX Neuron (formerly NeuronEX) comes with a trial license that provides 30 points (30 connections and 30 data tags) of free usage. This allows you to run commercial modules without installing an EMQ license. After exceeding the free usage limit, you must install a valid official EMQ license to use all of EMQX Neuron's features.

## Add License

Licenses can be added multiple times. When you add a license, the old license will be deleted. There are three ways to add a license:

- **Upload License**

  You can directly [contact us](https://www.emqx.com/en/contact?product=neuronex) to apply for a license. After applying for a license, you can enter EMQX Neuron, click **Administration** > **License**, click **Upload License**, and then you can see the detailed information of the license on this page after the upload is successful.

  ![upload-license](_assets/upload-license.png)

<!-- - **Activation Code**

  This method is suitable for users who want to install EMQX Neuron in IOT gateway and quickly register licenses for batches. You need to manually activate EMQX Neuron through a  activation code to achieve license distribution and hardware binding.

  - Users first place an order on the EMQ website to purchase a batch of EMQX Neuron licenses and obtain an order number. You can also contact us.

  - Users go to the [EMQX Neuron License Information Query](https://www.emqx.com/zh/neuronex-license-info) page, enter the order number, the email address associated with the order number, and the verification code to query the information of the current purchased license order. Save the activation code.

    ![license-order](_assets/license-order.png)

  - Enter EMQX Neuron, click **Administration** > **License**, enter the activation code you just saved, click **Activation Code**, EMQX Neuron will obtain the license from the official website and automatically import it. After the activation is successful, re-enter the [EMQX Neuron License Information Query](https://site.mqttce.com/en/neuronex-license-info) page, you will find that the remaining licenses have been reduced. If the hardware device loses the license, you can re-activate the license to the hardware device through the registration activation code. The license is one-to-one corresponding to the hardware identifier of EMQX Neuron. The same device will only reduce 1 license for multiple activations.

    ![register-license](_assets/register-license.png) -->

- **Floating license**

  This method is suitable for EMQX Neuron that is managed or hosted by ECP. After EMQX Neuron is managed by ECP, EMQX Neuron can be assigned tags in the ECP page while it is online. ECP will automatically issue the corresponding floating license to EMQX Neuron. The function of EMQX Neuron will be limited by the points assigned. Please allocate points reasonably.

## View License

You can view the detailed information of a license, regardless of how it was installed, on the license page.

| Field              | Description                                                         |
| :----------------- | :----------------------------------------------------------- |
| Issued At          | The date when the EMQX Neuron license becomes effective.        |
| Expire At          | The deadline by which EMQX Neuron can be used. If the license expires, the system will not function properly. You must obtain a new valid license and re-upload the license. |
| Tags Usage         | The maximum value of data tags that can be created in EMQX Neuron, as well as the number of data tags that are in use. |
| Enabled    Plugins | The plugins that are authorized for EMQX Neuron. Each commercial plugin module can be independently authorized in the EMQ license. |

