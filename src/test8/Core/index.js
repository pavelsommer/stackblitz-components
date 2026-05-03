const stateListeners = new WeakMap();

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

const createState = (props = {}) => {
	const eventTarget = new EventTarget();
	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];

			if (oldValue === value) return true;
			const result = Reflect.set(target, key, value, receiver);

			eventTarget.dispatchEvent(
				new CustomEvent("prop-changed", {
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

	const proxy = new Proxy(props, handler);

	stateListeners.set(proxy, eventTarget);

	return proxy;
};

const watchState = (state, listener, abortSignal) => {
	const eventTarget = stateListeners.get(state);

	if (!eventTarget) {
		throw new Error("Invalid state object");
	}

	eventTarget.addEventListener("prop-changed", listener, {
		signal: abortSignal,
	});
};

export { Component, createTemplate, useTemplate, createState };
