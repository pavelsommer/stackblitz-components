import App from './app.js';

const context = new App();

const createTemplate = (template) => {
  const fragment = document.createElement('template');

  fragment.innerHTML = template;

  return fragment;
};

class Component extends HTMLElement {
  $render(template) {
    function collectRefs(frag) {
      return Object.fromEntries(
        [...frag.querySelectorAll('[data-ref]')].map((el) => [
          el.dataset.ref,
          el,
        ])
      );
    }

    const fragment = template.content.cloneNode(true);
    const refs = collectRefs(fragment);

    return {
      fragment,
      refs,
    };
  }

  $update(element, values) {
    const { style, dataset, ...options } = values;

    if (style) Object.assign(element.style, style);
    if (dataset) Object.assign(element.dataset, dataset);

    Object.assign(element, options);
  }

  $element(tagName, o) {
    const fragment = document.createElement(tagName);

    for (const key of Object.keys(o)) {
      const { style, dataset, content, ...options } = o[key];
      const element = document.createElement(key);

      if (style) Object.assign(element.style, style);
      if (dataset) Object.assign(element.dataset, dataset);

      Object.assign(element, options);

      if (content) element.append(this.$template(content));

      fragment.appendChild(element);
    }

    return fragment;
  }

  $template(o) {
    const fragment = document.createDocumentFragment();

    for (const key of Object.keys(o)) {
      const { style, dataset, content, ...options } = o[key];
      const element = document.createElement(key);

      if (style) Object.assign(element.style, style);
      if (dataset) Object.assign(element.dataset, dataset);

      Object.assign(element, options);

      if (content) element.append(this.$template(content));

      fragment.appendChild(element);
    }

    return fragment;
  }
}

class Button extends Component {
  static #template =
    createTemplate(`<button class="group flex items-center px-1 py-1 bg-gray-50 rounded transition cursor-pointer">
    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <g data-ref="svg" fill="#ed650b">
        <g id="Layer_1">
            <path d="M92.326,0.785H3.674c-1.596,0-2.889,1.293-2.889,2.89v88.65c0,1.596,1.293,2.89,2.889,2.89h88.652
		c1.596,0,2.889-1.294,2.889-2.89V3.675C95.215,2.078,93.922,0.785,92.326,0.785z M44.274,73.794l-20.012,4.527V51.825l20.012-0.199
		V73.794z M44.274,44.474l-20.012-0.598V17.679l20.012,3.359V44.474z M71.737,67.58l-20.012,4.526v-20.48l20.012-0.199V67.58z
		 M71.737,45.271l-20.012-0.697V22.289l20.012,3.359V45.271z"></path>
        </g>
        <g id="Layer_2">
        </g>
    </g>
</svg>
  </button>`);

  connectedCallback() {
    const { fragment, refs } = super.$render(Button.#template);
    const { svg } = refs;

    context.addEventListener('sidebar_switch', (event) => {
      svg.setAttribute('fill', event.detail ? '#ed650b' : '#dfe0e1');
    });

    this.replaceChildren(fragment);
  }
}

class ButtonSet extends Component {}

class Toolbar extends Component {
  connectedCallback() {
    this.style.display = 'flex';
    this.style.paddingLeft = '4px';
    this.style.gap = '2px';
  }
}

class Header extends Component {
  connectedCallback() {}
}

class Sidebar extends Component {
  static #template = createTemplate(
    `<div data-ref="sidebar" class="sidebar"></div>`
  );

  connectedCallback() {
    const { fragment, refs } = super.$render(Sidebar.#template);
    const { sidebar } = refs;

    context.addEventListener('sidebar_switch', (event) => {
      sidebar.className = event.detail ? 'sidebar' : 'sidebar sidebar--hidden';
    });

    this.replaceWith(fragment);
  }
}

class Application extends Component {
  static #template = createTemplate(`<div class="app">
  <header class="header">
    <my-toolbar>
      <my-button data-ref="sidebarButton1"></my-button>
    </my-toolbar>
  </header>
  <div class="content">
    <my-sidebar></my-sidebar>
    <main class="main">
    </main>
  </div>
  <footer class="footer">
    <my-toolbar>
      <my-button data-ref="sidebarButton2"></my-button>
    </my-toolbar>
  </footer>
</div>`);

  connectedCallback() {
    const { fragment, refs } = super.$render(Application.#template);
    const { sidebarButton1, sidebarButton2 } = refs;

    sidebarButton1.addEventListener(
      'click',
      (event) => (context.sidebar = !context.sidebar)
    );

    sidebarButton2.addEventListener(
      'click',
      (event) => (context.sidebar = !context.sidebar)
    );

    this.replaceChildren(fragment);
  }
}

customElements.define('my-button', Button);
customElements.define('my-toolbar', Toolbar);
customElements.define('my-header', Header);
customElements.define('my-sidebar', Sidebar);
customElements.define('my-application', Application);
