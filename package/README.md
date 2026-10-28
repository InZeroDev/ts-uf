# @inzero/ts-uf

`@inzero/ts-uf` is a collection of TypeScript utility functions.

## Installation

```npm
npm install @inzero/ts-uf
```

## Docs

Visit: https://ts-uf.vercel.app

## Quick Examples

```ts
import { isString } from "@inzero/ts-uf";

function foo(value: string | string[]) {
	if (isString(value)) {
		value; // string
	} else {
		value; // string[]
	}
}
```

```ts
import { hasKey } from "@inzero/ts-uf/object"; // You can use category-specific imports

const myObj = { a: 1, b: 2 };

function foo(key: string) {
	// Instead of:
	if (key in myObj) {
		key; // string
		myObj[key as keyof typeof myObj]; // number
	}

	// You can do:
	if (hasKey(myObj, key)) {
		key; // "a" | "b"
		myObj[key]; // number
		// no need for the annoying `as keyof typeof myObj`
	}
}
```

```ts
import { mapDefined } from "@inzero/ts-uf";

// Instead of:
function getDescription(func: FunctionDeclaration): string | undefined {
	const description = func.getJsDocs().at(-1)?.getDescription();
	if (description === undefined) return; // Notice that we used `description === undefined` and not `!description`.
	return convertJsDocLinks(description);
}
// You can do:
function getDescription(func: FunctionDeclaration): string | undefined {
	return mapDefined(func.getJsDocs().at(-1)?.getDescription(), convertJSDocLinks);
}
```
