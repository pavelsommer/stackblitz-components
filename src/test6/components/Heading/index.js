import { createComponent } from "./../../core";

const template = (() => {
  const template = document.createElement("template");

  template.setHTMLUnsafe(`<h1>Hello!</h1><hr />`);

  return () => {
    const fragment = template.content.cloneNode(true);

    return {
      fragment,
      headingEl: fragment.querySelector("h1"),
    };
  };
})();

export default (state) => {
  return class extends createComponent(template, state) {
    get text() {
      return this.refs.headingEl.textContent;
    }

    set text(value) {
      this.refs.headingEl.textContent = value;
    }

    connectedCompleteCallback() {
      this.refs.headingEl.textContent = "Hello, StackBlitz!";
    }

    stateChangedCallback(event) {
      console.log(event.key);
    }
  };
};
