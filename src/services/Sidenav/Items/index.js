const response = await fetch("/api/sidenav/index.json");
const result = await response.json();

const getItems = (item) => {
	return item ? [result[1][item].items ?? [], result[1]] : [result[0], result[1]];
};

export { getItems };
