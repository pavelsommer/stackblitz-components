import { createComponent } from "./../../core";

const template = (() => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(`<h1>Skeleton!</h1><hr />`);

	return () => {
		const fragment = template.content.cloneNode(true);

		const h1 = fragment.querySelector("h1");

		return {
			fragment,
			headingEl: h1,
			text: (value) => {
				if (!value) return h1.textContent;

				h1.textContent = value;
			},
		};
	};
})();

export default (state) => {
	return class Self extends createComponent(template, state) {
		static #observedAttributes = ["data-text"];

		static get observedAttributes() {
			return Self.#observedAttributes;
		}

		connectedCompleteCallback() {
			super.connectedCompleteCallback();
			this.refs?.text?.(this.props?.text ?? this.dataset.text ?? "");
		}
	};
};
