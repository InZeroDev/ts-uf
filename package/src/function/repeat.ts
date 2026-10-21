import type { Func, RT } from "@inzero/ts-ut";
import { hasKey } from "~/object";
import { iife } from "./utils";
import { isNumber } from "~/number";
import { isBoolean } from "~/boolean";

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
 * Repeats a function a given number of times.
 *
 * @example
 * repeat(console.log, { start: 10, end: 13 }); // logs "10", "11", "12"
 * repeat(console.log, { start: 10, count: 3 }); // logs "10", "11", "12"
 */
export function repeat(func: RepeatCb, data: RepeatData): void;
/**
 * Repeats a function a given number of times.
 *
 * @example
 * repeat(console.log, 3); // logs "0", "1", "2"
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
 * An asynchronous version of {@linkcode repeat}.
 */
export async function repeatAsync(func: RepeatAsyncCb, data: RepeatData): Promise<void>;
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
 * Repeats a function while a given condition is true.
 *
 * @example
 * repeatWhile(console.log, (index) => index < 3); // logs "0", "1", "2"
 */
export function repeatWhile(func: Func, condition: RepeatWhileCondition): void {
	let index = 0;
	while (condition(index)) func(index);
}

/**
 * An asynchronous version of {@linkcode repeatWhile}.
 */
export async function repeatWhileAsync(
	func: Func,
	condition: RepeatWhileAsyncCondition,
): Promise<void> {
	let index = 0;
	while (await condition(index)) await func(index);
}
