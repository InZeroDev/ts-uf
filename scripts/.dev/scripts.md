# Scripts

## genDocs

Converts JSDoc comments in the source code to `.mdx` files by category.

### settings doc

To customize how the docs are generated, you can add a JSDoc with a `@settingsDoc` tag.

Available settings:

```ts
/**
 * @settingsDoc
 * @before <add-this-before-everything>
 * @afterShape <add-this-after-the-shape>
 */
```

These settings can use the following syntax:

```ts
/**
 * @settingsDoc
 * @afterShape $T{<typeName>}{<modifier>}
 *
 * Available modifiers:
 *
 * - `I`: Tells the generator that this type is imported.
 * - `<relativePath>` Tells the generator that this type is located in a different file.
 *
 * No modifiers means that the type is defined in the same file.
 */
```

Example:

```ts
import type { RORange } from "@inzero/ts-ut";

/**
 * @settingsDoc
 * @afterShape $T{RORange}{I}
 * $T{InclusiveMinMax}
 */
/**
 * MAIN DOC
 */
function isInRange(value: number, range: RORange, inclusive: InclusiveMinMax = {}): boolean;

type InclusiveMinMax = {
	inclusiveMin?: boolean;
	inclusiveMax?: boolean;
};
```
