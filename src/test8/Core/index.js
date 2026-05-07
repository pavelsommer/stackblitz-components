const createTemplate = (innerHTML) => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(innerHTML);

	return template;
};

const useTemplate = (template, refs) => {
	const fragment = template.content.cloneNode(true);

	return {
		fragment,
		...refs(fragment),
	};
};

const createState = (initial = {}) => {
	const eventTarget = new EventTarget();

	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
			const result = Reflect.set(target, key, value, receiver);

			eventTarget.dispatchEvent(
				new CustomEvent(`prop-changed-${key}`, {
					detail: {
						target,
						key,
						oldValue,
						value,
						receiver,
					},
				}),
			);

			return result;
		},
	};

	const props = new Proxy(initial, handler);
	const watch = (prop, listener, abortSignal) => {
		eventTarget.addEventListener(`prop-changed-${prop}`, listener, {
			signal: abortSignal,
		});
	};

	return {
		props,
		watch,
	};
};

const createReducer = (props, reducer) => {
	const handler = {
		get: (target, key, receiver) => {
			return reducer[key](props[key], props);
		},

		set: (target, key, value, receiver) => {
			reducer[key] = value;

			return true;
		},
	};

	return new Proxy(props, handler);
};

const componentBase = (baseClass, tagName, impl) => {
	return impl(
		class extends baseClass {
			#abortController = new AbortController();
			#abortSignal = null;

			get abortSignal() {
				return this.#abortSignal;
			}

			connectedCallback() {
				this.#abortSignal = this.#abortController.signal;
				tagName && !this.hasAttribute("is") && this.setAttribute("is", tagName);
			}

			disconnectedCallback() {
				this.#abortController.abort();
				this.#abortController = new AbortController();
				this.#abortSignal = this.#abortController.signal;
			}
		},
	);
};

const registerComponent = (Class, tagName, extendsName) => {
	tagName &&
		(extendsName
			? customElements.define(tagName, Class, { extends: extendsName })
			: customElements.define(tagName, Class));

	return Class;
};

export {
	createTemplate,
	useTemplate,
	createState,
	createReducer,
	componentBase,
	registerComponent,
};
