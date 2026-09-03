# External services

## Overview

You can map an existing external service to an EMQX Neuron SQL function so a rule can call it at runtime. When a rule uses that function, EMQX Neuron converts the input and output and invokes the service.

## Configuration

An external function is defined with two files:

- A JSON file that describes the service. The file name becomes the service name in EMQX Neuron.
- A schema file that describes the API: method names and input/output types. Only [Protocol Buffers](https://developers.google.com/protocol-buffers) is supported.

The JSON file has two parts:

- `about`: metadata such as author, description, and help URL. See the sample below.
- `interfaces`: a set of service interfaces. Interfaces that share the same address can be grouped. Each interface has:
    - `protocol`: `"grpc"` or `"rest"`. `"msgpack-rpc"` is not in the default EMQX Neuron build; you must add the `msgpack` build tag and compile it yourself.
    - `address`: a URL, for example `tcp://localhost:50000` or `https://localhost:8000`.
    - `schemaType`: currently only `"protobuf"`.
    - `schemaFile`: the proto file. REST and msgpack services also use proto.
    - `functions`: maps schema RPCs to SQL function names. For example `{"name":"helloFromMsgpack","serviceName":"SayHello"}` exposes `SayHello` as SQL function `helloFromMsgpack`. Unmapped RPCs keep their original names.
    - `options`: protocol-specific options. For REST:
        - `headers`: HTTP headers
        - `insecureSkipVerify`: skip HTTPS certificate checks

Example `sample.json`:

```json
{
  "about": {
    "author": {
      "name": "EMQ",
      "email": "contact@emqx.io",
      "company": "EMQ Technologies Co., Ltd",
      "website": "https://www.emqx.io"
    },
    "helpUrl": {
      "en_US": "https://github.com/lf-edge/ekuiper/blob/master/docs/en_US/plugins/functions/functions.md",
      "zh_CN": "https://github.com/lf-edge/ekuiper/blob/master/docs/zh_CN/plugins/functions/functions.md"
    },
    "description": {
      "en_US": "Sample external services for test only",
      "zh_CN": "示例外部函数配置，仅供测试"
    }
  },
  "interfaces": {
    "trueno": {
      "address": "tcp://localhost:50051",
      "protocol": "grpc",
      "schemaType": "protobuf",
      "schemaFile": "trueno.proto"
    },
    "tsrest": {
      "address": "http://localhost:8090",
      "protocol": "rest",
      "options": {
        "insecureSkipVerify": true,
        "headers": {
          "Accept-Charset": "utf-8"
        }
      },
      "schemaType": "protobuf",
      "schemaFile": "tsrest.proto",
      "functions": [
        {
          "name": "objectDetect",
          "serviceName": "object_detection"
        }
      ]
    },
    "tsrpc": {
      "address": "tcp://localhost:9000",
      "protocol": "msgpack-rpc",
      "schemaType": "protobuf",
      "schemaFile": "tsrpc.proto",
      "functions": [
        {
          "name": "getFeature",
          "serviceName": "get_feature"
        },
        {
          "name": "getSimilarity",
          "serviceName": "get_similarity"
        }
      ]
    }
  }
}
```

This sample service has three interfaces:

- `trueno`: gRPC
- `tsrest`: REST
- `tsrpc`: msgpack-rpc

Each interface is defined by its schema file. For `tsrest`, `tsrest.proto` looks like this:

```protobuf
syntax = "proto3";
package ts;

service TSRest { // proto service name is independent of the EMQX Neuron external service name
  rpc object_detection(ObjectDetectionRequest) returns(ObjectDetectionResponse) {}
}

message ObjectDetectionRequest {
  string cmd = 1;
  string base64_img = 2 [json_name="base64_img"];
}

message ObjectDetectionResponse {
  string info = 1;
  int32 code = 2;
  string image = 3;
  string result = 4;
  string type = 5;
}
```

This file defines one RPC `object_detection` with protobuf request and response types. Prefer a single `service` per proto file, with multiple `rpc` methods if needed.

Protobuf uses proto3. See the [proto3 spec](https://developers.google.com/protocol-buffers/docs/reference/proto3-spec).

### HTTP options

For finer REST control (method, URL, parameters, body), you can add `google.api.http` annotations on each RPC.

The following snippet maps the method to POST `/v1/computation/object_detection` instead of the default `/object_detection`. `body: "*"` means the whole `ObjectDetectionRequest` becomes the request body.

```protobuf
service TSRest {
  rpc object_detection(ObjectDetectionRequest) returns(ObjectDetectionResponse) {
    option (google.api.http) = {
      post: "/v1/computation/object_detection"
      body: "*"
    };
  }
}
```

If different commands use different URLs, put part of the input in the path. Here `cmd` is in the URL and `base64_img` is the body:

```protobuf
service TSRest {
  rpc object_detection(ObjectDetectionRequest) returns(ObjectDetectionResponse) {
    option (google.api.http) = {
      post: "/v1/computation/object_detection/{cmd}"
      body: "base64_img"
    };
  }
}
```

Search-style APIs often put parameters in the query string:

```protobuf
service TSRest {
  rpc SearchMessage(MessageRequest) returns(Message) {
    option (google.api.http) = {
      get: "/v1/messages"
    };
  }
}

message MessageRequest {
  string author = 1;
  string title = 2;
}
```

With no `body`, all input fields become query parameters. `SearchMessage({"author":"Author","title":"Message1"})` maps to `GET /v1/messages?author=Author&title=Message1`.

For the full mapping syntax, see [transcoding mappings](https://cloud.google.com/endpoints/docs/grpc/transcoding#adding_transcoding_mappings) and [HttpRule](https://cloud.google.com/endpoints/docs/grpc-service-config/reference/rpc/google.api#httprule).

#### Usage

HTTP options require this import in the proto file:

```protobuf
syntax = "proto3";

package yourpackage;

import "google/api/annotations.proto";
```

EMQX Neuron ships the Google API protos under `etc/services/schemas/google`, so you do not need to bundle them with a custom service.

### Mapping

An external service needs one JSON file and at least one schema (`.proto`) file. Mapping has three layers:

1. EMQX Neuron external service: the JSON file name is the service name.
2. Interface: the `interfaces` section. This virtual layer groups functions that share schema and address.
3. EMQX Neuron function: each `rpc` in the proto file. The `service` in the proto file is unrelated to the EMQX Neuron external service name. By default the SQL function name is the RPC name. Override it with `functions` in the JSON file.

Example: calling `objectDetect` in SQL:

1. In the `tsrest` interface, `{"name": "objectDetect","serviceName": "object_detection"}` maps SQL `objectDetect` to RPC `object_detection`.
2. In `tsrest.proto`, the RPC `object_detection` is found. Address and protocol come from the `tsrest` interface.

REST arguments are encoded as JSON. JSON keys come from protobuf message fields and are converted to lower camel case. If the REST API does not use that convention, set `json_name` on the field.

### Notes

REST and msgpack-rpc are not native protobuf, so they have limits.

REST defaults to **POST** with JSON. Use [HTTP options](#http-options) to change method and URL.

- Without HTTP options, the input must be a message or `google.protobuf.StringValue`. For `StringValue`, pass an encoded JSON string such as `"{\"name\":\"name1\",\"size\":1}"`.

msgpack-rpc:

- Input cannot be empty.

## Register and manage

Register an external function in one of two ways:

- Place files in the configuration folder
- Register dynamically through the REST API

On startup, EMQX Neuron reads `etc/services` and registers services found there:

1. The file name must be `$serviceName.json`. For example `sample.json` registers as `sample`.
2. Schema files go in `schemas`:

   ```
   etc
     services
       schemas
         sample.proto
         random.proto
         ...
       sample.json
       other.json
       ...
   ```

   Changing files after startup does **not** reload them. Use the REST API for dynamic updates.

For dynamic register and management, see the [external service REST API](https://ekuiper.org/docs/en/latest/api/restapi/services.html).

## Use in SQL

After registration, every mapped function can be used in rules. For `object_detection` in `sample.json`, mapped as `objectDetect`:

```SQL
SELECT objectDetect(cmd, img) from comandStream
```

The REST service must be running at `http://localhost:8090` with API `http://localhost:8090/object_detection`.

### Parameter expansion

Proto parameters are usually messages. In EMQX Neuron you can pass either:

1. One struct (not expanded)
2. Multiple arguments in the order of the message fields

`objectDetection` takes this message:

```protobuf
message ObjectDetectionRequest {
  string cmd = 1;
  string base64_img = 2 [json_name="base64_img"];
}
```

You can pass the whole struct, or two strings for `cmd` and `base64_img`.
