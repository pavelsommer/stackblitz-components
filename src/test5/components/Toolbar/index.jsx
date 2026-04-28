import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function HelloWorld(props) {
  return <div>Hello World! {props.text}</div>;
}

export default class extends HTMLElement {
  #dispose = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const [text, setText] = createSignal(this.dataset.text ?? "");

    this.#dispose = render(() => <HelloWorld text={text()} />, this.shadowRoot);
  }

  disconnectedCallback() {
    this.#dispose?.();
  }
}
