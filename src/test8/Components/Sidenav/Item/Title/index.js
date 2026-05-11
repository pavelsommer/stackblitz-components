import { createTemplate, useTemplate } from "./../../../../Core";

export default class Self extends HTMLDivElement {}

customElements.define("sidenav-item-title", Self, { extends: "div" });
