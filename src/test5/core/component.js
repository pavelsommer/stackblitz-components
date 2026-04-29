export default (template) => {
	return class extends HTMLElement {
		#abortController = new AbortController();
		#abortSignal = null;
		#template = null;

		initializer = null;

		get abortSignal() {
			return this.#abortSignal;
		}

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			this.#abortSignal = this.#abortController.signal;

			this.shadowRoot.appendChild(template.element);

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
