import type { SmartExtract } from "@inzero/ts-ut";
import { isBoolean } from "~/boolean";

/**
 * Checks whether a number is odd.
 *
 * @example
 * ```ts
 * isOdd(1); // true
 * isOdd(2); // false
 * ```
 */
export function isOdd(value: number): boolean {
	return value % 2 === 1;
}

/**
 * Checks whether a number is even.
 *
 * @example
 * ```ts
 * isEven(1); // false
 * isEven(2); // true
 * ```
 */
export function isEven(value: number): boolean {
	return !isOdd(value);
}

/**
 * Checks whether a number is positive.
 *
 * @example
 * ```ts
 * isPositive(-1); // false
 * isPositive(0); // false
 * isPositive(1); // true
 * ```
 */
export function isPositive(value: number): boolean {
	return value > 0;
}

/**
 * Checks whether a number is non-negative.
 *
 * @example
 * ```ts
 * isNonNegative(-1); // false
 * isNonNegative(0); // true
 * isNonNegative(1); // true
 * ```
 */
export function isNonNegative(value: number): boolean {
	return value >= 0;
}

/**
 * Checks whether a number is negative.
 *
 * @example
 * ```ts
 * isNegative(-1); // true
 * isNegative(0); // false
 * isNegative(1); // false
 * ```
 */
export function isNegative(value: number): boolean {
	return value < 0;
}

/**
 * Checks whether a number is non-positive.
 *
 * @example
 * ```ts
 * isNonPositive(-1); // true
 * isNonPositive(0); // true
 * isNonPositive(1); // false
 * ```
 */
export function isNonPositive(value: number): boolean {
	return value <= 0;
}

/**
 * Checks whether a number is prime.
 *
 * @example
 * ```ts
 * isPrime(2); // true
 * isPrime(3); // true
 * isPrime(563); // true
 * isPrime(26881); // true
 *
 * isPrime(1); // false
 * isPrime(4); // false
 * isPrime(564); // false
 * ```
 */
export function isPrime(value: number): boolean {
	if (value <= 1) return false;
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) return false;
	}
	return true;
}

/**
 * Checks whether a number is not prime.
 * 
 * @example
 * ```ts
 * isPrime(2); // false
 * isPrime(3); // false
 * isPrime(563); // false
 * isPrime(26881); // false
 *
 * isPrime(1); // true
 * isPrime(4); // true
 * isPrime(564); // true
 * ```
 */
export function isNotPrime(value: number): boolean {
	return !isPrime(value);
}

type ExclusiveMinMax = {
	exclusiveMin?: boolean;
	exclusiveMax?: boolean;
};

/**
 * Checks whether a number is within a given range.
 *
 * @example
 * ```ts
 * const range = [1, 10] as const;
 *
 * isInRange(0, range); // false
 * 
 * isInRange(1, range); // true
 * isInRange(5, range); // true
 * isInRange(10, range); // true
 * 
 * isInRange(11, range); // false
 * ```
 */
export function isInRange(
	value: number,
	range: readonly [min: number, max: number],
	exclusive: ExclusiveMinMax = {},
): boolean {
	const [min, max] = range;
	const isGTMin = exclusive.exclusiveMin ? value > min : value >= min;
	const isLTMax = exclusive.exclusiveMax ? value < max : value <= max;
	return isGTMin && isLTMax;
}

/**
 * Checks whether a number is out of a given range.
 *
 * @example
 * ```ts
 * const range = [1, 10] as const;
 *
 * isOutOfRange(0, range); // true
 * 
 * isOutOfRange(1, range); // false
 * isOutOfRange(5, range); // false
 * isOutOfRange(10, range); // false
 * 
 * isOutOfRange(11, range); // true
 * ```
 */
export function isOutOfRange(
	value: number,
	range: readonly [min: number, max: number],
	exclusive: ExclusiveMinMax = {},
): boolean {
	return !isInRange(value, range, exclusive);
}
