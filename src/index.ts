import anymatch, { type Matcher } from "anymatch";
import type { Plugin } from "rollup";
import Obfuscator, { type ObfuscateOptions } from "js-confuser";
import {
	defaultExcludeMatcher,
	defaultIncludeMatcher,
	handleMatcher,
} from "./matcher";

export type { ObfuscateOptions };

export type Config = {
	/**
	 * (Array|String|RegExp|Function) String to be directly matched, string with glob patterns, regular expression test, function that takes the testString as an argument and returns a truthy value if it should be matched. default: ```[/\.(jsx?|tsx?|cjs|mjs)$/]```
	 * [See more](https://github.com/micromatch/anymatch)
	 
	@default [/\.(jsx?|tsx?|cjs|mjs)$/]
	*/
	include?: Matcher;
	/**
	 *  (Array|String|RegExp|Function) String to be directly matched, string with glob patterns, regular expression test, function that takes the testString as an argument and returns a truthy value if it should be matched. default: ```[/node_modules/, /\.nuxt/]```
	 * [See more](https://github.com/micromatch/anymatch)
	
	@default [/node_modules/]
	*/
	exclude?: Matcher;
	/**
	* Your js-confuser options
	* [See more options](https://js-confuser.com/docs/options)
	
	@default { target: "browser", preset: "low" }
	*/
	options?: ObfuscateOptions;
	/**
	* Used for debugging, Print out the path of matching or excluding files
	
	@default false
	*/
	debugger?: boolean;
};

const { obfuscate } = Obfuscator;

export default function obfuscatorPlugin(obOptions?: Config) {
	let { include, exclude, options }: Config = obOptions || {};

	const consoleLog = obOptions?.debugger ? console.log.bind(console) : () => {};

	options = options || {
		target: "browser",
		preset: "low",
	};

	const includeMatcher = include
		? handleMatcher(include)
		: defaultIncludeMatcher;

	const excludeMatcher = exclude
		? handleMatcher(exclude)
		: defaultExcludeMatcher;

	return {
		name: "rollup-plugin-javascript-confuser",
		enforce: "post",
		/*
		async transform(src: string, id: string) {
			if (anymatch(excludeMatcher, id, { dot: true })) {
				consoleLog("[::plugin-javascript-confuser]::exclude", id);
				return;
			}

			if (anymatch(includeMatcher, id)) {
				consoleLog("[::plugin-javascript-confuser]::include matched", id);

				const obfuscationResult = await obfuscate(src, options);

				const result = { code: obfuscationResult.code } as {
					code: string;
				};

				return result;
			}

			consoleLog("[::plugin-javascript-confuser]::not matched", id);
		},
		*/
		async generateBundle(bundleOptions, bundleObj) {
			for (const bundleKey of Object.keys(bundleObj)) {
				const bundle = bundleObj[bundleKey];
				if (bundle.type !== "chunk") {
					consoleLog(
						"[::plugin-javascript-confuser]::not chunk",
						bundle.fileName,
					);
					continue;
				}

				const id = bundle.facadeModuleId || bundle.preliminaryFileName;

				if (anymatch(excludeMatcher, id, { dot: true })) {
					consoleLog("[::plugin-javascript-confuser]::exclude", id);
					continue;
				}

				if (anymatch(includeMatcher, id)) {
					consoleLog("[::plugin-javascript-confuser]::include matched", id);

					const obfuscationResult = await obfuscate(bundle.code, options);

					const result = { code: obfuscationResult.code } as {
						code: string;
					};

					bundle.code = result.code;

					continue;
				}

				consoleLog("[::plugin-javascript-confuser]::not matched", id);
			}
		},
	} as Plugin;
}
