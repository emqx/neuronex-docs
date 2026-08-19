# EMQX Neuron 产品更名 - 文档更改规范

> 产品原名：**NeuronEX** → 新名：**EMQX Neuron**  
> 本文档用于约束本仓库的更名改动，避免误改链接、命令、路径导致页面或安装步骤失效。

## 已确认决策

| 项 | 决策 |
|----|------|
| 侧边栏 `directory.json` 的 `title` | **只删除** `NeuronEX`，不改成 `EMQX Neuron` |
| 正文“原 NeuronEX / formerly NeuronEX” | **原文已有则保留**；原文没有则不要新增 |
| `docs.emqx.com/.../neuronex/` | **不改**（近期不会换 slug） |
| 官网 download / contact 等 URL 中的 `neuronex` | **不改** |
| `release_history` | 历史条目也统一用**新名称** `EMQX Neuron` |
| 文档站发布身份 `DOCS_TYPE=neuronex`、`preview.sh` 挂载路径 | **不改** |
| 站点顶栏/浏览器标题里的「NeuronEX 文档」 | **本仓库改不了**；由 docs 前端根据 `DOCS_TYPE=neuronex` 生成，需另改 `docs-emqx-com-frontend` |

## 改什么 / 不改什么

### 要改（展示用产品名）

- 正文、标题、列表、表格说明中的产品名：`NeuronEX` → `EMQX Neuron`
- Markdown 链接**文字**中的产品名（URL 保持不动）
- `directory.json` 里带 `NeuronEX` 的 `title`：删除 `NeuronEX` 后整理空格 / 多余的 `+`

### 不要改（技术标识与外部路径）

| 类型 | 示例 |
|------|------|
| Docker 镜像 / 容器名 | `emqx/neuronex:3.7.1`、`--name neuronex` |
| 安装包名 | `neuronex-3.7.0-linux-amd64.deb` |
| systemd / CLI | `systemctl start neuronex`、`./bin/neuronex start` |
| 安装与数据路径 | `/opt/neuronex/`、`/opt/neuronex/data/` |
| 配置文件 | `etc/neuronex.yaml`、`neuronex.yaml` |
| 环境变量 | `NEURONEX_DISABLE_AUTH`、`NEURONEX__SERVER__*` |
| 配置值 / JWT / DB / syslog tag | `"aud": "neuronex"`、`tag: "neuronex"`、库名 `` `neuronex` `` |
| 文档站与官网 URL | `docs.emqx.com/.../neuronex/...`、`?product=neuronex`、`downloads/.../neuronex` |
| 预览与 CI | `preview.sh`、`DOCS_TYPE=neuronex`、挂载 `.../neuronex/latest` |
| 组件名 **Neuron**（无 EX） | 南向/北向 Neuron、sink Neuron、`/api/neuron/*`、NeuronHUB |
| API operationId 等 | `DownloadNeuronexLog` 等（非产品展示文案） |
| 图片文件名 | `neuronex-ai-install.png`（可不改；改则必须同步引用） |
| 真实日志样例原文 | 日志里的路径/命令保持原样；旁白产品名可改 |

## 容易误伤的场景（同一句里可改 + 不可改）

```text
访问 NeuronEX Dashboard，配置在 /opt/neuronex/data/
→ 访问 EMQX Neuron Dashboard，配置在 /opt/neuronex/data/
```

```text
[NeuronEX API 文档](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html)
→ [EMQX Neuron API 文档](https://docs.emqx.com/zh/neuronex/latest/api/api-docs.html)
```

```text
# run NeuronEX by neuronex:3.x.x
docker pull emqx/neuronex:3.7.1
→ 注释里产品名可改为 EMQX Neuron；镜像名不得改
```

## 用词约定

| 场景 | 写法 |
|------|------|
| 正文产品名 | `EMQX Neuron` |
| 原文已有曾用名说明 | 保留 `EMQX Neuron (formerly NeuronEX)` / `EMQX Neuron（原 NeuronEX）` 等已有写法 |
| 原文无曾用名 | 直接写 `EMQX Neuron`，不要主动补“原 NeuronEX” |
| Dashboard | `EMQX Neuron Dashboard` |
| 侧边栏 title | 去掉 `NeuronEX` 后保持简短，不加 `EMQX Neuron` |
| 技术串 | 一律保持小写 / 原标识符 `neuronex` |

## 与组件名 Neuron 的区分

- **EMQX Neuron**：对外产品名（原 NeuronEX）
- **Neuron**：产品内部数据采集引擎 / 插件 / 部分 API 路径中的组件名，**禁止**改成 EMQX Neuron
- **NeuronHUB**：独立名称，不在本次产品更名范围内擅自修改

## 执行与校验建议

1. 禁止对 `NeuronEX` / `neuronex` 做无差别全库 `sed` 替换。
2. 优先改：`directory.json` → 正文 Markdown →（可选）Swagger 描述文案。
3. 高危页需人工抽检：`installation/*`、`admin/conf-management.md`、`admin/user.md`、`admin/log-management.md`、`best-practise/master-backup.md`、`faq/*`、`release_history/*`。
4. 改完后检查：
   - 本地 `preview.sh` 中英首页与侧边栏可打开
   - 相对链接与 `docs.emqx.com/.../neuronex/...` 外链仍有效
   - `docker pull emqx/neuronex`、`systemctl start neuronex`、`/opt/neuronex` 未被误改
   - 未把组件名 `Neuron` 误改成 `EMQX Neuron`
   - 已有 `(formerly NeuronEX)` / `原 NeuronEX` 未被改成 `formerly EMQX Neuron`

## 侧边栏 title 处理示例

| 原 title | 新 title |
|----------|----------|
| 卸载 NeuronEX | 卸载 |
| Uninstall NeuronEX | Uninstall |
| NeuronEX 设备反控功能详解 | 设备反控功能详解 |
| NeuronEX + 大语言模型 LLM - … | 大语言模型 LLM - … |
| NeuronEX + ECP 构建… | ECP 构建… |
| NeuronEX 主备模式最佳实践 | 主备模式最佳实践 |
| NeuronEX 最佳实践：集成 MySQL… | 最佳实践：集成 MySQL… |
| NeuronEX Device Control | Device Control |
| NeuronEX Master-Backup Mode | Master-Backup Mode |
