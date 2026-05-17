import { importComponent, createElement } from "@lib";
import State from "@components/State";

customElements.define("ui-state", State);

customElements.define(
	"ui-app",
	createElement((await importComponent("Application")).default, HTMLElement),
);

customElements.define(
	"app-heading",
	createElement((await importComponent("Heading")).default, HTMLHeadingElement),
	{
		extends: "h1",
	},
);

customElements.define(
	"ui-app-header",
	createElement((await importComponent("Header")).default, HTMLElement),
	{
		extends: "header",
	},
);

customElements.define(
	"ui-sidebar",
	createElement((await importComponent("Sidebar")).default, HTMLElement),
	{
		extends: "aside",
	},
);

customElements.define(
	"ui-app-footer",
	createElement((await importComponent("Footer")).default, HTMLElement),
	{
		extends: "footer",
	},
);

customElements.define(
	"ui-sidenav",
	createElement((await importComponent("Sidenav")).default, HTMLElement),
);

customElements.define(
	"ui-menu",
	createElement((await importComponent("Menu")).default, HTMLUListElement),
	{
		extends: "ul",
	},
);

customElements.define(
	"ui-menu-item",
	createElement((await importComponent("Menu/Item")).default, HTMLLIElement),
	{
		extends: "li",
	},
);
