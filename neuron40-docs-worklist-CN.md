# Neuron 4.0 文档待办事项

基于 **PR #182**（`87c8d28`，fengzero，2026 年 9 月 15 日）在 PR #181 之上的统计。
还剩五项。

4.0 范围原则：**属于规则引擎的功能全部保留，属于 Neuron 自身的存储和 AI 功能全部移除。**
命名原则：南向是**驱动**，北向是**应用**，用户可见的文案里不再出现 plugin / 插件。

PR #182 已完成：删除 LLM 页面、plugin 改 driver 的命名、首屏架构图、`index.md` 的首页结构。

---

## 1 · 还有 11 个用户可见页面在正文里直接写了 eKuiper

新增项。之前没有列出来，因为我只检查了导航，没有检查正文。

导航标题已经干净了，**页面正文没有**。以下英文页面直接提到了这个组件名，对应的中文页面同理：

```
en_US/quick-start/quick-start.md
en_US/faq/faq_basic.md
en_US/installation/docker.md
en_US/introduction/driver-list/driver-list.md
en_US/configuration/north-apps/catalog.md
en_US/best-practise/device-control.md
en_US/admin/conf-management.md
en_US/admin/data-persistence.md
en_US/admin/data-statistics.md
en_US/admin/log-management.md
en_US/admin/sys-configuration.md
```

**处理方式：** 凡是在向用户描述功能的地方，改成 **规则引擎** / **rules engine**。

**以下情况保留原样：** 这个字符串是真实的文件路径、进程名或日志内容。例如
`log-management.md` 里引用的是真实日志输出，里面含有
`/opt/neuronex/data/ekuiper/plugins`，那是磁盘上的实际路径，改了文档就错了。
`dev-guide/**`、`api/**`、`release_history/**` 同理，不要动。

---

## 2 · 用户可见页面缺少截图

**127 个 `configuration/` 页面中有 76 个完全没有图。** PR #182 没有改动这部分。

每个驱动页面都应该有它的配置界面截图。Ignition 的同类页面有四张截图，而且是
**放在每个编号步骤里面**，不是集中堆在页面顶部，这样读者在被要求填写某个对话框时
正好看到那个对话框。

`api/**`、`streaming-processing/sqls/**`、`release_history/**` 属于参考资料，不需要配图。

---

## 3 · 用结构化内容替代大段文字

**240 个英文页面中有 127 个完全没有表格**，之前是 130 个。

Modbus TCP 页面是基准页，目前没有变化：**第一个结构化元素之前有 145 个词**，
零张截图，只有三行编号。

**目标：40 个词以内进入第一个表格。** 这是 HighByte 的水平。他们的 Modbus TCP 页面
开头只有两句话，然后就是表格。

在用户可见页面上，把参数说明改成表格，把操作过程改成编号步骤，删掉那些
重复下方表格内容的叙述段落。

---

## 4 · 每个驱动页面都要有编号步骤主线

竞品对比之后新增的一项，尚未开始。

Ignition 和 Litmus 都把整个连接页面组织成一个编号流程，参考表格**放在**对应的步骤里面，
而不是单独堆在一起。

- Litmus：步骤 1 选择设备，步骤 2 定义设备参数，步骤 3 附加属性，步骤 4 可选设置，
  步骤 5 创建设备。
- Ignition：五个步骤，第一步是 *"On the Gateway, go to Connections > Devices > Connections."*

这两家正是页面可读性最好的两家。我们的页面只有三行编号，没有主线结构。

**这一项和第 2 项一起做。** 截图本来就应该放在步骤里面，所以搭结构和加截图是一次性的工作，
不是两次。

---

## 5 · FAQ 页面，以及原来在里面的问题

**做了一半。** PR #182 改了 `zh_CN/faq/faq_basic.md`，删掉 8 行。
英文页面仍然是 939 个词，也没有人确认用户指南的内容是否真的移出去了。

**5a.** 打开 `en_US/faq/faq_basic.md` 检查。如果用户指南的内容还在里面，
把它移到对应的指南页面，FAQ 只保留问答。

**5b.** CEO 在 9 月 11 日要求过：**删除之前先把原有的首页和 FAQ 问题记录下来**。
PR #182 直接改了 FAQ 文件，没有看到记录的痕迹。如果当时没有先列出来，那些问题就是
悄悄消失了。趁 git 历史还容易翻，建议先找回来。

---

## 建议顺序

先做第 1 项，就是查找替换加一条判断规则，半天。

然后第 2 项和第 4 项一起做，覆盖 `configuration/**`，因为截图本来就该放进步骤里。
这是剩余工作的主体，也是竞品对比里我们明确落后的地方。

然后第 3 项，做完第 4 项之后它基本上自然就完成了。

第 5 项，谁有十分钟打开页面看一眼就行。
