import type { ROList } from "@inzero/ts-ut";
import type { Func } from "@inzero/ts-ut/func";
import type { Valid } from "@inzero/ts-ut/other";
import { isNotArray } from "../array";
import { isFunction } from "../function";
import { getRandomFloat, isNegative, isNonPositive } from "../math";
import { isFloat } from "../number";
import { ensureRegexFlags, regexFlag } from "../regex";
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

/**
 * Finds the nth-to-last match of a regex in a string.
 *
 * @throws Throws a {@link RangeError} if `n` is not a positive integer.
 *
 * @example
 * findLastMatch("a1 b2 c3", /\d/); // [ '3', index: 7, input: 'a1 b2 c3', groups: undefined ]
 */
export function findLastMatch(input: string, regex: RegExp, n = 1): RegExpExecArray | undefined {
	if (isNonPositive(n) || isFloat(n)) throw new RangeError("n must be a positive integer.");

	const globalRegex = ensureRegexFlags(regex, regexFlag.global);
	globalRegex.lastIndex = 0;

	let currMatch;
	const matches: RegExpExecArray[] = [];

	while ((currMatch = globalRegex.exec(input))) matches.push(currMatch);

	return matches.at(-n);
}

/**
 * Selects a random item using the corresponding weights as selection probabilities.
 *
 * @remarks
 * - Items with larger weights are more likely to be selected.
 * - Items with missing weights will never be selected.
 * - Extra weights can return `undefined`.
 *
 * @example
 * weightedRandom([1,2,3], [1, 1, 8]); // 3 // there's 80% chance 3 is selected
 *
 * weightedRandom([1,2,3], []); // undefined
 * weightedRandom([1,2,3], [1, 1]); // 1 // 3 will never be selected
 * weightedRandom([1,2,3], [1, 1, 1, 3]) // 1 // there's a 50% chance an item is selected, and another 50% chance `undefined` is returned.
 */
export function weightedRandom<T>(items: ROList<T>, weights: ROList<number>): T | undefined {
	if (weights.some((weight) => isNaN(weight) || !isFinite(weight) || isNegative(weight)))
		throw new RangeError("Weights must be non-negative numbers.");

	const total = weights.reduce((a, b) => a + b, 0);
	let random = getRandomFloat(0, total);

	for (let i = 0; i < items.length; i++) {
		random -= weights[i]!;
		if (random < 0) return items[i]!;
	}

	return undefined;
}
