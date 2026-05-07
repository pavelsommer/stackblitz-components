const defineComponent = (baseClass, body, options = {}) => {
	const { tagName, extendsName } = options;

	class Self extends baseClass {
		#abortController = new AbortController();
		#abortSignal = null;

		get abortSignal() {
			return this.#abortSignal;
		}

		connectedCallback() {
			this.#abortSignal = this.#abortController.signal;

			tagName &&
				extendsName &&
				!this.hasAttribute("is") &&
				this.setAttribute("is", tagName);

			Object.assignDeep(this, {
				textContent: "Hello!",
			});
		}

		disconnectedCallback() {
			this.#abortController.abort();
			this.#abortController = new AbortController();
			this.#abortSignal = this.#abortController.signal;
		}
	}

	const impl = body(Self);

	tagName &&
		(extendsName
			? customElements.define(tagName, impl, { extends: extendsName })
			: customElements.define(tagName, impl));

	return impl;
};

export default defineComponent(
	HTMLButtonElement,
	(Base) => {
		return class Self extends Base {
			connectedCallback() {
				super.connectedCallback();

				this.addEventListener("click", (event) => console.log("Hello!"), {
					signal: this.abortSignal,
				});
			}
		};
	},
	{
		tagName: "button-red",
		extendsName: "button",
	},
);
