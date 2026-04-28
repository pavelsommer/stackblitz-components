import icons from "../Icons";

export default () => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(`
<style>
	svg {
		vertical-align: middle;
		margin-right: 8px;
	}
</style>
<h1>
	<slot name="icon"></slot>
	<slot name="title"></slot>
</h1>
<hr />`);

	const createTemplate = () => {
		const element = template.content.cloneNode(true);

		return {
			element,
			h1: element.querySelector("h1"),
		};
	};

	const title = document.createElement("span");
	title.setAttribute("slot", "title");
	title.textContent = "Heading";

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	svg.setAttribute("width", "32");
	svg.setAttribute("height", "32");
	svg.setAttribute("viewBox", "0 0 32 32");
	svg.style.width = "32px";
	svg.style.height = "32px";
	svg.style.display = "inline-block";
	svg.style.verticalAlign = "middle";

	const createTitle = (text) => {
		const fragment = title.cloneNode(true);
		text && (fragment.textContent = text);

		return {
			fragment,
			getText: () => fragment.textContent,
			setText: (text) => (fragment.textContent = text),
		};
	};

	const createIcon = (slot, name, options) => {
		const fragment = svg.cloneNode();

		if (name) {
			fragment.setAttribute("data-name", name);
			fragment.replaceChildren(icons[name].children[0].cloneNode(true));
		}

		Object.assign(fragment.style, options?.style);

		slot && fragment.setAttribute("slot", slot);

		return {
			fragment,
			setStyle: (style) => Object.assign(fragment.style, style),
			setIcon: (name) => {
				const oldName = fragment.getAttribute("data-name");

				if (oldName === name) return false;

				fragment.setAttribute("data-name", name);
				fragment.replaceChildren(icons[name].children[0].cloneNode(true));

				return true;
			},
		};
	};

	return class Self extends HTMLElement {
		static observedAttributes = ["title"];

		static get observedAttributes() {
			return observedAttributes;
		}

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			(() => {
				const { element, h1 } = createTemplate();

				this.shadowRoot.appendChild(element);
			})();

			const titleEl = (() => {
				const { fragment, getText, setText } = createTitle();

				this.getTitle = getText;

				this.setTitle = (text) => {
					const oldValue = getText();

					if (oldValue === text) return;

					setText(text);

					this.dispatchEvent(
						new CustomEvent("prop-changed", {
							detail: {
								target: fragment,
								key: "title",
								value: text,
								oldValue,
							},
						}),
					);
				};

				return fragment;
			})();

			this.appendChild(titleEl);

			const iconEl = (() => {
				if (!this.dataset.icon) return null;

				const { fragment, setIcon } = createIcon("icon", this.dataset.icon);

				this.setIcon = (name) => {
					const oldValue = this.dataset.icon;

					if (oldValue === name) return;

					this.dataset.icon = name;

					setIcon(name) &&
						this.dispatchEvent(
							new CustomEvent("prop-changed", {
								detail: {
									target: fragment,
									key: "icon",
									value: name,
									oldValue,
								},
							}),
						);
				};

				return fragment;
			})();

			iconEl && this.appendChild(iconEl);

			if (iconEl) Self.observedAttributes.push("icon");
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (!this.shadowRoot) return;
			if (oldValue === newValue) return;

			switch (name) {
				case "title":
					this.setTitle(newValue);

					break;

				case "icon":
					this.setIcon(newValue);

					break;
			}
		}
	};
};
