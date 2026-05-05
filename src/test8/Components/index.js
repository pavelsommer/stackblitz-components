import { createTemplate, useTemplate } from "./../Core";

const template = createTemplate(`<div id="application">
	<application-header class="application-header"></application-header>
	<application-sidebar class="application-sidebar" role="navigation"></application-sidebar>
	<main>
		<application-heading></application-heading>
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
		const Heading = await import("./Heading/index.js");
		const Header = await import("./Header/index.js");
		const Footer = await import("./Footer/index.js");
		const Sidebar = await import("./Sidebar/index.js");

		customElements.define("application-header", Header.default);
		customElements.define("application-footer", Footer.default);
		customElements.define("application-heading", Heading.default);
	}
}
