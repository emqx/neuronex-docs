# MQTT 

<span style="background:green;color:white;">Stream</span>        <span style="background:green;color:white">Scan table</span>


NeuronEX data processing module can receive data from MQTT Broker through `MQTT` type data source and process and analyze it through rules.

## Create stream

Log in to NeuronEX and click **Data Processing** -> **Sources**. On the **Stream** tab, click **Create Stream**.

In the pop-up **Sources**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Check to confirm whether it is a structured stream. If it is a structured stream, you need to add further stream fields. It can be unchecked by default.
- **Stream type**: select mqtt
- **Data source** (MQTT topic): The MQTT topic to be subscribed to, for example topic1.
- **Configuration key**: You can edit and use the default configuration key, or click to add a configuration key and make the following settings in the pop-up dialog box. After the settings are completed, you can click **Test Connection** to test:

   - **Name**: Enter the configuration key name.
   - **Server address**: The server of the MQTT message broker, such as `tcp://127.0.0.1:1883`.
   - **Username**: Optional parameter, MQTT connection username.
   - **Password**: Optional parameter, MQTT connection password.
   - **MQTT protocol version**: MQTT protocol version, supports 3.1 or 3.1.1, the default is 3.1.1.
   - **Client ID**: Client ID of the MQTT connection. If not specified, a uuid will be used.
   - **QoS Level**: The default QoS level is 0, optional values: 0, 1, 2.
   - **Certificate Type**: Optional parameter, fill in the certificate path, which can be an absolute path or a relative path. If a relative path is specified, the parent directory is the path where the neuronex command is executed. Example value: `/var/xyz-certificate.pem`
   - **Private key path**: Optional parameter, which can be an absolute path or a relative path. Example value: `/var/xyz-private.pem.key`
   - **Root Certificate Path**: Optional parameter to verify the server certificate. It can be an absolute path or a relative path. Example value: `/var/xyz-rootca.pem`
   - **Skip certificate verification**: Defaults to False. If set to True, certificate verification will be skipped, otherwise certificate verification will be performed.
   - **Decompression**: Leave blank by default to not decompress. Decompress MQTT Payload using the specified compression method, optional values: zlib, gzip, flate.
- **Stream format**: supports json, binary, protobuf, delimited, custom. Default json format.
   - If you select protobuf or custom, you should also configure the corresponding [mode](./config.md#mode)
   - If you select delimited, you should also configure the delimiter, such as "`,`"

- **Shared**: Check to confirm whether to share the source.

## Create scan table

MQTT sources support lookup table. Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Scan Table** tab, click **Create Scan Table**.

- **Table Name**: Enter the table name
- **Whether the schema stream**: Check to confirm whether it is a structured stream. If it is a structured stream, you need to add further stream fields. It can be unchecked by default.
- **Table Type**: Select mqtt.
- **Data source** (MQTT topic): The MQTT topic to be subscribed to, for example topic1
- **Configuration key**: You can use the default configuration key. If you want to customize the configuration key, please refer to the [Create Stream](#Create Stream) section
- **Table format**: supports json, binary, delimited, custom.
   - If you select custom, you should also configure the corresponding [mode](./config.md#mode)
   - If you select delimited, you should also configure the delimiter, such as ","

- **Retain Size**: Specify the Retain size.