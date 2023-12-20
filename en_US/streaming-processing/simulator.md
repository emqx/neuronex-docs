# Simulator

<span style="background:green;color:white;padding:1px;margin:2px">Stream</span>
<span style="background:green;color:white;padding:1px;margin:2px">Scan table</span>

The NeuronEX data processing module can generate simulation data through the `Simulator` type of data source and provide a test data source when creating or updating rules.

## Create stream

Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Stream Management** tab, click **Create Stream**.

In the pop-up **Source**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Unchecked.
- **Stream Type**: Select simulator
- **Configuration key**: You can edit and use the default configuration key, or click to add a configuration key and make the following settings in the pop-up dialog box. 

   - **Name**: Enter the configuration key name.
   - **Loop**: If set to true, multiple pieces of json data defined in data will be sent in a loop.
   - **Interval**: The time interval (milliseconds) between sending requests.
   - **Message**: Customize json format message content and support defining multiple json messages.

- **Stream format**: supports json, binary, protobuf, delimited, custom. Select json format.
- **Shared**: Check to confirm whether to share the source.



