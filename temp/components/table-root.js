import TableTBody from './table-tbody.js';

const templateRoot = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<table>
  <thead></thead>
  <tbody></tbody>
</table>`;

  return template.content;
})();

const templateTh = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<table-th>
</table-th>`;

  return template.content;
})();

const templateTd = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<td>
</td>`;

  return template.content;
})();

const templateTr = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<tr>
</tr>`;

  return template.content;
})();

const root = (options) => {
  options = options ?? {};

  const fragment = templateRoot.cloneNode(true);
  const element = fragment.children[0];
  const thead = element.children[0];
  const tbody = element.children[1];

  const { style, dataset, ...props } = options;

  if (style) Object.assign(element.style, style);
  if (dataset) Object.assign(element.dataset, dataset);

  Object.assign(element, props);

  return { fragment, element, thead, tbody };
};

const th = (options) => {
  options = options ?? {};

  const fragment = templateTh.cloneNode(true);
  const element = fragment.children[0];
  const { style, dataset, ...props } = options;

  if (style) Object.assign(element.style, style);
  if (dataset) Object.assign(element.dataset, dataset);

  Object.assign(element, props);

  return { fragment, element };
};

export default class Self extends HTMLElement {
  #root;
  #thead;
  #tbody;

  connectedCallback() {
    const { fragment, element, thead, tbody } = root({
      style: {
        width: '100%',
        border: '1px solid black',
      },
    });

    this.#root = element;
    this.#thead = thead;
    this.#tbody = tbody;

    this.#thead.append(
      ...['Col #1', 'Col #2'].map((column) => {
        const { element } = th({
          dataset: {
            fieldName: column,
            title: column,
          },
        });

        return element;
      })
    );

    this.replaceWith(fragment);
  }
}
