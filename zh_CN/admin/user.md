# 用户管理

从 EMQX Neuron 3.3 开始，Dashboard 用户引入了 基于角色的访问控制 （RBAC）功能。RBAC 允许根据用户在组织中的角色为其分配权限。此功能简化了授权管理，通过限制访问权限提高安全性。

**用户管理**页面提供了所有活跃的 Dashboard 用户的概览。

## 创建用户

点击页面右上角的**创建用户**按钮，在弹出的对话框中填写用户信息，点击**创建**完成添加。编辑用户信息、更新密码和删除用户等操作，均通过列表的**操作**列进行。

![alt text](_assets/user_info_zh.png)

## 角色介绍

目前，可以为用户设置以下两种预定义角色之一。您可以在创建用户时从**角色**下拉菜单中选择角色。
- **Administrator** 

    Administrator (管理员) 拥有对 EMQX Neuron 所有功能和资源的完全管理访问权限，包括数据采集、数据处理、以及系统配置管理。

- **Viewer**

    Viewer (查看者) 可以访问 EMQX Neuron 的所有数据和配置信息，对应 REST API 中的所有 `GET` 请求，但无权进行创建、修改和删除操作。

::: tip  
EMQX Neuron 安装后自带的登录用户名及密码为`admin/0000`，`admin` 用户默认为 Administrator 角色，无法删除及修改角色，可以修改密码。
另外可以通过环境变量的方式，在首次启动时修改 admin 用户默认密码以及增加一个 viewer 用户。  
- NEURONEX__SERVER__ADMIN__PASSWORD='xxxxxx'， xxxxxx 为 admin 用户修改后的密码
- NEURONEX__SERVER__VIEWER__USERNAME='user1'，user1 为 viewer 用户用户名
- NEURONEX__SERVER__VIEWER__PASSWORD='xxxxxx'，xxxxxx 为 viewer 用户密码

admin 用户通过以上设置登录系统后，可以继续修改上述用户的密码

:::

::: warning

用户管理依赖认证功能，默认是开启的。

**关闭认证后，Web 控制台和 HTTP API 都不再校验身份——打开页面直接进入，不需要登录，用户、角色和权限也随之失效。**

以下任意一种情况都会关闭认证：

1. 安装包部署时设置了 `NEURONEX_DISABLE_AUTH=1` 环境变量
2. Docker 部署时设置了 `NEURONEX_DISABLE_AUTH=1` 环境变量
3. `/opt/neuronex/etc/neuronex.yaml` 中的 `server.disableAuth` 设为 `true`

要使用多用户功能，确保以上三项都未开启。

:::

## ECP 用户管理

当用户使用 ECP 远程管理 EMQX Neuron 时:
- ECP 侧的项目管理员等同于 EMQX Neuron 的 Administrator 角色，将拥有对 EMQX Neuron 所有功能和资源的完全管理访问权限。

- ECP 侧的项目成员等同于 EMQX Neuron 的 Viewer 角色，只能访问 EMQX Neuron 的数据和配置信息。