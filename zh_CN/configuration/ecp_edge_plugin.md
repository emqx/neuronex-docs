# 管理插件模块

插件可以分为北向应用和南向驱动程序。北向插件通常用于连接到云平台或像处理引擎这样的外部应用程序。南向插件是实现特定协议以访问外部设备的通信驱动程序。为了实现协议格式转换，至少需要一个北向插件和一个南向插件分别用于数据传递和数据采集。

登录 NeuronEX 后，您可点击**数据采集** -> **插件**查看系统的插件列表。您也可点击左上角的**添加插件**按钮安装自定义插件。

您可访问[插件列表页](../introduction/plugin-list/plugin-list.md)获取 NeuronEX 完整支持的插件列表。

## 查看可用插件模块

插件管理页面显示所有可用的可插拔模块和详细信息，包括插件名称、关联节点类型、插件类别、插件版本和描述信息，如下图所示，您可从下拉框中选择北向应用或南向设备的插件。

![plugin-options](./_assets/plugin_options.png)

插件类型包括以下三种模式：

* System：不可删除，软件自带
* Custom：可删除，用户自己开发或者是定制开发的

## 添加新的可插拔模块

在插件页面，点击左上角的**添加插件**按钮，上传本地的插件 .so 文件和 .json 文件。

![plugin-options](./_assets/plugin_add.png)

具体的插件开发教程请参考 [SKD 教程](https://neugates.io/docs/zh/latest/dev-guide/sdk-tutorial/sdk-tutorial.html)。

## 替换已有插件模块

在插件页面，点击每个插件卡片上的**替换插件**按钮，上传本地的插件 .so 文件和 .json 文件。

![plugin-options](./_assets/plugin_update.png)

具体的插件替换更新，请联系EMQ商务团队。