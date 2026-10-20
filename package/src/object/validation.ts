import type { AreEqual, Dict, IsAny, IsUnknown, SmartExtract } from "@inzero/ts-ut";
import type { _CheckT } from "~/_internal";
import { isNotArray } from "~/array/validation";

type CheckT<T> = _CheckT<T, Dict, "object">;
type RemoveEmptyDict<T> = T extends T ? (AreEqual<T, {}> extends false ? T : never) : never;

export function isObject<T>(value: CheckT<T>): value is SmartExtract<T, Dict> {
	return typeof value === "object" && value !== null && isNotArray(value);
}

export function isNotObject<T>(value: CheckT<T>): value is Exclude<T, Dict> {
	return !isObject(value);
}

export function isEmptyObject<T>(value: CheckT<T>): value is Extract<{}, T> {
	return isObject(value) && Object.keys(value).length === 0;
}

export function isNonEmptyObject<T>(
	value: CheckT<T>,
): value is IsUnknown<T> | IsAny<T> extends false
	? RemoveEmptyDict<Extract<T, Dict>>
	: Extract<Dict, T> {
	return isObject(value) && Object.keys(value).length > 0;
}
