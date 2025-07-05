import type { RollupOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" with { type: "json" };
const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

const options: RollupOptions = {
	input: "src/index.ts",

	output: [
		{
			file: pkg.main,
			format: "cjs",
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: "es",
			sourcemap: true,
		},
	],
	external: external,

	plugins: [nodeResolve(), typescript()],
};

export default options;
