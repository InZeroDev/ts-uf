import type { Valid } from "@inzero/ts-ut";
import { hasKey } from "../object";
import { regexFlag, regexFlags, type RegexFlagName } from "./constants";
import { isValidRegexFlag } from "./validation";
import { checkFlag, checkFlags } from "./_internal";

/**
 * Escapes special regex characters so a string can be matched literally.
 *
 * @example
 * escapeRegex("a.b+c"); // "a\\.b\\+c"
 */
export function escapeRegex(text: string): string {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Converts regex flag names to their corresponding flags characters.
 * 
 * @example
 * toRegexpFlags("global", "multiline"); // "gm"
 */
export function toRegexFlags(...flagNames: RegexFlagName[]): string {
	return flagNames
		.map((flagName) => (hasKey(regexFlag, flagName) ? regexFlag[flagName] : ""))
		.sort()
		.join("");
}

/**
 * Normalizes regex flags by removing duplicates and invalid flags, then sorting them.
 * 
 * @example
 * normalizeFlags("iggn"); // "gi"
 */
export function normalizeFlags(flags: string): string {
	return [...new Set(flags)].filter(isValidRegexFlag).sort().join("");
}

/**
 * Ensures that a regex or regex flags string contains the specified flag.
 * 
 * @remarks When passed a regex, returns a new instance and preserves its `lastIndex`.
 * 
 * @example
 * function findLastMatch(regex: RegExp) {
 *   const globalRegex = ensureRegexFlag(regex, "g");
 *   // ...
 * }
 */
export function ensureRegexFlag<T extends RegExp | string>(regexOrFlags: T, flag: string): T {
	checkFlag(flag);
	return _ensureRegexFlags(regexOrFlags, flag);
}

/**
 * Ensures that a regex or regex flags string contains the specified flag.
 * 
 * @remarks When passed a regex, returns a new instance and preserves its `lastIndex`.
 * 
 * @example
 * ensureRegexFlags(/abc/, "gm"); // /abc/gm
 * ensureRegexFlags("g", "gm"); // "gm"
 */
export function ensureRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	checkFlags(flags);
	return _ensureRegexFlags(regexOrFlags, flags);
}

/**
 * Removes the specified flag from a regex or regex flags string.
 * 
 * @example
 * removeRegexFlag(/abc/gi, "i"); // /abc/g
 * removeRegexFlag("gi", "i"); // "g"
 */
export function removeRegexFlag<T extends RegExp | string>(regexOrFlags: T, flag: string): T {
	checkFlag(flag);
	return _removeRegexFlags(regexOrFlags, flag);
}

/**
 * Removes the specified flags from a regex or regex flags string.
 * 
 * @example
 * removeRegexFlags(/abc/gi, "gi"); // /abc/
 * removeRegexFlags("gi", "gi"); // ""
 */
export function removeRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	checkFlags(flags);
	return _removeRegexFlags(regexOrFlags, flags);
}

/**
 * Extract all invalid characters from a regex flags string.
 */
export function extractInvalidFlags(flags: string): string {
	return flags.replace(new RegExp(`[${regexFlags.join("")}]`, "g"), "");
}

/* ----------------------------- Internal Utils ----------------------------- */

function _ensureRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	if (typeof regexOrFlags === "string") {
		checkFlags(regexOrFlags);
		return normalizeFlags(regexOrFlags + flags) as Valid;
	}

	const result = RegExp(regexOrFlags.source, normalizeFlags(regexOrFlags.flags + flags));
	result.lastIndex = regexOrFlags.lastIndex;

	return result as Valid;
}

function _removeRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	if (typeof regexOrFlags === "string") {
		checkFlags(regexOrFlags);
		return normalizeFlags(regexOrFlags.replace(new RegExp(`[${flags}]`, "g"), "")) as Valid;
	}

	const result = new RegExp(regexOrFlags.source, _removeRegexFlags(regexOrFlags.flags, flags));
	result.lastIndex = regexOrFlags.lastIndex;

	return result as Valid;
}
