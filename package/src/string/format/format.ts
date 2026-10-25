import { isOdd } from "../../math/validation";
import type { ExtractContext } from "./types";

/**
 * Formats a string using a given context.
 *
 * @example
 * formatString("Hello, {name}! Your age is {age=unknown}.", { name: "John" }); // "Hello, John! Your age is unknown."
 */
export function formatString<P extends string>(pattern: P, context: ExtractContext<P>): string {
	return pattern.replace(/(\\*){(\w+)(?:=([^}]+))?}/g, (match, escapes, name, defaultValue) => {
		const newEscapesCount = Math.floor(escapes.length / 2);
		if (isOdd(escapes.length)) return match.slice(newEscapesCount + 1);
		return "\\".repeat(newEscapesCount) + (context[name as never] ?? defaultValue ?? match);
	});
}
