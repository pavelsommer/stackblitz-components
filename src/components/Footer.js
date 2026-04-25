import createTemplate from '../infrastructure/template.js';
import createComponent from '../infrastructure/component.js';

const template = (() => {
  return createTemplate(`<link href="./src/index.css" rel="stylesheet" />
<footer class="footer">
  <my-sidebar-button></my-sidebar-button>
</footer>`);
})();

export default createComponent(template);
