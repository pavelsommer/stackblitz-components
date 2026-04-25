const fn1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });

class Fragment extends DocumentFragment {
  constructor(content) {
    super();

    const fragment = document.createDocumentFragment();

    Array.isArray(content)
      ? fragment.append(...content)
      : fragment.append(content);

    return fragment;
  }
}

class Element {
  constructor(tagName, props, content) {
    const element = document.createElement(tagName);

    props?.style && Object.assign(element.style, props.style);

    delete props?.style;

    props && Object.assign(element, props);

    content &&
      (Array.isArray(content)
        ? element.append(new Fragment(content))
        : element.append(content));

    return element;
  }
}

class Table extends Element {
  constructor(props, content) {
    super('table', props, content);
  }
}

class THead extends Element {
  constructor(props, content) {
    super('thead', props, content);
  }
}

class TBody extends Element {
  constructor(props, content) {
    super('tbody', props, content);
  }
}

class Th extends Element {
  constructor(props, content) {
    super('th', props, content);
  }
}

class Tr extends Element {
  constructor(props, content) {
    super('tr', props, content);
  }
}

class Td extends Element {
  constructor(props, content) {
    super('td', props, content);
  }
}

const createFragment = (content) => {
  const fragment = document.createDocumentFragment();

  Array.isArray(content)
    ? fragment.append(...content)
    : fragment.append(content);

  return fragment;
};

const createElement = (tagName, props, content) => {
  const element = document.createElement(tagName);

  props?.style && Object.assign(element.style, props.style);

  delete props?.style;

  props && Object.assign(element, props);

  content &&
    (Array.isArray(content)
      ? element.append(new Fragment(content))
      : element.append(content));

  return element;
};

// const Table = (props, content) => createElement('table', props, content);
// const Th = (props, content) => createElement('th', props, content);
// const Td = (props, content) => createElement('td', props, content);
// const Tr = (props, content) => new Element('tr', props, content);

const MyTd = (content) =>
  Td(
    {
      style: {
        textAlign: 'center',
        backgroundColor: 'yellow',
      },
    },
    content
  );

class MyTest1 extends HTMLElement {
  async connectedCallback() {
    /*const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();

    const table = new Table();
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.append(
      new Fragment(
        ['id', 'name', 'email'].map((item) =>
          Th({
            textContent: item,
          })
        )
      )
    );

    tbody.append(
      new Fragment(
        json.map((tr) =>
          Tr(null, [
            Td({
              textContent: tr.id,
            }),

            Td({
              textContent: tr.name,
            }),

            MyTd(
              createElement('a', {
                textContent: tr.email,
                href: `mailto:${tr.email}`,
              })
            ),
          ])
        )
      )
    );

    table.append(thead);
    table.append(tbody);

    this.append(table);*/

    this.replaceChildren(
      new Table(null, [
        new THead(
          null,
          new Th({
            textContent: 'Id',
          })
        ),

        new TBody(
          null,
          [
            {
              Id: 1,
            },
            {
              Id: 2,
            },
            {
              Id: 3,
            },
            {
              Id: 4,
            },
          ].map(
            (tr) =>
              new Tr(
                null,
                new Td({
                  textContent: tr.Id,
                })
              )
          )
        ),
      ])
    );
  }
}

customElements.define('my-test1', MyTest1);
