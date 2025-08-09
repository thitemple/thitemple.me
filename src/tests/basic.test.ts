import { describe, it, expect } from "vitest";

describe("Basic Test Suite", () => {
	it("should pass a simple test", () => {
		expect(true).toBe(true);
	});

	it("should perform basic math", () => {
		expect(1 + 1).toBe(2);
	});

	it("should work with strings", () => {
		expect("hello" + " " + "world").toBe("hello world");
	});
});
