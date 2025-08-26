import { glob } from "glob";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { resolve } from "path";

async function validatePosts() {
	console.log("🔍 Validating blog posts...");

	const postFiles = await glob("src/posts/**/index.md");
	let hasErrors = false;

	for (const file of postFiles) {
		try {
			const content = await readFile(resolve(file), "utf-8");
			const parsed = matter(content);

			// Check required fields
			const requiredFields = ["title", "description", "categories", "date", "published"];
			const missing = requiredFields.filter((field) => !parsed.data[field]);

			if (missing.length > 0) {
				console.error(`❌ ${file}: Missing required fields: ${missing.join(", ")}`);
				hasErrors = true;
			}

			// Validate categories array
			if (parsed.data.categories && !Array.isArray(parsed.data.categories)) {
				console.error(`❌ ${file}: Categories must be an array`);
				hasErrors = true;
			}

			// Validate date format
			if (parsed.data.date && isNaN(new Date(parsed.data.date).getTime())) {
				console.error(`❌ ${file}: Invalid date format`);
				hasErrors = true;
			}

			console.log(`✅ ${file}: Valid`);
		} catch (error) {
			console.error(`❌ ${file}: YAML parsing error - ${error.message}`);
			hasErrors = true;
		}
	}

	if (hasErrors) {
		console.log("\n💡 Common fixes:");
		console.log("- Use spaces (not tabs) for YAML indentation");
		console.log("- Ensure all required fields are present");
		console.log("- Check date format (YYYY-MM-DD)");
		console.log("- Verify categories is an array with proper indentation");
		process.exit(1);
	}

	console.log(`\n✅ All ${postFiles.length} posts are valid!`);
}

validatePosts().catch(console.error);
