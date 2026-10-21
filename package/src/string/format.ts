import type { Dict, Not, Join, Prettify, Stringable } from "@inzero/ts-ut";
import { isOdd } from "~/math/validation";

type IsEscaped<L extends string, _R extends boolean = false> = L extends `${infer N}\\`
	? IsEscaped<N, Not<_R>>
	: _R;

type ExtractVariableData<V extends string> = V extends `${infer N}=${infer D}` ? [N, D] : [V, null];

type SuggestValues<T extends Stringable> = T | (string & {}) | (number & {});

/**
 * Extracts the context from a string pattern.
 * 
 * @example
 * ```ts
 * type Pattern = "Hello, {name}! Your age is {age=unknown}.";
 * type Context = ExtractContext<Pattern>; // { name: string, age?: "unknown" | (string & {}) | number }
 * ```
 */
export type ExtractContext<T extends string> = T extends `${infer L}{${infer V}}${infer R}`
	? IsEscaped<L> extends true
		? ExtractContext<Join<[V, "}", R]>>
		: ExtractVariableData<V> extends [infer N extends string, infer D extends string | null]
			? Prettify<
					(D extends string ? Partial<Dict<N, SuggestValues<D>>> : Dict<N, Stringable>) &
						ExtractContext<R>
				>
			: never
	: {};

/**
 * Formats a string using a given context.
 * 
 * @example
 * ```ts
 * formatString("Hello, {name}! Your age is {age=unknown}.", { name: "John" }); // "Hello, John! Your age is unknown."
 * ```
 */
export function formatString<P extends string>(pattern: P, context: ExtractContext<P>): string {
	return pattern.replace(/(\\*){(\w+)(?:=([^}]+))?}/g, (match, escapes, name, defaultValue) => {
		const newEscapesCount = Math.floor(escapes.length / 2);
		if (isOdd(escapes.length)) return match.slice(newEscapesCount + 1);
		return "\\".repeat(newEscapesCount) + (context[name as never] ?? defaultValue ?? match);
	});
}
