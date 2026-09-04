# 管理插件模块

登录 EMQX Neuron 后，点击 **数据采集** -> **插件**，查看已安装插件。二次开发见 [SDK 教程](../dev-guide/sdk-tutorial/sdk-tutorial.md)。

## 查看可用插件

插件管理页列出名称、类型、类别、版本和描述。可用下拉框筛选北向应用或南向设备。

![plugin-options](./_assets/plugin_options.png)

插件类型：

* **System**：产品自带，不可删除，可以替换升级。
* **Custom**：用户或定制开发，可删除，可以替换升级。

## 添加插件

点击左上角 **添加插件**，上传本地的 `.so` 和 `.json` 文件。

![plugin-options](./_assets/plugin_add.png)

## 替换插件

在插件卡片上点击 **替换插件**，上传新的 `.so` 和 `.json`。替换官方插件请联系 [EMQ 商务](https://www.emqx.com/zh/contact?product=neuronex)。

## CNC 文件上传

南向 CNC 驱动支持把文件发送到设备侧。

![cnc_file](_assets/cnc_file.png)
