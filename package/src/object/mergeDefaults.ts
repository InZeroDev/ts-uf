import type {
	Dict,
	ExcludeFromValues,
	HasType,
	IsNever,
	IsSubtype,
	KeysOfType,
	KeysWithType,
	LoosePick,
	Not,
	PartialKey,
	PickOptional,
	Prettify,
	RequiredDeep,
	Valid,
	Values,
} from "@inzero/ts-ut";
import { isUndefined } from "../other";
import { updateValues } from "./update";
import { mergeDifference } from "./merge";
import { isObject } from "./validation";
import type { IsOptionalKey } from "@inzero/ts-ut/_internal";

/**
 * Merges default values into a source object, using them for missing or undefined properties.
 *
 * @example
 * type Config = { a: number; b?: number; c: number | undefined; d?: number };
 *
 * const config: Config = {
 * 	a: 1,
 * 	b: 2,
 * 	c: undefined,
 * };
 * const fullConfig = mergeDefaults(config, { b: 222, c: 3, d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
 */
export function mergeDefaults<S extends Dict>(
	source: S,
	defaults: GenerateDefaults<S>,
): MergeDefaultsRT<S> {
	return {
		...updateValues(source, (value, key) => (isUndefined(value) ? (defaults as Dict)[key] : value)),
		...mergeDifference(defaults, source),
	} as Valid;
}

/**
 * Recursively merges default values into a source object, using them for missing or undefined properties.
 *
 * @example
 * type Config = { a?: number; b: { c: number; d: number | undefined } };
 * const config: Config = { b: { c: 4, d: undefined } };
 *
 * const fullConfig = mergeDefaultsDeep(config, { a: 1, b: { d: 99 } }); // { a: 1, b: { c: 4, d: 99 } }
 */
export function mergeDefaultsDeep<S extends Dict, D extends GenerateDefaultsDeep<S>>(
	source: S,
	defaults: D,
): MergeDefaultsDeepRT<S, D> {
	return {
		...updateValues(source, (value, key) => {
			const df = defaults as Dict;
			if (isUndefined(value)) return df[key];
			if (isObject(value) && isObject(df[key]))
				return mergeDefaultsDeep(value as Dict, df[key] as Valid);
			return source[key];
		}),
		...mergeDifference(defaults, source),
	} as Valid;
}

/* ----------------------------- Internal Types ----------------------------- */
/**
 * Generates the required default-value shape for {@link mergeDefaults},
 * including optional and `undefined` properties.
 */
export type GenerateDefaults<S> = Prettify<Required<PickOptional<S> & PickUndefinable<S>>>;

/**
 * Recursively generates the required default-value shape for {@link mergeDefaultsDeep},
 * including optional and `undefined` properties at every level.
 */
export type GenerateDefaultsDeep<S> = RequiredDeep<PickOptionalDeep<S> & PickUndefinableDeep<S>>;

type IsUnion<T> = IsNever<T> extends true ? false : _IsUnion<T>;
type _IsUnion<T, C = T> = T extends T ? ([C] extends [T] ? false : true) : never;

type MergeDefaultsRT<S> = {
	[P in keyof S]-?: Exclude<S[P], undefined>;
} & {};

type MergeDefaultsDeepRT<S, D, C = Required<S>> = {
	[P in keyof S]-?: D[P & keyof D] extends infer DP
		? C[P & keyof C] extends infer CP
			? S[P] extends infer TP
				? TP extends Dict
					? IsUnion<CP> | IsNever<Extract<DP, TP>> extends true
						? Exclude<TP, undefined>
						: MergeDefaultsDeepRT<TP, DP>
					: Exclude<TP, undefined>
				: never
			: never
		: never;
} & {};

type PickUndefinable<T> = ExcludeFromValues<LoosePick<T, KeysWithType<T, undefined>>, undefined>;
type PickUndefinableDeep<T> = T extends T
	? {
			[
				P in keyof T as T[P] extends infer TP
					? TP extends Dict
						? HasType<Values<TP>, undefined> extends true
							? P
							: never
						: HasType<T[P], undefined> extends true
							? P
							: never
					: never
			]: T[P] extends infer TP
				? TP extends Dict
					? PickUndefinableDeep<TP>
					: Exclude<TP, undefined>
				: never;
		}
	: never;
type PickOptionalDeep<T> = {
	[
		P in keyof T as IsOptionalKey<T, P> | HasOptional<T[P]> extends false ? never : P
	]: T[P] extends infer TP
		? IsSubtype<TP, Dict> | Not<IsOptionalKey<T, P>> extends true
			? PickOptionalDeep<TP>
			: TP
		: never;
} & {};

type HasOptional<T> = T extends Required<T> ? false : true;
