import { createComponent } from "./../../core";

const template = (() => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(`<h1>Hello!</h1><hr />`);

	return () => {
		const fragment = template.content.cloneNode(true);

		return {
			fragment,
			headingEl: fragment.querySelector("h1"),
		};
	};
})();

export default () => {
	return class extends createComponent(template) {
		connectedCompleteCallback() {
			this.refs.headingEl.textContent = "Hello, StackBlitz!";
		}
	};
};
