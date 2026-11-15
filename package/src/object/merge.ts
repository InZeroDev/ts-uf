import type { Dict, DictKey, MergeDiff, MergeSymDiff, Prettify, Valid } from "@inzero/ts-ut";
import type { IsOptionalKey } from "@inzero/ts-ut/_internal";
import { isNotOneOf, isOneOf, isUndefined } from "../other";
import { getKeys } from "./keys";
import { deleteKeys, updateValues } from "./update";

/**
 * Merge two objects, keeping all keys that exist in both.
 * Values are taken from `B` when defined, otherwise falling back to `A`.
 *
 * @example
 * mergeIntersection({ a: 1, b: 2 }, { b: 22, c: 4 }); // { b: 22 }
 * mergeIntersection({ a: 1, b: 2 }, { b: undefined, c: 4 }); // { b: 2 }
 * mergeIntersection({ a: 1, b: undefined }, { b: undefined, c: 4 }); // { b: undefined }
 */
export function mergeIntersection<A extends Dict, B extends Dict>(a: A, b: B): MergeInt<A, B> {
	const [aKeys, bKeys] = [getKeys(a), getKeys(b)];
	const keysToDelete = bKeys.filter((bKey) => isNotOneOf(bKey, aKeys));

	const result = updateValues(deleteKeys(b, keysToDelete), (value, key) =>
		isUndefined(value) ? a[key] : value,
	);

	return result as Valid;
}

/**
 * Merge two objects, keeping all keys from both.
 * Values are taken from `B` when defined, otherwise falling back to `A`.
 *
 * @example
 * mergeUnion({ a: 1, b: 2 }, { b: 22, c: 4 }); // { a: 1, b: 22, c: 4 }
 * mergeUnion({ a: 1, b: 2 }, { b: undefined, c: 4 }); // { a: 1, b: 2, c: 4 }
 * mergeUnion({ a: 1, b: undefined }, { b: undefined, c: 4 }); // { a: 1, b: undefined, c: 4 }
 */
export function mergeUnion<A extends Dict, B extends Dict>(a: A, b: B): MergeUnion<A, B> {
	return { ...mergeIntersection(a, b), ...mergeSymDifference(a, b) };
}

/**
 * Merge two objects, keeping all keys from A.
 * Values are taken from `B` when defined, otherwise falling back to `A`.
 *
 * @example
 * mergePatch({ a: 1, b: 2 }, { b: 22, c: 4 }); // { a: 1, b: 22 }
 * mergePatch({ a: 1, b: 2 }, { b: undefined, c: 4 }); // { a: 1, b: 2 }
 * mergePatch({ a: 1, b: undefined }, { b: undefined, c: 4 }); // { a: 1, b: undefined }
 */
export function mergePatch<A extends Dict, B extends Dict>(a: A, b: B): MergePatch<A, B> {
	return { ...mergeIntersection(a, b), ...mergeDifference(a, b) };
}

/**
 * Merge two objects, keeping all keys that exist only in A.
 *
 *
 * @example
 * mergeDifference({ a: 1, b: 2 }, { b: 22, c: 4 }); // { a: 1 }
 */
export function mergeDifference<A extends Dict, B extends Dict>(a: A, b: B): MergeDiff<A, B> {
	const [aKeys, bKeys] = [getKeys(a), getKeys(b)];
	const keysToDelete = aKeys.filter((aKey) => isOneOf(aKey, bKeys));

	const result = deleteKeys(a, keysToDelete);

	return result as Valid;
}

/**
 * Merge two objects, keeping all non-shared keys.
 *
 * @example
 * mergeSymDifference({ a: 1, b: 2 }, { b: 22, c: 4 }); // { a: 1, c: 4 }
 */
export function mergeSymDifference<A extends Dict, B extends Dict>(a: A, b: B): MergeSymDiff<A, B> {
	return { ...mergeDifference(a, b), ...mergeDifference(b, a) } as Valid;
}

/* ----------------------------- Internal Types ----------------------------- */
type MergeInt<A, B> =
	Required<A> extends infer RA
		? Required<B> extends infer RB
			? {
					[P in keyof RB as P extends keyof RA ? P : never]:
						| RB[P]
						| (IsOptionalKey<B, P> extends true
								? RA[P & keyof RA] | (IsOptionalKey<A, P> extends true ? undefined : never)
								: never);
				} & {}
			: never
		: never;

type MergePatch<A, B> = Prettify<MergeInt<A, B> & MergeDiff<A, B>>;

type MergeUnion<A, B> = Prettify<MergeInt<A, B> & MergeSymDiff<A, B>>;
