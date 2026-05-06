import { createTemplate, useTemplate } from "./../../../Core";
import state from "./../State";

const contentTemplate =
	createTemplate(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <g>
    <path class="color1" fill="#bf3737" d="M0.005 8l-0.005-4.876 6-0.815v5.691zM7 2.164l7.998-1.164v7h-7.998zM15 9l-0.002 7-7.998-1.125v-5.875zM6 14.747l-5.995-0.822-0-4.926h5.995z"></path>
  </g>
</svg>`);

const { props, watch } = state;

const Switch = (Base) =>
	class Self extends Base {
		static contentTemplate = (() => {
			return (options) =>
				useTemplate(contentTemplate, (fragment) => {
					const icon = fragment.children[0];

					options?.icon?.style && Object.assign(icon.style, options.icon.style);

					return {
						icon,
					};
				});
		})();

		#options = {
			self: {
				style: {
					cursor: "pointer",
				},
			},
		};

		connectedCallback() {
			const { fragment } = Self.contentTemplate(this.#options);

			this.#options?.self?.style && Object.assign(this.style, this.#options.self.style);

			this.#update(props.collapsed);
			this.addEventListener("click", () => {
				props.collapsed = !props.collapsed;
			});

			watch("collapsed", (event) => this.#update(event.detail.value));

			this.append(fragment);
		}

		#update(collapsed) {
			collapsed && this.classList.add("collapsed");
			!collapsed && this.classList.remove("collapsed");
		}
	};

export default Switch;

customElements.define("sidebar-switch-button", Switch(HTMLButtonElement), {
	extends: "button",
});

customElements.define("sidebar-switch-div", Switch(HTMLDivElement), {
	extends: "div",
});
