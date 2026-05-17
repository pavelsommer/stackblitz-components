import { createState } from "./../../lib";

export default class Self extends HTMLElement {
	#props = null;
	#watch = null;

	#options = {
		self: {
			style: {
				display: "none",
			},
		},
	};

	get state() {
		return {
			props: this.#props,
			watch: this.#watch,
		};
	}

	connectedCallback() {
		const props = {};

		Object.assign(props, this.dataset);
		Object.assignProps(this, this.#options.self);

		({ props: this.#props, watch: this.#watch } = createState(props));
	}

	setValue(propName, propValue) {
		this.#props[propName] = propValue;
	}
}
