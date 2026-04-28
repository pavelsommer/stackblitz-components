const template = document.createElement("template");

template.setHTMLUnsafe(
	`<input type="text" data-reactive data-value="name" data-value-on="input" />`,
);

export default () => {
	return class extends HTMLElement {
		elements = new WeakMap();

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			const fragment = template.content.cloneNode(true);
			this.shadowRoot.appendChild(fragment);

			for (const element of this.shadowRoot.querySelectorAll(
				"[data-reactive]",
			)) {
				for (const name in element.dataset) {
					console.log(name, element.dataset[name]);
				}

				// element.addEventListener("input", (event) => {
				// 	const handlerName = element.dataset.onInput;
				// 	if (typeof this[handlerName] === "function") {
				// 		this[handlerName](event);
				// 	}
				// });
			}
		}

		handleInput(event) {
			const value = event.target.value;

			console.log(value);
		}
	};
};
