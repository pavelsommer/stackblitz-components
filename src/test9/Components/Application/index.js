import {
	createTemplate,
	useTemplate,
	createBehavior,
	useState,
} from "./../../Core";

const template = createTemplate(
	`<header is="app-header"></header>
<aside is="app-sidebar" role="navigation"></aside>
<main>
	<h1 is="app-heading" data-title="Default"></h1>
</main>
<footer is="app-footer"></footer>`,
);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #template = (dataset) => {
			const fragment = useTemplate(template, (fragment) => {
				const heading = fragment.children[2].children[0];
				const sidebar = fragment.children[1];

				dataset && Object.assign(heading.dataset, dataset);

				return {
					heading,
					setTitle: (value) => (heading.textContent = value),
					setSidebar: (value) => {
						if (value) sidebar.classList.remove("collapsed");
						else sidebar.classList.add("collapsed");
					},
				};
			});

			fragment.setSidebar(dataset.sidebar);

			return fragment;
		};

		async mounted() {
			const { props, watch } = await useState({
				id: this.dataset.stateId,
			});

			const { fragment, setTitle, setSidebar } = Self.#template({
				title: props.title,
				sidebar: Boolean(props.sidebar?.trim()),
			});

			this.append(fragment);

			watch(
				"title",
				(event) => {
					setTitle(event.detail.value);
				},
				this.abortSignal,
			);

			watch(
				"sidebar",
				(event) => {
					setSidebar(event.detail.value);
				},
				this.abortSignal,
			);
		}
	};
