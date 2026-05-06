const defineComponent = (baseClass, tagName, extendName, body) => {
  class Self extends baseClass {
    #abortController = new AbortController();
    #abortSignal = null;

    get abortSignal() {
      return this.#abortSignal;
    }

    connectedCallback() {
      this.#abortSignal = this.#abortController.signal;
      !this.hasAttribute("is") && this.setAttribute("is", tagName);

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

  customElements.define(tagName, impl, { extends: extendName });

  return impl;
};

export default defineComponent(
  HTMLButtonElement,
  "button-red",
  "button",
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
);
