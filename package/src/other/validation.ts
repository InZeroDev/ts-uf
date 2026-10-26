/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { ROList } from "@inzero/ts-ut/list";
import type { SmartExtract, Valid } from "@inzero/ts-ut/other";
import type { Dict, NonEmptyTuple } from "@inzero/ts-ut";
import type { IsTuple, MatchRO } from "@inzero/ts-ut/_internal";
import type { AreEqual } from "@inzero/ts-ut/other";
import type { _CheckT } from "../_internal";
import { isArray, isEmptyArray, isNonEmptyArray } from "../array";
import { isEmptyObject, isNonEmptyObject, isObject } from "../object";
import { isEmptyString, isNonEmptyString, isString } from "../string";

/**
 * checks whether a value is one of the expected values.
 *
 * @example
 * const colors = ["red", "green", "blue"] as const;
 *
 * function foo(color: string) {
 *   if (isOneOf(color, colors)) {
 *     color; // "red" | "green" | "blue"
 *   }
 * }
 */
export function isOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is SmartExtract<T, L[number]> {
	return list.includes(value as Valid);
}

/**
 * Checks whether a value is not one of the expected values.
 *
 * @example
 * type Action = "start" | "stop" | "pause";
 *
 * function foo(action: string) {
 *   if (isNotOneOf(action, ["stop", "pause"])) {
 *     startSomething();
 *     action; // "start"
 *   }
 * }
 */
export function isNotOneOf<const T, const L extends ROList>(
	value: T,
	list: L,
): value is Exclude<T, L[number]> {
	return !isOneOf(value, list);
}

/**
 * Checks whether a value is nullish (`null | undefined`).
 */
export function isNullish<T>(value: T): value is SmartExtract<T, null | undefined> {
	return isUndefined(value) || isNull(value);
}

/**
 * Checks whether a value is `undefined`.
 */
export function isUndefined<T>(value: T): value is SmartExtract<T, undefined> {
	return value === undefined;
}

/**
 * Checks whether a value is `null`.
 */
export function isNull<T>(value: T): value is SmartExtract<T, null> {
	return value === null;
}

/**
 * Checks whether a value is not `undefined`.
 */
export function isNotUndefined<T>(value: T): value is Exclude<T, undefined> {
	return !isUndefined(value);
}

/**
 * Checks whether a value is not `null`.
 */
export function isNotNull<T>(value: T): value is Exclude<T, null> {
	return !isNull(value);
}

/**
 * Checks whether a value is neither `null` nor `undefined`.
 */
export function isNonNullish<T>(value: T): value is Exclude<T, null | undefined> {
	return !isNullish(value);
}

type IsEmptyRT<T> = T extends T
	? T extends string
		? Extract<"", T>
		: T extends Dict
			? Extract<{}, T>
			: T extends ROList
				? Extract<[], T>
				: never
	: never;
/**
 * A wrapper for {@link isEmptyString}, {@link isEmptyArray} and {@link isEmptyObject}.
 */
export function isEmpty<T>(value: _CheckT<T, string | ROList | Dict>): value is IsEmptyRT<T> {
	const v: unknown = value;
	if (isString(v)) return isEmptyString(v);
	if (isArray(v)) return isEmptyArray(v);
	if (isObject(v)) return isEmptyObject(v);
	throw new Error("Invalid type");
}

type IsNonEmptyRT<T> = T extends T
	? IsTuple<T> extends true
		? Exclude<T, []>
		: T extends ROList
			? Extract<MatchRO<NonEmptyTuple<T[number]>, T>, T>
			: T extends string
				? Exclude<T, "">
				: AreEqual<T, {}> extends true
					? never
					: T extends Dict
						? T
						: never
	: never;
/**
 * A wrapper for {@link isNonEmptyString}, {@link isNonEmptyArray} and {@link isNonEmptyObject}.
 */
export function isNonEmpty<T>(value: _CheckT<T, string | ROList | Dict>): value is IsNonEmptyRT<T> {
	const v: unknown = value;
	if (isArray(v)) return isNonEmptyArray(v);
	if (isString(v)) return isNonEmptyString(v);
	if (isObject(v)) return isNonEmptyObject(v);
	throw new Error("Invalid type");
}
