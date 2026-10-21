import type { Func, KeyofTuple, Pop, ROList, RT, Tuple, Valid } from "@inzero/ts-ut";
import type { IsTuple, NormalizeIndex } from "@inzero/ts-ut/_internal";
import { getRandomInteger } from "~/math";
import { isNullish } from "~/other";

/**
 * Converts an index to a number.
 *
 * @example
 * ```ts
 * indexToNumber(0); // 1
 * ```
 */
export function indexToNumber(index: number): number {
	return index + 1;
}

/**
 * Converts a number to an index.
 *
 * @example
 * ```ts
 * numberToIndex(1); // 0
 * ```
 */
export function numberToIndex(number: number): number {
	return number - 1;
}

/**
 * Returns the first element of an array.
 */
export function getFirstElement<T extends ROList>(
	arr: T,
): T extends T ? (IsTuple<T> extends true ? T[0] : T[number] | undefined) : never {
	return arr[0] as Valid;
}

/**
 * Gets the last index of an array using its length.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 *
 * getLastIndex(arr.length); // 4
 * ```
 */
export function getLastIndex(length: number): number {
	return numberToIndex(length);
}

/**
 * Returns the last element of an array.
 */
export function getLastElement<T extends ROList>(
	arr: T,
): T extends T
	? IsTuple<T> extends true
		? T[NormalizeIndex<-1, T>]
		: T[number] | undefined
	: never {
	return arr[getLastIndex(arr.length)] as Valid;
}

/**
 * Gets the middle index of an array using its length.
 *
 * @example
 * ```ts
 * const oddArr = [0, 1, 2];
 * const evenArr = [0, 1, 2, 3];
 *
 * getMiddleIndex(oddArr.length); // 1
 * getMiddleIndex(evenArr.length); // 1
 * ```
 */
export function getMiddleIndex(length: number): number {
	return numberToIndex(Math.floor(length / 2));
}

/**
 * Returns the middle element of an array.
 */
export function getMiddleElement<T extends ROList>(
	arr: T,
): T extends T ? (IsTuple<T> extends true ? T[GetMiddleIndex<T>] : T[number] | undefined) : never {
	return arr[getMiddleIndex(arr.length)] as Valid;
}

type GetMiddleIndex<T extends ROList> = T extends T ? _GetMiddleIndex<T> : never;
type _GetMiddleIndex<
	T extends ROList,
	Left extends ROList = [],
	Right extends ROList = [],
> = T extends readonly [unknown, ...infer Rest]
	? Left["length"] extends Right["length"]
		? _GetMiddleIndex<Rest, Left, [...Right, any]>
		: _GetMiddleIndex<Rest, [...Left, any], Right>
	: Left["length"] extends Right["length"]
		? Pop<Left>["length"]
		: Left["length"];

/**
 * Gets the index range of an array using its length.
 *
 * @example
 * ```ts
 * const arr = [0, 1, 2, 3, 4];;
 * getIndexRange(arr.length); // [0, 4]
 * ```
 */
export function getIndexRange(length: number): [start: number, end: number] {
	return [0, length - 1];
}

/**
 * Gets the signed index range of an array using its length.
 *
 * @example
 * ```ts
 * const arr = [0, 1, 2, 3, 4];;
 * getSignedIndexRange(arr.length); // [-5, 4]
 * ```
 */
export function getSignedIndexRange(length: number): [start: number, end: number] {
	return [-length, length - 1];
}

/**
 * Creates an array of the given length and value.
 *
 * @example
 * ```ts
 * createArray(5, (index) => index); // [0, 1, 2, 3, 4]
 * ```
 */
export function createArray<L extends number, const R>(
	length: L,
	value: Func<[index: number], R>,
): Tuple<L, R> {
	return Array.from({ length }, (_, index) => value(index)) as Valid;
}

/**
 * Creates an array of the given length with zero-based indices.
 *
 * @example
 * ```ts
 * cons arr = [img1, img2, img3];
 * const indexes = getZeroBasedIndices(arr.length); // [0, 1, 2]
 * ```
 */
export function getZeroBasedIndices(length: number): number[] {
	return createArray(length, (index) => index);
}

/**
 * Creates an array of the given length with one-based indices.
 *
 * @example
 * ```ts
 * cons arr = [img1, img2, img3];
 * const indexes = getOneBasedIndices(arr.length); // [1, 2, 3]
 * ```
 */
export function getOneBasedIndices(length: number): number[] {
	return createArray(length, indexToNumber);
}

/**
 * Gets a random index from an array using its length.
 */
export function getRandomIndex(length: number): number {
	return getRandomInteger(0, numberToIndex(length));
}

/**
 * Gets a random element from an array.
 */
export function getRandomElement<T extends ROList>(arr: T): T extends T ? T[number] | (IsTuple<T> extends true ? never : undefined) : never {
	return arr[getRandomIndex(arr.length)] as Valid;
}

/**
 * Maps a function over an array, ignoring `undefined` and `null` values.
 * 
 * @example
 * ```ts
 * const arr = [1, null, 3];
 * 
 * mapOnDefined(arr, (value) => value * 2); // [2, null, 6]
 * ```
 */
export function mapOnDefined<
	T extends ROList,
	const F extends Func<[value: Exclude<T[number], undefined | null>]>,
>(arr: T, func: F): (RT<F> | Extract<T[number], undefined | null>)[] {
	return arr.map((value) => (isNullish(value) ? value : func(value as Valid)))
};

/**
 * Returns an array with unique elements.
 * 
 * @example
 * ```ts
 * const arr = ["foo", "foo", "bar"];
 * const uniqueArr = toUniqueArray(arr); // ["foo", "bar"]
 * ```
 */
export function toUniqueArray<T extends ROList>(arr: T): T[number][] {
	return [...new Set(arr)];
}
