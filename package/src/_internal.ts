import type { HasType, IsAny, IsUnknown } from "@inzero/ts-ut";

export type _CheckT<T, Type> = IsUnknown<T> | IsAny<T> extends false
	? HasType<T, Type> extends true
		? T
		: Type
	: T;

export type Range = [start: number, end: number];
export type RORange = readonly [start: number, end: number];

export type SmartExtract<T, U> = IsUnknown<T> | IsAny<T> extends false
	? Extract<T, U>
	: Extract<U, T>;
