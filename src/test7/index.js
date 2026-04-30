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

const createState = (props = {}) => {
	const eventTarget = new EventTarget();
	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
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
		props: proxy,
		subscribe: (listener, abortSignal) =>
			eventTarget.addEventListener("prop-changed", listener, {
				signal: abortSignal,
			}),
	};
};

const createComponent = (template) => {
	return class extends HTMLElement {
		#abortController = new AbortController();
		#abortSignal = null;

		refs = {};
		props = {};

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
			this.refs = refs;

			this.shadowRoot.appendChild(fragment);
			this.connectedCompleteCallback();
		}

		disconnectedCallback() {
			this.#abortController.abort();
			this.#abortController = new AbortController();

			this.#abortSignal = this.#abortController.signal;

			this.refs = {};
			this.props = {};
		}

		connectedCompleteCallback() {}

		attributeChangedCallback(name, oldValue, newValue) {}
	};
};

const template = createTemplate(`<div><input type="text" /></div>`);

class MyTextBox extends HTMLElement {
	props = {};

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		const { fragment: fragment1, ...template1 } = useTemplate(template, (fragment) => ({
			div: fragment.children[0],
			input: fragment.children[0].children[0],
		}));

		Object.assign(template1.div.style, {
			padding: "10px",
			border: "2px solid",
		});

		template1.input.value = this.dataset.value ?? "";

		this.shadowRoot.append(fragment1);
	}
}

customElements.define("my-textbox", MyTextBox);
