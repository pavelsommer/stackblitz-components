import createTemplate from './infrastructure/template.js';
import createSwitch from './components/Switch.js';
import createTextbox from './components/Textbox.js';
import createState from './infrastructure/state.js';

const State1 = createState({
  text1: '',
  text2: '',
});

const MyElement = createSwitch(
  createTemplate(`<button>off</button>`),
  (component) => ({
    changed: (value) => {
      const element = component.shadowRoot.children[0];

      element.textContent = value ? 'on' : 'off';
      element.style.backgroundColor = value ? 'yellow' : 'unset';
    },
  })
);

const MyTextbox = createTextbox((component) => {
  const state = document.querySelector('my-state1');

  state.listen('prop-changed', (event) => {
    component.value = event.detail.value;
  });

  return {
    changed: (value) => {
      state.values.text1 = value;
    },
  };
});

const MyTextX = createTextbox((component) => {
  const state = component.dataset.stateId
    ? document.getElementById(component.dataset.stateId)
    : null;

  state?.listen('prop-changed', (event) => {
    component.value = event.detail.value;
  });

  return {
    changed: (value) => {
      if (state && component.dataset.propId) {
        state.values[component.dataset.propId] = value;
      }
    },
  };
});

customElements.define('my-state1', State1);
customElements.define('my-element', MyElement);
customElements.define('my-textbox', MyTextbox);
customElements.define('my-text-x', MyTextX);
