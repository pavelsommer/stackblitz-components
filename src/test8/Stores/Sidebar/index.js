import { createState } from "./../../Core";

const { props, watch } = createState();

watch("collapsed", (event) => {
	console.log("collapsed", event.detail.value);
});

export default { props, watch };
