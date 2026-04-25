import createTemplate from './infrastructure/template.js';
import createComponent from './infrastructure/component.js';
import createState from './infrastructure/state.js';

import stateButton from './components/StateButton.js';
import textBox from './components/Textbox.js';

import Button from './components/Button.js';
import Footer from './components/Footer.js';

import json from './index.json';

const template1 = (() => {
  const userName = json.userName;

  return createTemplate(`<link href="./src/index.css" rel="stylesheet" />
<h1>${userName}</h1><hr />`);
})();

customElements.define('my-textbox-state', createState());

customElements.define(
  'my-textbox',
  textBox((component) => {
    const state = document.querySelector('my-textbox-state');

    component.value = state.values.value || '';

    component.listen('value-changed', (event) => {
      state.values.value = event.detail;
    });

    state.listen('prop-changed', (event) => {
      const { key, value } = event.detail;

      if (key === 'value') component.value = value;
    });
  })
);

customElements.define(
  'my-heading',
  createComponent(template1, (component) => {
    const state = document.querySelector('my-textbox-state');

    state.listen('prop-changed', (event) => {
      const { key, value } = event.detail;

      component.shadowRoot.children[1].textContent = value
        ? `${value.toUpperCase()} ${json.userName}`
        : 'empty';
    });
  })
);

customElements.define('my-footer', Footer);
customElements.define('my-button', Button);

customElements.define(
  'my-sidebar-state',
  createState({
    value: false,
  })
);

customElements.define(
  'my-sidebar-button',
  stateButton((component) => {
    const state = document.querySelector('my-sidebar-state');

    component.listen('value-changed', (event) => {
      state.values.value = event.detail;
    });

    state.listen('prop-changed', (event) => {
      const { key, value } = event.detail;

      if (key === 'value') component.state = value;
    });
  })
);
