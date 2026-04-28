export default (template, initializer) => {
  return class extends HTMLElement {
    #abortController = new AbortController();

    #signal = null;

    initializer = null;

    connectedCallback() {
      this.#signal = this.#abortController.signal;

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.ready();

      if (initializer)
        this.initializer = initializer(this);
    }

    disconnectedCallback() {
      this.#abortController.abort();
      this.#abortController = new AbortController();

      this.#signal = this.#abortController.signal;
    }

    ready() {
    }

    listen(type, listener) {
      this.addEventListener(type, listener, { signal: this.#signal });
    }
  };
};
