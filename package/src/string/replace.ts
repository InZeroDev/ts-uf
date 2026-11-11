import type { RORange } from "../_internal";
import { doRangesOverlap } from "../math";

export type ReplaceUpdate = [start: number, end: number, replacement: string];
export type InsertUpdate = [index: number, insertion: string];

/**
 * @settingsDoc
 * @afterShape $T{ReplaceUpdate}
 */
/**
 * Replaces a substring using its coordinates.
 *
 * @remarks You don't have to worry about adjusting the ranges.
 *
 * @throws Throws a {@link RangeError} if:
 * - `start > end` or `start < 0`.
 * - some ranges overlap.
 *
 * @example
 * replaceSubstring("Hello World!", [6, 11, "Universe"]); // "Hello Universe!"
 * replaceSubstring("012345678", [0, 2, "x"], [3, 5, "y"], [6, 8, "z"]); // "x2y5z8"
 */
export function replaceSubstring(string: string, ...updates: ReplaceUpdate[]): string {
	if (doRangesOverlap(updates.map(([start, end]) => [start, end])))
		throw new Error("Overlapping ranges");
	return updates
		.toSorted(([a], [b]) => a - b)
		.reduceRight<string>((string, [start, end, replacement]) => {
			if (start < 0) throw new RangeError("Invalid range: start < 0");

			string = string.slice(0, start) + replacement + string.slice(end);

			return string;
		}, string);
}

/**
 * @settingsDoc
 * @afterShape $T{RORange}{I}
 */
/**
 * Deletes a substring using its coordinates.
 *
 * @remarks Automatically adjusts the ranges of subsequent deletions to account for changes in string length
 * caused by earlier deletions, ensuring each deletion targets the intended substring.
 *
 * @throws Throws a {@link RangeError} if:
 * - `start > end` or `start < 0`.
 * - some ranges overlap.
 *
 * @example
 * deleteSubstring("Hello World And Welcome!", [5, 11], [23, 24]); // "Hello And Welcome"
 */
export function deleteSubstring(string: string, ...ranges: RORange[]): string {
	return replaceSubstring(string, ...ranges.map<ReplaceUpdate>(([start, end]) => [start, end, ""]));
}

/**
 * @settingsDoc
 * @afterShape $T{InsertUpdate}
 */
/**
 * Inserts a substring at a given index.
 *
 * @remarks Automatically adjusts the ranges of subsequent insertions to account for changes in string length
 * caused by earlier insertions, ensuring each insertion occurs at the intended position.
 *
 * @throws Throws a {@link RangeError} if:
 * - `index < 0`.
 * - some ranges overlap.
 *
 * @example
 * insertSubstring("Hello World!", [6, "("], [11, ")"]); // "Hello (World)!"
 */
export function insertSubstring(string: string, ...updates: InsertUpdate[]): string {
	return replaceSubstring(
		string,
		...updates.map<ReplaceUpdate>(([index, insertion]) => [index, index, insertion]),
	);
}
