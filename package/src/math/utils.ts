export function getSum(...numbers: number[]): number {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}

export function getAverage(...numbers: number[]): number {
	return getSum(...numbers) / numbers.length;
}

export function getRandomNumber(min: number, max: number): number {
	if (min > max) [min, max] = [max, min];
	else if (min === max) return min;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomInteger(min: number, max: number, inclusive: boolean = false): number {
	return Math.floor(getRandomNumber(min, max + +inclusive));
}

export function minmax(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}

export { minmax as clamp };

export function roundNumber(value: number, decimals: number = 2): number {
	return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
