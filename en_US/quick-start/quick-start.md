# Quick Start

This tutorial walks through one complete pipeline in five steps: start EMQX Neuron, generate data with the built-in simulator, collect it through a southbound driver, check the values in data monitoring, and forward them to an MQTT broker through a northbound application.

![Quick start pipeline: the Modbus simulator feeds a southbound driver, data monitoring shows the values, a northbound MQTT application forwards them to the broker, and MQTTX subscribes to verify](./_assets/quick-start-pipeline.jpg)

## Before you start

| What you need | Notes |
| --- | --- |
| Docker | To run EMQX Neuron. For other install methods, see [Installation](../installation/introduction.md) |
| A browser | To reach the EMQX Neuron console |
| An MQTT client | To verify data in the last step — [MQTTX](https://www.emqx.com/en/products/mqttx) is a good choice |

## Step 1 · Start EMQX Neuron

Pull the image and start the container:

```bash
docker pull emqx/neuronex:latest
docker run -d --name neuronex -p 8085:8085 --log-opt max-size=100m emqx/neuronex:latest
```

Open `http://127.0.0.1:8085` in a browser and sign in with the default account **admin** / **0000**.

![login](./_assets/login.png)

## Step 2 · Start the built-in simulator

EMQX Neuron ships with a Modbus TCP simulator that produces live data, so you do not need a real PLC to get started.

1. Go to **Data Collection → Modbus TCP Slave Simulator**.
2. Click `Start Simulator`. The simulator is off by default and consumes no resources until you start it.
3. Add tags — up to 10, with simulation types `sine`, `ramp`, `square`, or `random`. Addresses are assigned automatically.
4. Click `Save Tag Configuration`. The simulator starts producing data.

The simulator listens on port `502` inside the same container as EMQX Neuron, so there is no cross-machine networking involved. For full details, see [Modbus TCP Slave Simulator](../configuration/modbus-simulator.md).

::: tip Shortcut
On the simulator page, click `Download Southbound Driver Configuration`. The file already contains every tag. Import it on the **Data Collection → South Devices** page and you can skip straight to [Step 4](#step-4-view-the-collected-data). Work through Step 3 manually to see how drivers, groups, and tags fit together.
:::

## Step 3 · Add a southbound driver and configure tags

A southbound driver talks to the device. Here the Modbus TCP driver reads from the simulator.

### Create the driver node

On **Data Collection → South Devices**, click `Add Device`:

![south-add](./_assets/south-add1.png)

| Field | Value |
| --- | --- |
| Name | `modbus-tcp` |
| Driver | Select **Modbus TCP** |
| Connection mode | `Client` |
| IP address | `127.0.0.1` (the simulator runs in the same container) |
| Port | `502` |
| Connection timeout | `3000` |

![south-setting](./_assets/south-setting.png)

A new driver shows as **Disconnected** at first. That is expected — EMQX Neuron only starts issuing read requests once tags are configured.

![south-status](./_assets/south-status.png)

::: tip
Every protocol takes a different set of parameters. For the full parameter reference per driver, see [Southbound Drivers](../introduction/driver-list/driver-list.md).
:::

### Create a group

Click the **modbus-tcp** node to open its group list, then click `Create Group`:

![group-add](./_assets/group-add.png)

| Field | Value |
| --- | --- |
| Group name | `group-1` |
| Interval | `1000` (milliseconds — one poll per second) |

The group is the unit of collection and reporting; every tag in a group is polled at the same interval.

### Add a tag

Open `Tag List` on **group-1**, then click `Add Tag`:

![tags-add](./_assets/tags-add.png)

| Field | Value |
| --- | --- |
| Name | `pressure` |
| Attribute | `Read` |
| Type | `int16` |
| Address | The tag's address in the simulator, written as `slave!register` — for example `1!40001` |

::: tip
In `1!40001`, `1` is the slave address and `40001` is the holding-register address. Address formats differ per driver; see the relevant driver page.
:::

Once the tag is created the node should move to **Running** / **Connected**. If it still shows **Disconnected** after a few seconds, check that the port is reachable from inside the container:

```bash
docker exec -it neuronex telnet 127.0.0.1 502
```

## Step 4 · View the collected data

Go to **Data Collection → Data Monitoring** and select the `modbus-tcp` device and the `group-1` group. Tag values update live as the simulator runs.

![data-monitoring](./_assets/data-monitoring.png)

If values refresh here, the collection path works.

## Step 5 · Forward to MQTT

### Create a northbound application

On **Data Collection → North Apps**, click `Add Application`:

![north-add](./_assets/north-add.png)

| Field | Value |
| --- | --- |
| Name | `mqtt` |
| Application | Select **MQTT** |

The application configuration page opens automatically:

![north-setting](./_assets/north-setting.png)

| Field | Value |
| --- | --- |
| Broker address | `broker.emqx.io` (the public EMQX broker) |
| Broker port | `1883` |

After you submit, the application card moves to **Running**.

### Subscribe to southbound data

Data is reported per **group**, so you choose which groups to publish. On the MQTT application, click `View Subscriptions` → `Add Subscription`:

![subscription](./_assets/subscription.png)

| Field | Value |
| --- | --- |
| Topic | The default is fine — note it down |
| Southbound data | Select `group-1` under `modbus-tcp` |

### Verify with an MQTT client

Open MQTTX, create a connection (Host `broker.emqx.io`, Port `1883`), and subscribe to the topic you noted:

![mqttx](./_assets/mqttx.png)

A steady stream of messages from EMQX Neuron means the whole pipeline is working.

## Next steps

- **Connect a real device** — find your protocol or CNC model in [Southbound Drivers](../introduction/driver-list/driver-list.md); parameters and address formats are documented per driver.
- **Send data elsewhere** — beyond MQTT there is AWS IoT, Azure IoT, Sparkplug B, and Kafka, plus an OPC UA Server for on-site systems. See [Northbound Applications](../configuration/north-apps/catalog.md).
- **Process data at the edge** — filter, convert, and aggregate before publishing. See [Your First Rule](../streaming-processing/first-rule.md).
- **Deploy to production** — see [Installation](../installation/introduction.md).
