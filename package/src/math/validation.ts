import type { RORange } from "../_internal";

/**
 * Checks whether a number is odd.
 *
 * @example
 * isOdd(1); // true
 * isOdd(2); // false
 */
export function isOdd(value: number): boolean {
	return value % 2 === 1;
}

/**
 * Checks whether a number is even.
 *
 * @example
 * isEven(1); // false
 * isEven(2); // true
 */
export function isEven(value: number): boolean {
	return !isOdd(value);
}

/**
 * Checks whether a number is positive.
 *
 * @remarks `0` is not considered positive. If you want to treat it as positive, use {@linkcode isNonNegative} instead.
 *
 * @example
 * isPositive(-1); // false
 * isPositive(0); // false
 * isPositive(1); // true
 */
export function isPositive(value: number): boolean {
	return value > 0;
}

/**
 * Checks whether a number is non-negative.
 *
 * @example
 * isNonNegative(-1); // false
 * isNonNegative(0); // true
 * isNonNegative(1); // true
 */
export function isNonNegative(value: number): boolean {
	return value >= 0;
}

/**
 * Checks whether a number is negative.
 *
 * @remarks `0` is not considered negative. If you want to treat it as negative, use {@linkcode isNonPositive} instead.
 *
 * @example
 * isNegative(-1); // true
 * isNegative(0); // false
 * isNegative(1); // false
 */
export function isNegative(value: number): boolean {
	return value < 0;
}

/**
 * Checks whether a number is non-positive.
 *
 * @example
 * isNonPositive(-1); // true
 * isNonPositive(0); // true
 * isNonPositive(1); // false
 */
export function isNonPositive(value: number): boolean {
	return value <= 0;
}

/**
 * Checks whether a number is a prime number.
 *
 * @example
 * isPrime(2); // true
 * isPrime(3); // true
 * isPrime(563); // true
 * isPrime(26881); // true
 *
 * isPrime(1); // false
 * isPrime(4); // false
 * isPrime(564); // false
 */
export function isPrime(value: number): boolean {
	if (value <= 1) return false;
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) return false;
	}
	return true;
}

/**
 * Checks whether a number is not a prime number.
 *
 * @example
 * isPrime(2); // false
 * isPrime(3); // false
 * isPrime(563); // false
 * isPrime(26881); // false
 *
 * isPrime(1); // true
 * isPrime(4); // true
 * isPrime(564); // true
 */
export function isNotPrime(value: number): boolean {
	return !isPrime(value);
}

type ExclusiveMinMax = {
	exclusiveMin?: boolean;
	exclusiveMax?: boolean;
};

/**
 * @settingsDoc
 * @afterShape $T{RORange}I
 * $T{ExclusiveMinMax}
 */
/**
 * Checks whether a number is within a given range.
 *
 * @remarks Both `min` and `max` are inclusive by default.
 *
 * @example
 * const range = [1, 10] as const;
 *
 * isInRange(0, range); // false
 *
 * isInRange(1, range); // true
 * isInRange(5, range); // true
 * isInRange(10, range); // true
 *
 * isInRange(11, range); // false
 */
export function isInRange(value: number, range: RORange, exclusive: ExclusiveMinMax = {}): boolean {
	const [min, max] = range;
	const isGTMin = exclusive.exclusiveMin ? value > min : value >= min;
	const isLTMax = exclusive.exclusiveMax ? value < max : value <= max;
	return isGTMin && isLTMax;
}

/**
 * @settingsDoc
 * @afterShape $T{RORange}I
 * $T{ExclusiveMinMax}
 */
/**
 * Checks whether a number is out of a given range.
 *
 * @remarks Both `min` and `max` are inclusive by default.
 *
 * @example
 * const range = [1, 10] as const;
 *
 * isOutOfRange(0, range); // true
 *
 * isOutOfRange(1, range); // false
 * isOutOfRange(5, range); // false
 * isOutOfRange(10, range); // false
 *
 * isOutOfRange(11, range); // true
 */
export function isOutOfRange(
	value: number,
	range: RORange,
	exclusive: ExclusiveMinMax = {},
): boolean {
	return !isInRange(value, range, exclusive);
}

/**
 * @settingsDoc
 * @afterShape $T{RORange}I
 */
/**
 * Checks whether some ranges overlap.
 *
 * @remarks By default, ranges sharing the same border are not considered overlapping.
 *
 * @example
 * doRangesOverlap([0, 3], [3, 6]); // false
 * doRangesOverlap([0, 3], [2, 6]); // true
 */
export function doRangesOverlap(ranges: RORange[]): boolean {
	const sorted = ranges.toSorted((a, b) => a[0] - b[0]);

	for (let index = 1; index < sorted.length; index++) {
		const range = sorted[index]!;
		const prevRange = sorted[index - 1]!;
		if (range[0] < prevRange[1]) return true;
	}

	return false;
}
