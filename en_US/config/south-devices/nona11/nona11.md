# NON A11

## 参数设置

| 字段            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| connection mode | 驱动程序连接到设备的方式，默认为 client，即把 ECP Edge 作为客户端使用 |
| host            | 当 ECP Edge 作为客户端使用时，host 指远程设备的 IP。当 ECP Edge 作为服务端使用时，host 指 ECP Edge 在本地使用的 IP，默认可填写 0.0.0.0 |
| port            | 当 ECP Edge 作为客户端使用时，post 指远程设备的 TCP 端口。当 ECP Edge 作为服务端使用时，host 指 ECP Edge 在本地使用的 TCP 端口。 |
| site            | 非 A11设备站点号。                                           |

## 支持的数据类型

* INT16
* UINT16
* INT32
* UINT32
* FLOAT
* STRING

## 地址格式用法

### 地址格式

> <span>COMMAND ! OFFSET[.LEN]</span>

### 地址示例

| 地址    | 数据类型           | 说明                        |
| ------- | ------------------ | --------------------------- |
| 1!10.20 | string             | 指令1，偏移10，字符串长度20 |
| 12!1    | uint16/int16       | 指令12，偏移1               |
| 20!32   | uint32/int32/float | 指令20，偏移32              |