export default (template, connected) => {
  return class extends HTMLElement {
    #abortController = new AbortController();

    #signal = null;

    connectedCallback() {
      this.#signal = this.#abortController.signal;

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.connectedElements();
    }

    disconnectedCallback() {
      this.#abortController.abort();
      this.#abortController = new AbortController();

      this.#signal = this.#abortController.signal;
    }

    connectedElements() {
      connected && connected(this);
    }

    listen(type, listener) {
      this.addEventListener(type, listener, { signal: this.#signal });
    }
  };
};
