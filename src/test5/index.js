import createState from "./core/state.js";
import createButton from "./components/Button";

const stateTarget = new EventTarget();
const state = createState(stateTarget);

stateTarget.addEventListener("prop-changed", (event) => {
	console.log("State changed:", event.detail);
});

customElements.define(
	"my-button",
	createButton(() => state),
);

customElements.define(
	"x-button",
	createButton(() => state),
);

// const useTemplate = (() => {
// 	const template = document.createElement("template");

// 	template.setHTMLUnsafe(
// 		`<h1>Test</h1><hr /><my-button></my-button><x-button></x-button>`,
// 	);

// 	return () => template.content.cloneNode(true);
// })();
