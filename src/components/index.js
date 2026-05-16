import { importComponent, createElement } from "@lib";
import State from "@components/State";

customElements.define("app-state", State);

customElements.define(
	"app-default",
	createElement((await importComponent("Application")).default, HTMLDivElement),
	{
		extends: "div",
	},
);

customElements.define(
	"app-heading",
	createElement((await importComponent("Heading")).default, HTMLHeadingElement),
	{
		extends: "h1",
	},
);

customElements.define(
	"app-header",
	createElement((await importComponent("Header")).default, HTMLElement),
	{
		extends: "header",
	},
);

customElements.define(
	"app-sidebar",
	createElement((await importComponent("Sidebar")).default, HTMLElement),
	{
		extends: "aside",
	},
);

customElements.define(
	"app-footer",
	createElement((await importComponent("Footer")).default, HTMLElement),
	{
		extends: "footer",
	},
);

customElements.define(
	"app-sidenav",
	createElement((await importComponent("Sidenav")).default, HTMLUListElement),
	{
		extends: "ul",
	},
);

customElements.define(
	"app-treeview",
	createElement((await importComponent("TreeView")).default, HTMLUListElement),
	{
		extends: "ul",
	},
);

customElements.define(
	"app-treeitem",
	createElement((await importComponent("TreeView/Item")).default, HTMLLIElement),
	{
		extends: "li",
	},
);

customElements.define(
	"app-expandmenu",
	createElement((await importComponent("ExpandMenu")).default, HTMLUListElement),
	{
		extends: "ul",
	},
);

customElements.define(
	"app-expanditem",
	createElement((await importComponent("ExpandMenu/Item")).default, HTMLLIElement),
	{
		extends: "li",
	},
);
