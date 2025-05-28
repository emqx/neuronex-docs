# Kafka Source

<span style="background:green;color:white;padding:1px;margin:2px">Stream</span>

The NeuronEX data processing module retrieves data from Kafka through the Kafka message source.

## Create Stream

Log in to NeuronEX, click **Data Processing** -> **Sources**. In the **Stream Management** tab, click **Create Stream**.

In the pop-up **Source** / **Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Is Structured Stream**: Unchecked
- **Stream Type**: Select Kafka
- **Configuration Group**: You can edit using the default configuration group, or click Add Configuration Group. In the pop-up dialog, configure as follows. After configuration, you can click **Test Connection** to test:

  - **Name**: Enter the configuration group name
  - **Brokers**: Enter Kafka addresses, separated by ","
  - **Group ID**: The group ID used when consuming Kafka messages
  - **Partition**: Enter Kafka partition
  - **SASL Auth Type**: Select SASL authentication type
  - **SASL Username**: Enter SASL username
  - **SASL Password**: Enter SASL password
  - **Client Certificate**: Enter the path to the crt file for Kafka client SSL verification
  - **Client Private Key**: Enter the path to the key file for Kafka client SSL verification
  - **CA File**: Enter the path to the ca certificate file for Kafka client SSL verification
  - **Skip Certificate Verification**: Whether to skip SSL verification
  - **Max Bytes**: Maximum bytes that a single Kafka message batch can carry, default is 1MB
- **Stream Format**: Supports json, binary, protobuf, delimited, custom
- **Shared**: Check to confirm whether to share the source