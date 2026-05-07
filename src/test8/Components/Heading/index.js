import { createTemplate, useTemplate, registerComponent, componentBase } from "./../../Core";

const template =
	createTemplate(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="house-market-growth">
  <g fill="#ed650b"><path d="M31.4043 12.8311L30.1689 14.4043L16 3.27148L1.83105 14.4043L0.595703 12.8311L16 0.728516L31.4043 12.8311Z" fill="#ed650b"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M28 15.2422V26C28 28.2091 26.2091 30 24 30H8C5.79086 30 4 28.2091 4 26V15.2422L16 5.81348L28 15.2422ZM19.6123 16L20.3555 18.2285L15 23.5859L11 19.5859L7.58594 23L9 24.4141L11 22.4141L15 26.4141L21.7695 19.6436L24 20.3877V16H19.6123Z" fill="#ed650b"></path></g>
</svg>`);

const component = componentBase(
	HTMLHeadingElement,
	"application-heading",
	(Base) =>
		class Self extends Base {
			static #template = (options) =>
				useTemplate(template, (fragment) => {
					return {};
				});

			#options = {
				self: {
					dataset: {
						level: "1",
					},

					style: {
						color: "green",
						fontSize: "3rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					},
				},
			};

			connectedCallback() {
				super.connectedCallback();

				const { fragment } = Self.#template();

				this.textContent = this.dataset.text || "";
				Object.assignDeep(this, this.#options?.self);

				this.append(fragment);
			}
		},
);

export default component;

registerComponent(component, "application-heading", "h1");
