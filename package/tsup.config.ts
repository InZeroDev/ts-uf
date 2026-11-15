import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/types.ts", "src/*/index.ts"],
	splitting: false,
	clean: true,
	dts: true,
	format: "esm",
	minify: true,
	sourcemap: true,
});
