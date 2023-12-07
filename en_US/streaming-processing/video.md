# Video

<span style="background:green;color:white;padding:1px;margin:2px">Stream</span>
<span style="background:green;color:white;padding:1px;margin:2px">Scan table</span>

The NeuronEX data processing module can receive pictures from video streams through `Video` type data sources.

## Create stream

Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Stream Management** tab, click **Create Stream**.

In the pop-up **Source**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Unchecked.
- **Stream Type**: Select Video
- **Configuration key**: You can edit and use the default configuration key, or click to add a configuration key and make the following settings in the pop-up dialog box. 

   - **Name**: Enter the configuration key name.
   - **Path**: Enter the video source URL path address.
   - **Interval**: The time interval (milliseconds) between sending requests.
 
- **Stream format**: supports json, binary, protobuf, delimited, custom. Select binary format.
- **Shared**: Check to confirm whether to share the source.
