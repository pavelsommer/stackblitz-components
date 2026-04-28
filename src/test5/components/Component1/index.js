export default () => {
	return class extends HTMLElement {
		#props = {
			name: "Component1",
		};

		constructor() {
			super();

			this.attachShadow({ mode: "open" });
		}

		connectedCallback() {
			this.shadowRoot.appendChild(this.children[0].content);
			this.appendChild(this.children[1].content);
		}
	};
};
