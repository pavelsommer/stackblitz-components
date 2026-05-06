import { createTemplate, useTemplate } from "./../../../Core";
await import("./../BlockItem");

const itemTemplate = createTemplate(`<li is="sidenav-block-item"></li>`);

export default class Self extends HTMLUListElement {
	static #itemTemplate = (options) =>
		useTemplate(itemTemplate, (fragment) => {
			const item = fragment.children[0];

			const { dataset, style, ...props } = options || {};

			props && Object.assign(item, props);
			style && Object.assign(item.style, style);
			dataset && Object.assign(item.dataset, dataset);

			return {
				item,
			};
		});

	connectedCallback() {
		this.#connectState();
		this.#renderContent();
	}

	mapBlock(source) {
		return {
			textContent: source.id,
			dataset: {
				id: source.id,
			},
		};
	}

	async renderBlocks(response, target) {
		const blocks = await response.json();
		const content = document.createDocumentFragment();
		const defaultId = blocks[0]?.id;

		for (const block of blocks) {
			const { fragment } = target(this.mapBlock(block));
			content.append(fragment);
		}

		return content;
	}

	async #renderContent() {
		this.replaceChildren(
			await this.renderBlocks(await fetch("/src/test8/api/sidenav/index.json"), Self.#itemTemplate),
		);
	}

	async #connectState() {
		const { props } = (await import("./../../Sidebar/State")).default;

		!props.blockId && (props.blockId = "default");
	}
}

customElements.define("sidenav-block-list", Self, { extends: "ul" });
