export default class extends EventTarget {
  #title;
  #userName;
  #sidebar = true;

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
  }

  get userName() {
    return this.#userName;
  }

  get sidebar() {
    return this.#sidebar;
  }

  set sidebar(value) {
    this.#sidebar = value;

    this.dispatchEvent(
      new CustomEvent('sidebar_switch', {
        detail: value,
      })
    );
  }

  constructor(options) {
    super();
  }
}
