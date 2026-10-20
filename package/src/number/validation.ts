import type { HasType, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, number, "number">;

export function isNumber<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return typeof value === "number";
}

export function isNotNumber<T>(value: CheckT<T>): value is Exclude<T, number> {
	return !isNumber(value);
}

export function isInteger<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return Number.isInteger(value);
}

export function isFloat<T>(value: CheckT<T>): value is SmartExtract<T, number> {
	return isNumber(value) && isFinite(value) && !Number.isInteger(value);
}
