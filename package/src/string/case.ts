import type { Valid } from "@inzero/ts-ut";

/**
 * Capitalizes the first character of a string.
 *
 * @example
 * ```ts
 * capitalize("hello"); // "Hello"
 * ```
 */
export function capitalize<T extends string>(value: T): string extends T ? string : Capitalize<T> {
	return (value.charAt(0).toUpperCase() + value.slice(1)) as Valid;
}

/**
 * Uncapitalizes the first character of a string.
 *
 * @example
 * ```ts
 * uncapitalize("Hello"); // "hello"
 * ```
 */
export function uncapitalize<T extends string>(
	value: T,
): string extends T ? string : Uncapitalize<T> {
	return (value.charAt(0).toLowerCase() + value.slice(1)) as Valid;
}
