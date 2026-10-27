/**
 * Get the sum of the given numbers.
 *
 * @example
 * getSum(1, 2, 3); // 6
 */
export function getSum(...numbers: number[]): number {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Get the average of the given numbers.
 *
 * @example
 * getAverage(1, 2, 3); // 2
 */
export function getAverage(...numbers: number[]): number {
	return getSum(...numbers) / numbers.length;
}

/**
 * Get a random float between the given range.
 *
 * @remarks
 * - If min is greater than max, the values are swapped.
 * - The minimum is inclusive, while the maximum is exclusive.
 * 
 * @example
 * getRandomFloat(1, 10); 3.1458241132191636
 * getRandomFloat(1, 10); 2.076135543542401
 * getRandomFloat(1, 10); 5.6216396763729986
 */
export function getRandomFloat(min: number, max: number): number {
	if (min > max) [min, max] = [max, min];
	else if (min === max) return min;
	return Math.random() * (max - min) + min;
}

/**
 * Get a random integer between the given range.
 *
 * @example
 * getRandomInteger(1, 10); 3
 * getRandomInteger(1, 10); 2
 * getRandomInteger(1, 10); 5
 */
export function getRandomInteger(min: number, max: number, inclusive: boolean = false): number {
	return Math.floor(getRandomFloat(min, max + +inclusive));
}

/**
 * Ensures that a number is within a given range.
 *
 * @example
 * const range = [1, 10] as const;
 *
 * minmax(0, ...range); // 1
 * minmax(5, ...range); // 5
 * minmax(11, ...range); // 10
 */
export function minmax(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}

export { minmax as clamp };

/**
 * Rounds a number to a given number of decimals.
 *
 * @example
 * roundNumber(1.23456789, 3); // 1.235
 */
export function roundNumber(value: number, decimals: number = 2): number {
	return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
