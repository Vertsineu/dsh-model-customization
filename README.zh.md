# dsh-model-customization（模型定制工作台）

[English](README.md) | [中文](README.zh.md)

[dsh](https://github.com/deepseek-ai/deepseek-harness) **web profile** 的纯客户端插件：在设置页新增「**模型定制**」分区，按提供方路由和模型粒度定制**输入类型、thinking 级别、额外请求参数**——不用再手改 `settings.yaml`。

## 功能

- **只列出你真正配置过的路由**：列表按「该路由在设置段里是否有实际配置」过滤，没用过的目录路由（xiaomi、openai 等）不会出现
- **提供方级别定制**（pi-ai / DeepSeek 路由）：

  | 字段 | 说明 |
  |---|---|
  | 默认 contextWindow / maxTokens | 未自行声明的模型的兜底值 |
  | 默认 thinking 级别 | `off`/`minimal`/`low`/`medium`/`high`/`xhigh`/`max`，可被模型级覆盖 |
  | transport | `sse` / `websocket` / `websocket-cached` / `auto` |
  | cacheRetention | `none` / `short` / `long` |
  | timeoutMs | 请求超时 |
  | 默认输入类型 | `text` / `image` 兜底 |
  | thinkingBudgets | 各 thinking 级别的 token 预算（四项全填或全空） |
  | 额外请求 headers | 追加到该路由每个请求的键值对 |
  | vLLM 额外参数 | `compat.chatTemplateKwargs`，值为 JSON，支持 `{"$var":"thinking.effort","omitWhenOff":true}` 注入当前 thinking 状态 |

- **模型级别定制**：contextWindow、maxTokens、输入类型、thinking 级别（继承 / 关闭 / 自定义级别→线上值映射）；pi-ai 路由还可以**添加内置目录里没有的模型**
- **DeepSeek 官方路由**：thinking、reasoningEffort、默认 maxTokens/contextWindow、每模型 contextWindow/maxTokens/inputModalities（整表写入语义：编辑后的列表替换目录）
- **安全保存**：只对变化的顶层字段写 `settings.yaml` 对应段（路径级操作 + 乐观锁 revision），保存立即生效；API key、baseURL 等基础信息仍由「模型」页管理，本插件不改写

## 要求

- 已安装 dsh（web profile，即 `dsh web`）
- [pnpm](https://pnpm.io)（profile 的插件工作区依赖它）

## 安装

### 推荐：`dsh plugin`（npm）

包已发布到 npm，可直接用 dsh 内置的插件管理命令安装（它会转发给 profile 目录内的 pnpm）：

```sh
dsh plugin --profile web add dsh-model-customization
```

然后在 profile 的 `cordis.patch.yml`（如 `$DSH_HOME/profiles/web/cordis.patch.yml`）末尾追加一行组合入口（pnpm 无法代替这一步）：

```yaml
- insert:
    - id: model-customization
      name: 'dsh-model-customization'
```

再**重启 dsh**（重新执行 `dsh web`），设置页即出现「模型定制」分区。

升级：`dsh plugin --profile web update dsh-model-customization`（或重跑 add 命令）。

### 一键脚本（上两步一次做完）

```sh
git clone https://github.com/Vertsineu/dsh-model-customization.git
cd dsh-model-customization
./install.sh                     # 默认安装到 web profile
./install.sh ~/.dsh/profiles/tui # 或指定其他 profile 目录
```

### 手动安装（本地 workspace / 离线）

1. 把本仓库的 `package.json` 与 `lib/` 拷到 `$DSH_HOME/profiles/web/model-customization/`（目录名可任意，但要属于 profile 的 pnpm workspace）
2. 在 profile 的 `pnpm-workspace.yaml` 的 `packages:` 列表中加入该目录
3. 在 profile 的 `package.json` 的 `dependencies` 中加入 `"dsh-model-customization": "workspace:*"`
4. 在 profile 的 `cordis.patch.yml` 追加一行：

   ```yaml
   - insert:
       - id: model-customization
         name: 'dsh-model-customization'
   ```

   其中 `name` 是 npm 包名，必须保持 `dsh-model-customization` 不变；第 1 步的目录名随意
5. 在 profile 目录执行 `pnpm install`
6. 重启 dsh

## 使用

设置 → **模型定制**：

1. 展开目标提供方卡片（徽章：服务中/未配置、手动声明）
2. 修改输入类型、thinking 级别、额外参数等
3. 点「保存该提供方」——立即生效，无需重启会话

pi-ai 路由的内置目录模型，逐模型修改写入 `modelOverrides`（部分覆盖，不含 `id` 键）；点「+ 向该路由添加新模型」后目录会被物化为 `models` 列表，该路由此后按 models 列表管理。

## 工作原理

纯客户端 dsh 插件（dual-face 包）：

- node 半为空壳（`lib/index.js`），浏览器半（`lib/client.js`）由客户端模块系统按 `package.json` 的 `dsh.client` 声明发现并注册，自动获得 `/plugins/<id>/client.js` 路由
- 数据全部走标准 `connection` API：`llm.providers`（可配置路由目录）、`settings.describe`（设置段 + revision）、`llm.models`（服务中目录，含各模型 thinking 级别）、`settings.mutate`（路径级操作 + 期望 revision）
- 保存 = 顶层字段 diff：相对路由原始用户配置的每个变化字段生成一个 `set`/`unset`，路径前缀为路由的 `settingsPath`，以读取时的 `revision` 做乐观锁；冲突时给出明确提示而不是静默覆盖

## 卸载

1. 删除 `cordis.patch.yml` 中对应的 `insert` 行
2. 从 profile 的 `package.json` 移除 `"dsh-model-customization"` 依赖
3. 删除插件目录并在 profile 目录执行 `pnpm install`
4. 重启 dsh

## 许可

MIT — 见 [LICENSE](LICENSE)。
