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
