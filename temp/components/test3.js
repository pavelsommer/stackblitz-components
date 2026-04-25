const application = (() => {
  const notes = [];

  return {
    controller: {
      addNote: (note) => notes.push(note),
      deleteNote: (id) => console.log(id),
    },
  };
})();

class MyHeader extends HTMLElement {
  static #template = (() => {
    const template = document.createElement('template');

    template.innerHTML = `<h1>
  <slot name="text"></slot>
<h1>
<hr />`;

    return template;
  })();

  #text;

  connectedCallback() {
    this.attachShadow({ mode: 'open' }).appendChild(
      MyHeader.#template.content.cloneNode(true)
    );

    this.#text = this.querySelector('span[slot="text"]');
  }
}

customElements.define('my-header', MyHeader);
