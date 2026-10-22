import type { IsNever, Valid } from "@inzero/ts-ut/other";
import type { Suggest } from "@inzero/ts-ut/string";
import type { Dict, KeyofDeep, DictKey } from "@inzero/ts-ut/dict";
import type { ROList } from "@inzero/ts-ut/list";

import { isNotObject } from "./validation";
import type { IsKnownDict, IsKnownKey } from "./_internal";

// Temporary type until GetDeep supports a parameter that let you decide
// whether to return undefined when one of the parents is possibly undefined.
type GetDeep<T extends Dict | ROList, K extends KeyofDeep<T>> = T extends T
	? K extends K
		? Next<K> extends [infer N extends string, infer R]
			? _GetDeep<T, N, R>
			: never
		: never
	: never;
type _GetDeep<T extends Dict | ROList, N extends string, R> = {
	[P in keyof T]: P extends N
		? IsNever<R> extends true
			? T[P]
			: // @ts-expect-error
				GetDeep<T[P], R>
		: never;
} extends infer R
	? R extends ROList
		? R[number]
		: R[keyof R]
	: never;
type Next<K extends string> = K extends `${infer N extends string}.${infer R extends string}`
	? [N, R]
	: [K, never];

/* -------------------------------------------------------------------------- */

/**
 * Gets a deeply nested value from an object using a dot-separated key.
 *
 * @example
 * const data = { a: { b: { c: 4 } } };
 *
 * getDeep(data, "a.b"); // { c: 4 }
 * getDeep(data, "a.b.c"); // 4
 */
export function getDeep<T extends Dict, K extends KeyofDeep<T>>(
	obj: IsKnownDict<T> extends true ? T : never,
	key: IsKnownKey<K> extends true ? K : never,
): GetDeep<T, K>;
/**
 * Gets a deeply nested value from an object using a dot-separated key.
 *
 * @example
 * const data = { a: { b: { c: 4 } } };
 *
 * getDeep(data, "a.b"); // { c: 4 }
 * getDeep(data, "a.b.c"); // 4
 */
export function getDeep(obj: Dict, key: string): unknown;
export function getDeep(obj: Dict, key: string): unknown {
	return key.split(".").reduce((acc, key) => (acc as any)?.[key], obj) as Valid;
}

/**
 * Sets a deeply nested value in an object using a dot-separated key.
 *
 * @example
 * const data = { a: 1, b: { c: 4 } };
 *
 * setDeep(cloneDeep(data), "b.c", 47); // { a: 1, b: { c: 47 } }
 * setDeep(cloneDeep(data), "b.p", "new"); // { a: 1, b: { c: 4, p: "new" } }
 *
 * setDeep(cloneDeep(data), "a.y", "new"); // Error: "a" is not an object.
 */
export function setDeep<T extends Dict, K extends Suggest<KeyofDeep<T>>, V>(
	obj: T,
	key: K,
	value: V,
): void {
	const keys = key.split(".");
	const lastKey = keys.pop();
	if (lastKey === undefined) throw new Error("Invalid key");

	const lastObj = keys.reduce((acc, currKey, ind) => {
		const currValue = (acc as any)?.[currKey];
		if (isNotObject(currValue)) {
			const invalidKey = keys.slice(0, ind + 1).join(".");
			throw new Error(`${invalidKey} is not an object.`);
		}
		return currValue;
	}, obj) as Dict;
	lastObj[lastKey] = value;
}

/**
 * Returns `Object.keys(obj)` with a narrowed type.
 *
 * @example
 * const myDict = { a: 1, b: 2 };
 *
 * Object.keys(myDict); // string[]
 * getKeys(myDict); // ("a" | "b")[]
 */
export function getKeys<T extends Dict>(obj: T): T extends T ? (keyof T)[] : never {
	return Object.keys(obj) as Valid;
}

/**
 * Returns `Object.values(obj)`.
 */
export function getValues<T extends Dict>(obj: T): T extends T ? T[keyof T][] : never {
	return Object.values(obj) as Valid;
}

/**
 * Returns `Object.entries(obj)` with a narrowed type.
 *
 * @example
 * const myDict = { a: 1, b: 2 };
 *
 * Object.entries(myDict); // [string, number][]
 * getEntries(myDict); // ["a" | "b", number][]
 */
export function getEntries<T extends Dict>(obj: T): T extends T ? [keyof T, T[keyof T]][] : never {
	return Object.entries(obj) as Valid;
}

/**
 * Returns `Object.fromEntries(entries)` with a narrowed type.
 *
 * @example
 * const myEntries = getEntries(...); // ["a" | "b", number][]
 *
 * Object.fromEntries(myEntries); // { [x: string]: number }
 * fromEntries(myEntries); // { a: number, b: number }
 */
export function fromEntries<K extends DictKey, V>(entries: [K, V][]): Dict<K, V> {
	return Object.fromEntries(entries) as Valid;
}
