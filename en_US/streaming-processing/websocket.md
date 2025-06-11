# Websocket Source Connector

<span style="background:green;color:white;">stream</span> <span style="background:green;color:white;">Scan table</span>

The NeuronEX data processing module acquires data via the Websocket data source.

## Create Stream

Log in to NeuronEX, click **Data Processing** -> **Sources**. In the **Stream Management** tab, click **Create Stream**.

In the pop-up **Source** / **Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Is Structured Stream**: Unchecked
- **Stream Type**: Select Websocket
- **Configuration Key**: You can edit using the default configuration group, or click Add Configuration Group. In the pop-up dialog, configure as follows:

  - **Name**: Enter the configuration group name
  - **Websocket Address**: Enter the Websocket server address
  - **Client Certificate**: Enter the path to the crt file for Websocket client SSL verification
  - **Client Private Key**: Enter the path to the key file for Websocket client SSL verification
  - **CA File**: Enter the path to the ca certificate file for Websocket client SSL verification
  - **Skip Certificate Verification**: Whether to skip SSL verification
- **Stream Format**: Supports json, binary, protobuf, delimited, custom
- **Shared**: Check to confirm whether to share the source

## As a Websocket Client

A Websocket data source can act as a Websocket client, initiating a Websocket connection to a remote Websocket server and receiving data over that connection as a message source.

When acting as a Websocket client, you need to specify the `Websocket Address`, for example: `127.0.0.1:8080`; and fill in the `Data Source` configuration item on the create data source page as follows: `/api/data`;

At this point, the Websocket data source will act as a Websocket client, establishing a Websocket connection to `127.0.0.1:8080/api/data` and receiving data over this connection as a message source.

## As a Websocket Server

A Websocket data source can also act as a Websocket server. In this case, a remote Websocket client can actively initiate a Websocket connection to NeuronEX, and NeuronEX will receive messages over that Websocket connection as a message source.

When acting as a Websocket server, the `Websocket Address` can be left blank, and the `Data Source` configuration item can be configured as follows: `/api/data`;

At this point, NeuronEX will act as a Websocket server, using itself as the host, and waiting for Websocket connections to be established at the `/api/data` URL, receiving data over these connections as a message source.

The default Websocket port is 10081. To modify this port, you need to change it in the `source` section of the configuration file located at `/opt/neuronex/software/ekuiper/etc`:

```yaml
source:
  ## Configurations for the global websocket server for websocket source
  # HTTP data service ip
  httpServerIp: 0.0.0.0
  # HTTP data service port
  httpServerPort: 10081
  # httpServerTls:
  #    certfile: /var/https-server.crt
  #    keyfile: /var/https-server.key
```

Users can specify the following properties:

- `httpServerIp`: IP to bind the Websocket data server.
- `httpServerPort`: Port to bind the Websocket data server.
- `httpServerTls`: Configuration of the Websocket server's TLS.

The global server initializes when any rule requiring an Websocket source is activated. It terminates once all associated rules are closed.

