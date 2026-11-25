import type { Valid } from "@inzero/ts-ut/other";
import type { Dict, GetDeep, KeysDeep } from "@inzero/ts-ut/dict";
import { isNotObject } from "./validation";
import type { IsKnownDict, IsKnownKey } from "./_internal";

/**
 * @settingsDoc
 * @before Used when `obj` and `key` are both known.
 */
/**
 * Gets a deeply nested value from an object using a dot-separated key.
 *
 * @example
 * const data = { a: { b: { c: 4 } } };
 *
 * getDeep(data, "a.b"); // { c: 4 }
 * getDeep(data, "a.b.c"); // 4
 */
export function getDeep<T extends Dict, K extends KeysDeep<T>>(
	obj: IsKnownDict<T> extends true ? T : never,
	key: IsKnownKey<K> extends true ? K : never,
): GetDeep<T, K, true>;

/**
 * @settingsDoc
 * @before Used when neither `obj` nor `key` are known.
 */
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
	return key.split(".").reduce((acc, key) => (acc as Valid)?.[key], obj) as Valid;
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
export function setDeep(obj: Dict, key: string, value: unknown): void {
	const keys = key.split(".");

	const lastKey = keys.pop();
	if (lastKey === undefined) throw new Error("Invalid key");

	const lastObj = keys.reduce((acc, key, ind) => {
		acc[key] ??= {};
		const currValue = acc[key];
		if (isNotObject(currValue)) {
			const invalidKey = keys.slice(0, ind + 1).join(".");
			throw new Error(`${invalidKey} is not an object.`);
		}
		return currValue;
	}, obj);

	lastObj[lastKey] = value;
}
