export default () => {
	return class extends HTMLElement {
		async connectedCallback() {
			const response = await fetch(
				this.dataset.endPoint ?? "https://jsonplaceholder.typicode.com/users",
			);

			const users = await response.json();

			console.log(users);
		}
	};
};
