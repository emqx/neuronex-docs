# Redis

<span style="background:green;color:white">Lookup table</span>

NeuronEX data processing module can receive data from `Redis` source.
::: tip
Redis can only be used as lookup table.
:::

## Create Lookup table

Log in to NeuronEX and click **Data Processing** -> **Sources**. On the **Lookup Table** tab, click **Create Lookup Table**.

In the pop-up **Sources**/**Create** page, enter the following configuration:

- **Table Name**: Enter the stream name
- **Whether the schema table**: Check to confirm whether it is a structured table. If it is a structured table, you need to add further table fields. It can be unchecked by default.
- **Table Type**: select redis
- **Data Source**: The topic to be subscribed, for example topic1.
- **Configuration key**: You can edit and use the default configuration key, or click to add a configuration key and make the following settings in the pop-up dialog box. After the settings are completed, you can click **Test Connection** to test:

   - **Name**: Enter the configuration key name.
   - **Address**: The address of redis service, such as `tcp://127.0.0.1:1883`.
   - **Username**: Optional parameter, MQTT connection username.
   - **Password**: Optional parameter, MQTT connection password.
   - **data type**: The Redis data type, could be string or list. The default is string.
- **Table format**: supports json, binary, protobuf, delimited, custom. Default json format.
   - If you select protobuf or custom, you should also configure the corresponding [mode](./config.md#mode)
   - If you select delimited, you should also configure the delimiter, such as "`,`"

- **key**: Set the key of the table.