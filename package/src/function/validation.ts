import type { Func, HasType, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, Func, "function">;

/**
 * Checks whether a value is a function.
 *
 * @example
 * ```ts
 * function foo(valueOrFn: string | (() => string)) {
 *   const value = isFunction(valueOrFn) ? valueOrFn() : valueOrFn;
 * }
 */
export function isFunction<T>(value: CheckT<T>): value is SmartExtract<T, Func> {
	return typeof value === "function";
}

/**
 * Checks if the value is not a function.
 *
 * @example
 * ```ts
 * function foo(valueOrFn: string | (() => string)) {
 *   const value = isNotFunction(valueOrFn) ? valueOrFn : valueOrFn();
 * }
 * ```
 */
export function isNotFunction<T>(value: CheckT<T>): value is Exclude<T, Func> {
	return !isFunction(value);
}
