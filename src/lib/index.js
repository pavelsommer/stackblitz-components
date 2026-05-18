const components = import.meta.glob("/src/components/**/index.js", { eager: false });
const behaviors = import.meta.glob("/src/behaviors/**/index.js", { eager: false });
const services = import.meta.glob("/src/services/**/index.js", { eager: false });

const importComponent = async (path) => {
	const key = path ? `/src/components/${path}/index.js` : "/src/components/index.js";
	const loader = components[key];

	return loader ? await loader() : null;
};

const importBehavior = async (path) => {
	const key = path ? `/src/behaviors/${path}/index.js` : "/src/behaviors/index.js";
	const loader = behaviors[key];

	return loader ? await loader() : null;
};

const importService = async (path) => {
	const key = path ? `/src/services/${path}/index.js` : "/src/services/index.js";
	const loader = services[key];

	return loader ? await loader() : null;
};

const createTemplate = (innerHTML) => {
	const template = document.createElement("template");

	innerHTML && template.setHTMLUnsafe(innerHTML);

	return template;
};

const useTemplate = (template, refs) => {
	const fragment = template.content.cloneNode(true);

	return refs
		? {
				fragment,
				...refs(fragment),
			}
		: {
				fragment,
			};
};

const createFragment = (array, callbackFn) => {
	const fragment = document.createDocumentFragment();
	let index = 0;

	for (const item of array) {
		fragment.append(callbackFn(item, index));
		index++;
	}

	return fragment;
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

const useState = async (options) =>
	(options &&
		(options.id
			? document.getElementById(options.id).state
			: options.url
				? (await import(/* @vite-ignore */ options.url)).default
				: null)) ??
	createState();

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

const createBehavior = (Base) => {
	return class extends Base {
		#abortController = new AbortController();
		#abortSignal = null;

		get abortSignal() {
			return this.#abortSignal;
		}

		connectedCallback() {
			this.#abortSignal = this.#abortController.signal;
			this.mounted();
		}

		disconnectedCallback() {
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#abortSignal = this.#abortController.signal;
			this.unmounted();
		}

		async mounted() {}

		async unmounted() {}
	};
};

const createElement = (behavior, HTMLBase) => class extends behavior(HTMLBase) {};

export {
	importComponent,
	importBehavior,
	importService,
	createTemplate,
	useTemplate,
	createFragment,
	createState,
	useState,
	createReducer,
	createBehavior,
	createElement,
};
