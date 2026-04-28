export default (template) => {
	return class extends HTMLElement {
		#abortController = new AbortController();

		#signal = null;

		initializer = null;

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			this.#signal = this.#abortController.signal;

			this.shadowRoot.appendChild(template.content.cloneNode(true));

			this.connectedCompleteCallback();
		}

		disconnectedCallback() {
			this.#abortController.abort();
			this.#abortController = new AbortController();

			this.#signal = this.#abortController.signal;
		}

		connectedCompleteCallback() {}

		listen(type, listener) {
			this.addEventListener(type, listener, { signal: this.#signal });
		}
	};
};
