import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";
import { getItems } from "@services/Sidenav/Items";

const itemTemplate = createTemplate(`<li is="app-expanditem"></li>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #itemTemplate = (dataset) => {
			const { fragment, element } = useTemplate(itemTemplate, (fragment) => {
				const element = fragment.children[0];

				dataset && Object.assign(element.dataset, dataset);

				return {
					element,
				};
			});

			return fragment;
		};

		get Level() {
			return parseInt(this.dataset.level ?? "1");
		}

		get ClassNames() {
			return this.Level > 1 ? "" : "blocks";
		}

		get Id() {
			return this.dataset.id;
		}

		mounted() {
			const classNames = this.ClassNames;
			classNames && this.classList.add(classNames);

			this.renderItems();
		}

		renderItems() {
			const [children, items] = getItems(this.Id);

			this.append(
				createFragment(children, (child) => {
					const dataset = {
						id: child,
						level: this.Level,
					};

					this.Level > 1 && (dataset.label = items[child].title);

					return Self.#itemTemplate(dataset);
				}),
			);
		}
	};
