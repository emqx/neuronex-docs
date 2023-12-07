# Rule pipeline

We can form a rule pipeline by importing the results of previous rules into subsequent rules. By using [memory](./memory.md) as **data source** and **action (Sink)**, we can create a rule pipeline.

## Usage example

The rules pipeline will be implicit. Each rule can use a memory target/source. This means each step will be created individually using the existing api (example shown below).

```shell
#1 Create a source stream
{"sql" : "create stream demo () WITH (DATASOURCE=\"demo\", FORMAT=\"JSON\")"}

#2 Create rules and memory targets
{
   "id": "rule1",
   "sql": "SELECT * FROM demo WHERE isNull(temperature)=false",
   "actions": [{
     "log": {
     },
     "memory": {
       "topic": "home/ch1/sensor1"
     }
   }]
}

#3 Create a stream from the memory topic
{"sql" : "create stream sensor1 () WITH (DATASOURCE=\"home/+/sensor1\", FORMAT=\"JSON\", TYPE=\"memory\")"}

#4 Create another rule to use from the memory topic
{
   "id": "rule2-1",
   "sql": "SELECT avg(temperature) FROM sensor1 GROUP BY CountWindow(10)",
   "actions": [{
     "log": {
     },
     "memory": {
       "topic": "analytic/sensors"
     }
   }]
}

{
   "id": "rule2-2",
   "sql": "SELECT temperature + 273.15 as k FROM sensor1",
   "actions": [{
     "log": {
     }
   }]
}

```

By using the memory topic as a bridge, we now create a rule pipeline: `rule1->{rule2-1, rule2-2}`. Pipelines can be many-to-many and are very flexible.

Note that memory targets can be used with other targets to create multiple rule actions for a rule. And memory source topics can use wildcards to subscribe to a filtered list of topics.