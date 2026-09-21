# Processing Data Before Delivery

Collected data can be published as it is, or processed by the rules engine first. This page covers how that step fits into the configuration flow; for the full capability of the rules engine, see [Data Processing](../streaming-processing/overview.md).

## Whether this step is needed

| Situation | How to handle it |
| --- | --- |
| The cloud or upper-level system needs the complete raw data | Skip this step and go to [Create a Northbound Application](./north-apps/north-apps.md) |
| The polling rate far exceeds what the business needs | Aggregate over a time window before publishing — volume drops by two orders of magnitude |
| Values stay unchanged for long periods | Filter conditionally, publishing only when a value moves beyond a threshold |
| Alarms need sub-second response | Keep the decision at the edge, avoiding a cloud round trip and remaining effective while the link is down |
| Units or field names must be normalized before publishing | Do it once at the edge rather than in every downstream system |

Both paths can run at once: some collection groups publish directly while others go through the rules engine.

::: tip
A linear conversion (decimal, bias) or a decimal-place setting does not need the rules engine — configure it on the tag. See [Groups and Tags · Shaping the data](./groups-tags/groups-tags.md#shaping-the-data).
:::

## Three steps to connect it

**1. Feed collected data into the rules engine**

The rules engine receives southbound data as a northbound application. On **Data Collection → North Apps**, find the **Rules Engine Application** that exists by default (node name `DataProcessing`), click `Add Subscription`, and select the southbound driver and collection group to process.

Once subscribed, the group's tags flow into the engine's `neuronStream` stream. See [Rules Engine Application](./north-apps/ekuiper/overview.md).

**2. Create a rule**

On **Data Processing → Rules**, create a rule and describe the processing in SQL. For example, keeping only changes beyond a threshold:

```sql
SELECT * FROM neuronStream WHERE abs(pressure - lag(pressure)) > 0.5
```

For SQL capabilities see the [SQL Reference](../streaming-processing/sqls/overview.md), and for window aggregation see [Windows](../streaming-processing/sqls/windows.md).

**3. Choose where the result goes**

Add a **sink** to the rule to decide where the processed data is written:

| Destination | What to use |
| --- | --- |
| Straight to an external system | MQTT, Kafka, MySQL, InfluxDB, Redis, AWS S3, and more — see [Sink](../streaming-processing/sink/sink.md) |
| Back to the device | [Neuron sink](../streaming-processing/sink/neuron.md), closing a collect → decide → control loop at the edge |
| On to the next rule | [Memory sink](../streaming-processing/sink/memory.md), forming a [rule pipeline](../streaming-processing/rule_pipeline.md) |

::: warning
A rule's sinks and the northbound applications are two independent exits. Processed data leaves through the **sink** and does not pass through a northbound application again; if both are configured, the same collected data is published twice.
:::

## Verify

Enable [rule testing](../streaming-processing/rule_test.md) while creating the rule to see live whether the SQL produces what you expect, instead of diagnosing it after the data reaches a downstream system.

For a hands-on walkthrough, see [Your First Rule](../streaming-processing/first-rule.md).

## Next steps

- To publish without a rule, or to send rule results out through a northbound application — [Create a Northbound Application](./north-apps/north-apps.md)
- Sources, SQL, windows, sinks, and extensions of the rules engine — [Data Processing](../streaming-processing/overview.md)
