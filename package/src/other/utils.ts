import type { ROList } from "@inzero/ts-ut";
import type { Func } from "@inzero/ts-ut/func";
import type { Valid } from "@inzero/ts-ut/other";
import { isNotArray } from "../array";
import { isFunction } from "../function";
import { isOneOf } from "./validation";

/**
 * Maps a value to another value if it is not `undefined` or `null`.
 *
 * @example
 * // Instead of:
 * function getDescription(func: FunctionDeclaration) {
 *   const description = func.getJsDocs().at(-1)?.getDescription();
 *   if (description === undefined) return; // Notice that we used `description === undefined` and not `!description`.
 *   return convertJsDocLinks(description);
 * }
 * // You can do:
 * function getDescription(func: FunctionDeclaration) {
 *   return mapDefined(func.getJsDocs().at(-1)?.getDescription(), convertJSDocLinks);
 * }
 */
export function mapDefined<T, const R>(
	value: T,
	fn: Func<[value: Exclude<T, undefined | null>], R>,
): R | Extract<T, undefined | null> {
	return isOneOf(value, [undefined, null]) ? (value as Valid) : fn(value as Valid);
}

/**
 * Converts a value to an array if it's not already one.
 * In other words, it converts a value of type `T | T[]` to `T[]`.
 *
 * @example
 * function foo(value: string | string[]) {
 *   const values = toArray(value); // string[]
 * }
 */
export function toArray<T>(value: T | T[]): T[] {
	if (isNotArray(value)) return [value];
	else return value as Valid;
}

/**
 * Extracts a value by invoking it if it's a function, otherwise returns it unchanged.
 * In other words, it converts a value of type `T | ((...args: A) => R)` to `T | R`.
 * 
 * @example
 * function foo(valueOrFunc: string | (() => string)) {
 *   const value = unwrapValue(valueOrFunc); // string
 * }
 */
export function unwrapValue<T, A extends ROList, R = never>(
	value: T | Func<A, R>,
	...args: A
): T | R {
	if (isFunction(value)) return value(...args);
	else return value;
}
