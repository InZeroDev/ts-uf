import type { _CheckT, SmartExtract } from "../_internal";

type CheckT<T> = _CheckT<T, boolean>;

/**
 * Checks whether a value is a boolean.
 *
 * @example
 * function foo(value: boolean | { a: boolean; b: boolean }) {
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
 * function foo(value: boolean | { a: boolean; b: boolean }) {
 *   if (isNotBoolean(value)) {
 *     value; // { a: boolean, b: boolean }
 *   }
 * }
 */
export function isNotBoolean<T>(value: CheckT<T>): value is Exclude<T, boolean> {
	return !isBoolean(value);
}

/**
 * Checks whether a value is `true`.
 */
export function isTrue<T>(value: CheckT<T>): value is SmartExtract<T, true> {
	return value === true;
}

/**
 * Checks whether a value is not `true`.
 */
export function isNotTrue<T>(value: CheckT<T>): value is Exclude<T, true> {
	return value !== true;
}

/**
 * Checks whether a value is `false`.
 */
export function isFalse<T>(value: CheckT<T>): value is SmartExtract<T, false> {
	return value === false;
}

/**
 * Checks whether a value is `false`.
 */
export function isNotFalse<T>(value: CheckT<T>): value is Exclude<T, false> {
	return value !== false;
}

/**
 * Checks whether a value is truthy.
 */
export function isTruthy(value: unknown): boolean {
	return Boolean(value);
}

/**
 * Checks whether a value is falsy.
 */
export function isFalsy(value: unknown): boolean {
	return !isTruthy(value);
}
