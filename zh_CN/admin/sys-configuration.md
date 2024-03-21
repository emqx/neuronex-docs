# 系统配置

NeuronEX supports configuration modifications to related functions on the Dashboard.

## 数据处理引擎配置
登录 NeuronEX 后，点击页面左侧的 **管理** -> **系统配置**， 进入系统配置界面。可手动开启、关闭数据处理引擎。
![如图所示](./assets/sys_configuraion_zh.png)

:::tip  注意

关闭数据处理引擎，会造成数据处理功能不可用，请谨慎操作！

:::

## 单点登录配置

NeuronEX 使用 OAuth2.0 协议实现单点登录功能，用户需先在 SSO 服务上配置 NeuronEX 的单点登录 URL 地址。例如，http://127.0.0.1:8085/web/common

NeuronEX 页面上需配置 SSO 服务的访问地址及相关参数。

![sso](./assets/sso.png)

:::tip 注意

客户端标识和客户端密钥从 SSO 服务上查找，需正确填写。

:::
