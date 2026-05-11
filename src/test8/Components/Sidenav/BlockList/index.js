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
		this.#renderContent();
	}

	mapBlock(source, index) {
		return {
			dataset: {
				index: index.toString(),
				id: source,
			},
		};
	}

	async renderBlocks(target) {
		const sidenav = (await import("./../Items")).default;
		const { props } = (await import("./../../Sidebar/State")).default;

		const content = document.createDocumentFragment();

		!props.blockId && (props.blockId = sidenav.refs["_"][0]);

		let index = 0;

		for (const block of sidenav.refs["_"]) {
			const { fragment } = target(this.mapBlock(block, index));
			content.append(fragment);

			index++;
		}

		return content;
	}

	async #renderContent() {
		this.replaceChildren(await this.renderBlocks(Self.#itemTemplate));
	}
}

customElements.define("sidenav-block-list", Self, { extends: "ul" });
