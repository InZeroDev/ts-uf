import type { HasType, IsAny, IsUnknown } from "@inzero/ts-ut";

// Note: HasType<T, any> isn't useless. See: .dev/docs/CheckTHack.md
export type _CheckT<T, Type> =
	HasType<T, any> extends true
		? IsUnknown<T> | IsAny<T> extends false
			? HasType<T, Type> extends true
				? T
				: Type
			: T
		: never;

export type Range = [start: number, end: number];
export type RORange = readonly [start: number, end: number];

export type SmartExtract<T, U> = IsUnknown<T> | IsAny<T> extends false
	? Extract<T, U>
	: Extract<U, T>;
