import type { FirstChar, LastChar, Valid } from "@inzero/ts-ut";

/**
 * Returns the first character of a string.
 *
 * @example
 * ```ts
 * getFirstChar("hello"); // "h"
 * ```
 */
export function getFirstChar<T extends string>(value: T): string extends T ? string : FirstChar<T> {
	return value.charAt(0) as Valid;
}

/**
 * Returns the last character of a string.
 *
 * @example
 * ```ts
 * getLastChar("hello"); // "o"
 * ```
 */
export function getLastChar<T extends string>(value: T): string extends T ? string : LastChar<T> {
	return value.charAt(value.length - 1) as Valid;
}

/**
 * Checks whether the first character of a string is uppercase.
 *
 * @example
 * ```ts
 * firstCharIsUppercase("hello"); // false
 * firstCharIsUppercase("Hello"); // true
 * ```
 */
export function firstCharIsUppercase(value: string): boolean {
	const firstChar = getFirstChar(value);
	return firstChar === firstChar.toUpperCase();
}

/**
 * Checks whether the first character of a string is lowercase.
 *
 * @example
 * ```ts
 * firstCharIsLowercase("hello"); // true
 * firstCharIsLowercase("Hello"); // false
 * ```
 */
export function firstCharIsLowercase(value: string): boolean {
	const firstChar = getFirstChar(value);
	return firstChar === firstChar.toLowerCase();
}
