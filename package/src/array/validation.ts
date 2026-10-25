import type { IsAny, IsUnknown, SmartExtract } from "@inzero/ts-ut/other";
import type { List, ROList } from "@inzero/ts-ut/list";
import type { NonEmptyTuple } from "@inzero/ts-ut/tuple";
import type { IsTuple, MatchRO } from "@inzero/ts-ut/_internal";
import { getIndexRange, numberToIndex } from "./utils";
import type { _CheckT } from "../_internal";
import { isInRange } from "../math";

type CheckT<T> = _CheckT<T, ROList>;

/**
 * Checks whether a value is an array.
 *
 * @example
 * function foo(value: string | string[]) {
 *   if (isArray(value)) {
 *     value; // string[]
 *   }
 * }
 */
export function isArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false ? SmartExtract<T, ROList> : Extract<List, T> {
	return Array.isArray(value);
}

/**
 * Checks whether a value is not an array.
 *
 * @example
 * function foo(value: string | string[]) {
 *   if (isNotArray(value)) {
 *     value; // string
 *   }
 * }
 */
export function isNotArray<T>(value: CheckT<T>): value is Exclude<T, ROList> {
	return !isArray(value);
}

/**
 * Checks whether a value is an empty array.
 *
 * @example
 * function foo(value: string[]) {
 *   if (isEmptyArray(value)) {
 *     value; // []
 *   }
 * }
 */
export function isEmptyArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false ? Extract<T, readonly []> : Extract<[], T> {
	return isArray(value) && value.length === 0;
}

/**
 * Checks whether a value is a non-empty array.
 *
 * @example
 * function foo(value: string[]) {
 *   if (isNonEmptyArray(value)) {
 *     value; // [string, ...string[]]
 *   }
 * }
 */
export function isNonEmptyArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? T extends T
		? IsTuple<T> extends true
			? Exclude<T, []>
			: T extends ROList
				? Extract<MatchRO<NonEmptyTuple<T[number]>, T>, T>
				: never
		: never
	: Extract<NonEmptyTuple<T>, T> {
	return isArray(value) && value.length > 0;
}

/**
 * Checks whether a value is an array with a single element.
 *
 * @example
 * function foo(value: string[]) {
 *   if (isSingletonArray(value)) {
 *     value; // [string]
 *   }
 * }
 */
export function isSingletonArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? T extends ROList
		? number extends T["length"]
			? Extract<MatchRO<[T[number]], T>, T>
			: Extract<T, readonly [unknown]>
		: never
	: Extract<[T], T> {
	return isArray(value) && value.length === 1;
}

/**
 * Checks whether a value is an array with no or more than one element.
 *
 * @example
 * isNonSingletonArray([]); // true
 * isNonSingletonArray([1]); // false
 * isNonSingletonArray([1, 2]); // true
 */
export function isNonSingletonArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? Exclude<Extract<T, ROList>, [unknown]>
	: Extract<List, T> {
	return isArray(value) && value.length !== 1;
}

/**
 * A readable way to check if `index === 0`.
 */
export function isFirstIndex(index: number): boolean {
	return index === 0;
}

/**
 * A readable way to check if `index !== 0`.
 */
export function isNotFirstIndex(index: number): boolean {
	return !isFirstIndex(index);
}

/**
 * Checks whether a given index is the last index of an array.
 * 
 * @example
 * const arr = [0, 1, 2, 3];
 *
 * isLastIndex(0, arr.length); // false;
 * isLastIndex(3, arr.length); // true;
 */
export function isLastIndex(index: number, length: number): boolean {
	return index === numberToIndex(length);
}

/**
 * Checks whether a given index is not the last index of an array.
 *
 * @example
 * const arr = [0, 1, 2, 3];
 *
 * isNotLastIndex(0, arr.length); // true;
 * isNotLastIndex(3, arr.length); // false;
 */
export function isNotLastIndex(index: number, length: number): boolean {
	return !isLastIndex(index, length);
}

/**
 * Checks whether a given index is within the range of an array.
 *
 * @example
 * const arr = [0, 1, 2, 3];
 *
 * hasIndex(-1, arr.length); // false;
 * hasIndex(0, arr.length); // true;
 * hasIndex(3, arr.length); // true;
 * hasIndex(4, arr.length); // false;
 */
export function hasIndex(index: number, length: number): boolean {
	return isInRange(index, getIndexRange(length));
}

/**
 * Checks whether a given index is not within the range of an array.
 *
 * @example
 * const arr = [0, 1, 2, 3];
 *
 * lacksIndex(-1, arr.length); // true;
 * lacksIndex(0, arr.length); // false;
 * lacksIndex(3, arr.length); // false;
 * lacksIndex(4, arr.length); // true;
 */
export function lacksIndex(index: number, length: number): boolean {
	return !hasIndex(index, length);
}
