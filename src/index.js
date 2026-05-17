import { importComponent } from "@lib";

Object.assignProps =
	Object.assignProps ||
	function (target, source = {}) {
		const { style, dataset, ...props } = source;

		props && target && Object.assign(target, props);
		dataset && target?.dataset && Object.assign(target.dataset, dataset);
		style && target?.style && Object.assign(target.style, style);
	};

await importComponent();
