import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";

const template = createTemplate(`<ui-sidenav class="ui-sidenav"></ui-sidenav>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		mounted() {
			this.append(useTemplate(template)?.fragment);
		}
	};
