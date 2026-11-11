import type { Dict, DictKey, Entries } from "@inzero/ts-ut/dict";
import type { Valid } from "@inzero/ts-ut/other";

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
export function getEntries<T extends Dict>(obj: T): Entries<T> {
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
