import { createBehavior, createFragment, createTemplate, useTemplate } from "./../../../lib";

const childrenTemplate = createTemplate(`<ul is="app-treeview"></ul>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #childrenTemplate = (dataset) => {
			const { fragment, element } = useTemplate(childrenTemplate, (fragment) => {
				const element = fragment.children[0];

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
			this.textContent = this.dataset.label;

			await this.renderChildren();
		}

		async renderChildren() {
			const { default: getItems } = await import("./../../../services/TreeView");
			const [children, items] = getItems(this.dataset.id);

			if (children.length < 1) return;

			this.append(
				Self.#childrenTemplate({
					id: this.dataset.id,
					label: this.dataset.label,
				}),
			);
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (name === "label") this.textContent = newValue;
		}
	};
