import type { Matcher } from "anymatch";
import anymatch from "anymatch";
import { resolve } from "node:path";

export const defaultIncludeMatcher = [/\.(jsx?|tsx?|cjs|mjs)$/];
export const defaultExcludeMatcher = [/node_modules/, /\.nuxt/];

export function handleMatcher(matcher: Matcher) {
	const matcherA = Array.isArray(matcher) ? matcher : [matcher];
    return matcherA.map((matcher) => {
        if (typeof matcher !== 'string') return matcher

        return resolve('.', matcher).replace(/\\/g, "/")
    })

	// return matcherA.map((matcher: Matcher): Matcher => {
	// 	if (typeof matcher !== "string") {
	// 		return matcher;
	// 	}
		// return resolve(".", matcher).replace(/\\/g, "/");
	// });

}

