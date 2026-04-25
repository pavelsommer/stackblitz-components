// https://stackoverflow.com/questions/49125059/how-to-pass-parameters-to-an-eval-based-function-injavascript

class MyItem extends HTMLElement {
  constructor() {
    super();
  }

  get text() {
    return this.getAttribute('text') || '';
  }

  connectedCallback() {
    this.innerHTML = `<b>${this.text}</b><hr />`;
    this.addEventListener('click', () => window.alert(this.text));
  }
}

class MyList extends HTMLElement {
  constructor() {
    super();
  }

  get items() {
    return JSON.parse(this.getAttribute('items') || '[]');
  }

  connectedCallback() {
    this.innerHTML = `<style>
  my-item {
    font-family: "Ubuntu Mono";
    display: block;
    color: blue;
  }
</style>
${this.items.map((item) => `<my-item text="${item}"></my-item>`).join('')}`;
  }
}

customElements.define('my-list', MyList);
customElements.define('my-item', MyItem);
