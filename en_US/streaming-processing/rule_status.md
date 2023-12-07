# Rule management

We can manage rules on the rules page, including operating rules, importing rules, viewing rule status information, etc.

## View rule information

- **ID**
  
   The unique identifier of the rule, defined by the user.

- **Name**

   The description of the rule is customized by the user.

- **state**

   The running status of the rule, including `running` and `stopped`.

- **Number of alarms**
  
     The number of alarms during rule operation.

- **Last Alarm**
    
     The last alarm information during rule running.

- **operate**

   Including rules `edit`, `start/stop`, `restart`, `topology`, `copy` and `delete`.

<img src="./_assets/rule_list.png" alt="pysam" style="zoom:100%;" />



## Understand the status indicators of rule operation

When a rule is run in NeuronEX, we can understand the current rule running status through the rule indicators. Click the `Status` of the rule to view the rule's status information in the right sidebar. You can obtain the following content:

```json
{
   "status": "running",
   "source_demo_0_records_in_total": 0,
   "source_demo_0_records_out_total": 0,
   ...
   "op_2_project_0_records_in_total": 0,
   "op_2_project_0_records_out_total": 0,
   ...
   "sink_mqtt_0_0_records_in_total": 0,
   "sink_mqtt_0_0_records_out_total": 0,
   ...
}
```

Among them, `status` represents the current running status of the rule, and `running` represents that the rule is running.

The subsequent monitoring items represent the operation status of each operator during the rule running process, and the monitoring items are composed of `operator type_operator information_operator index_specific monitoring items`.

Take `source_demo_0_records_in_total` as an example, where `source` represents the read data operator, `demo` is the corresponding stream, `0` represents the index of the operator instance in the concurrency, and `records_in_total` interprets the actual The monitoring item, that is, how many records the operator has received.

When we try to send a piece of data to the stream, we get the rule status again as follows:

```json
{
   "status": "running",
   "source_demo_0_records_in_total": 1,
   "source_demo_0_records_out_total": 1,
   ...
   "op_2_project_0_records_in_total": 1,
   "op_2_project_0_records_out_total": 1,
   ...
   "sink_mqtt_0_0_records_in_total": 1,
   "sink_mqtt_0_0_records_out_total": 1,
   ...
}
```

It can be seen that the `records_in_total` and `records_out_total` of each operator changed from 0 to 1, which means that the operator received a record and passed a record to the next operator, and finally passed it to the `sink` end. sink wrote 1 record.