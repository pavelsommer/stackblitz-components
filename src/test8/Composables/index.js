import { createTemplate, useTemplate } from "./../../../Core";

const template = createTemplate(`<div>
	<ul>
	</ul>
</div>`);

export default (options) => {
	const { fragment, items } = useTemplate(template, (fragment) => {
		const itemsEl = fragment.children[0].children[0];
		const setItems = (items) => itemsEl.append(items);

		return {
			items: itemsEl,
			setItems,
		};
	});

	return fragment;
};
