# 流管理

流是 NeuronEX 中数据源接入的主要运行方式，用户可通过选择数据源类型及配置参数来定义如何连接到外部资源。数据流中有数据流入时，都会触发规则中的计算。

## 流数据源

目前内置支持以下流类型： 

| 名称                        | 描述                                       |
| --------------------------- | ------------------------------------------ |
| [Neuron](./neuron.md)       | 从 NeuronEX 数采模块读取数据                 |
| [MQTT](./mqtt.md)           | 从 MQTT 主题读取数据                       |
| [HTTP pull](./http_pull.md) | 从 HTTP 服务器中拉取数据                   |
| [HTTP push](./http_push.md) | 通过 HTTP 推送数据到 NeuronEX              |
| [内存](./memory.md)         | 从 NeuronEX 内存主题读取数据以形成规则流水线 |
| [SQL](./redis.md)         | 从数据库中查询数据                        |
| [文件](./file.md)           | 从文件中读取数据                           |
| [Video](./video.md)         | 从视频流中查询数据                        |

## 创建流

在 NeuronEX 页面，点击**数据流处理** -> **源管理**，在流管理页面，点击**创建流**按钮即可进行流的创建。

![stream](./_assets/stream.png)

### 流参数配置

- **是否为带结构的流**

  NeuronEX 支持带结构/无结构的流，默认为无结构。即在 **源管理** -> **创建流** 时，`是否为带结构的流`选项不打勾。详细说明请参考[数据结构](#数据结构)。
  - 无结构的流 

  Schemaless，用户无需定义任何形式的 schema，主要用于弱结构化数据流，或数据结构经常变化的情况。

  - 带结构的流

  用户在 数据源(Source) 层定义数据schema。适用于用户的数据有固定或大致固定的格式。

  :::tip 提示
  部分数据格式本身带有数据结构，例如 `protobuf` 格式。用户在创建源时可以定义 `流格式` 来指向模式注册表 ( Schema Registry ) 中的数据结构定义。此时，数据源的数据结构将会被模式注册表中的定义覆盖。有关模式的详细介绍，查阅 [模式](./config.md#模式) 章节。
  :::

- **流类型**

  NeuronEX 支持多种流类型，具体可参考 [流数据源](#流数据源)。

- **数据源**

  取决于不同的数据源类型；如果是 MQTT 源，则为 MQTT 数据源主题名；其它源请参考相关文档。

- **配置组**

  定义各类型数据源的相关配置项，具体可参考相关文档，每个数据源均提供了 `default` 配置组，可供参考。

- **流格式**

  用于定义传入的数据类型，支持 `json`、`protobuf`、`binary`、`delimited` 和 `custom`，默认为 `json` 。以下为其他流格式的介绍：

  - delimited

    对于 CSV 文件数据源，需选择 `delimited` 格式，还应指定分隔符来区分数据字段，如 "`,`"

  - protobuf
  
    Protobuf 是一种序列化结构数据的方式，当流格式设置为 `protobuf` 时，还应配置解码时使用的模式。模式可在 **数据流处理** -> **配置** -> **模式**中定义。有关模式的详细介绍，查阅 [模式](./config.md#模式) 章节。

  - Binary
  
    对于二进制数据流，例如图像或者视频流，需要指定数据格式为 `binary` 。

  - custom
  
    `custom` 是由用户自定义的数据格式 。

<!-- ### 时间戳与时间戳格式

时间戳代表该事件的时间戳。如设置，则使用此流的规则将采用事件时间；否则将采用处理时间。

时间戳格式为字符串和时间格式转换时使用的默认格式。 -->

- **共享 (SHARED)**

默认情况下，`SHARED` 属性设置为 `false` 。如果用户希望多个规则共享同一个数据源实例，可以将 `SHARED` 属性设置为 `true` 。

- 共享数据源为`false`时，每个规则会启动一个独立的数据源运行时，不同规则中的同名数据源完全隔离。
- 共享数据源为`true`时，多个规则中共享同一个数据源实例。

:::tip 提示
需要使用完全相同的输入数据或者提高性能，数据源的`共享`字段可定义`true`。
:::

::: tip 提示
在某些场景中，用户需要不同的规则处理完全相同的数据流。例如，在处理传感器的温度数据时，用户可能需要一个规则，当一段时间的平均温度大于30度时触发警告；而另一个规则则是当一段时间的平均温度小于 0 度时触发警告。使用默认配置时，两个规则各自独立实例化源实例。由于网络延迟等原因，规则可能得到不同顺序，甚至各有缺失数据的数据流，从而在不同的数据维度中计算平均值。通过配置共享源实例，用户可以确保两个规则处理完全相同的数据。
:::

### 数据结构

在创建数据源时，可以定义数据源的数据结构。NeuronEX 在运行时，会根据定义的结构进行数据验证和类型转换。数据结构验证默认不开启。如需开启，可在创建数据源时，勾选`是否为带结构的流`字段，并填入字段信息。

<img src="./_assets/source_datastructure.png" alt="pysam" style="zoom:50%;" />

目前 NeuronEX 支持以下字段类型：

   | #    | 数据类型 | 说明                                                         |
   | ---- | -------- | ------------------------------------------------------------ |
   | 1    | bigint   | 整数型。                                                     |
   | 2    | float    | 浮点型。                                                     |
   | 3    | string   | 文本值，由 Unicode 字符组成。                                |
   | 4    | datetime | 日期时间类型。                                               |
   | 5    | boolean  | 布尔类型，值可以是`true` 或者 `false`。                      |
   | 6    | bytea    | 用于存储二进制数据的字节数组。如果在格式为 "JSON" 的流中使用此类型，则传入的数据需要为 base64 编码的字符串。 |
   | 7    | array    | 数组类型可以是任何简单类型，数组类型或结构类型。             |
   | 8    | struct   | 复杂类型。                                                   |

  :::tip 提示
  数据源接入的数据如果与定义的数据schema不一致，将会丢弃消息，不会进行规则处理。
  :::

## 示例

**示例1**

```sql
my_stream 
  (id bigint, name string, score float)
WITH ( datasource = "topic/temperature", FORMAT = "json", KEY = "id");
```

该流将订阅 MQTT 主题`topic/temperature`，服务器连接使用配置文件`$ekuiper/etc/mqtt_source.yaml` 中默认部分的 server 键。

**示例2**

```sql
demo (
		USERID BIGINT,
		FIRST_NAME STRING,
		LAST_NAME STRING,
		NICKNAMES ARRAY(STRING),
		Gender BOOLEAN,
		ADDRESS STRUCT(STREET_NAME STRING, NUMBER BIGINT),
	) WITH (DATASOURCE="test/", FORMAT="JSON", KEY="USERID", CONF_KEY="demo");
```

流将订阅 MQTT 主题 `test/`，服务器连接使用配置文件`$ekuiper/etc/mqtt_source.yaml` 中 demo 部分的设置。

**示例3**

```sql
demo () WITH (DATASOURCE="test/", FORMAT="protobuf", SCHEMAID="proto1.Book");
```

流将订阅 MQTT 主题 `test/`，使用 PROTOBUF 格式，根据在 `$ekuiper/data/schemas/protobuf/schema1.proto` 文件中的 `Book` 定义对流入的数据进行解码。其中，模式的管理详见 [模式](./config.md#模式)。





