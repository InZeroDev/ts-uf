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

/**
 * Sleeps for the specified number of milliseconds.
 */
export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Sleeps for the specified number of milliseconds and then calls the given function.
 */
export async function withDelay(func: Func, ms: number): Promise<void> {
	await sleep(ms);
	await func();
}