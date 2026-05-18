import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";
import { getItems } from "@services/Sidenav/Items";

const template = createTemplate(`<li is="ui-menu-item" class="ui-menu-item"></li>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		get level() {
			return parseInt(this.dataset.level ?? "1");
		}

		async mounted() {
			const { props, watch } = await useState({
				id: this.dataset.stateId,
			});

			const items = getItems(this.dataset.id);

			this.append(
				createFragment(items[0], (item, index) => {
					const props = {
						className: index === 0 ? "ui-menu-item expanded" : "ui-menu-item",

						dataset: {
							id: item,
							label: items[1][item].label,
							level: this.level,
						},
					};

					return useTemplate(template, (fragment) => {
						const element = fragment.children[0];
						Object.assignProps(element, props);
					}).fragment;
				}),
			);
		}
	};
