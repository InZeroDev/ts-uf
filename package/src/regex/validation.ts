import type { _CheckT, SmartExtract } from "../_internal";
import { isOneOf } from "../other";
import { isString } from "../string";
import { checkFlag, checkFlags } from "./_internal";
import { regexFlags } from "./constants";

type CheckT<T> = _CheckT<T, RegExp>;

export function isRegex<T>(value: CheckT<T>): value is SmartExtract<T, RegExp> {
	return value instanceof RegExp;
}

export function isNotRegex<T>(value: CheckT<T>): value is Exclude<T, RegExp> {
	return !isRegex(value);
}

export function isValidRegexFlag(flag: string): boolean {
	return isOneOf(flag, regexFlags);
}

export function isInvalidRegexFlag(flag: string): boolean {
	return !isValidRegexFlag(flag);
}

export function areValidRegexFlags(flags: string): boolean {
	const flagsArr = [...new Set(flags)];
	if (flagsArr.length !== flags.length) return false;

	return flagsArr.every(isValidRegexFlag);
}

export function areInvalidRegexFlags(flags: string): boolean {
	return !areValidRegexFlags(flags);
}

export function hasRegexFlag(regexOrFlags: RegExp | string, flag: string): boolean {
	checkFlag(flag);
	if (isString(regexOrFlags)) checkFlags(regexOrFlags);

	const flags = isString(regexOrFlags) ? regexOrFlags : regexOrFlags.flags;
	return flags.includes(flag);
}

export function lacksRegexFlag(regexOrFlags: RegExp | string, flag: string): boolean {
	return !hasRegexFlag(regexOrFlags, flag);
}

export function hasRegexFlags(regexOrFlags: RegExp | string, flags: string): boolean {
	return flags.split("").every((flag) => hasRegexFlag(regexOrFlags, flag));
}

export function lacksRegexFlags(regexOrFlags: RegExp | string, flags: string): boolean {
	return flags.split("").every((flag) => lacksRegexFlag(regexOrFlags, flag));
}
