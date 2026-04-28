export default () => {
	const template = document.createElement("template");

	template.innerHTML = `
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
<hr />`;

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

	const icons = (() => {
		const icon1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		icon1.setHTMLUnsafe(`<g fill="#ed650b">
    <path fill="#ed650b" d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.9,0,16,0z M23.4,23.1c-0.3,0.5-0.9,0.6-1.4,0.3 c-3.8-2.3-8.5-2.8-14.1-1.5c-0.6,0.2-1-0.2-1.2-0.7c-0.2-0.6,0.2-1,0.7-1.2c6.1-1.4,11.4-0.8,15.5,1.8C23.5,22,23.6,22.6,23.4,23.1z M25.3,18.7c-0.4,0.6-1.1,0.8-1.7,0.4c-4.3-2.6-10.9-3.4-15.9-1.8c-0.6,0.2-1.4-0.2-1.5-0.8C6,15.8,6.3,15.1,7,15 c5.8-1.8,13-0.9,18,2.2C25.4,17.4,25.7,18.2,25.3,18.7z M25.4,14.2c-5.1-3-13.7-3.4-18.6-1.8c-0.8,0.2-1.6-0.2-1.8-1 c-0.2-0.8,0.2-1.6,1-1.8c5.7-1.7,15-1.4,21,2.2c0.7,0.4,1,1.4,0.6,2.1C27.1,14.4,26.2,14.6,25.4,14.2z"></path>
  </g>`);

		const icon2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		icon2.setHTMLUnsafe(`<g fill="#ed650b">
    <path d="M9.044,12.805a1.3,1.3,0,0,0-.78-.291H7.1v7H8.264a1.3,1.3,0,0,0,.78-.292,1.02,1.02,0,0,0,.39-.874V13.68a1.027,1.027,0,0,0-.39-.875ZM28.06,1H3.94A2.94,2.94,0,0,0,1,3.933V28.067A2.94,2.94,0,0,0,3.94,31H28.06A2.94,2.94,0,0,0,31,28.067V3.933A2.94,2.94,0,0,0,28.06,1ZM11.326,18.356a3.06,3.06,0,0,1-3.239,3.165H4.98V10.441H8.153a3.057,3.057,0,0,1,3.172,3.166v4.749Zm6.742-5.937H14.5v2.573h2.181v1.98H14.5v2.572h3.569v1.981H13.905a1.354,1.354,0,0,1-1.388-1.319V11.828a1.353,1.353,0,0,1,1.32-1.385h4.232v1.976Zm6.94,7.721c-.884,2.059-2.468,1.649-3.177,0l-2.58-9.7h2.181l1.99,7.615,1.98-7.615h2.181l-2.575,9.7Z" fill="#ed650b"></path>
  </g>`);

		return {
			icon1,
			icon2,
		};
	})();

	const createTitle = (text) => {
		const fragment = title.cloneNode(true);
		text && (fragment.textContent = text);

		const getText = () => fragment.textContent;
		const setText = (text) => (fragment.textContent = text);

		return {
			fragment,
			getText,
			setText,
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

		connectedCallback() {
			this.attachShadow({ mode: "open" });

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
