import {
  createBehavior,
  createFragment,
  createTemplate,
  useTemplate,
} from "./../../lib";

const template = createTemplate(`<ul>
</ul>`);

export default (Base) => class extends createBehavior(Base) {};
