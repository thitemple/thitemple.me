import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const siteDirCandidates = [".vercel/output/static", ".svelte-kit/output/prerendered"];
const defaultGlob = "**/{blog,from-the-temple}/*.html";

export function findSiteDir(cwd = process.cwd()) {
	return siteDirCandidates
		.map((candidate) => resolve(cwd, candidate))
		.find((candidate) => existsSync(resolve(candidate, "index.html")));
}

export function findPagefindGlob(cwd = process.cwd()) {
	const configPath = resolve(cwd, "pagefind.yml");

	if (!existsSync(configPath)) {
		return defaultGlob;
	}

	const config = readFileSync(configPath, "utf8");
	const globMatch = config.match(/^\s*glob:\s*["']?(.+?)["']?\s*$/m);

	return globMatch?.[1] ?? defaultGlob;
}

export function runPagefind(siteDir, glob, cwd = process.cwd()) {
	return new Promise((resolvePromise, rejectPromise) => {
		const child = spawn("bunx", ["--bun", "pagefind", "--site", siteDir, "--glob", glob], {
			cwd,
			stdio: "inherit"
		});

		child.on("error", (error) => {
			rejectPromise(error);
		});

		child.on("exit", (code) => {
			if (code === 0) {
				resolvePromise();
				return;
			}

			rejectPromise(new Error(`Pagefind indexing failed with exit code ${code ?? "unknown"}`));
		});
	});
}

export function syncPagefindForDev(siteDir, cwd = process.cwd()) {
	const sourceDir = resolve(siteDir, "pagefind");
	const targetDir = resolve(cwd, "static/pagefind");

	if (!existsSync(sourceDir)) {
		return false;
	}

	mkdirSync(resolve(cwd, "static"), { recursive: true });
	rmSync(targetDir, { recursive: true, force: true });
	cpSync(sourceDir, targetDir, { recursive: true });
	return true;
}

async function main() {
	const siteDir = findSiteDir();
	const glob = findPagefindGlob();

	if (!siteDir) {
		console.error(
			`[search:index] Could not find static output directory. Tried: ${siteDirCandidates.join(", ")}`
		);
		process.exit(1);
	}

	console.info(`[search:index] Building Pagefind index from: ${siteDir}`);
	console.info(`[search:index] Using Pagefind glob: ${glob}`);
	await runPagefind(siteDir, glob);
	const synced = syncPagefindForDev(siteDir);
	if (synced) {
		console.info("[search:index] Synced Pagefind assets to static/pagefind for local development.");
	}
	console.info("[search:index] Pagefind index generated successfully.");
}

await main().catch((error) => {
	console.error("[search:index] Failed to generate Pagefind index.");
	console.error(error);
	process.exit(1);
});
