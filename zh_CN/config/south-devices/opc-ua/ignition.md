# 连接 Ignition 

## 用户名/密码登录

1. 打开 Ignition 的管理界面 **Config** -> **OPC UA** -> **Server Setting**，添加可被其他主机访问的 IP 地址到 `Bind Addresses`，保存配置；
<img src="./assets/ignition-1.jpg" alt="ignition-1" style="zoom:50%;" />

2. NeuronEX 新增南向 OPC UA 设备，打开 **设备配置**，填写目标 Ignition 的 `端点 URL`——`opc.tcp://192.168.10.195:62541/discovery`，`用户名`——`opcuauser`（Ignition 默认），`密码`——`password`（Igniton 默认），无需添加证书/密钥, 启动设备连接。

3. 打开 Ignition 的管理界面 **Config** -> **OPC UA** -> **Security** -> **Server**，将 `Quarantined Certificates` 列表中的 NeuronEXClient 证书设置为信任；
<img src="./assets/ignition-2.jpg" alt="ignition-2" style="zoom:50%;" />

## 证书/密钥 + 用户名/密码登录

1. 参考[连接策略](./policy.md)生成或转换证书/密钥；

2. 打开 Ignition 的管理界面 **Config** -> **OPC UA** -> **Security** -> **Server**，上传客户端证书并设置为信任；


## NeuronEX 侧配置

1. 通过 UaExpert 软件查看 Ignition 测点信息， 参考 [配置 UaExpert](./uaexpert.md)。
<img src="./assets/ignition-3.jpg" alt="ignition-3" style="zoom:50%;" />

2. NeuronEX 新增南向 OPC UA 设备，打开 **设备配置**，填写目标 Ignition 的 `端点 URL`——`opc.tcp://192.168.10.195:62541/discovery`，`用户名`——`opcuauser`（Ignition 默认），`密码`——`password`（Igniton 默认），添加证书/密钥, 启动设备连接。

3. 根据测点信息添加 `Groups` 和 `Tags`。

## 测试点位

| 名称             | 地址   | 属性 | 类型   |
| ---------------- | ------ | ---- | ------ |
| BuildDate        | 0!2266 | Read | UINT32 |
| BuildNumber      | 0!2265 | Read | STRING |
| ManufacturerName | 0!2263 | Read | STRING |
| ProductName      | 0!2261 | Read | STRING |
| ProductUri       | 0!2262 | Read | STRING |
| SoftwareVersion  | 0!2264 | Read | STRING |

