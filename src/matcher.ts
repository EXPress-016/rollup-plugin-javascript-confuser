import { resolve } from "node:path";
import type { Matcher } from "anymatch";

export const defaultIncludeMatcher = [/\.(jsx?|tsx?|cjs|mjs)$/];
export const defaultExcludeMatcher = [/node_modules/];

export function handleMatcher(matcher: Matcher) {
	const matcherA = Array.isArray(matcher) ? matcher : [matcher];
	return matcherA.map((matcher) => {
		if (typeof matcher !== "string") return matcher;

		return resolve(".", matcher).replace(/\\/g, "/");
	});
}
