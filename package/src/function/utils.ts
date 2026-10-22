import type { Func } from "@inzero/ts-ut/func";
import type { ROList } from "@inzero/ts-ut/list";

/**
 * Immediately invoked function expression.
 *
 * @example
 * const folders = iife(() => {
 *   const source = "...";
 *   const options = { ... };
 *   const folders = glob.sync(source, options);
 *   return folders.filter(...);
 * });
 */
export function iife<const A extends ROList, const R>(func: Func<A, R>, ...args: A): R {
	return func(...args);
}
