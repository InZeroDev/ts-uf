import type { Func, HasType, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";

type CheckT<T> = _CheckT<T, Func, "function">;

export function isFunction<T>(value: CheckT<T>): value is SmartExtract<T, Func> {
	return typeof value === "function";
}

export function isNotFunction<T>(value: CheckT<T>): value is Exclude<T, Func> {
	return !isFunction(value);
}
