import * as vali from 'valibot';
import Sylvie from 'sylviejs';

export const updateElement = (element, values) => {
  const { style, dataset, ...options } = values;

  if (style) Object.assign(element.style, style);
  if (dataset) Object.assign(element.dataset, dataset);

  Object.assign(element, options);
};

export const parseElement = (tagName, o) => {
  const fragment = document.createElement(tagName);

  for (const key of Object.keys(o)) {
    const { style, dataset, content, ...options } = o[key];
    const element = document.createElement(key);

    if (style) Object.assign(element.style, style);
    if (dataset) Object.assign(element.dataset, dataset);

    Object.assign(element, options);

    if (content) element.append(parseTemplate(content));

    fragment.appendChild(element);
  }

  return fragment;
};

export const parseTemplate = (o) => {
  const fragment = document.createDocumentFragment();

  for (const key of Object.keys(o)) {
    const { style, dataset, content, ...options } = o[key];
    const element = document.createElement(key);

    if (style) Object.assign(element.style, style);
    if (dataset) Object.assign(element.dataset, dataset);

    Object.assign(element, options);

    if (content) element.append(parseTemplate(content));

    fragment.appendChild(element);
  }

  return fragment;
};

const schemas = {
  customer: vali.object({
    customerId: vali.pipe(vali.number()),
    identification: vali.pipe(
      vali.string(),
      vali.minLength(8),
      vali.maxLength(10)
    ),
    customerName: vali.pipe(
      vali.string(),
      vali.nonEmpty("Customer name can't be empty.")
    ),
  }),
};

const db = new Sylvie('app.db');

const customers = db.addCollection('customers', {
  indices: ['customerId', 'identification', 'customerName'],
  unique: ['customerId'],
});

const notes = db.addCollection('notes', {
  indicies: ['customerId', 'text', 'tags'],
});

class CustomerDb {
  get count() {
    return customers.count;
  }

  get all() {
    return customers.data;
  }

  create(values) {
    return customers.insert(values);
  }
}

class NotesDb {
  get count() {
    return notes.count;
  }

  get all() {
    return notes.data;
  }

  create(values) {
    return notes.insert(values);
  }
}

class ApplicationObject extends EventTarget {
  #customerDb = new CustomerDb();
  #notesDb = new NotesDb();

  #userName;

  get userName() {
    return this.#userName;
  }

  set userName(value) {
    this.#userName = value;
    this.dispatchEvent(
      new CustomEvent('userName_changed', {
        detail: value,
      })
    );
  }

  createCustomer(values) {
    const customer = vali.parse(schemas.customer, values);

    this.#customerDb.create(customer);
  }

  getAllCustomers() {
    return this.#customerDb.all;
  }
}

const application = new ApplicationObject();

class Application extends HTMLElement {
  static #templates = {
    root: (() => {
      const template = document.createElement('template');

      template.innerHTML = `<link href="styles.css" rel="stylesheet" />
  <h1 data-ref="h1" class="text-3xl font-bold underline">
  </h1>
  <div>
    <button data-ref="button" type="button">
      Click!
    </button>
  </div>`;

      return template;
    })(),
  };

  #refs;

  #ensureRoot() {
    function collectRefs(frag) {
      return Object.fromEntries(
        [...frag.querySelectorAll('[data-ref]')].map((el) => [
          el.dataset.ref,
          el,
        ])
      );
    }

    const fragment = Application.#templates.root.content.cloneNode(true);
    this.#refs = collectRefs(fragment);

    return fragment;
  }

  connectedCallback() {
    const fragment = this.#ensureRoot();

    const { h1, button } = this.#refs;

    application.addEventListener(
      'userName_changed',
      (event) => (h1.textContent = event.detail)
    );

    updateElement(h1, {
      textContent: 'Hello!',
      style: {
        color: 'yellow',
      },
    });

    button.addEventListener('click', (event) => {
      application.userName = 'cpas\\psommer';
    });

    this.attachShadow({ mode: 'open' }).replaceChildren(fragment);
  }
}

customElements.define('my-application', Application);
