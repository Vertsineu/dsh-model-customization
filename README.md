# dsh-model-customization (Model Customization Studio)

[English](README.md) | [中文](README.zh.md)

A pure-client plugin for the [dsh](https://github.com/deepseek-ai/deepseek-harness) **web profile** that adds a **Model Customization** (模型定制) section to the settings page. Customize **input modalities, thinking levels, and extra request parameters** per provider route and per model — without hand-editing `settings.yaml`.

## What it does

- **Only lists routes you actually configured** — the provider list is filtered to routes with a real settings profile (custom API + API key entries you created in the Models page). Untouched catalog routes (xiaomi, openai, …) stay hidden.
- **Provider-level customization** (pi-ai and DeepSeek routes):

  | Field | Meaning |
  |---|---|
  | default contextWindow / maxTokens | fallback for models that do not declare their own |
  | default thinking level | `off`/`minimal`/`low`/`medium`/`high`/`xhigh`/`max`, overridable per model |
  | transport | `sse` / `websocket` / `websocket-cached` / `auto` |
  | cacheRetention | `none` / `short` / `long` |
  | timeoutMs | request timeout |
  | default input modalities | `text` / `image` fallback |
  | thinkingBudgets | token budget per thinking level (all four, or none) |
  | extra request headers | key/value pairs appended to every request on the route |
  | vLLM extra parameters | `compat.chatTemplateKwargs`; JSON values, supports `{"$var":"thinking.effort","omitWhenOff":true}` to inject the live thinking state |

- **Model-level customization**: contextWindow, maxTokens, input modalities, thinking level (inherit / off / custom level→wire-value map). For pi-ai routes you can also **add models that are not in the built-in catalog**.
- **DeepSeek official route**: thinking, reasoningEffort, default maxTokens/contextWindow, per-model contextWindow/maxTokens/inputModalities (full-list write semantics: the edited list replaces the catalog).
- **Safe saves**: only the changed top-level fields are written to the corresponding section of `settings.yaml` (path ops with optimistic revision locking); changes apply immediately. API keys, baseURL, and other route basics stay managed on the Models page and are never rewritten.

## Requirements

- a dsh installation with the **web** profile (`dsh web`)
- [pnpm](https://pnpm.io) (the profile's plugin workspace)

## Installation

### One-shot script

```sh
git clone https://github.com/Vertsineu/dsh-model-customization.git
cd dsh-model-customization
./install.sh                     # installs into the web profile by default
./install.sh ~/.dsh/profiles/tui # or pass another profile directory
```

Then **restart dsh** (run `dsh web` again) — the settings page gains a **模型定制 / Model Customization** section.

### Manual

1. Copy this repo's `package.json` and `lib/` into `$DSH_HOME/profiles/web/model-customization/` (any directory name works; it just has to be part of the profile's pnpm workspace).
2. Add the directory to `packages:` in the profile's `pnpm-workspace.yaml`.
3. Add `"dsh-model-customization": "workspace:*"` to the profile's `package.json` `dependencies`.
4. Append one row to the profile's `cordis.patch.yml`:

   ```yaml
   - insert:
       - id: model-customization
         name: 'dsh-model-customization'
   ```

   The `name` is the npm package name and must stay exactly `dsh-model-customization`; the directory name from step 1 is free.
5. Run `pnpm install` in the profile directory.
6. Restart dsh.

## Usage

Settings → **模型定制 / Model Customization**:

1. Expand a provider card (badges: 服务中/未配置 = live/not configured, 手动声明 = declared route).
2. Edit fields — modalities, thinking levels, headers, vLLM parameters.
3. Click **保存该提供方 / Save** — applied immediately, no session restart.

For pi-ai routes whose models come from the built-in catalog, per-model edits are written to `modelOverrides` (partial overrides, no `id` key). Clicking **+ 向该路由添加新模型** materializes the catalog into a `models` list; after that the route is edited as an explicit models list.

## How it works

The plugin is a pure-client dsh plugin (dual-face package):

- the node half is an empty shell (`lib/index.js`); the browser half (`lib/client.js`) is discovered from the `package.json` `dsh.client` declaration, registered by the client module system, and served at `/plugins/<id>/client.js`;
- all data flows through the standard `connection` API: `llm.providers` (configurable-route directory), `settings.describe` (namespace views + revisions), `llm.models` (live catalog incl. per-model thinking efforts), `settings.mutate` (path-addressed ops + expected revision);
- a save computes a top-level field diff against the route's original user profile, prefixes each op with the route's `settingsPath`, and mutates with the read revision as the expected value — conflicts surface as a clear message instead of a silent overwrite.

## Uninstall

1. Remove the `insert` row from `cordis.patch.yml`.
2. Remove the `"dsh-model-customization"` dependency from the profile's `package.json`.
3. Delete the plugin directory and run `pnpm install` in the profile directory.
4. Restart dsh.

## License

MIT — see [LICENSE](LICENSE).
