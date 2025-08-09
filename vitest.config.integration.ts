import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		include: ["src/**/*.integration.{test,spec}.{js,ts}"],
		environment: "node",
		globals: true,
		setupFiles: ["./src/tests/setup.integration.ts"],
		testTimeout: 30000,
		hookTimeout: 30000,
		pool: "forks",
		poolOptions: {
			forks: {
				singleFork: true
			}
		}
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
			"@": path.resolve("./src")
		}
	}
});
