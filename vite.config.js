import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import { fileURLToPath, URL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	plugins: [solid({ include: ["src/solid/**/*.jsx"] }), tailwindcss()],

	resolve: {
		alias: {
			"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@services": fileURLToPath(new URL("./src/services", import.meta.url)),
		},
	},
});
