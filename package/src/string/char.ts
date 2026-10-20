import type { FirstChar, LastChar, Valid } from "@inzero/ts-ut";

export function getFirstChar<T extends string>(value: T): string extends T ? string : FirstChar<T> {
	return value.charAt(0) as Valid;
}

export function getLastChar<T extends string>(value: T): string extends T ? string : LastChar<T> {
	return value.charAt(value.length - 1) as Valid;
}

export function firstCharIsUppercase(value: string): boolean {
	const firstChar = getFirstChar(value);
	return firstChar === firstChar.toUpperCase();
}

export function firstCharIsLowercase(value: string): boolean {
	const firstChar = getFirstChar(value);
	return firstChar === firstChar.toLowerCase();
}
