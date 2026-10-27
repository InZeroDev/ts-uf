import type { AreEqual, Assert } from "@inzero/ts-ut";

export const regexFlags = ["d", "g", "i", "m", "s", "u", "v", "y"] as const;

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

export type RegexFlagName = keyof typeof regexFlag;
export type RegexFlag = (typeof regexFlag)[RegexFlagName];
