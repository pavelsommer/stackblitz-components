import { createState } from "./../../Core";

export default class Self extends HTMLElement {
	#props = null;
	#watch = null;

	get state() {
		return {
			props: this.#props,
			watch: this.#watch,
		};
	}

	connectedCallback() {
		const props = {};

		Object.assign(props, this.dataset);

		({ props: this.#props, watch: this.#watch } = createState(props));
	}
}
