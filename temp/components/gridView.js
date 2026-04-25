const result = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

class MyEvent extends Event {
  constructor(v) {
    super('test', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.v = v;
  }
}

class GridTitle extends HTMLElement {
  value = '';

  get cellValue() {
    return (
      (this.hasAttribute('value') && this.getAttribute('value')) || this.value
    );
  }

  constructor(value) {
    super();

    this.value = value;
  }

  connectedCallback() {
    const th = document.createElement('th');

    th.textContent = this.cellValue;
    th.addEventListener('click', (evt) => {
      const event = new MyEvent('aaa');
      this.dispatchEvent(event);
    });

    this.replaceWith(th);
  }
}

class TitleRow extends HTMLElement {}

class GridCell extends HTMLElement {
  value = '';

  get cellValue() {
    return (
      (this.hasAttribute('value') && this.getAttribute('value')) || this.value
    );
  }

  constructor(value) {
    super();

    this.value = value;
  }

  connectedCallback() {
    const td = document.createElement('td');

    td.textContent = this.cellValue;
    td.addEventListener('click', (evt) => {
      window.alert('Hello!');
    });

    this.replaceWith(td);
  }
}

class GridRow extends HTMLElement {
  constructor(values) {
    super();

    this.values = values;
  }

  async connectedCallback() {
    const tr = document.createElement('tr');

    for await (const value of this.values) {
      tr.appendChild(new GridCell(value));
    }

    this.replaceWith(tr);
  }
}

class GridView extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // const result = await response.json();

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const table = document.createElement('table');

    const th = new GridTitle('Id');
    th.addEventListener('test', (evt) => {
      if (evt instanceof MyEvent) {
        window.alert(evt.v);
      }
    });

    for await (const element of result) {
      const row = new GridRow([element.id]);

      tbody.appendChild(row);
    }

    thead.appendChild(th);
    table.appendChild(thead);
    table.appendChild(tbody);

    this.appendChild(table);
  }
}

customElements.define('grid-title', GridTitle);
customElements.define('grid-cell', GridCell);
customElements.define('grid-row', GridRow);
customElements.define('grid-view', GridView);
