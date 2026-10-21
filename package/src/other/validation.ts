import type { ROList, SmartExtract } from "@inzero/ts-ut";

/**
 * checks whether a value is one of the expected values.
 *
 * @example
 * ```ts
 * const colors = ["red", "green", "blue"] as const;
 *
 * function foo(color: string) {
 *   if (isOneOf(color, colors)) {
 *     color; // "red" | "green" | "blue"
 *   }
 * }
 * ```
 */
export function isOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is SmartExtract<T, L[number]> {
	return list.includes(value as any);
}

/**
 * Checks whether a value is not one of the expected values.
 *
 * @example
 * ```ts
 * type Action = "start" | "stop" | "pause";
 *
 * function foo(action: string) {
 *   if (isNotOneOf(action, ["stop", "pause"])) {
 *     startSomething();
 *     action; // "start"
 *   }
 * }
 * ```
 */
export function isNotOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is Exclude<T, L[number]> {
	return !isOneOf(value, list);
}

/**
 * Checks whether a value is nullish (`null | undefined`).
 */
export function isNullish<T>(value: T): value is SmartExtract<T, null | undefined> {
	return isUndefined(value) || isNull(value);
}

/**
 * Checks whether a value is `undefined`.
 */
export function isUndefined<T>(value: T): value is SmartExtract<T, undefined> {
	return value === undefined;
}

/**
 * Checks whether a value is `null`.
 */
export function isNull<T>(value: T): value is SmartExtract<T, null> {
	return value === null;
}

/**
 * Checks whether a value is not `undefined`.
 */
export function isNotUndefined<T>(value: T): value is Exclude<T, undefined> {
	return !isUndefined(value);
}

/**
 * Checks whether a value is not `null`.
 */
export function isNotNull<T>(value: T): value is Exclude<T, null> {
	return !isNull(value);
}

/**
 * Checks whether a value is neither `null` nor `undefined`.
 */
export function isNonNullish<T>(value: T): value is Exclude<T, null | undefined> {
	return !isNullish(value);
}
