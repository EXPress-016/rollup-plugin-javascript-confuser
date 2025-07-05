# rollup-plugin-javascript-confuser

A Rollup Plugin for [js-confuser](https://npmjs.com/package/js-confuser). Forked from [vite-plugin-javascript-obfuscator](https://github.com/elmeet/vite-plugin-javascript-obfuscator).

## Installation

Install the package:

- npm `npm install --save-dev rollup-plugin-javascript-confuser`
- yarn `yarn add --dev rollup-plugin-javascript-confuser`
- pnpm `pnpm i rollup-plugin-javascript-confuser -D`

## Usage

### Example 1

rollup.config.mjs

```javascript
import obfuscatorPlugin from "rollup-plugin-javascript-confuser";

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    obfuscatorPlugin({
      options: {
        // your js-confuser options
        debugProtection: true,
        // ...  [See more options](https://js-confuser.com/docs/options)
      },
    })
    ]
};
```

### Example 2

vite.config.js

```javascript
import obfuscatorPlugin from "rollup-plugin-javascript-confuser";


export default {
  input: {
    a: 'foo.js',
    b: 'bar.js'
  }
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    obfuscatorPlugin({
      include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
      exclude: [/node_modules/],
      debugger: true,
      options: {
        // your js-confuser options
        debugProtection: true,
        // ...  [See more options](https://js-confuser.com/docs/options)
      },
    })
    ]
};
```

### Params

|      Name      |               Type                |                Default                |                              Description                               |
| :------------: | :-------------------------------: | :-----------------------------------: | :--------------------------------------------------------------------: |
| **`include`**  | `Array\|String\|RegExp\|Function` |    `[/\.(jsx?\|tsx?\|cjs\|mjs)$/]`    |                 Configure this option to include files                 |
| **`exclude`**  | `Array\|String\|RegExp\|Function` |     `[/node_modules/, /\.nuxt/]`      |                 Configure this option to exclude files                 |
| **`options`**  |             `Object`              | javascript-obfuscator default options |        [See more options](https://js-confuser.com/docs/options)        |
| **`debugger`** |             `Boolean`             |                `false`                | Used for debugging, Print out the path of matching or excluding files. |
