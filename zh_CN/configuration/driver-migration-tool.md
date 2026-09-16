# 驱动转换工具

## 介绍

本功能面向将第三方数采平台中的驱动与点位配置，批量迁移为 EMQX Neuron 可导入文件的场景。由 EMQ 提供的在线 **驱动配置转换** 能力，可将您在 **KEPServerEX**、**Litmus Edge** 等系统中已配置好的**南向连接与采集点位**，转换为 **EMQX Neuron** 可直接导入的 JSON 配置文件。在从 KEPServerEX 、Litmus Edge 等系统迁移到 EMQX Neuron 时，可显著减少在 EMQX Neuron 中重复录入设备、标签与地址的工作量。

该工具在 [**EMQ 官网**](https://www.emqx.com/zh/products/emqx-neuron/migrator) 以**在线服务**形式提供，无需在本地安装独立软件。您只需在源平台按文档导出配置，上传至工具页面，完成转换后下载结果，再在 EMQX Neuron 侧完成导入与联调即可。

## 功能概览

| 能力 | 说明 |
| ---- | ---- |
| 多来源支持 | 按来源类型选择转换逻辑，目前支持从 **KEPServerEX** 与 **Litmus Edge** 导出的配置进行转换。 |
| 协议级映射 | 将各源平台上的驱动、标签映射为 EMQX Neuron 南向设备与 Group/Tag 结构（具体以各来源文档中的映射表为准）。 |
| 转换结果可审阅 | 转换完成后可查看汇总信息（如设备数、标签成功/失败统计）；部分失败项会排除在最终可下载的 JSON 之外，并可在界面上查看失败原因。 |
| 面向 EMQX Neuron 的交付物 | 输出为 **EMQX Neuron 可导入的配置 JSON**，在 EMQX Neuron Dashboard 的数采（南向）模块中通过「导入」使用。 |

::: tip

各来源平台**支持的工业协议**与**限制条件**（如 BCD、数组、证书等）不相同，请在对应迁移指南的「支持的转换协议」章节中逐条确认。

:::

## 适用场景

- **平台替换**：企业计划用 EMQX Neuron 承接原 KEPServerEX 或 Litmus Edge 的采集能力，需批量迁移现网配置。  
- **POC/试点**：小范围验证 EMQX Neuron 与现场设备的连接与数据质量，希望快速对齐原有标签与寻址。  
- **灾备与双栈**：在保留原系统的同时，在 EMQX Neuron 中快速复现一套等价采集配置。  

## 分来源说明与文档

| 来源产品 | 版本与说明 | 详细文档 |
| -------- | ---------- | -------- |
| Kepware（KEPServerEX） | 适用于 KEPServerEX **V6.0 及以上** 等场景；导出为 **JSON** 等要求见文档。 | [Kepware 到 EMQX Neuron 迁移指南](./driver-migration-tool/kepware-to-neuron.md) |
| Litmus Edge | 适用于 **V4.0 及以上**；从 Device Management 导出 **Plain Text** 等步骤见文档。 | [Litmus Edge 到 EMQX Neuron 迁移指南](./driver-migration-tool/litmus-edge-to-neuron.md) |

以上两篇文档均包含：支持的协议列表、在源站导出文件的操作说明、官网工具上的上传与下载步骤、**转换失败**时的表现说明、EMQX Neuron 侧**导入与验证**建议，以及协议与数据模型的映射说明。请按实际使用的数据选择对应一篇作为主参考。

## 使用前提与说明

- **网络与可达性**：导入 EMQX Neuron 后，EMQX Neuron 需能访问原采集所指向的**现场设备**（IP、端口、串口等以您在 EMQX Neuron 中最终配置为准），请确保网络与安全策略与迁移前计划一致。  
- **不支持的项会被跳过**：不支持的协议、超限或不兼容的地址/数据类型，可能无法进入最终 JSON，请在工具界面与日志/汇总中核对失败项，并在 EMQX Neuron 中**手工补配**或调整源侧后重新转换。  
- **以分文档为准**：工具能力与协议支持会随版本迭代；协议列表、限制与操作截图以**各分文档**中最新内容为准。  

如您在迁移过程中需扩展支持或遇到问题，可结合分文档中的说明与 EMQX Neuron 官方支持渠道进一步排查。
