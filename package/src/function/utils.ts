import type { Func, Params, RT } from "@inzero/ts-ut";

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
export function iife<const F extends Func>(func: F, ...args: Params<F>): RT<F> {
	return func(...args);
}
