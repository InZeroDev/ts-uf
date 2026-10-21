import type { SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, string, "string">;

/**
 * Checks whether a value is a string.
 *
 * @example
 * ```ts
 * function foo(value: string | string[]) {
 *   if (isString(value)) {
 *     value; // string
 *   }
 * }
 * ```
 */
export function isString<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return typeof value === "string";
}

/**
 * Checks whether a value is not a string.
 *
 * @example
 * ```ts
 * function foo(value: string | string[]) {
 *   if (isNotString(value)) {
 *     value; // string[]
 *   }
 * }
 * ```
 */
export function isNotString<T>(value: CheckT<T>): value is Exclude<T, string> {
	return !isString(value);
}

/**
 * Checks whether a value is an empty string.
 *
 * @example
 * ```ts
 * function foo(value: string) {
 *   if (isEmptyString(value)) {
 *     value; // ""
 *   }
 * }
 * ```
 */
export function isEmptyString<T>(value: CheckT<T>): value is Extract<"", T> {
	return value === "";
}

/**
 * Checks whether a value is a non-empty string.
 *
 * @example
 * ```ts
 * function foo(value: string | string[]) {
 *   if (isNonEmptyString(value)) {
 *     value; // type: string // value !== ""
 *   }
 * }
 * ```
 */
export function isNonEmptyString<T>(
	value: CheckT<T>,
): value is Exclude<SmartExtract<T, string>, ""> {
	return isString(value) && value !== "";
}

/**
 * Checks whether a value is a string that's empty or empty-like.
 *
 * @example
 * ```ts
 * isBlank(""); // true
 * isBlank("  "); // true
 * isBlank("\t\n"); // true
 *
 * isBlank("hello"); // false
 * isBlank("   h"); // false
 * ```
 */
export function isBlank<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return isString(value) && value.trim() === "";
}

/**
 * Checks whether a value is a string that's neither empty nor empty-like.
 *
 * @example
 * ```ts
 * isNonBlank(""); // false
 * isNonBlank("  "); // false
 * isNonBlank("\t\n"); // false
 *
 * isNonBlank("hello"); // true
 * isNonBlank("   h"); // true
 * ```
 */
export function isNonBlank<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return isString(value) && value.trim() !== "";
}
