import type { HasType, IsAny, IsUnknown, List, ROList, SmartExtract } from "@inzero/ts-ut";
import type { MatchRO } from "@inzero/ts-ut/_internal";
import { getIndexRange, numberToIndex } from "./utils";
import type { _CheckT } from "~/_internal";
import { isInRange } from "~/math/validation";

type CheckT<T> = _CheckT<T, ROList, "array">;

export function isArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false ? SmartExtract<T, ROList> : Extract<List, T> {
	return Array.isArray(value);
}

export function isNotArray<T>(value: CheckT<T>): value is Exclude<T, ROList> {
	return !isArray(value);
}

export function isEmptyArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false ? Extract<T, readonly []> : Extract<[], T> {
	return isArray(value) && value.length === 0;
}

export function isNonEmptyArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? Exclude<Extract<T, ROList>, []>
	: Extract<List, T> {
	return isArray(value) && value.length > 0;
}

export function isSingletonArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? T extends ROList
		? number extends T["length"]
			? Extract<MatchRO<[T[number]], T>, T>
			: Extract<T, readonly [unknown]>
		: never
	: Extract<[unknown], T> {
	return isArray(value) && value.length === 1;
}

export function isNonSingletonArray<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? Exclude<Extract<T, ROList>, [unknown]>
	: Extract<List, T> {
	return isArray(value) && value.length !== 1;
}

export function isFirstIndex(index: number): boolean {
	return index === 0;
}

export function isNotFirstIndex(index: number): boolean {
	return !isFirstIndex(index);
}

export function isLastIndex(index: number, length: number): boolean {
	return index === numberToIndex(length);
}

export function isNotLastIndex(index: number, length: number): boolean {
	return !isLastIndex(index, length);
}

export function hasIndex(index: number, length: number): boolean {
	return isInRange(index, getIndexRange(length))
}

export function lacksIndex(index: number, length: number): boolean {
	return !hasIndex(index, length)
}
