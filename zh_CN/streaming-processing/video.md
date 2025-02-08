# 视频源

<span style="background:green;color:white;padding:1px;margin:2px">流</span>
<span style="background:green;color:white;padding:1px;margin:2px">扫描表</span>

NeuronEX 数据处理模块通过 `Video` 类型的数据源，可以接收来自视频流的图片。

## 创建流

登录 NeuronEX，点击**数据处理** -> **源管理**。在**流管理**页签，点击**创建流**。

在弹出的**源管理** / **创建**页面，进入如下配置：

- **流名称**：输入流名称
- **是否为带结构的流**：不勾选。
- **流类型**：选择 Video
- **配置组**：可编辑使用默认配置组，或点击添加配置组，在弹出的对话框中进行如下设置，设置完成后，可点击**测试连接**进行测试：

  - **名称**：输入配置组名称。
  - **路径**：输入视频源 URL 路径地址。
  - **间隔时间**：发出请求的时间间隔（毫秒） 。
  - **视频格式**：选择视频格式，默认为`image2`。
  - **视频编码**：选择视频编码，默认为`mjpeg`。
- **流格式**：支持 json、binary、protobuf、delimited、custom。选择 binary 格式。
- **共享**：勾选确认是否共享源。


