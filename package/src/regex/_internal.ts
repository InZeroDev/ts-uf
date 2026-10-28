import { areInvalidRegexFlags, isInvalidRegexFlag } from "./validation";

export function checkFlag(flag: string): void {
	if (isInvalidRegexFlag(flag)) throw new Error(`Invalid regex flag: ${flag}`);
}

export function checkFlags(flags: string): void {
	if (areInvalidRegexFlags(flags)) throw new Error(`Invalid regex flags: ${flags}`);
}
