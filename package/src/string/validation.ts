import type { SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, string, "string">;

export function isString<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return typeof value === "string";
}

export function isNotString<T>(value: CheckT<T>): value is Exclude<T, string> {
	return !isString(value);
}

export function isEmptyString<T>(value: CheckT<T>): value is Extract<"", T> {
	return value === "";
}

export function isNonEmptyString<T>(
	value: CheckT<T>,
): value is Exclude<SmartExtract<T, string>, ""> {
	return isString(value) && value !== "";
}

export function isBlank<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return isString(value) && (value === "" || value.trim() === "");
}

export function isNonBlank<T>(value: CheckT<T>): value is SmartExtract<T, string> {
	return isString(value) && value.trim() !== "";
}
