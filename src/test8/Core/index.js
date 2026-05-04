class Component {
	static assign(target, source) {
		const { style, dataset, ...props } = source;

		style && Object.assign(target.style, style);
		dataset && Object.assign(target.dataset, dataset);

		Object.assign(target, props);
	}
}

const createTemplate = (innerHTML) => {
	const template = document.createElement("template");

	template.setHTMLUnsafe(innerHTML);

	return template;
};

const useTemplate = (template, refs) => {
	const fragment = template.content.cloneNode(true);

	return {
		fragment,
		...refs(fragment),
	};
};

const createState = (initial = {}) => {
	const eventTarget = new EventTarget();

	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
			const result = Reflect.set(target, key, value, receiver);

			eventTarget.dispatchEvent(
				new CustomEvent(`prop-changed-${key}`, {
					detail: {
						target,
						key,
						oldValue,
						value,
						receiver,
					},
				}),
			);

			return result;
		},
	};

	const props = new Proxy(initial, handler);
	const watch = (prop, listener, abortSignal) => {
		eventTarget.addEventListener(`prop-changed-${prop}`, listener, {
			signal: abortSignal,
		});
	};

	return {
		props,
		watch,
	};
};

const createReducer = (props, reducer) => {
	const handler = {
		get: (target, key, receiver) => {
			return reducer[key](props[key], props);
		},

		set: (target, key, value, receiver) => {
			reducer[key] = value;

			return true;
		},
	};

	return new Proxy(props, handler);
};

export { Component, createTemplate, useTemplate, createState, createReducer };
