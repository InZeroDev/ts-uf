import type { Dict, DictKey, Keyof, SmartExtract } from "@inzero/ts-ut";
import type { IsKnownDict, IsKnownKey } from "./_internal";

/**
 * Checks whether an object contains the given key.
 *
 * @remarks Narrows `obj` by filtering out all the versions that don't contain the given key.
 *
 * @example
 * ```ts
 * type Data = { start?: number, step?: number } & ({ end: number } | { count: number });
 *
 * function repeat(cb: Func, data: Data) {
 *   if (hasKey(data, "count")) {
 *     data; // { start?: number, step?: number, count: number }
 *   } else {
 *     data; // { start?: number, step?: number, end: number }
 *   }
 * }
 * ```
 */
export function hasKey<const T extends Dict, const K extends DictKey>(
	obj: IsKnownDict<T> extends true ? T : never,
	key: IsKnownKey<K> extends true ? K : never,
): obj is SmartExtract<typeof obj, Dict<K>>;
/**
 * Checks whether an object contains the given key.
 *
 * @remarks Narrows `key` to `keyof obj` when the check succeeds.
 *
 * @example
 * ```ts
 * const presets = { a: 1, b: 2 };
 *
 * function foo(preset: string) {
 *   if (hasKey(presets, preset)) {
 *     preset; // "a" | "b"
 *     presets[preset]; // number
 *   }
 * }
 * ```
 */
export function hasKey<const T extends Dict, const K extends DictKey>(
	obj: IsKnownDict<T> extends true ? T : never,
	key: IsKnownKey<K> extends false ? K : never,
): key is SmartExtract<typeof key, Keyof<T>>;
/**
 * Checks whether an object contains the given key.
 *
 * @remarks Narrows `obj` to `typeof obj & Record<typeof key, unknown>` when the check succeeds.
 *
 * @example
 * ```ts
 * function foo(sizes: Record<string, number>) {
 *   if (hasKey(sizes, "small")) {
 *     sizes.small; // number
 *     sizes.medium; // number | undefined
 *   }
 * }
 * ```
 */
export function hasKey<const T extends Dict, const K extends DictKey>(
	obj: IsKnownDict<T> extends false ? T : never,
	key: IsKnownKey<K> extends true ? K : never,
): obj is typeof obj & Dict<K, T[keyof T]>;
/**
 * Checks whether an object contains the given key.
 */

export function hasKey(obj: Dict, key: DictKey): boolean;
export function hasKey(obj: Dict, key: DictKey): boolean {
	return key in obj;
}

/**
 * Checks whether an object lacks the given key.
 *
 * @remarks Narrows `obj` by filtering out all the versions that contain the given key.
 *
 * @example
 * ```ts
 * type Data = { start?: number, step?: number } & ({ end: number } | { count: number });
 *
 * function repeat(cb: Func, data: Data) {
 *   if (lacksKey(data, "count")) {
 *     data; // { start?: number, step?: number, end: number }
 *   } else {
 *     data; // { start?: number, step?: number, count: number }
 *   }
 * }
 * ```
 */
export function lacksKey<const T extends Dict, const K extends DictKey>(
	obj: IsKnownDict<T> extends true ? T : never,
	key: IsKnownKey<K> extends true ? K : never,
): obj is Exclude<typeof obj, Dict<K>>;
/**
 * Checks whether an object lacks the given key.
 */
export function lacksKey(obj: Dict, key: DictKey): boolean;
export function lacksKey(obj: Dict, key: DictKey): boolean {
	return !(key in obj);
}
