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
			const result = useTemplate(template, (fragment) => {
				const heading = fragment.children[2].children[0];

				dataset && Object.assign(heading.dataset, dataset);

				return {
					heading,
					setTitle: (value) => (heading.textContent = value),
				};
			});

			return result;
		};

		async mounted() {
			const { props, watch } = await useState({
				id: this.dataset.stateId,
			});

			const { fragment, setTitle } = Self.#template({
				title: props.title,
			});

			this.append(fragment);

			watch(
				"title",
				(event) => {
					setTitle(event.detail.value);
				},
				this.abortSignal,
			);
		}
	};
