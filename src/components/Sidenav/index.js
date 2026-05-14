import {
	createTemplate,
	useTemplate,
	createBehavior,
	createFragment,
	useState,
} from "./../../lib";

// const itemTemplate = createTemplate(`<li>
//   <strong></strong>
//   <span></span>
//   <hr />
// </li>`);

// const containerTemplate = createTemplate(`<div>
// 	<ul>
// 	</ul>
// </div>`);

// const renderItem = (item) => {
// 	const html = useTemplate(itemTemplate, (fragment) => {
// 		const itemTitle = fragment.children[0].children[0];
// 		const itemId = fragment.children[0].children[1];

// 		return {
// 			itemTitle,
// 			itemId,
// 		};
// 	});

// 	html.itemTitle.textContent = item.title;
// 	html.itemId.textContent = `[${item.id}]`;

// 	return html.fragment;
// };

// const renderContainer = (items) => {
// 	const { fragment, container } = useTemplate(containerTemplate, (fragment) => {
// 		const container = fragment.children[0];

// 		return {
// 			container,
// 		};
// 	});

// 	container.append(createFragment(items, renderItem));

// 	return fragment;
// };

// const blockTemplate = createTemplate(`<li>
//   <strong></strong>
//   <span></span>
//   <hr />
// </li>`);

// const blocksTemplate = createTemplate(`<div>
// 	<ul>
// 	</ul>
// </div>`);

export default (Base) =>
	class extends createBehavior(Base) {
		async mounted() {
			const sidenav = (await import("./services/items/get")).default;

			console.log(sidenav.items);
		}
	};
