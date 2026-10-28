import type { AreEqual, Assert } from "@inzero/ts-ut";

/**
 * A list of valid regex flags.
 */
export const regexFlags = ["d", "g", "i", "m", "s", "u", "v", "y"] as const;

/**
 * Maps regular expression flag names to their corresponding flag characters.
 */
export const regexFlag = {
	hasIndices: "d",
	global: "g",
	ignoreCase: "i",
	multiline: "m",
	dotAll: "s",
	unicode: "u",
	unicodeSets: "v",
	sticky: "y",
} as const;

{
	// Make sure `regexFlag` has all flags and are all correct.
	type check = Assert<AreEqual<RegexFlag, (typeof regexFlags)[number]>>; // eslint-disable-line @typescript-eslint/no-unused-vars
}

/**
 * Regex flag name.
 */
export type RegexFlagName = keyof typeof regexFlag;
/**
 * Regex flag character.
 */
export type RegexFlag = (typeof regexFlags)[number];
