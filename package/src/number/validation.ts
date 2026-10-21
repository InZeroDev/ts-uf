import type { HasType, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, number, "number">;

/**
 * Checks whether a value is a number.
 *
 * @example
 * ```ts
 * function foo(value: number | number[]) {
 *   if (isNumber(value)) {
 *     value; // number
 *   }
 * }
 * ```
 */
export function isNumber<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return typeof value === "number";
}

/**
 * Checks whether a value is not a number.
 *
 * @example
 * ```ts
 * function foo(value: number | number[]) {
 *   if (isNotNumber(value)) {
 *     value; // number[]
 *   }
 * }
 * ```
 */
export function isNotNumber<T>(value: CheckT<T>): value is Exclude<T, number> {
	return !isNumber(value);
}

/**
 * Checks whether a value is an integer.
 *
 * @example
 * ```ts
 * isInteger(1); // true
 * isInteger(1.1); // false
 * ```
 */
export function isInteger<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return Number.isInteger(value);
}

/**
 * Checks whether a value is a float.
 *
 * @example
 * ```ts
 * isFloat(1); // false
 * isFloat(1.1); // true
 * ```
 */
export function isFloat<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return isNumber(value) && isFinite(value) && !Number.isInteger(value);
}
