import type { SmartExtract } from "@inzero/ts-ut/other";
import type { _CheckT } from "../_internal";

type CheckT<T> = _CheckT<T, boolean>;

/**
 * Checks whether a value is a boolean.
 *
 * @example
 * function foo(value: boolean | { a: boolean, b: boolean }) {
 *   if (isBoolean(value)) {
 *     value; // boolean
 *   }
 * }
 */
export function isBoolean<T>(value: CheckT<T>): value is SmartExtract<T, boolean> {
	return typeof value === "boolean";
}

/**
 * Checks whether a value is not a boolean.
 *
 * @example
 * function foo(value: boolean | { a: boolean, b: boolean }) {
 *   if (isNotBoolean(value)) {
 *     value; // { a: boolean, b: boolean }
 *   }
 * }
 */
export function isNotBoolean<T>(value: CheckT<T>): value is Exclude<T, boolean> {
	return !isBoolean(value);
}
