# 常见问题

## Sparkplug B 插件无法连接 broker ，处于未连接状态

请确保创建 Sparkplug B 插件时使用了正确的参数，比如 broker 地址，用户名，和密码。
如果启用了 SSL 功能，请确保使用了正确的证书。还有检查 broker 是否正确配置。

## Sparkplug B 插件连接状态不停切换

这大概率是因为 broker 在踢除 MQTT 客户端。请检查相关配置。
没有与其他客户端冲突， 或者 broker 的配置是否正确。

## Sparkplug B Application 端没有看到北向数据组

请确认 Sparkplug B 节点订阅了南向节点，且所有节点已经启动。

