import * as vali from "valibot";
import { createTemplate, useTemplate } from "./../../../Core";

await import("./../Item/Title");

const props = new Proxy(
	{},
	{
		set: (target, key, value, receiver) => {
			const result = Reflect.set(target, key, value, receiver);

			return result;
		},
	},
);

const contentTemplate = createTemplate(`<div is="sidenav-item-title">
</div>
<div class="items">
	<div class="items__inner">
		<ul>
		</ul>
	</div>
</div>`);

export default class Self extends HTMLLIElement {
	static #createContent = (sidenav, options) => {
		const { fragment, titleEl, itemsEl } = useTemplate(contentTemplate, (fragment) => {
			return {
				titleEl: fragment.children[0],
				itemsEl: fragment.children[1],
			};
		});

		titleEl.textContent = options.textContent ?? "";
		titleEl.addEventListener("click", () => {
			console.log("Hello!");
		});

		return fragment;
	};

	connectedCallback() {
		this.#connectState();
		this.#render();
	}

	async #connectState() {
		const { props, watch } = (await import("./../../Sidebar/State")).default;

		this.#update(props.blockId === this.dataset.id);
		this.classList.add("mounted");

		watch("blockId", (event) => {
			this.#update(event.detail.value === this.dataset.id);
		});
	}

	async #render() {
		const sidenav = (await import("./../Items")).default;
		const refs = sidenav.refs[this.dataset.id];
		const items = sidenav.items;

		for (const ref of refs) {
			this.append(
				Self.#createContent(sidenav, {
					textContent: items[ref].title,
				}),
			);
		}
	}

	#update(active) {
		if (active) this.classList.add("active");
		else this.classList.remove("active");
	}
}

customElements.define("sidenav-block-item", Self, { extends: "li" });
