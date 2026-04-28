import createComponent from "./../../core/component.js";
import createState from "./../../core/state.js";

const template = document.createElement("template");

template.setHTMLUnsafe(
	`<h1></h1><hr /><button></button><button></button>
<hr />
<input type="text" />`,
);

export default (getState) => {
	return class extends createComponent(template) {
		#props = null;
		#eventTarget = null;

		constructor() {
			super();

			const { proxy, eventTarget } =
				(getState && getState()) ?? createState(this);

			this.#props = proxy;
			this.#eventTarget = eventTarget;
		}

		connectedCompleteCallback() {
			const countName = this.dataset.countName ?? "count";

			if (typeof this.#props[countName] !== "number") {
				this.#props[countName] = 0;
			}

			(() => {
				const element = this.shadowRoot.children[0];

				if (this.#props && this.#eventTarget) {
					element.textContent = `The current count is: ${this.#props[countName]}`;

					this.#eventTarget.addEventListener("prop-changed", (event) => {
						if (event.detail.key === countName) {
							element.textContent = `The current count is: ${event.detail.value}`;
						}
					});
				}
			})();

			(() => {
				const element = this.shadowRoot.children[2];

				if (this.#props && this.#eventTarget) {
					element.textContent = `increment: ${this.#props[countName]}`;

					this.#eventTarget.addEventListener("prop-changed", (event) => {
						if (event.detail.key === countName) {
							element.textContent = `increment: ${event.detail.value}`;
						}
					});

					element.addEventListener(
						"click",
						(event) => this.#props[countName]++,
					);
				}
			})();

			(() => {
				const element = this.shadowRoot.children[3];

				if (this.#props && this.#eventTarget) {
					element.textContent = `decrement: ${this.#props[countName]}`;

					this.#eventTarget.addEventListener("prop-changed", (event) => {
						if (event.detail.key === countName) {
							element.textContent = `decrement: ${event.detail.value}`;
						}
					});

					element.addEventListener(
						"click",
						(event) => this.#props[countName]--,
					);
				}
			})();

			(() => {
				const element = this.shadowRoot.children[5];

				if (this.#props && this.#eventTarget) {
					element.value = `The current count is: ${this.#props[countName]}`;

					this.#eventTarget.addEventListener("prop-changed", (event) => {
						if (event.detail.key === countName && !element.matches(":focus")) {
							element.value = `The current count is: ${event.detail.value}`;
						}
					});

					element.addEventListener("input", (event) => {
						const value = parseInt(event.target.value, 10);

						if (!isNaN(value)) {
							this.#props[countName] = value;
						}
					});

					element.addEventListener("focus", (event) => {
						event.target.value = `${this.#props[countName]}`;
					});

					element.addEventListener("blur", (event) => {
						event.target.value = `The current count is: ${this.#props[countName]}`;
					});
				}
			})();
		}
	};
};
