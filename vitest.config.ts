import { mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import baseConfig from "./vite.config";
import path from "path";

// Merge the base Vite config with Vitest specific config
export default mergeConfig(
	baseConfig,
	defineVitestConfig({
		test: {
			include: ["src/**/*.{test,spec}.{js,ts}"],
			exclude: ["src/**/*.integration.{test,spec}.{js,ts}"],
			environment: "happy-dom",
			globals: true,
			setupFiles: ["./src/tests/setup.ts"],
			coverage: {
				provider: "v8",
				reporter: ["text", "json", "html", "lcov"],
				exclude: [
					"node_modules/",
					"src/tests/",
					"**/*.d.ts",
					"**/*.config.*",
					"**/mockData",
					"**/test-utils",
					"build/",
					".svelte-kit/",
					"src/archive/",
					"src/posts/",
					"src/mdsvex.svelte"
				],
				thresholds: {
					branches: 70,
					functions: 70,
					lines: 80,
					statements: 80
				}
			},
			restoreMocks: true,
			mockReset: true,
			clearMocks: true
		},
		resolve: {
			alias: {
				$lib: path.resolve("./src/lib"),
				$app: path.resolve("./src/tests/mocks/app"),
				"@": path.resolve("./src")
			}
		}
	})
);
