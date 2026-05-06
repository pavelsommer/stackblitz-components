await import("./../Store");

export default class Self extends HTMLInputElement {
	connectedCallback() {
		this.type = "text";
		this.connectState();
	}

	async connectState() {
		const stateEl = document.getElementById(this.dataset.storeId);
		const { props, watch } = stateEl.state;

		this.value = props[this.dataset.propValue] ?? "";
		this.addEventListener("input", (event) => {
			props[this.dataset.propValue] = event.target.value;
		});

		watch(this.dataset.propValue, (event) => {
			this.value = event.detail.value ?? "";
		});
	}
}

customElements.define("textbox", Self, { extends: "input" });
