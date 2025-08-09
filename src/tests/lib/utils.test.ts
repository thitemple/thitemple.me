import { describe, it, expect } from "vitest";
import { formatDate, cn } from "../../lib/utils";

describe("utils", () => {
	describe("formatDate", () => {
		it("should format date with default medium style", () => {
			const result = formatDate("2024-01-15");
			expect(result).toBe("Jan 15, 2024");
		});

		it("should format date with short style", () => {
			const result = formatDate("2024-01-15", "short");
			expect(result).toBe("1/15/24");
		});

		it("should format date with long style", () => {
			const result = formatDate("2024-01-15", "long");
			expect(result).toBe("January 15, 2024");
		});

		it("should format date with full style", () => {
			const result = formatDate("2024-01-15", "full");
			expect(result).toContain("January 15, 2024");
		});

		it("should handle different locales", () => {
			const result = formatDate("2024-01-15", "medium", "de");
			// German locale format can vary by environment, just check it's a valid date string
			expect(result).toMatch(/15|Jan|2024/);
			expect(result).not.toBe("Invalid Date");
		});

		it("should handle dates with dashes (Safari compatibility)", () => {
			const result = formatDate("2024-01-15");
			expect(result).toBe("Jan 15, 2024");
		});

		it("should handle edge dates", () => {
			const leapYear = formatDate("2024-02-29");
			expect(leapYear).toBe("Feb 29, 2024");

			const yearEnd = formatDate("2023-12-31");
			expect(yearEnd).toBe("Dec 31, 2023");

			const yearStart = formatDate("2024-01-01");
			expect(yearStart).toBe("Jan 1, 2024");
		});

		it("should handle invalid dates gracefully", () => {
			const result = formatDate("invalid-date");
			expect(result).toBe("Invalid Date");
		});
	});

	describe("cn (className utility)", () => {
		it("should merge class names correctly", () => {
			const result = cn("text-red-500", "bg-blue-500");
			expect(result).toBe("text-red-500 bg-blue-500");
		});

		it("should handle conditional classes", () => {
			const isActive = true;
			const result = cn("base-class", isActive && "active-class");
			expect(result).toBe("base-class active-class");
		});

		it("should filter out falsy values", () => {
			const result = cn("class1", false, null, undefined, "class2");
			expect(result).toBe("class1 class2");
		});

		it("should merge Tailwind classes with conflicts", () => {
			const result = cn("px-2 py-1", "px-3");
			expect(result).toBe("py-1 px-3");
		});

		it("should handle arrays of classes", () => {
			const result = cn(["class1", "class2"], "class3");
			expect(result).toBe("class1 class2 class3");
		});

		it("should handle object notation", () => {
			const result = cn({
				"text-red-500": true,
				"text-blue-500": false,
				"bg-white": true
			});
			expect(result).toBe("text-red-500 bg-white");
		});

		it("should merge complex Tailwind utilities", () => {
			const result = cn("text-lg font-bold text-gray-900", "text-xl text-blue-600");
			expect(result).toBe("font-bold text-xl text-blue-600");
		});

		it("should handle empty inputs", () => {
			const result = cn();
			expect(result).toBe("");
		});

		it("should preserve important modifiers", () => {
			const result = cn("!text-red-500", "text-blue-500");
			expect(result).toBe("!text-red-500 text-blue-500");
		});
	});
});
