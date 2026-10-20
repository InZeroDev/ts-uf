import type { ROList, SmartExtract } from "@inzero/ts-ut";

export function isOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is SmartExtract<T, L[number]> {
	return list.includes(value as any);
}

export function isNotOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is Exclude<T, L[number]> {
	return !isOneOf(value, list);
}
