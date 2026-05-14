const response = await fetch("/api/sidenav/index.json");
const json = await response.json();

export default {
	root: json[0],
	rels: json[1],
	items: json[2],
};
