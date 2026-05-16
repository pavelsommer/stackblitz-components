import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";

const titleTemplate = createTemplate(`<div class="title"><label></label></div>`);
const blockTemplate = createTemplate(
	`<div class="items"><div class="items__inner"><ul is="app-treeview"></ul></div></div>`,
);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #blockTemplate = (dataset) => {
			const { fragment, element } = useTemplate(blockTemplate, (fragment) => {
				const element = fragment.children[0].children[0].children[0];

				dataset && Object.assign(element.dataset, dataset);

				return {
					element,
				};
			});

			return fragment;
		};

		static #observedAttributes = ["label"];

		static get observedAttributes() {
			return Self.#observedAttributes;
		}

		async mounted() {
			this.dataset.label && (this.textContent = this.dataset.label);

			this.classList.add(parseInt(this.dataset.level ?? "1") > 1 ? "item" : "block");

			await this.renderContent();
		}

		async renderContent() {
			const { default: getItems } = await import("./../../../services/TreeView");
			const [children, items] = getItems(this.dataset.id);

			if (children.length < 1) return;

			const dataset = {
				id: this.dataset.id,
				level: parseInt(this.dataset.level ?? "0") + 1,
			};

			this.dataset.label && (dataset.label = this.dataset.label);

			this.append(Self.contentTemplate(dataset));
		}

		renderBlock() {}

		renderItem() {}

		attributeChangedCallback(name, oldValue, newValue) {
			if (name === "label") newValue && (this.textContent = newValue);
		}
	};
