import type { Func, Params, ROList, RT } from "@inzero/ts-ut";

/**
 * Immediately invoked function expression.
 *
 * @example
 * ```ts
 * const folders = iife(() => {
 *   const source = "...";
 *   const options = { ... };
 *   const folders = glob.sync(source, options);
 *   return folders.filter(...);
 * });
 * ```
 */
export function iife<const A extends ROList, const R>(func: Func<A, R>, ...args: A): R {
	return func(...args);
}
