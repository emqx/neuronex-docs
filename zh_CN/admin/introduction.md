# 运维

本节面向负责日常维护 EMQX Neuron 的管理员与运维人员，按运维任务组织。

## 登录控制台

浏览器访问 `http://<网关地址>:8085`，使用初始账号 **admin** / **0000** 登录。端口可在启动参数中修改，见[启动参数与配置文件](./conf-management.md)。

页面无法打开时依次确认：

```bash
ping <网关地址>                   # 网络是否可达
telnet <网关地址> 8085            # 端口是否放行
systemctl status neuronex        # 服务是否在运行
```

生产环境请修改初始密码，并按需创建只读账号，见[用户管理](./user.md)。

## 日常巡检

| 关注什么 | 在哪里看 |
| --- | --- |
| 南北向节点的连接状态、采集与转发量、规则运行情况 | [运行监控](./data-statistics.md) |
| 驱动掉线、规则异常、实例重启等事件的自动通知 | [监控告警管理](./alert-monitor-management.md) |
| 采集报错的点位 | [数据监控与反控](./monitoring.md) |
| 磁盘占用与日志轮转 | [日志管理](./log-management.md) |

## 升级与备份

1. 先备份，见[备份与恢复](./backup-restore.md)。
2. 升级不会覆盖 `/opt/neuronex/data`，安装包升级步骤见[使用安装包安装 · 升级](../installation/package.md#升级)，容器部署见[通过 Docker 部署](../installation/docker.md)。
3. 升级后确认南北向节点恢复到**运行中**、**已连接**，规则状态正常。

## 故障排查

| 现象 | 从哪里查 |
| --- | --- |
| 设备采不到数据 | [连接排查](../configuration/south-devices/south-devices.md#连接排查)，再看[运行监控](./data-statistics.md)的读失败计数 |
| 数据转发不出去 | 确认北向应用处于运行中、订阅已建立，见[订阅南向数据 · 验证](../configuration/subscription.md#验证) |
| 规则没有输出 | [规则调试](../streaming-processing/rule_test.md) |
| 需要提交工单 | 下载日志，见[日志管理](./log-management.md) |

## 配置与权限

- [系统配置](./sys-configuration.md)：数据处理引擎、日志级别、第三方登录、链路追踪、备份与恢复
- [启动参数与配置文件](./conf-management.md)：命令行、环境变量、配置文件、HTTPS
- [数据目录与持久化](./data-persistence.md)：数据目录结构与挂载方式
- [用户管理](./user.md)：账号、角色与权限

## 高可用

两台实例通过 Keepalived 组成主备，主节点故障时虚拟 IP 自动漂移，见[主备模式](../best-practise/master-backup.md)。

## 延伸阅读

接口调用、错误码、性能实测数据与常见问题，见[参考与支持](../reference/overview.md)。具体场景的完整步骤见[教程与案例](../best-practise/overview.md)。
