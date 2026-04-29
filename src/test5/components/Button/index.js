import createComponent from "./../../core/component.js";
import createState from "./../../core/state.js";

const template = document.createElement("template");
const templateRefs = (element) => {
	return {
		headingEl: element.querySelector("[data-ref=heading]"),
		incrementEl: element.children[2],
		decrementEl: element.children[3],
		inputEl: element.children[5],
	};
};

template.setHTMLUnsafe(
	`<h1 data-ref="heading"></h1><hr /><button></button><button></button>
<hr />
<input type="text" />`,
);

const useTemplate = (template, refsCallback) => {
	const element = template.content.cloneNode(true);

	return {
		element,
		...refsCallback(element),
	};
};

export default (getState) => {
	return class extends createComponent(useTemplate(template, templateRefs)) {
		#props = null;
		#eventTarget = null;

		constructor() {
			super();

			const { proxy, eventTarget } =
				(getState && getState()) ?? createState(this);

			this.#props = proxy;
			this.#eventTarget = eventTarget;
		}

		get h1Element() {
			return this.shadowRoot.children[0];
		}

		get incrementButton() {
			return this.shadowRoot.children[2];
		}

		get decrementButton() {
			return this.shadowRoot.children[3];
		}

		get inputElement() {
			return this.shadowRoot.children[5];
		}

		connectedCompleteCallback() {
			const countName = this.dataset.countName ?? "count";
			const reactive = this.#props && this.#eventTarget;

			if (typeof this.#props[countName] !== "number") {
				this.#props[countName] = 0;
			}

			if (reactive) {
				((element) => {
					element.textContent = `The current count is: ${this.#props[countName]}`;
				})(this.h1Element);

				((element) => {
					element.textContent = `increment: ${this.#props[countName]}`;

					element.addEventListener(
						"click",
						(event) => this.#props[countName]++,
						{
							signal: this.abortSignal,
							capture: false,
						},
					);
				})(this.incrementButton);

				((element) => {
					element.textContent = `decrement: ${this.#props[countName]}`;

					element.addEventListener(
						"click",
						(event) => this.#props[countName]--,
						{
							signal: this.abortSignal,
							capture: false,
						},
					);
				})(this.decrementButton);

				((element) => {
					element.value = `The current count is: ${this.#props[countName]}`;

					element.addEventListener(
						"input",
						(event) => {
							const value = parseInt(event.target.value, 10);

							if (!isNaN(value)) {
								this.#props[countName] = value;
							}
						},
						{
							signal: this.abortSignal,
							capture: false,
						},
					);

					element.addEventListener(
						"focus",
						(event) => {
							event.target.value = `${this.#props[countName]}`;
							event.target.select();
						},
						{
							signal: this.abortSignal,
							capture: false,
						},
					);

					element.addEventListener(
						"blur",
						(event) => {
							event.target.value = `The current count is: ${this.#props[countName]}`;
						},
						{
							signal: this.abortSignal,
							capture: false,
						},
					);
				})(this.inputElement);

				this.#eventTarget.addEventListener(
					"prop-changed",
					(event) => {
						const countName = this.dataset.countName ?? "count";

						if (event.detail.key !== countName) return;

						const value = event.detail.value;

						const h1Text = `The current count is: ${value}`;

						((element) => {
							element.textContent = h1Text;
						})(this.h1Element);

						((element) => {
							element.textContent = `increment: ${value}`;
						})(this.incrementButton);

						((element) => {
							element.textContent = `decrement: ${value}`;
						})(this.decrementButton);

						((element) => {
							if (element.matches(":focus")) return;

							element.value = h1Text;
						})(this.inputElement);
					},
					{
						signal: this.abortSignal,
						capture: false,
					},
				);
			}
		}
	};
};
