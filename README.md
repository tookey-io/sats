# @tookey-io/sats

JavaScript library to operate with Sats with respect to [Ordinals Handbook](https://docs.ordinals.com/).
Created on pure TypeScript without ANY dependency — feel safe! 

```json
package.json:
{
  "dependencies": {},
}
```

- Compiles TypeScript code using both the `tsconfig.json` and `tsconfig.module.json` files.
- Formats TypeScript code using [Prettier](https://prettier.io).
- Lints TypeScript code using [ESLint](https://eslint.org).
- Runs unit tests using [AVA](https://github.com/avajs/ava).
- Generates code coverage reports using NYC.
- Generates HTML documentation using [TypeDoc](https://typedoc.org).
- Uses [Husky](https://github.com/typicode/husky) Git hooks and [Lint-staged](https://github.com/okonet/lint-staged) pre-commit hooks.

## Usage

1. Install as dependency to your NodeJS or Browser project: `npm install --save @tookey-io/sats` or `yarn add @tookey-io/sats`
2. Use :D

```typescript

import { Sat } from "@tookey-io/sats";

const sat = Sat.fromName("alerdenisov");

// 1892488848343776
console.log("alerdenisov sat #" + sat.n);

// 717982
console.log("alerdenisov sat mine height: " + sat.decimal.height.n);

// 98343776
console.log("alerdenisov sat mine offset: " + sat.decimal.offset);
```

For more examples navigate to [tests](/tree/main/src/tests) or documentation (not yet publish, but available with `npm run doc`)

## Contribution

Clone the repository:
```bash
git clone https://github.com/tookey-io/sats.git
```

Install the dependencies:

```bash
npm install
```

There are several scripts available to help you get started:

---

Compile the TypeScript code using both the `tsconfig.json` and `tsconfig.module.json` files.

```bash
npm run build
```

---

Formats the TypeScript code using Prettier and lints the code using ESLint, fixing any issues found.

```bash
npm run fix
```

---

Lints the TypeScript code using ESLint, checks the code formatting using Prettier, and runs the unit tests using AVA.

```bash
npm run test
```

---

Watches for changes in the TypeScript code and recompiles the code using `tsconfig.json`.

```bash
npm run watch:build
```

---

Watches for changes in the TypeScript code and re-runs the unit tests using AVA.

```bash
npm run watch:test
```

---

Generates an HTML report of the code coverage using NYC and opens the report in the browser.

```bash
npm run cov
```

---

Generates HTML documentation of the TypeScript code and opens the documentation in the browser.

```bash
npm run doc
```

---

The template uses [Husky](https://github.com/typicode/husky) and [Lint-staged](https://github.com/okonet/lint-staged) to run pre-commit hooks that ensure your code is formatted, linted, tested, and documented before committing.

---

For more information on available scripts, see the `Scripts` section of the `package.json` file.

## TODO

[*] Representation convertion
[ ] Rarity assesment
[ ] Exotic sats
[ ] Match the ranges

## License

This project is licensed under the MIT License.

## Acknowledgements

This project uses Prettier, ESLint, AVA, NYC, Husky, Lint-staged, TypeDoc. And highly inspired by [ord](https://github.com/ordinals/ord) implementation on Rust 
