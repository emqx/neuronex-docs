# Memory Sink

<span style="background:green;color:white">updatable</span>

This action is used to refresh the results into the theme in memory for easy use by [memory source](../memory.md). This topic is similar to a pubsub topic, such as mqtt, so there may be multiple in-memory targets publishing to the same topic, and there may be multiple in-memory sources subscribing to the same topic. A typical use of memory actions is to form a [rule pipeline](../rule_pipeline.md).

If you want to use the Memory Sink connector, click **Data Processing** -> **Rules** -> **Create Rule**, in the **Action** area, click **Add**, **Sink** Select **memory**.

## Sink configuration

On the page that pops up, make the following settings:

<!-- ::: tip
If you want to save the settings as a template, you can also click **Add Sink Template** to make settings in the pop-up window. The newly added template will be automatically added to the **Sink Templates** list. You can click **Data Processing** -> **Configuration** -> **Sink Templates** of **Resources** View or edit existing Sink templates.
::: -->

- **Name**: Enter a name
- **Topic**: topic, such as analysis/result
- **Rowkind field**: Specify the insert or update action, the default is the insert operation
- **key field**: Specify the field representing the message key. If **Rowkind field** is configured, the **Key field** should also be configured.
- **Omit if content is empty**: Default is False.
- **Send single**: Default is True.
- **Stream format**: Default is `json`.
- **Data template**: Golang template, used to specify the output data format. If no data template is specified, the data will be used as raw input. For a detailed introduction to data templates, see [Data Template](./data_template.md)

After completing the settings, you can click **Test Connection** to confirm the connection. Finally click **Submit** to complete the settings.

## Example

Memory action configuration example:

```json
{
   "memory": {
     "topic": "devices/result"
   }
}
```

Dynamic theme example:

```json
{
   "memory": {
     "topic": "{{.topic}}"
   }
}
```

## Data template

::: v-pre
Data transfer between memory actions and memory sources uses internal formats and is not encoded or decoded to improve efficiency. Therefore, the format-related configuration items of the memory action, except the data template, will be ignored. Memory actions can support data templates to change the result format, but the results of the data template must be in the object form of a JSON string, such as `"{\"key\":\"{{.key}}\"}"`. Array-form JSON strings or non-JSON strings are not supported.
:::

## renew

Memory action support [update](./sink.md#update-action-sink). Can be used to update lookup tables subscribed to the same topic as the sink. A typical usage is to create a rule that uses an updateable sink to cumulatively update the memory table. In the following example, data from the stream alertStream will update the memory topic `alertVal`. The update action is specified by the `action` field in the incoming data.

```json
{
   "id": "ruleUpdateAlert",
   "sql":"SELECT * FROM alertStream",
   "actions":[
     {
       "memory": {
         "keyField": "id",
         "rowkindField": "action",
         "topic": "alertVal",
         "sendSingle": true
       }
     }
   ]
}
```