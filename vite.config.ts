import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/timers/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "./src/app"),
			"@shared": path.resolve(__dirname, "./src/shared"),
		},
	},
});
