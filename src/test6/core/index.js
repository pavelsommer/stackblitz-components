class PropChangedEvent extends CustomEvent {
	constructor(detail) {
		super("prop-changed", { detail });
	}
}

class StateEventTarget extends EventTarget {
	dispatchPropChanged(detail) {
		this.dispatchEvent(new PropChangedEvent(detail));
	}
}

const createTemplate = (innerHTML) => {
	return () => {
		const template = document.createElement("template");

		template.setHTMLUnsafe(innerHTML);

		return (refs) => {
			const fragment = template.content.cloneNode(true);

			return {
				fragment,
				...refs(fragment),
			};
		};
	};
};

const createState = (props = {}) => {
	const eventTarget = new EventTarget();
	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
			const result = Reflect.set(target, key, value, receiver);

			console.log(target, key, value, receiver);

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
		addEventListener: (listener, abortSignal) =>
			eventTarget.addEventListener("prop-changed", listener, {
				signal: abortSignal,
			}),
	};
};

const createComponent = (template, state) => {
	return class extends HTMLElement {
		#abortController = new AbortController();
		#abortSignal = null;
		#stateComplete = false;

		refs = {};
		props = {};

		get abortSignal() {
			return this.#abortSignal;
		}

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		#connectState(state) {
			if (!state) return;

			const { props, addEventListener } = state();

			this.props = props;

			addEventListener((event) => this.stateChangedCallback(event.detail), this.#abortSignal);
		}

		connectedCallback() {
			this.#abortSignal = this.#abortController.signal;

			const { fragment, ...refs } = template();
			this.refs = refs;

			this.#connectState(state);
			this.stateConnectedCallback();
			this.#stateComplete = true;
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

		stateConnectedCallback() {
			for (const [key, value] of Object.entries(this.props)) {
				if (typeof this.dataset[key] !== "undefined" && typeof this.dataset[key] !== "function")
					this.dataset[key] = value;
			}
		}

		connectedCompleteCallback() {}

		stateChangedCallback(event) {
			const attributeName =
				"data-" + event.key.replace(/([A-Z])/g, (match) => "-" + match.toLowerCase());

			if (this.hasAttribute(attributeName) && this.getAttribute(attributeName) !== event.value) {
				this.setAttribute(attributeName, event.value);
			}
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (!this.#stateComplete) return;

			console.log("attributeChangedCallback");

			if (oldValue === newValue) return;

			if (name.startsWith("data-")) {
				this.props[name.slice(5).replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())] = newValue;
			}
		}
	};
};

export { createTemplate, createComponent, createState, PropChangedEvent, StateEventTarget };
