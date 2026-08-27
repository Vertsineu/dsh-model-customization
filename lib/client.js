window.__ModuleLoader__.load({
	id: "dsh-model-customization",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		//#region styles
		const CSS_TEXT = [
			".ms-wrap{max-width:760px;color:var(--dsw-alias-label-primary);display:flex;flex-direction:column;gap:14px}",
			".ms-title{font-size:16px;font-weight:500;margin:0;color:var(--dsw-alias-label-primary)}",
			".ms-intro{font-size:13px;line-height:20px;margin:0;color:var(--dsw-alias-label-tertiary)}",
			".ms-card{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:12px}",
			".ms-cardHead{display:flex;align-items:center;gap:10px;cursor:pointer}",
			".ms-cardHead:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:8px}",
			".ms-caret{width:12px;color:var(--dsw-alias-label-tertiary);font-size:12px}",
			".ms-name{font-size:14px;font-weight:500}",
			".ms-route{font-size:12px;color:var(--dsw-alias-label-tertiary);font-family:var(--ds-font-family-code)}",
			".ms-badges{display:inline-flex;gap:4px;margin-left:auto;flex-wrap:wrap;justify-content:flex-end}",
			".ms-badge{font-size:11px;border:1px solid var(--dsw-alias-border-l3);border-radius:4px;padding:1px 6px;color:var(--dsw-alias-label-secondary);white-space:nowrap}",
			".ms-badgeLive{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}",
			".ms-body{display:flex;flex-direction:column;gap:14px}",
			".ms-groupTitle{font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary);margin:0}",
			".ms-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}",
			".ms-grid4{grid-template-columns:repeat(auto-fit,minmax(120px,1fr))}",
			".ms-field{display:flex;flex-direction:column;gap:4px;min-width:0}",
			".ms-label{font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary)}",
			".ms-hint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}",
			".ms-row{display:flex;gap:6px;align-items:center}",
			".ms-input{box-sizing:border-box;width:100%;height:30px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:13px;font-family:inherit;padding:0 10px}",
			"select.ms-input{cursor:pointer}",
			".ms-input:focus{border-color:var(--dsw-alias-brand-primary);outline:none}",
			".ms-input::placeholder{color:var(--dsw-alias-label-dimmed)}",
			".ms-checks{display:flex;align-items:center;gap:12px;min-height:30px;flex-wrap:wrap}",
			".ms-check{display:inline-flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}",
			".ms-link{border:none;background:none;color:var(--dsw-alias-label-tertiary);cursor:pointer;font-size:12px;padding:2px 6px;border-radius:6px;font-family:inherit}",
			".ms-link:hover{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}",
			".ms-linkDanger{border:none;background:none;color:var(--dsw-alias-state-error-primary);cursor:pointer;font-size:12px;padding:2px 6px;border-radius:6px;font-family:inherit}",
			".ms-linkDanger:hover{background:var(--dsw-alias-interactive-bg-hover-danger)}",
			".ms-iconBtn{width:24px;height:24px;flex:none;border:1px solid var(--dsw-alias-border-l2);background:none;color:var(--dsw-alias-label-tertiary);border-radius:6px;cursor:pointer;font-size:14px;line-height:1}",
			".ms-iconBtn:hover{color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-primary)}",
			".ms-kv{display:flex;flex-direction:column;gap:6px}",
			".ms-kvRow{display:flex;gap:6px;align-items:center}",
			".ms-kvRow .ms-input{flex:1}",
			".ms-model{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}",
			".ms-modelHead{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}",
			".ms-modelId{font-size:13px;font-weight:500;font-family:var(--ds-font-family-code)}",
			".ms-models{display:flex;flex-direction:column;gap:8px}",
			".ms-efforts{display:flex;flex-direction:column;gap:6px}",
			".ms-effortsList{display:flex;flex-direction:column;gap:6px}",
			".ms-saveBar{display:flex;align-items:center;gap:10px;justify-content:flex-end;flex-wrap:wrap;border-top:1px solid var(--dsw-alias-border-l2);padding-top:10px}",
			".ms-btn{height:32px;border:none;border-radius:16px;cursor:pointer;font-size:13px;font-family:inherit;padding:0 16px}",
			".ms-btn:disabled{opacity:.4;cursor:default}",
			".ms-btnPrimary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}",
			".ms-btnPrimary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}",
			".ms-error{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px;max-width:100%}",
			".ms-ok{color:var(--dsw-alias-state-success-primary);font-size:12px}",
			".ms-empty{border:1px dashed var(--dsw-alias-border-l3);border-radius:10px;padding:16px;font-size:13px;color:var(--dsw-alias-label-tertiary);text-align:center;line-height:20px}",
			".ms-addRow{display:flex;gap:6px;align-items:center;flex-wrap:wrap}"
		].join("\n")
		const CSS_TAG_ID = "dsh-model-customization/style"
		function installStyles() {
			if (typeof document === "undefined") return
			if (document.querySelector('style[data-plugin-css="' + CSS_TAG_ID + '"]') !== null) return
			const tag = document.createElement("style")
			tag.dataset.plugin = "dsh-model-customization"
			tag.dataset.pluginCss = CSS_TAG_ID
			tag.textContent = CSS_TEXT
			document.head.appendChild(tag)
		}
		//#endregion
		//#region helpers
		const THINKING_LEVELS = ['minimal', 'low', 'medium', 'high', 'xhigh', 'max']
		const PI_LEVELS = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']
		const DS_EFFORTS = ['off', 'low', 'high', 'max']
		const TRANSPORTS = ['sse', 'websocket', 'websocket-cached', 'auto']
		const CACHE_RETENTION = ['none', 'short', 'long']
		const MODALITIES = ['text', 'image']
		const DS_MODEL_KEYS = ['id', 'name', 'description', 'contextWindow', 'maxTokens', 'inputModalities', 'imageDetail', 'imagePixelBudget', 'imageMaxBytes']

		const el = (type, props, ...children) => react.createElement(type, props, ...children)
		function clone(value) {
			if (value === undefined || value === null) return value
			if (Array.isArray(value)) return value.map(clone)
			if (typeof value === 'object') {
				const out = {}
				for (const key of Object.keys(value)) out[key] = clone(value[key])
				return out
			}
			return value
		}
		function same(a, b) { return JSON.stringify(a) === JSON.stringify(b) }
		function isObj(v) { return typeof v === 'object' && v !== null && !Array.isArray(v) }
		function isArr(v) { return Array.isArray(v) }
		function isPlain(v) { return typeof v === 'object' && v !== null && !Array.isArray(v) }
		function pathGet(root, path) {
			let node = root
			for (const key of path) {
				if (node === undefined || node === null) return undefined
				node = node[key]
			}
			return node
		}
		function resultError(response) {
			if (response === null || response === undefined) return '网关无响应'
			if (response.result === undefined || response.result.ok !== true) {
				const err = response.result && response.result.error
				return err === undefined ? '请求失败' : (typeof err.message === 'string' ? err.message : String(err))
			}
			return undefined
		}
		//#endregion
		//#region controls
		function Field(props) {
			return el('div', { className: 'ms-field' },
				el('span', { className: 'ms-label' }, props.label),
				props.children,
				props.hint === undefined ? null : el('span', { className: 'ms-hint' }, props.hint))
		}

		function NumInput(props) {
			return el('input', {
				className: 'ms-input',
				type: 'number',
				value: props.value === undefined ? '' : String(props.value),
				placeholder: props.placeholder === undefined ? '' : props.placeholder,
				onChange: (e) => {
					const text = e.target.value
					if (text === '') { props.onChange(undefined); return }
					const n = Number(text)
					if (Number.isFinite(n)) props.onChange(n)
				}
			})
		}

		function NumField(props) {
			return el('div', { className: 'ms-field' },
				el('span', { className: 'ms-label' }, props.label),
				el('div', { className: 'ms-row' },
					el(NumInput, { value: props.value, onChange: props.onChange, placeholder: props.placeholder }),
					props.value !== undefined
						? el('button', { type: 'button', className: 'ms-link', onClick: () => props.onChange(undefined) }, '清除')
						: null))
		}

		function Sel(props) {
			return el('select', {
				className: 'ms-input',
				value: props.value === undefined ? '' : String(props.value),
				onChange: (e) => props.onChange(e.target.value === '' ? undefined : e.target.value)
			},
			props.options.map((opt) => el('option', {
				key: opt.value === undefined ? '' : String(opt.value),
				value: opt.value === undefined ? '' : String(opt.value)
			}, opt.label)))
		}

		function SelField(props) {
			return el('div', { className: 'ms-field' },
				el('span', { className: 'ms-label' }, props.label),
				el(Sel, { value: props.value, onChange: props.onChange, options: props.options }),
				props.hint === undefined ? null : el('span', { className: 'ms-hint' }, props.hint))
		}

		function ModalityChecks(props) {
			const arr = isArr(props.value) ? props.value : []
			return el('div', { className: 'ms-checks' },
				MODALITIES.map((m) => el('label', { key: m, className: 'ms-check' },
					el('input', {
						type: 'checkbox',
						checked: arr.includes(m),
						onChange: () => props.onChange(arr.includes(m) ? arr.filter((x) => x !== m) : [...arr, m])
					}),
					el('span', null, m))),
				arr.length > 0
					? el('button', { type: 'button', className: 'ms-link', onClick: () => props.onChange(undefined) }, '清除')
					: null)
		}

		function KVEditor(props) {
			const [rows, setRowsState] = react.useState(() => isObj(props.value) ? Object.entries(props.value) : [])
			function commit(list) {
				setRowsState(list)
				const obj = {}
				for (const [k, v] of list) if (k !== '') obj[k] = v
				props.onChange(Object.keys(obj).length === 0 ? undefined : obj)
			}
			function textOf(v) { return typeof v === 'string' ? v : JSON.stringify(v) }
			function parseOf(text) {
				if (text === '' || props.jsonValues !== true) return text
				try { return JSON.parse(text) } catch (err) { return text }
			}
			return el('div', { className: 'ms-kv' },
				rows.length === 0 ? el('div', { className: 'ms-hint' }, '（空）') : null,
				rows.map(([k, v], i) => el('div', { key: i, className: 'ms-kvRow' },
					el('input', { className: 'ms-input', value: k, placeholder: props.keyPlaceholder, onChange: (e) => { const list = rows.slice(); list[i] = [e.target.value, v]; commit(list) } }),
					el('input', { className: 'ms-input', value: textOf(v), placeholder: props.valuePlaceholder, onChange: (e) => { const list = rows.slice(); list[i] = [k, parseOf(e.target.value)]; commit(list) } }),
					el('button', { type: 'button', className: 'ms-iconBtn', 'aria-label': '删除', onClick: () => commit(rows.filter((_, j) => j !== i)) }, '×'))),
				el('button', { type: 'button', className: 'ms-link', onClick: () => commit(rows.concat([['', '']])) }, '+ 添加一行'))
		}

		function EffortsEditor(props) {
			const mode = props.value === undefined ? 'inherit' : props.value === false ? 'off' : 'custom'
			const map = mode === 'custom' && isObj(props.value) ? props.value : {}
			const levels = Object.keys(map)
			return el('div', { className: 'ms-efforts' },
				el(Sel, {
					value: mode,
					onChange: (m) => {
						if (m === 'inherit') props.onChange(undefined)
						else if (m === 'off') props.onChange(false)
						else props.onChange({ low: 'low' })
					},
					options: [
						{ value: 'inherit', label: '继承（沿用目录/上级默认）' },
						{ value: 'off', label: '关闭 thinking（非思考模型）' },
						{ value: 'custom', label: '自定义提供的级别' }
					]
				}),
				mode === 'custom' ? el('div', { className: 'ms-effortsList' },
					levels.map((level) => el('div', { key: level, className: 'ms-kvRow' },
						el('span', { className: 'ms-badge' }, level),
						el('input', {
							className: 'ms-input',
							value: map[level] === null || map[level] === undefined ? '' : String(map[level]),
							placeholder: '线上值（多数网关填级别名即可）',
							onChange: (e) => { const next = Object.assign({}, map); next[level] = e.target.value; props.onChange(next) }
						}),
						el('button', { type: 'button', className: 'ms-iconBtn', 'aria-label': '删除级别', onClick: () => { const next = Object.assign({}, map); delete next[level]; props.onChange(next) } }, '×'))),
					el('button', {
						type: 'button',
						className: 'ms-link',
						onClick: () => {
							const remaining = THINKING_LEVELS.filter((l) => !(l in map))
							if (remaining.length === 0) return
							const next = Object.assign({}, map)
							next[remaining[0]] = remaining[0]
							props.onChange(next)
						}
					}, '+ 添加级别')) : null)
		}
		//#endregion
		//#region model cards
		function PiModelCard(props) {
			const model = props.model
			const set = (field, v) => {
				const next = clone(model)
				if (v === undefined) delete next[field]
				else next[field] = v
				props.onChange(next)
			}
			return el('div', { className: 'ms-model' },
				el('div', { className: 'ms-modelHead' },
					el('span', { className: 'ms-modelId' }, model.id),
					model.name !== undefined && model.name !== model.id ? el('span', { className: 'ms-hint' }, model.name) : null,
					props.effective !== undefined ? el('span', { className: 'ms-hint' }, '当前生效: ' + props.effective) : null,
					props.onRemove !== undefined
						? el('button', { type: 'button', className: 'ms-linkDanger', style: { marginLeft: 'auto' }, onClick: props.onRemove }, props.override ? '删除此覆盖' : '删除此模型')
						: null),
				el('div', { className: 'ms-grid' },
					el(NumField, { label: 'contextWindow', value: model.contextWindow, onChange: (v) => set('contextWindow', v), placeholder: '默认' }),
					el(NumField, { label: 'maxTokens', value: model.maxTokens, onChange: (v) => set('maxTokens', v), placeholder: '默认' }),
					el(Field, { label: '输入类型', hint: '清除后回退到提供方默认' },
						el(ModalityChecks, { value: model.input, onChange: (v) => set('input', v) })),
					el(Field, { label: 'thinking', hint: '该模型提供的级别及其线上取值' },
						el(EffortsEditor, { value: model.reasoningEfforts, onChange: (v) => set('reasoningEfforts', v) }))))
		}

		function DSModelCard(props) {
			const model = Object.assign({}, props.base, props.custom)
			const set = (field, v) => props.onPatch({ [field]: v })
			return el('div', { className: 'ms-model' },
				el('div', { className: 'ms-modelHead' },
					el('span', { className: 'ms-modelId' }, model.id),
					model.name !== undefined ? el('span', { className: 'ms-hint' }, model.name) : null,
					props.effective !== undefined ? el('span', { className: 'ms-hint' }, '当前生效: ' + props.effective) : null),
				el('div', { className: 'ms-grid' },
					el(NumField, { label: 'contextWindow', value: props.custom.contextWindow, onChange: (v) => set('contextWindow', v), placeholder: String(props.base.contextWindow === undefined ? '默认' : props.base.contextWindow) }),
					el(NumField, { label: 'maxTokens', value: props.custom.maxTokens, onChange: (v) => set('maxTokens', v), placeholder: String(props.base.maxTokens === undefined ? '默认' : props.base.maxTokens) }),
					el(Field, { label: '输入类型', hint: '清除后回退为 text' },
						el(ModalityChecks, { value: props.custom.inputModalities, onChange: (v) => set('inputModalities', v) }))))
		}
		//#endregion
		//#region route editors
		function PiRouteEditor(props) {
			const draft = props.draft
			const setField = props.setField
			const compat = isObj(draft.compat) ? draft.compat : {}
			function setCompat(patch) {
				const next = Object.assign({}, compat)
				for (const [k, v] of Object.entries(patch)) {
					if (v === undefined) delete next[k]
					else next[k] = v
				}
				setField('compat', Object.keys(next).length === 0 ? undefined : next)
			}
			const budgets = isObj(draft.thinkingBudgets) ? draft.thinkingBudgets : {}
			function setBudgets(patch) {
				const next = Object.assign({}, budgets)
				for (const [k, v] of Object.entries(patch)) {
					if (v === undefined) delete next[k]
					else next[k] = v
				}
				const present = ['minimal', 'low', 'medium', 'high'].filter((k) => typeof next[k] === 'number')
				setField('thinkingBudgets', present.length === 0 ? undefined : next)
			}
			return el('div', { className: 'ms-body' },
				el('h4', { className: 'ms-groupTitle' }, '提供方级别'),
				el('div', { className: 'ms-grid' },
					el(NumField, { label: '默认 contextWindow', value: draft.defaultContextWindow, onChange: (v) => setField('defaultContextWindow', v), placeholder: '默认 262144' }),
					el(NumField, { label: '默认 maxTokens', value: draft.defaultMaxTokens, onChange: (v) => setField('defaultMaxTokens', v), placeholder: '默认 32768' }),
					el(SelField, { label: '默认 thinking 级别', value: draft.reasoning, onChange: (v) => setField('reasoning', v), options: [{ value: '', label: '默认（由网关决定）' }].concat(PI_LEVELS.map((l) => ({ value: l, label: l }))), hint: '作用于该路由所有模型，可被模型级设置覆盖' }),
					el(SelField, { label: 'transport', value: draft.transport, onChange: (v) => setField('transport', v), options: [{ value: '', label: '默认 auto' }].concat(TRANSPORTS.map((t) => ({ value: t, label: t }))) }),
					el(SelField, { label: 'cacheRetention', value: draft.cacheRetention, onChange: (v) => setField('cacheRetention', v), options: [{ value: '', label: '默认' }].concat(CACHE_RETENTION.map((c) => ({ value: c, label: c }))) }),
					el(NumField, { label: 'timeoutMs（请求超时）', value: draft.timeoutMs, onChange: (v) => setField('timeoutMs', v), placeholder: '默认' }),
					el(Field, { label: '默认输入类型', hint: '作用于未声明 input 的模型' },
						el(ModalityChecks, { value: draft.defaultInput, onChange: (v) => setField('defaultInput', v) }))),
				el(Field, { label: 'thinkingBudgets（各 thinking 级别的 token 预算）', hint: '需四项全部填写或全部留空' },
					el('div', { className: 'ms-grid ms-grid4' },
						['minimal', 'low', 'medium', 'high'].map((k) => el(NumField, { key: k, label: k, value: budgets[k], onChange: (v) => setBudgets({ [k]: v }), placeholder: '留空' })))),
				el(Field, { label: '额外请求 headers', hint: '追加到该路由每个请求的键值对' },
					el(KVEditor, { value: draft.headers, onChange: (v) => setField('headers', v), keyPlaceholder: 'Header 名', valuePlaceholder: 'Header 值' })),
				el(Field, { label: 'vLLM 额外参数（compat.chatTemplateKwargs）', hint: '值为 JSON；可用 {"$var":"thinking.effort","omitWhenOff":true} 注入当前 thinking 状态' },
					el(KVEditor, { value: compat.chatTemplateKwargs === undefined ? undefined : compat.chatTemplateKwargs, onChange: (v) => setCompat({ chatTemplateKwargs: v }), keyPlaceholder: '参数名（如 top_p）', valuePlaceholder: 'JSON 值（如 0.9）', jsonValues: true })))
		}

		function DsRouteEditor(props) {
			const draft = props.draft
			const setField = props.setField
			return el('div', { className: 'ms-body' },
				el('h4', { className: 'ms-groupTitle' }, '提供方级别'),
				el('div', { className: 'ms-grid' },
					el(SelField, { label: 'thinking', value: draft.thinking, onChange: (v) => setField('thinking', v), options: [{ value: '', label: '默认' }, { value: 'enabled', label: 'enabled' }, { value: 'disabled', label: 'disabled' }] }),
					el(SelField, { label: 'reasoningEffort', value: draft.reasoningEffort, onChange: (v) => setField('reasoningEffort', v), options: [{ value: '', label: '默认' }].concat(DS_EFFORTS.map((l) => ({ value: l, label: l }))), hint: 'DeepSeek 的思考强度' }),
					el(NumField, { label: '默认 maxTokens', value: draft.maxTokens, onChange: (v) => setField('maxTokens', v), placeholder: '默认 256000' }),
					el(NumField, { label: '默认 contextWindow', value: draft.defaultContextWindow, onChange: (v) => setField('defaultContextWindow', v), placeholder: '默认' })))
		}
		//#endregion
		//#region models block
		function piModelEntries(prov, draft) {
			if (isArr(draft.models)) {
				return draft.models.map((m) => ({
					source: 'models',
					id: isObj(m) && typeof m.id === 'string' ? m.id : '（无效模型项）',
					raw: m
				}))
			}
			if (prov.liveModels !== null) {
				return prov.liveModels.map((m) => ({ source: 'override', id: m.id, thinking: m.thinking }))
			}
			return []
		}

		function effectiveOfPi(entry) {
			if (entry === undefined) return undefined
			if (entry.thinking === undefined) return undefined
			return 'thinking ' + entry.thinking
		}

		function effectiveOfDs(base) {
			if (base === undefined) return undefined
			const parts = []
			parts.push(base.inputModalities === undefined ? '未知' : base.inputModalities.join(' + '))
			if (base.contextWindow !== undefined) parts.push('ctx ' + String(base.contextWindow))
			if (base.maxTokens !== undefined) parts.push('max ' + String(base.maxTokens))
			return parts.join(' · ')
		}

		function ModelsBlock(props) {
			const prov = props.prov
			const draft = props.draft
			if (prov.family === 'pi-ai') {
				const declared = isArr(draft.models)
				const overrides = isObj(draft.modelOverrides) ? draft.modelOverrides : {}
				const entries = piModelEntries(prov, draft)
				function setModelOverride(id, overrideValue) {
					const next = Object.assign({}, overrides)
					if (overrideValue === undefined || Object.keys(overrideValue).length === 0) delete next[id]
					else next[id] = overrideValue
					props.setField('modelOverrides', Object.keys(next).length === 0 ? undefined : next)
				}
				return el('div', { className: 'ms-body' },
					el('h4', { className: 'ms-groupTitle' }, declared ? '模型（本路由已声明 models 列表）' : '模型（内置目录 + 模型级覆盖）'),
					declared ? el('div', { className: 'ms-models' }, entries.map((entry, i) => {
						const raw = isObj(entry.raw) ? entry.raw : {}
						return el(PiModelCard, {
							key: entry.id + ':' + String(i),
							model: raw,
							effective: effectiveOfPi(prov.liveModels === null ? undefined : prov.liveModels.find((m) => m.id === entry.id)),
							onChange: (nextModel) => {
								const list = draft.models.slice()
								list[i] = nextModel
								props.setField('models', list)
							},
							onRemove: () => {
								props.setField('models', draft.models.filter((_, j) => j !== i))
							}
						})
					})) : el('div', { className: 'ms-models' },
						entries.length === 0
							? el('div', { className: 'ms-empty' }, '该路由尚未在服务中。请先在「模型」页完成配置（baseURL / API key），之后即可在此定制每个模型；当前仍可编辑上方提供方级别参数。')
							: entries.map((entry) => {
								const custom = isObj(overrides[entry.id]) ? overrides[entry.id] : {}
								const display = Object.assign({ id: entry.id }, custom)
								return el(PiModelCard, {
									key: entry.id,
									model: display,
									override: true,
									effective: effectiveOfPi(entry),
									onChange: (nextModel) => {
										const overrideValue = Object.assign({}, nextModel)
										delete overrideValue.id
										setModelOverride(entry.id, overrideValue)
									},
									onRemove: () => setModelOverride(entry.id, undefined)
								})
							})),
					declared === false && prov.live === true && prov.liveModels !== null
						? el('div', { className: 'ms-addRow' },
							props.adding ? el('div', { className: 'ms-kvRow' },
								el('input', { className: 'ms-input', value: props.newId, placeholder: '模型 ID（必填）', onChange: (e) => props.setNewId(e.target.value) }),
								el('input', { className: 'ms-input', value: props.newName, placeholder: '名称（可选）', onChange: (e) => props.setNewName(e.target.value) }),
								el('button', { type: 'button', className: 'ms-btn ms-btnPrimary', disabled: props.newId.trim() === '', onClick: props.submitAdd }, '添加'),
								el('button', { type: 'button', className: 'ms-link', onClick: () => props.setAdding(false) }, '取消'))
							: el('button', { type: 'button', className: 'ms-link', onClick: () => props.setAdding(true) }, '+ 向该路由添加新模型（将把目录物化为 models 列表）'))
						: null)
			}
			const baseList = prov.resolved !== null && isArr(prov.resolved.models) ? prov.resolved.models : []
			return el('div', { className: 'ms-body' },
				el('h4', { className: 'ms-groupTitle' }, '模型'),
				el('div', { className: 'ms-models' },
					baseList.map((base) => {
						const custom = isArr(draft.models)
							? (draft.models.find((x) => isObj(x) && x.id === base.id) ?? null)
							: null
						return el(DSModelCard, {
							key: base.id,
							base: base,
							custom: isObj(custom) ? custom : {},
							effective: effectiveOfDs(base),
							onPatch: (patch) => props.dsSetModel(base.id, patch)
						})
					})))
		}
		//#endregion
		//#region provider card
		function ProviderCard(props) {
			const prov = props.prov
			const original = isObj(prov.user) ? prov.user : {}
			const [open, setOpen] = react.useState(false)
			const [draft, setDraft] = react.useState(() => clone(original))
			const [busy, setBusy] = react.useState(false)
			const [status, setStatus] = react.useState(null)
			const [adding, setAdding] = react.useState(false)
			const [newId, setNewId] = react.useState('')
			const [newName, setNewName] = react.useState('')

			const dirty = !same(draft, original)
			function setField(field, value) {
				setDraft((d) => {
					const next = clone(d)
					if (value === undefined) delete next[field]
					else next[field] = value
					return next
				})
				setStatus(null)
			}

			function dsSetModel(id, patch) {
				const baseList = prov.resolved !== null && isArr(prov.resolved.models) ? prov.resolved.models : []
				setDraft((d) => {
					const next = clone(d)
					const base = baseList.map((m) => {
						const out = {}
						for (const k of DS_MODEL_KEYS) if (m[k] !== undefined) out[k] = m[k]
						return out
					})
					const list = isArr(next.models) ? next.models : base
					const i = list.findIndex((m) => isObj(m) && m.id === id)
					const cur = i >= 0 ? Object.assign({}, list[i]) : { id }
					for (const [k, v] of Object.entries(patch)) {
						if (v === undefined) delete cur[k]
						else cur[k] = v
					}
					if (i >= 0) list[i] = cur
					else list.push(cur)
					next.models = list
					return next
				})
				setStatus(null)
			}

			function submitAdd() {
				const id = newId.trim()
				if (id === '') return
				const base = (prov.liveModels ?? []).map((m) => ({
					id: m.id,
					...(m.name === undefined || m.name === m.id ? {} : { name: m.name })
				}))
				if (base.some((m) => m.id === id)) {
					setAdding(false)
					return
				}
				base.push({
					id,
					...(newName.trim() === '' ? {} : { name: newName.trim() })
				})
				setField('models', base)
				setAdding(false)
				setNewId('')
				setNewName('')
			}

			async function save() {
				if (!dirty || busy) return
				setBusy(true)
				setStatus(null)
				try {
					const edits = []
					const fields = new Set([...Object.keys(original), ...Object.keys(draft)])
					for (const field of Array.from(fields).sort()) {
						const before = original[field]
						const after = draft[field]
						if (same(before, after)) continue
						edits.push(after === undefined ? { field } : { field, value: after })
					}
					const ops = edits.map((edit) => edit.value === undefined
						? { op: 'unset', path: [...prov.settingsPath, edit.field] }
						: { op: 'set', path: [...prov.settingsPath, edit.field], value: edit.value })
					const response = await props.api.settings.mutate({
						ns: prov.ns,
						ops: ops,
						expectedRevision: prov.revision
					})
					const failure = resultError(response)
					if (failure !== undefined) {
						let text = failure
						const err = response !== null && response.result !== undefined ? response.result.error : undefined
						if (err !== undefined && err.code === 'settings-conflict') text = '设置已被其他修改者更新，请点「重新加载」后再次编辑。'
						setStatus({ kind: 'error', text })
						return
					}
					setStatus({ kind: 'ok', text: ops.length === 0 ? '没有改动' : '已保存，立即生效' })
					props.onSaved()
				} catch (err) {
					setStatus({ kind: 'error', text: err instanceof Error ? err.message : String(err) })
				} finally {
					setBusy(false)
				}
			}

			return el('div', { className: 'ms-card' },
				el('div', {
					className: 'ms-cardHead',
					role: 'button',
					tabIndex: 0,
					onClick: () => setOpen(!open),
					onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open) }
				},
					el('span', { className: 'ms-caret' }, open ? '▾' : '▸'),
					el('span', { className: 'ms-name' }, prov.displayName),
					prov.displayName !== prov.provider ? el('span', { className: 'ms-route' }, prov.provider) : null,
					el('span', { className: 'ms-badges' },
						el('span', { key: 'live', className: prov.live ? 'ms-badge ms-badgeLive' : 'ms-badge' }, prov.live ? '服务中' : '未配置'),
						prov.family !== 'pi-ai' ? el('span', { key: 'fam', className: 'ms-badge' }, prov.family) : null,
						prov.declared === true ? el('span', { key: 'dec', className: 'ms-badge' }, '手动声明') : null)),
				open ? el('div', { className: 'ms-body' },
					prov.family === 'pi-ai' ? el(PiRouteEditor, { draft: draft, setField: setField }) : null,
					prov.family === 'deepseek' ? el(DsRouteEditor, { draft: draft, setField: setField }) : null,
					prov.family === 'other' ? el('div', { className: 'ms-empty' }, '该提供方的设置命名空间不由本插件管理，请在 settings.yaml 中直接编辑。') : null,
					(prov.family === 'pi-ai' || prov.family === 'deepseek')
						? el(ModelsBlock, {
							prov: prov,
							draft: draft,
							setField: setField,
							dsSetModel: dsSetModel,
							adding: adding,
							setAdding: setAdding,
							newId: newId,
							setNewId: setNewId,
							newName: newName,
							setNewName: setNewName,
							submitAdd: submitAdd
						})
						: null,
					el('div', { className: 'ms-saveBar' },
						status !== null ? el('span', { className: status.kind === 'ok' ? 'ms-ok' : 'ms-error' }, status.text) : null,
						dirty ? el('span', { className: 'ms-hint' }, '有未保存的更改') : null,
						el('button', { type: 'button', className: 'ms-btn ms-btnPrimary', disabled: !dirty || busy, onClick: save }, busy ? '保存中…' : '保存该提供方')))
				: null)
		}
		//#endregion
		//#region section
		function Section(props) {
			const api = props.api
			const [state, setState] = react.useState({ status: 'loading', providers: null, error: null })
			async function load() {
				try {
					const [providersRes, describeRes, modelsRes] = await Promise.all([
						api.llm.providers({}),
						api.settings.describe({}),
						api.llm.models({})
					])
					const failure = resultError(providersRes) ?? resultError(describeRes)
					if (failure !== undefined) throw new Error(failure)
					const providers = providersRes.result.value.providers
					const views = new Map(describeRes.result.value.namespaces.map((view) => [view.ns, view]))
					const catalog = modelsRes.result.ok === true ? modelsRes.result.value : null
					const rows = []
					for (const entry of providers) {
						const view = views.get(entry.settingsNs)
						if (view === undefined) continue
						const user = pathGet(view.user, entry.settingsPath)
						// Only routes the user has actually configured (custom API / API key
						// entries) are listed; untouched catalog routes stay hidden.
						if (!isPlain(user) || Object.keys(user).length === 0) continue
						const resolved = pathGet(view.value, entry.settingsPath)
						const group = catalog === null || catalog.groups === undefined
							? undefined
							: catalog.groups.find((g) => g.id === entry.provider)
						const liveModels = group === undefined
							? null
							: group.models.map((m) => ({
								id: m.id,
								name: m.name,
								...(m.reasoning === undefined ? {} : {
									thinking: m.reasoning.efforts.map((e) => e.id).join('/')
								})
							}))
						rows.push({
							provider: entry.provider,
							displayName: entry.displayName,
							declared: entry.declared === true,
							live: entry.active === true,
							family: entry.settingsNs === 'llm-pi-ai' ? 'pi-ai'
								: entry.settingsNs === 'llm-deepseek' ? 'deepseek'
								: 'other',
							ns: entry.settingsNs,
							settingsPath: entry.settingsPath,
							revision: view.revision,
							user: isPlain(user) ? user : null,
							resolved: isPlain(resolved) ? resolved : null,
							liveModels
						})
					}
					setState({ status: 'ready', providers: rows, error: null })
				} catch (err) {
					setState({ status: 'error', providers: null, error: err instanceof Error ? err.message : String(err) })
				}
			}
			react.useEffect(() => { load() }, [])
			const head = el('div', null,
				el('h2', { className: 'ms-title' }, '模型定制'),
				el('p', { className: 'ms-intro' }, '按提供方路由与模型粒度定制输入类型、thinking 级别与额外参数。更改写入对应的 llm-pi-ai / llm-deepseek 设置段（即 settings.yaml），保存后立即生效。API key 与提供方基础信息仍在「模型」页管理。'))
			if (state.status === 'loading') {
				return el('div', { className: 'ms-wrap' }, head, el('div', { className: 'ms-empty' }, '加载中…'))
			}
			if (state.status === 'error') {
				return el('div', { className: 'ms-wrap' }, head, el('div', { className: 'ms-error' }, state.error))
			}
			return el('div', { className: 'ms-wrap' },
				head,
				el('div', { className: 'ms-saveBar', style: { borderTop: 'none', paddingTop: 0, justifyContent: 'flex-start' } },
					el('button', { type: 'button', className: 'ms-link', onClick: load }, '↻ 重新加载')),
				state.providers.length === 0
					? el('div', { className: 'ms-empty' }, '还没有配置任何自定义提供方 — 请先在「模型」页添加自定义 API 与 API key，配置后这里才会出现对应的定制项')
					: state.providers.map((prov) => el(ProviderCard, { key: prov.provider + '@' + String(prov.revision), prov: prov, api: api, onSaved: load })))
		}
		//#endregion
		//#region plugin
		const inject = ['slots', 'connection']
		function apply(ctx) {
			installStyles()
			const slots = ctx.get('slots')
			const connection = ctx.get('connection')
			if (slots === undefined || connection === undefined) return
			const api = connection.api
			slots.inject('settings.section', () => slots.register({
				name: 'settings.section',
				id: 'model-customization',
				order: 12,
				label: '模型定制'
			}, () => el(Section, { api: api })))
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
