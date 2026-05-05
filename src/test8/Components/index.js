import { createTemplate, useTemplate } from "./../Core";

const template = createTemplate(`<div id="application">
	<application-header class="application-header"></application-header>
	<main>
		<my-heading></my-heading>
	</main>
	<application-footer class="application-footer"></application-footer>
</div>`);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			const application = fragment.children[0];

			return {
				application,
			};
		});

	connectedCallback() {
		const { fragment, ...template } = Self.#template();

		this.append(fragment);

		this.render();
	}

	async render() {
		const MyHeading = await import("./Heading/index.js");
		const MyHeader = await import("./Header/index.js");
		const MyFooter = await import("./Footer/index.js");

		customElements.define("application-header", MyHeader.default);
		customElements.define("application-footer", MyFooter.default);
		customElements.define("my-heading", MyHeading.default);
	}
}
