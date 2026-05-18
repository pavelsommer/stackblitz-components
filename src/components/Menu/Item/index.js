import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";
import { getItems } from "@services/Sidenav/Items";

const separatorTemplate = createTemplate(`<div class="ui-menu-item-separator"></div>`);

const linkTemplate =
	createTemplate(`<div class="ui-menu-item-divider"></div><a class="ui-menu-item-link" href="#">
	<span class="ui-menu-item-text">
  </span>
</a>`);

const titleTemplate =
	createTemplate(`<div class="ui-menu-item-divider"></div><div class="ui-menu-item-title">
  <span class="ui-menu-item-text">
  </span>
</div>`);

const itemsTemplate = createTemplate(`<div class="menu-container">
  <ul is="ui-menu" class="ui-menu">
  </ul>
</div>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		get level() {
			return parseInt(this.dataset.level ?? "1");
		}

		async mounted() {
			const items = getItems(this.dataset.id);
			const item = items[1][this.dataset.id];

			this.renderItem({
				item,
				hasChildren: items[0].length > 0,
				hasSeparator: item.separator,
				hasLink: item.href ? true : false,
			});
		}

		renderItem(options) {
			const props = {
				text: {
					textContent: options.item.label,

					dataset: {
						level: this.level,
					},
				},
			};

			this.append(
				useTemplate(options.hasLink ? linkTemplate : titleTemplate, (fragment) => {
					const title = fragment.children[1];
					const text = title.children[0];
					const divider = fragment.children[0];

					Object.assignProps(text, props?.text);

					title.style.marginLeft = `${(this.level - 1) * 16}px`;
					options.hasSeparator && this.renderSeparator(divider);
					options.hasChildren && this.renderItems(fragment, title);
				}).fragment,
			);
		}

		renderSeparator(parent) {
			parent.append(useTemplate(separatorTemplate).fragment);
		}

		renderItems(parent, title) {
			const props = {
				menu: {
					dataset: {
						id: this.dataset.id,
						level: this.level + 1,
					},
				},
			};

			parent.append(
				useTemplate(itemsTemplate, (fragment) => {
					const container = fragment.children[0];
					const menu = container.children[0];

					title.addEventListener(
						"click",
						(event) => {
							event.target.classList.toggle("expanded");
							container.classList.toggle("expanded");
						},
						{
							signal: this.abortSignal,
						},
					);

					Object.assignProps(menu, props?.menu);
				}).fragment,
			);
		}
	};
