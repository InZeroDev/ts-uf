import type { RORange } from "../../_internal";
import { doRangesOverlap } from "../../math";
import type { InsertUpdate, ReplaceUpdate } from "./types";

/**
 * @settingsDoc
 * @afterShape $T{ReplaceUpdate}{I}
 */
/**
 * Replaces a substring using its coordinates.
 *
 * @remarks Automatically adjusts the ranges of subsequent updates to account for changes in string length
 * caused by earlier replacements, ensuring each update targets the intended substring.
 *
 * @throws Throws a {@link RangeError} if:
 * - `start > end` or `start < 0`.
 * - some ranges overlap.
 *
 * @example
 * replaceString("Hello World!", [6, 11, "Universe"]); // "Hello Universe!"
 * replaceString("012345678", [0, 2, "x"], [3, 5, "y"], [6, 8, "z"]); // "x2y5z8"
 */
export function replaceSubstring(string: string, ...updates: ReplaceUpdate[]): string {
	if (doRangesOverlap(updates.map(([start, end]) => [start, end])))
		throw new Error("Overlapping ranges");
	return updates.reduce(
		(acc, [start, end, replacement]) => {
			if (start < 0) throw new RangeError("Invalid range: start < 0");

			start += acc.delta;
			end += acc.delta;

			acc.string = acc.string.slice(0, start) + replacement + acc.string.slice(end);

			const rangeLength = end - start;
			acc.delta += replacement.length - rangeLength;

			return acc;
		},
		{ string, delta: 0 },
	).string;
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
 * @afterShape $T{InsertUpdate}{I}
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
