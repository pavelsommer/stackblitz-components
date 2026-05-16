import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";
import { getItems } from "@services/Sidenav/Items";

const titleTemplate = createTemplate(`<div class="title">
    <label class="text-wrapper">
      <span class="text">abcd</span>
    </label>
  </div>`);

const contentTemplate = createTemplate(
	`<div class="items"><div class="items__inner"><ul is="app-expandmenu"></ul></div></div>`,
);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #titleTemplate(dataset) {
			const { fragment, rootElem, textElem } = useTemplate(titleTemplate, (fragment) => {
				const rootElem = fragment.children[0];
				const textElem = rootElem.children[0].children[0];

				dataset && Object.assign(rootElem.dataset, dataset);

				return {
					rootElem,
					textElem,
				};
			});

			return fragment;
		}

		static #contentTemplate(dataset) {
			const { fragment, element } = useTemplate(contentTemplate, (fragment) => {
				const element = fragment.children[0].children[0].children[0];

				dataset && Object.assign(element.dataset, dataset);

				return {
					element,
				};
			});

			return fragment;
		}

		get Level() {
			return parseInt(this.dataset.level ?? "1");
		}

		get ClassNames() {
			return this.Level > 1 ? "item" : "block";
		}

		get Id() {
			return this.dataset.id;
		}

		mounted() {
			const classNames = this.ClassNames;
			classNames && this.classList.add(classNames);

			this.renderContent();
		}

		renderContent() {
			const [children, items] = getItems(this.Id);

			children.length > 0 && this.renderItems(children, items);
		}

		renderItems(children, items) {
			const dataset = {
				id: this.Id,
				level: this.Level + 1,
			};

			this.dataset.label && (dataset.label = this.dataset.label);
			this.append(Self.#contentTemplate(dataset));
		}
	};
