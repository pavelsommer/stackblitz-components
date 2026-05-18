import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";

const template = createTemplate(
	`<ul is="ui-menu" class="ui-menu" data-level="1" data-state-id="state1"></ul>`,
);

export default (Base) =>
	class Self extends createBehavior(Base) {
		mounted() {
			Object.assign(this.style, {
				display: "flex",
				flex: "1",
			});

			this.append(useTemplate(template)?.fragment);
		}
	};
