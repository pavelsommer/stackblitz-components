export default (props) => {
  return class StateBase extends HTMLElement {
    static #handler = (component) => ({
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);

        component.dispatchEvent(
          new CustomEvent('prop-changed', {
            detail: {
              target,
              key,
              oldValue,
              value,
              receiver,
            },
          })
        );

        return result;
      },
    });

    #abortController = new AbortController();

    #signal = null;
    #values = null;

    get values() {
      return this.#values;
    }

    constructor() {
      super();

      this.#signal = this.#abortController.signal;

      props = props || {};
      Object.assign(props, this.dataset);

      this.#values = new Proxy(
        props,
        StateBase.#handler(this)
      );
    }

    disconnectedCallback() {
      this.#abortController.abort();
      this.#abortController = new AbortController();

      this.#signal = this.#abortController.signal;
    }

    listen(type, listener) {
      this.addEventListener(type, listener, { signal: this.#signal });
    }
  };
};
