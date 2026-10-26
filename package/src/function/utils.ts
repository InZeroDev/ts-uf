import type { Func } from "@inzero/ts-ut/func";
import type { ROList } from "@inzero/ts-ut/list";

/**
 * Immediately invokes a function and returns its result.
 * Useful for creating a local scope to organize your code.
 *
 * @example
 * function cliAction() {
 *   const folders = iife(() => {
 *     const source = "...";
 *     const options = { ... };
 *     const folders = glob.sync(source, options);
 *     return folders.filter(...);
 *   });
 *   const files = iife(() => {
 *     const source = "...";
 *     const options = { ... };
 *     const files = glob.sync(source, options);
 *     return files.filter(...);
 *   });
 * }
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
