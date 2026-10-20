import type { Func, RT, Tuple, Valid } from "@inzero/ts-ut";

export function indexToNumber(index: number): number {
	return index + 1;
}

export function numberToIndex(number: number): number {
	return number - 1;
}

export function getLastIndex(length: number): number {
	return numberToIndex(length);
}

export function getMiddleIndex(length: number): number {
	return numberToIndex(Math.floor(length / 2));
}

export function getIndexRange(length: number): [start: number, end: number] {
	return [0, length - 1];
}

export function getSignedIndexRange(length: number): [start: number, end: number] {
	return [-length, length - 1];
}

export function createArray<const L extends number, const F extends Func<[index: number]>>(
	length: L,
	value: F,
): Tuple<L, RT<F>> {
	return Array.from({ length }, (_, index) => value(index)) as Valid;
}

export function getZeroBasedIndices(length: number): number[] {
	return createArray(length, (index) => index);
}

export function getOneBasedIndices(length: number): number[] {
	return createArray(length, indexToNumber);
}
