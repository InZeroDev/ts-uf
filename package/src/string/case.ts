import type { Valid } from "@inzero/ts-ut";

export function capitalize<T extends string>(value: T): string extends T ? string : Capitalize<T> {
	return (value.charAt(0).toUpperCase() + value.slice(1)) as Valid;
}

export function uncapitalize<T extends string>(
	value: T,
): string extends T ? string : Uncapitalize<T> {
	return (value.charAt(0).toLowerCase() + value.slice(1)) as Valid;
}
