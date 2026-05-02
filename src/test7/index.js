const state = new Proxy(
	{},
	{
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
			const result = Reflect.set(target, key, value, receiver);

			return result;
		},
	},
);

class component {
	static assign(target, source) {
		const { style, dataset, ...props } = source;

		style && Object.assign(target.style, style);
		dataset && Object.assign(target.dataset, dataset);

		Object.assign(target, props);
	}
}

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

class MyTextBox extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<div><input type="text" /></div>`);

		return () =>
			useTemplate(template, (fragment) => ({
				div: fragment.children[0],
				input: fragment.children[0].children[0],
			}));
	})();

	connectedCallback() {
		const { fragment, ...template } = MyTextBox.#template();

		template.input.value = this.dataset.value ?? "";
		template.input.addEventListener("input", (event) => {
			this.dataset.id && (state[`${this.dataset.id}.value`] = event.target.value);
			console.log(state);
		});

		this.append(fragment);
	}
}

class MyDashboard extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<h1>hello!</h1>
<hr />
<my-textbox></my-textbox>
<my-textbox></my-textbox>`);

		return () =>
			useTemplate(template, (fragment) => ({
				h1: fragment.children[0],
				txtBusinessIn: fragment.children[2],
				txtBusinessName: fragment.children[3],
			}));
	})();

	connectedCallback() {
		const { fragment, ...template } = MyDashboard.#template();

		this.dataset.text && (template.h1.textContent = this.dataset.text);
		template.txtBusinessIn.dataset.id = "businessIn";
		template.txtBusinessIn.dataset.value = this.dataset.value ?? "";

		template.txtBusinessName.dataset.id = "businessName";

		this.append(fragment);
	}
}

class MyItem extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<li></li>`);

		return () =>
			useTemplate(template, (fragment) => ({
				li: fragment.children[0],
			}));
	})();

	connectedCallback() {
		const { fragment, ...template } = MyItem.#template();

		template.li.textContent = this.dataset.text;

		this.append(fragment);
	}
}

class MyList extends HTMLElement {
	static #container = (() => {
		const template = createTemplate(`<h1>List</h1><hr /><ul></ul>`);

		return () =>
			useTemplate(template, (fragment) => ({
				ul: fragment.children[2],
			}));
	})();

	static #item = (() => {
		const template = createTemplate(`<my-item></my-item>`);

		return (callback) =>
			useTemplate(template, (fragment) => {
				const myItem = fragment.children[0];
				const setText = (text) => (myItem.dataset.text = text);
				const setStyle = (style) => Object.assign(myItem.style, style);

				callback && callback({ myItem, setText, setStyle });

				return {
					myItem,
				};
			});
	})();

	connectedCallback() {
		const { fragment, ...container } = MyList.#container();
		const itemFragment = document.createDocumentFragment();

		for (let i = 0; i < 400; i++) {
			const { fragment } = MyList.#item(({ myItem, setText, setStyle }) => {
				setText(`Item ${i}`);
				setStyle({
					fontSize: "1.3rem",
					fontWeight: "700",
					color: "blue",
				});
			});

			itemFragment.append(fragment);
		}

		container.ul.append(itemFragment);
		this.append(fragment);
	}
}

customElements.define("my-textbox", MyTextBox);
customElements.define("my-item", MyItem);
customElements.define("my-dashboard", MyDashboard);
customElements.define("my-list", MyList);
