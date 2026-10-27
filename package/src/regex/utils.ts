import type { Valid } from "@inzero/ts-ut";
import { hasKey } from "../object";
import { regexFlag, regexFlags, type RegexFlagName } from "./constants";
import { isValidRegexFlag } from "./validation";
import { checkFlag, checkFlags } from "./_internal";

export function escapeRegex(text: string): string {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function toRegexFlags(...flagNames: RegexFlagName[]): string {
	return flagNames
		.map((flagName) => (hasKey(regexFlag, flagName) ? regexFlag[flagName] : ""))
		.sort()
		.join("");
}

export function normalizeFlags(flags: string): string {
	return [...new Set(flags)].filter(isValidRegexFlag).sort().join("");
}

export function ensureRegexFlag<T extends RegExp | string>(regexOrFlags: T, flag: string): T {
	checkFlag(flag);
	return _ensureRegexFlags(regexOrFlags, flag);
}

export function ensureRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	checkFlags(flags);
	return _ensureRegexFlags(regexOrFlags, flags);
}

export function removeRegexFlag<T extends RegExp | string>(regexOrFlags: T, flag: string): T {
	checkFlag(flag);
	return _removeRegexFlags(regexOrFlags, flag);
}

export function removeRegexFlags<T extends RegExp | string>(regexOrFlags: T, flags: string): T {
	checkFlags(flags);
	return _removeRegexFlags(regexOrFlags, flags);
}

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
