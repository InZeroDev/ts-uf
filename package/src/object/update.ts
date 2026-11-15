import type { Dict, DictKey, Func, Keys, LooseOmit, RT, Valid, Values } from "@inzero/ts-ut";
import { isNotOneOf } from "../other";
import { fromEntries, getEntries } from "./keys";

/**
 * Creates a new object by transforming each key-value pair using `fn`.
 *
 * @example
 * updateObject({ a: 1, b: 2 }, (key, value) => [key.toUpperCase(), value * 2]);
 * // { A: 2, B: 4 }
 */
export function updateObject<
	T extends Dict,
	F extends Func<[key: Keys<T>, value: Values<T>], [DictKey, unknown]>,
>(obj: T, fn: F): Dict<RT<F>["0"], RT<F>["1"]> {
	return fromEntries(getEntries(obj).map(([key, value]) => fn(key as Valid, value as Valid)));
}

/**
 * Creates a new object by transforming its keys using `fn`.
 *
 * @example
 * updateKeys({ a: 1, b: 2 }, (key) => key.toUpperCase());
 * // { A: 1, B: 2 }
 */
export function updateKeys<
	T extends Dict,
	F extends Func<[key: Keys<T>, value: Values<T>], DictKey>,
>(obj: T, fn: F): Dict<RT<F>, Values<T>> {
	return updateObject(obj, (key, value) => [fn(key, value), value]);
}

/**
 * Creates a new object by transforming its values using `fn`.
 *
 * @example
 * updateValues({ a: 1, b: 2 }, (value) => value * 2);
 * // { a: 2, b: 4 }
 */
export function updateValues<T extends Dict, F extends Func<[value: Values<T>, key: Keys<T>]>>(
	obj: T,
	fn: F,
): Dict<Keys<T>, RT<F>> {
	return updateObject(obj, (key, value) => [key, fn(value, key)]);
}

/**
 * Creates a new object by removing the specified keys.
 *
 * @example
 * deleteKeys({ a: 1, b: 2, c: 3 }, ["a", "c"]);
 * // { b: 2 }
 */
export function deleteKeys<T extends Dict, K extends DictKey>(
	obj: T,
	keys: readonly K[],
): LooseOmit<T, K> {
	return fromEntries(getEntries(obj).filter(([key]) => isNotOneOf(key, keys))) as Valid;
}
