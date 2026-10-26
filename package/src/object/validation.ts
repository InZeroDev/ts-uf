import type { AreEqual, IsAny, IsUnknown } from "@inzero/ts-ut/other";
import type { Dict } from "@inzero/ts-ut/dict";
import type { _CheckT, SmartExtract } from "../_internal";
import { isNotArray } from "../array/validation";

type CheckT<T> = _CheckT<T, Dict>;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type RemoveEmptyDict<T> = T extends T ? (AreEqual<T, {}> extends false ? T : never) : never;

/**
 * Checks whether a value is an object.
 *
 * @example
 * function foo(inclusive: boolean | { inclusiveMin: boolean, inclusiveMax: boolean }) {
 *   if (isObject(inclusive)) {
 *     inclusive; // { inclusiveMin: boolean, inclusiveMax: boolean }
 *   }
 * }
 */
export function isObject<T>(value: CheckT<T>): value is SmartExtract<T, Dict> {
	return typeof value === "object" && value !== null && isNotArray(value);
}

/**
 * Checks whether a value is not an object.
 *
 * @example
 * function foo(inclusive: boolean | { inclusiveMin: boolean, inclusiveMax: boolean }) {
 *   if (isNotObject(inclusive)) {
 *     inclusive; // boolean
 *   }
 * }
 */
export function isNotObject<T>(value: CheckT<T>): value is Exclude<T, Dict> {
	return !isObject(value);
}

/**
 * checks whether a value is an object with no keys.
 *
 * @example
 * isEmptyObject({}); // true
 * isEmptyObject({ a: 1 }); // false
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function isEmptyObject<T>(value: CheckT<T>): value is Extract<{}, T> {
	return isObject(value) && Object.keys(value).length === 0;
}

/**
 * Checks whether a value is an object with at least one key.
 *
 * @example
 * isNonEmptyObject({}); // false
 * isNonEmptyObject({ a: 1 }); // true
 */
export function isNonEmptyObject<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? RemoveEmptyDict<Extract<T, Dict>>
	: Extract<Dict, T> {
	return isObject(value) && Object.keys(value).length > 0;
}
