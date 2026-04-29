const createState = (props = {}) => {
  const eventTarget = new EventTarget();
  const handler = {
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      eventTarget.dispatchEvent(
        new CustomEvent("prop-changed", {
          detail: {
            target,
            key,
            oldValue,
            value,
            receiver,
          },
        }),
      );

      return result;
    },
  };

  const proxy = new Proxy(props, handler);

  return {
    props: proxy,
    addEventListener: (listener, abortSignal) =>
      eventTarget.addEventListener("prop-changed", listener, {
        signal: abortSignal,
      }),
  };
};

const createComponent = (template, state) => {
  return class extends HTMLElement {
    #abortController = new AbortController();
    #abortSignal = null;

    refs = {};
    props = null;

    get abortSignal() {
      return this.#abortSignal;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.#abortSignal = this.#abortController.signal;

      const { fragment, ...refs } = template();

      if (state) {
        const { props, addEventListener } = state();

        this.props = props;

        addEventListener(
          (event) => this.stateChangedCallback(event.detail),
          this.#abortSignal,
        );
      }

      this.shadowRoot.appendChild(fragment);
      this.refs = refs;

      this.connectedCompleteCallback();
    }

    disconnectedCallback() {
      this.#abortController.abort();
      this.#abortController = new AbortController();

      this.#abortSignal = this.#abortController.signal;
    }

    connectedCompleteCallback() {}

    stateChangedCallback(event) {}
  };
};

export { createComponent, createState };
