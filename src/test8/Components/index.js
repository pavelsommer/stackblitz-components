import { createTemplate, useTemplate } from "./../Core";

const contentTemplate = createTemplate(`<header is="application-header"></header>
	<aside is="application-sidebar" role="navigation"></aside>
	<main>
		<h1 is="application-heading" data-text="Hello!"></h1>
	</main>
	<footer is="application-footer"></footer>`);

await Promise.all([
	import("./Heading"),
	import("./Header/index.js"),
	import("./Footer/index.js"),
	import("./Sidebar/index.js"),
]);

console.log("a");

export default class Self extends HTMLDivElement {
	static #contentTemplate = () =>
		useTemplate(contentTemplate, (fragment) => {
			const header = fragment.children[0];
			const sidebar = fragment.children[1];
			const main = fragment.children[2];
			const footer = fragment.children[3];

			return {
				header,
				sidebar,
				main,
				footer,
			};
		});

	connectedCallback() {
		const { fragment } = Self.#contentTemplate();

		this.append(fragment);
	}
}

customElements.define("application", Self, { extends: "div" });
