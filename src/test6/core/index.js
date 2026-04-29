const createState = (eventTarget, props = {}) => {
	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];
			const result = Reflect.set(target, key, value, receiver);

			eventTarget.dispatchEvent(
				new CustomEvent("prop-changed", {
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

	const proxy = new Proxy(props, handler);

	return {
		proxy,
		eventTarget,
	};
};

const createComponent = (template) => {
	return class extends HTMLElement {
		#abortController = new AbortController();
		#abortSignal = null;

		refs = {};

		get abortSignal() {
			return this.#abortSignal;
		}

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			this.#abortSignal = this.#abortController.signal;

			const { fragment, ...refs } = template();

			this.shadowRoot.appendChild(fragment);
			this.refs = refs;

			this.connectedCompleteCallback();
		}

		disconnectedCallback() {
			this.#abortController.abort();
			this.#abortController = new AbortController();

			this.#abortSignal = this.#abortController.signal;
		}

		connectedCompleteCallback() {}

		listen(type, listener) {
			this.addEventListener(type, listener, { signal: this.#abortSignal });
		}
	};
};

export { createComponent, createState };
