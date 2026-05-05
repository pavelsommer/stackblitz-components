import { createTemplate, useTemplate } from "./../../../Core";
import state from "./../State";

const { props, watch } = state;

export default class Self extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<button class="sidebar-switch">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <g>
          <path class="color1" fill="#bf3737" d="M0.005 8l-0.005-4.876 6-0.815v5.691zM7 2.164l7.998-1.164v7h-7.998zM15 9l-0.002 7-7.998-1.125v-5.875zM6 14.747l-5.995-0.822-0-4.926h5.995z"></path>
        </g>
      </svg>
      </button>`);

		return (options) =>
			useTemplate(template, (fragment) => {
				const button = fragment.children[0];
				const icon = button.children[0];

				options?.button?.style &&
					Object.assign(button.style, options.button.style);

				options?.icon?.style && Object.assign(icon.style, options.icon.style);

				return {
					button,
					icon1: icon,
					update: (collapsed) => {
						collapsed && button.classList.add("collapsed");
						!collapsed && button.classList.remove("collapsed");
					},
				};
			});
	})();

	#options = {
		button: {
			style: {
				cursor: "pointer",
			},
		},
	};

	connectedCallback() {
		const { fragment, ...template } = Self.#template(this.#options);

		template.update(props.collapsed);
		template.button.addEventListener("click", () => {
			props.collapsed = !props.collapsed;
		});

		watch("collapsed", (event) => template.update(event.detail.value));

		this.append(fragment);
	}
}
