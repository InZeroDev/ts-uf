import type { Func } from "@inzero/ts-ut/func";
import { hasKey } from "../object";
import { isNumber } from "../number";
import { isBoolean } from "../boolean";

/* ---------------------------------- Types --------------------------------- */
export type RepeatData = ({ end: number } | { count: number }) & { start?: number; step?: number };

export type RepeatCbParams = [index: number];

export type RepeatCbRT = boolean | number | void;

export type RepeatCb = Func<RepeatCbParams, RepeatCbRT>;
export type RepeatAsyncCb = Func<RepeatCbParams, Promise<RepeatCbRT>>;

/* -------------------------------------------------------------------------- */

export type RepeatWhileCondition = Func<RepeatCbParams, boolean>;
export type RepeatWhileAsyncCondition = Func<RepeatCbParams, Promise<boolean>>;

/* ---------------------------------- Utils --------------------------------- */
const argToData = (arg2: number | RepeatData): Required<Extract<RepeatData, { end: number }>> => {
	if (isNumber(arg2)) return { start: 0, step: 1, end: arg2 };
	arg2.start ??= 0;
	arg2.step ??= 1;
	return {
		start: arg2.start,
		step: arg2.step,
		end: hasKey(arg2, "end") ? arg2.end : arg2.start + arg2.count,
	};
};

/* -------------------------------- Functions ------------------------------- */
/**
 * @settingsDoc
 * @afterShape $T{RepeatCb}
 * $T{RepeatCbParams}
 * $T{RepeatCbRT}
 *
 * $T{RepeatData}
 */
/**
 * Repeats a function a given number of times.
 *
 * @remarks
 *  - Return `false` to break the loop.
 *  - Return a `number` to jump to that index.
 *
 * @example
 * repeat(console.log, { start: 10, end: 13 }); // logs "10", "11", "12"
 * repeat(console.log, { start: 10, count: 3 }); // logs "10", "11", "12"
 *
 * repeat((index) => {
 *   if (index === 3) return 5; // jump to index 5
 *   if (index === 8) return false; // break the loop
 * }, 10);
 */
export function repeat(func: RepeatCb, data: RepeatData): void;
/**
 * @settingsDoc
 * @afterShape $T{RepeatCb}
 * $T{RepeatCbParams}
 * $T{RepeatCbRT}
 */
/**
 * Repeats a function a given number of times.
 *
 * @remarks
 *  - Return `false` to break the loop.
 *  - Return a `number` to jump to that index.
 *
 * @example
 * repeat(console.log, 3); // logs "0", "1", "2"
 *
 * repeat((index) => {
 *   if (index === 3) return 5; // jump to index 5
 *   if (index === 8) return false; // break the loop
 * }, 10);
 */
export function repeat(func: RepeatCb, times: number): void;
export function repeat(func: RepeatCb, arg2: number | RepeatData): void {
	const data = argToData(arg2);

	let index = data.start;
	for (; index < data.end;) {
		const result = func(index);
		if (isBoolean(result) && result) break;
		if (isNumber(result)) index = result;
		else index += data.step;
	}
}

/**
 * @settingsDoc
 * @afterShape $T{RepeatAsyncCb}
 * $T{RepeatCbParams}
 * $T{RepeatCbRT}
 *
 * $T{RepeatData}
 */
/**
 * An asynchronous version of {@linkcode repeat}.
 */
export async function repeatAsync(func: RepeatAsyncCb, data: RepeatData): Promise<void>;
/**
 * @settingsDoc
 * @afterShape $T{RepeatAsyncCb}
 * $T{RepeatCbParams}
 * $T{RepeatCbRT}
 */
/**
 * An asynchronous version of {@linkcode repeat}.
 */
export async function repeatAsync(func: RepeatAsyncCb, times: number): Promise<void>;
export async function repeatAsync(func: RepeatAsyncCb, arg2: number | RepeatData): Promise<void> {
	const data = argToData(arg2);

	let index = data.start;
	for (; index < data.end;) {
		const result = await func(index);
		if (isBoolean(result) && result) break;
		if (isNumber(result)) index = result;
		else index += data.step;
	}
}

/**
 * @settingsDoc
 * @afterShape $T{RepeatWhileCondition}
 * $T{RepeatCbParams}
 */
/**
 * Repeats a function while a given condition is true.
 *
 * @example
 * repeatWhile(console.log, (index) => index < 3); // logs "0", "1", "2"
 */
export function repeatWhile(func: Func, condition: RepeatWhileCondition): void {
	let index = 0;
	while (condition(index)) func(index++);
}

/**
 * @settingsDoc
 * @afterShape $T{RepeatWhileAsyncCondition}
 * $T{RepeatCbParams}
 */
/**
 * An asynchronous version of {@linkcode repeatWhile}.
 */
export async function repeatWhileAsync(
	func: Func,
	condition: RepeatWhileAsyncCondition,
): Promise<void> {
	let index = 0;
	while (await condition(index)) await func(index++);
}