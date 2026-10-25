import type { Join, Stringable } from "@inzero/ts-ut/string";
import type { Not } from "@inzero/ts-ut/other";
import type { Dict, Prettify } from "@inzero/ts-ut/dict";

type IsEscaped<L extends string, _R extends boolean = false> = L extends `${infer N}\\`
  ? IsEscaped<N, Not<_R>>
  : _R;

type ExtractVariableData<V extends string> = V extends `${infer N}=${infer D}` ? [N, D] : [V, null];

type SuggestValues<T extends Stringable> = T | (string & {}) | (number & {});

/**
 * Extracts the context from a string pattern.
 *
 * @example
 * type Pattern = "Hello, {name}! Your age is {age=unknown}.";
 * type Context = ExtractContext<Pattern>; // { name: string, age?: "unknown" | (string & {}) | number }
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
  : {}; // eslint-disable-line @typescript-eslint/no-empty-object-type