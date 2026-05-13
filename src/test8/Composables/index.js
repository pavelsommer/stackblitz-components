import { createTemplate, useTemplate } from "./../../../Core";

const containerTemplate = createTemplate(`<div>
	<ul>
	</ul>
</div>`);

const itemTemplate = createTemplate(`<li></li>`);

export default (options) => {
	const { fragment, items } = useTemplate(containerTemplate, (fragment) => {
		const itemsEl = fragment.children[0].children[0];
		const setItems = (items) => itemsEl.append(items);

		return {
			items: itemsEl,
			setItems,
		};
	});

	return fragment;
};
