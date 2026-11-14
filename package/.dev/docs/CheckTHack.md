In the internal `_CheckT<T, Type>` utility type, you'll see what looks like a useless check `HasType<T, any>`:

```ts
export type _CheckT<T, Type> =
	HasType<T, any> extends true
		? IsUnknown<T> | IsAny<T> extends false
			? HasType<T, Type> extends true
				? T
				: Type
			: T
		: never;
```

This useless check fixes a very serious problem, and I myself don't know how or why it fixes it :)

Anyway, to produce the problem, use use the regular version:

```ts
type _CheckT<T, Type> = IsUnknown<T> | IsAny<T> extends false
	? HasType<T, Type> extends true
		? T
		: Type
	: T;
```

on a validation utility like this:

```ts
function isString<T>(value: _CheckT<T, string>): value is SmartExtract<T, string> {
	return typeof value === "string";
}
```

Now when you try to check a value that comes from a generic type parameter:

```ts
function foo<T extends Dict>(obj: T): void {
	const values = getValues(obj); // Values<T>[]
	for (const value of values) {
		value; // Values<T>
		isString(value); // Error:
		// Argument of type 'Values<T>' is not assignable to parameter of type 'string'.
		// Type 'unknown' is not assignable to type 'string'.
	}
}
```

You'll see that error, and by simply adding that useless check, the validation will now accept any value that has a type that comes from a generic type parameter

```ts
isString(123);
```

So it's not (I hope :) a hack that simply let's anything pass.
