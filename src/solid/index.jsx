import { render } from "solid-js/web";
import { createSignal } from "solid-js";

import Heading from "./components/Heading";

render(() => <Heading text="Hello Solid!" />, document.getElementById("app"));
