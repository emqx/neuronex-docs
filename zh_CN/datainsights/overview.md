# 数据探索

NeuronEX 的数据探索模块是您洞察工业历史数据、发现价值的核心工具。它集成了强大的数据查询、交互式分析以及可定制的可视化仪表盘功能，帮助您轻松理解设备行为、优化生产流程、并基于数据做出更明智的决策。

无论您是需要深入挖掘特定事件的根本原因，还是希望持续监控关键性能指标 (KPIs)，数据探索模块都能提供强大支持。

## 核心功能组件

数据探索模块主要包含以下两大核心功能组件：

*   **[数据分析 (Data Analysis)](./data_analysis.md):**
    *   一个统一的界面，允许您通过直观的树形目录浏览已存储的数据点位。
    *   提供智能 SQL 编辑器，支持语法高亮、关键字提示，让您能够精确地查询所需数据。
    *   集成 AI 数据分析助手，可以通过自然语言驱动复杂 SQL 查询的生成与迭代修正，极大降低数据查询门槛。
    *   查询结果可以灵活地以表格或图表形式展示，并支持图表交互（缩放、下载）。

*   **[仪表盘 (Dashboards)](./dashboards.md):**
    *   允许您创建和定制个性化的数据可视化仪表盘。
    *   通过配置多个 Panel，每个 Panel 绑定一个或多个 SQL 查询，将关键数据以折线图、柱状图、统计值或表格等多种形式集中展示。
    *   支持灵活的时间范围选择和自动刷新机制，确保您始终关注最新数据动态。
    *   通过拖拽调整 Panel 布局和大小，打造最符合您监控需求的视图。

## 为何使用数据探索模块？

*   **深入理解历史数据:** 通过灵活的查询和分析工具，回溯历史事件，分析设备性能变化趋势。
*   **快速定位问题:** 结合 AI 辅助和直观的图表展示，快速找到数据异常点和潜在问题。
*   **驱动优化决策:** 基于数据分析结果，发现工艺改进、能效提升、维护优化的机会。
*   **实时态势感知:** 利用可定制的仪表盘，构建实时监控中心，掌握生产运营的关键指标。
*   **降低数据使用门槛:** AI 数据分析助手让不熟悉 SQL 的用户也能轻松从数据中获取价值。

## 开始使用

NeuronEX v3.6.0 版本开始，**打包集成了 Datalayers 时序数据库**。这意味着 **多种安装包形式:** `deb`, `rpm`, `zip`, `docker` 等，均已内置 Datalayers 时序数据库。

要开始使用数据探索模块：

1. 请确保您已在 NeuronEX 中开启 [时序数据存储](../admin/sys-configuration.md#数据存储配置)。Datalayers 默认不随 NeuronEX 启动。您需要在 NeuronEX 的系统配置中按需开启此服务。
2. 开启北向 DataStorage 插件，并将需要存储的南向点位，添加订阅到该插件。
3. 浏览 [**数据分析**](./data_analysis.md) 页面，查看浏览点位、编写SQL、或使用 AI 数据分析功能。
4.  如何创建和配置您的第一个 **[仪表盘](./dashboards.md)** 来监控您最关心的指标。

通过 NeuronEX 的数据探索模块，释放您工业数据的真正潜力！