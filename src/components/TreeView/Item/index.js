import { createBehavior, createFragment, createTemplate, useTemplate } from "./../../../lib";

const contentTemplate = createTemplate(
	`<div class="items"><div class="items__inner"><ul is="app-treeview"></ul></div></div>`,
);

const renderContentTemplate = (dataset) => {
	const { fragment, element } = useTemplate(contentTemplate, (fragment) => {
		const element = fragment.children[0].children[0].children[0];

		dataset && Object.assign(element.dataset, dataset);

		return {
			element,
		};
	});

	return fragment;
};

const mounted = async (component) => {
	component.dataset.label && (component.textContent = component.dataset.label);

	component.classList.add(parseInt(component.dataset.level ?? "1") > 1 ? "item" : "block");

	await component.renderContent();
};

const renderContent = async (component) => {
	const { default: getItems } = await import("./../../../services/TreeView");
	const [children, items] = getItems(component.dataset.id);

	if (children.length < 1) return;

	const dataset = {
		id: component.dataset.id,
		level: parseInt(component.dataset.level ?? "0") + 1,
	};

	component.dataset.label && (dataset.label = component.dataset.label);

	component.append(renderContentTemplate(dataset));
};

const attributeChangedCallback = (component) => (name, oldValue, newValue) => {
	if (name === "label") newValue && (component.textContent = newValue);
};

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #observedAttributes = ["label"];

		static get observedAttributes() {
			return Self.#observedAttributes;
		}

		get mounted() {
			return () => mounted(this);
		}

		get renderContent() {
			return () => renderContent(this);
		}

		get attributeChangedCallback() {
			return () => attributeChangedCallback(this);
		}
	};
