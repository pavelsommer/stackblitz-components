import State from "./Components/Store";
import Sidebar from "./Components/Sidebar";
import SidebarSwitch from "./Components/Sidebar/Switch";
import Textbox from "./Components/Textbox";

customElements.define("my-textbox", Textbox);
customElements.define("my-sidebar", Sidebar);
customElements.define("my-sidebar-switch", SidebarSwitch);
customElements.define("my-state", State);
