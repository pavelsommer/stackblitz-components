export default (eventTarget, props = {}) => {
	const handler = {
		set: (target, key, value, receiver) => {
			const oldValue = target[key];
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

	return {
		proxy,
		eventTarget,
	};
};
