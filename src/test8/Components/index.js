import { createTemplate, useTemplate } from "./../Core";

const template = createTemplate(`<div id="application">
	<application-header class="application-header"></application-header>
	<application-sidebar class="application-sidebar" role="navigation"></application-sidebar>
	<main>
		<application-heading></application-heading>
	</main>
	<application-footer class="application-footer"></application-footer>
</div>`);

await Promise.all([
	import("./Heading/index.js"),
	import("./Header/index.js"),
	import("./Footer/index.js"),
	import("./Sidebar/index.js"),
]);

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
	}
}

customElements.define("my-application", Self);
