import { createComponent, createState } from "./core";
import headingTemplate from "./templates/Heading";

import Heading from "./components/Heading";

const state1 = () =>
  createState({
    value1: "",
  });

customElements.define("my-heading", Heading(state1));
