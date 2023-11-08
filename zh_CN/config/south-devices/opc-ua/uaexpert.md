# 配置 UaExpert

## 连接 OPC UA Server

1. [注册下载 UaExpert](https://www.unified-automation.com/downloads.html)，并进行安装。
2. 打开 UaExpert 软件，点击工具栏 `+` 按钮, 双击 **Custom Discovery** -> **< Double click to Add Server... >**, 在弹出的对话框中填写 OPC UA Server 的访问地址，点击 `OK` 后地址会被添加到列表末尾。
    <img src="./assets/uaexpert1.jpg" alt="uaexpert1" style="zoom:50%;" />
3. 完全展开访问地址下的子节点，双击合适的连接策略，连接会被添加到 UaExpert 的 **Project** 视图中。
    <img src="./assets/uaexpert2.jpg" alt="uaexpert2" style="zoom:50%;" />
4. 在左侧 **Project** 视图中右键点击 **Servers** 下的目标 OPC UA Server （图例中为 SIMATIC.S7-1200...），在弹出菜单中选择 `Connect` 接口连接目标服务器。
    ![uaexpert3](./assets/uaexpert3.jpg)
5. 展开左侧 **Address Space** 视图中的子节点，可在右侧 **Attributes** 中看到对应的节点的地址信息，其中 `NamespaceIndex` 为 **名字空间索引**，`Identifier` 为 **节点 ID**。
    ![uaexpert4](./assets/uaexpert4.jpg)
6. 拖动 **Address Space** 视图中的子节点到 **Data Access View** 视图，可以看到该节点的数据类型。
    ![uaexpert5](./assets/uaexpert5.jpg)
7. 根据 **Data Access View** 视图中的类型信息设置 NeuronEX OPC UA 插件的测点类型。
