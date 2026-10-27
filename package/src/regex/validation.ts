import type { _CheckT, SmartExtract } from "../_internal";
import { isOneOf } from "../other";
import { isString } from "../string";
import { checkFlag, checkFlags } from "./_internal";
import { regexFlags } from "./constants";

type CheckT<T> = _CheckT<T, RegExp>;

/**
 * Checks whether a value is a regex.
 * 
 * @example
 * function deleteSubstring(target: string | RegExp) {
 *   if (isRegex(target)) {
 *     target; // RegExp
 *   } else {
 *     target; // string
 *   }
 * }
 */
export function isRegex<T>(value: CheckT<T>): value is SmartExtract<T, RegExp> {
	return value instanceof RegExp;
}

/**
 * Checks whether a value is not a regex.
 * 
 * @example
 * function deleteSubstring(target: string | RegExp) {
 *   if (isNotRegex(target)) {
 *     target; // string
 *   } else {
 *     target; // RegExp
 *   }
 * }
 */
export function isNotRegex<T>(value: CheckT<T>): value is Exclude<T, RegExp> {
	return !isRegex(value);
}

/**
 * Checks whether a character is a valid regex flag.
 * 
 * @example
 * isValidRegexFlag("g"); // true
 * isValidRegexFlag("gi"); // false
 */
export function isValidRegexFlag(flag: string): boolean {
	return isOneOf(flag, regexFlags);
}

/**
 * Checks whether a character is an invalid regex flag.
 * 
 * @example
 * isValidRegexFlag("g"); // false
 * isValidRegexFlag("gi"); // true
 */
export function isInvalidRegexFlag(flag: string): boolean {
	return !isValidRegexFlag(flag);
}

/**
 * Checks whether a string contains only valid, non-duplicated regex flags.
 * 
 * @remarks An empty string is considered valid.
 * 
 * @example
 * areValidRegexFlags("g"); // true
 * areValidRegexFlags("gi"); // true
 * areValidRegexFlags("gg"); // false
 * areValidRegexFlags("gn"); // false
 */
export function areValidRegexFlags(flags: string): boolean {
	const flagsArr = [...new Set(flags)];
	if (flagsArr.length !== flags.length) return false;

	return flagsArr.every(isValidRegexFlag);
}

/**
 * Checks whether a string contains invalid or duplicated regex flags.
 * 
 * @example
 * areInvalidRegexFlags("gi"); // false
 * areInvalidRegexFlags("gn"); // true
 */
export function areInvalidRegexFlags(flags: string): boolean {
	return !areValidRegexFlags(flags);
}

/**
 * Checks whether a regex or a regex flags string contains the specified flag.
 * 
 * @example
 * hasRegexFlag(/abc/gi, "g"); // true
 * hasRegexFlag(/abc/gi, "y"); // false
 * hasRegexFlag("gi", "y"); // false
 */
export function hasRegexFlag(regexOrFlags: RegExp | string, flag: string): boolean {
	checkFlag(flag);
	if (isString(regexOrFlags)) checkFlags(regexOrFlags);

	const flags = isString(regexOrFlags) ? regexOrFlags : regexOrFlags.flags;
	return flags.includes(flag);
}

/**
 * Checks whether a regex or a regex flags string does not contain the specified flag.
 * 
 * @example
 * lacksRegexFlag(/abc/gi, "g"); // true
 * lacksRegexFlag(/abc/gi, "y"); // false
 * lacksRegexFlag("gi", "y"); // false
 */
export function lacksRegexFlag(regexOrFlags: RegExp | string, flag: string): boolean {
	return !hasRegexFlag(regexOrFlags, flag);
}

/**
 * Checks whether a regex or a regex flags string contains all the specified flags.
 * 
 * @example
 * hasRegexFlags(/abc/gi, "gi"); // true
 * hasRegexFlags(/abc/gi, "gim"); // false
 * hasRegexFlags("gi", "gim"); // false
 */
export function hasRegexFlags(regexOrFlags: RegExp | string, flags: string): boolean {
	return flags.split("").every((flag) => hasRegexFlag(regexOrFlags, flag));
}

/**
 * Checks whether a regex or a regex flags string contains none of the specified flags.
 * 
 * @example
 * lacksRegexFlags(/abc/gi, "ym"); // true
 * lacksRegexFlags(/abc/gi, "gym"); // false
 * lacksRegexFlags("gi", "gym"); // false
 */
export function lacksRegexFlags(regexOrFlags: RegExp | string, flags: string): boolean {
	return flags.split("").every((flag) => lacksRegexFlag(regexOrFlags, flag));
}
