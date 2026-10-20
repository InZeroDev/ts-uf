import type { HasType, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, boolean, "boolean">;

export function isBoolean<T>(value: CheckT<T>): value is SmartExtract<T, boolean> {
	return typeof value === "boolean";
}

export function isNotBoolean<T>(value: CheckT<T>): value is Exclude<T, boolean> {
	return !isBoolean(value);
}

