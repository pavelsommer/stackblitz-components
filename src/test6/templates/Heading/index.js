export default (() => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(`<h1>Hello!</h1><hr />`);

	return () => {
		const fragment = template.content.cloneNode(true);

		return {
			fragment,
			headingEl: fragment.querySelector("h1"),
		};
	};
})();
