import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";

export default (Base) =>
	class extends createBehavior(Base) {
		async mounted() {}
	};
