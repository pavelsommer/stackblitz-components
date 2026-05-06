export default class Self extends HTMLButtonElement {
	constructor() {
		super();
		console.log("abcd");
	}

	connectedCallback() {
		Object.assign(this.style, {
			padding: "0.5rem 1rem",
			cursor: "pointer",
			color: "green",
		});
	}
}

customElements.define("my-button", Self, { extends: "button" });
