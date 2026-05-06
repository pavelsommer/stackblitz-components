Object.assignDeep =
	Object.assignDeep ||
	function (target, source) {
		const { style, dataset, ...props } = source || {};

		props && target && Object.assign(target, props);
		dataset && target?.dataset && Object.assign(target.dataset, dataset);
		style && target?.style && Object.assign(target.style, style);
	};

import "@webreflection/custom-elements-builtin";
await import("./Components");
