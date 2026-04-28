import createState from './state.js';
import Heading from "./components/Heading";

const AppState = createState({
  title: 'Hello!'
});

customElements.define('app-state', AppState);
customElements.define('my-heading', Heading((component) => {
  const state = document.querySelector('app-state');

  if (state) component.Title = state.values.title;

  component.Style = {
    title: {
      color: 'yellow',
    },

    root: {
      backgroundColor: 'blue'
    }
  };

  state?.listen('prop-changed', event => {
    switch (event.detail.key) {
      case 'title':

        component.Title = event.detail.value;

        break;
    }
  });

  component.listen('value-changed', event => {
    switch (event.detail.key) {
      case 'title':

        if (state)
          state.values.title = event.detail.value;

        break;
    }
  });
}));
