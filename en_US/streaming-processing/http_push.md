# HTTP Push

<span style="background:green;color:white;">Stream</span>        <span style="background:green;color:white">Scan table</span>


The NeuronEX data processing module can start an HTTP server internally through the `HTTP Push` type of data source. The default address is `http://0.0.0.0:10081` to receive messages from HTTP clients. This is available in all rules. Share this `HTTP Push` data source. This type can be used as a data source for streams and scan tables.

:::tip Tips
When any rule using the `HTTP Push` source is started, the HTTP server will start running and port 10081 will be opened. When all rules using the httppush source are closed, the HTTP server will shut down and port 10081 will be closed.
:::

If you use Docker to deploy NeuronEX, you need to add the `-p 10081:10081` parameter to the `docker run` command to map the 10081 port in the container to the 10081 port of the host before you can use the `HTTP Push` source normally.

```bash
## run NeuronEX
$ docker run -d --name neuronex -p 8085:8085 -p 10081:10081 --log-opt max-size=100m emqx/neuronex:latest
```

## Create stream

Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Stream** tab, click **Create Stream**.

In the pop-up **Source**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Check to confirm whether it is a structured stream. If it is a structured stream, you need to add further stream fields. It can be unchecked by default.
- **Stream Type**: Select httppush
- **Data Source**: Specify the path portion of the URL, for example /api/data.
   :::tip Tips
   The HTTP server address started by the httppush type data source is `http://0.0.0.0:10081`, **data source (URL Endpoint)** is filled in as `/api/data`, then the complete HTTP request address is: `http://0.0.0.0:10081/api/data` .
   :::
- **Configuration key**: You can use the default configuration key. If you want to customize the configuration key, click to add a configuration key:
   - **Name**: Enter the configuration key name.
   - **Request method**: HTTP request method, which can be POST or PUT.
- **Stream format**: supports json, binary, protobuf, delimited, custom. Default json format.
- **Shared**: Check to confirm whether to share the source.



## Create scan table

HTTP Push sources support lookup tables. Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Scan Table** tab, click **Create Scan Table**.

- **Table Name**: Enter the table name
- **Whether the schema stream**: Check to confirm whether it is a structured table. If it is a structured table, you need to add further table fields. It can be unchecked by default.
- **Table Type**: Select httppush.
- **Data source**: Specify the path part of the URL and concatenate it with the URL attributes to form the final URL, such as /api/data.
- **Configuration key**: You can use the default configuration key. If you want to customize the configuration key, please refer to the [Create Stream](#create-stream) section.
- **Table format**: supports json, binary, protobuf, delimited, custom. Default json format.
- **Retain Size**: Specify the Retain size.

