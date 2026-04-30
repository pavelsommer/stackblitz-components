import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid({ include: ["src/test5/components/**/*.jsx", "src/solid/**/*.jsx"] }),
    tailwindcss(),
  ],
});
