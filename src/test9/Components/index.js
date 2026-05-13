import { createElement } from "./../Core";
import State from "./State";

customElements.define("app-state", State);

customElements.define(
	"app-default",
	createElement((await import("./Application")).default, HTMLDivElement),
	{
		extends: "div",
	},
);

customElements.define(
	"app-heading",
	createElement((await import("./Heading")).default, HTMLHeadingElement),
	{
		extends: "h1",
	},
);

customElements.define(
	"app-header",
	createElement((await import("./Header")).default, HTMLElement),
	{
		extends: "header",
	},
);

customElements.define(
	"app-sidebar",
	createElement((await import("./Sidebar")).default, HTMLElement),
	{
		extends: "aside",
	},
);

customElements.define(
	"app-footer",
	createElement((await import("./Footer")).default, HTMLElement),
	{
		extends: "footer",
	},
);
