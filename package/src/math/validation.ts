import type { SmartExtract } from "@inzero/ts-ut";
import { isBoolean } from "~/boolean";

export function isOdd(value: number): boolean {
	return value % 2 === 1;
}

export function isEven(value: number): boolean {
	return !isOdd(value);
}

export function isPositive(value: number): boolean {
	return value > 0;
}

export function isNonNegative(value: number): boolean {
	return value >= 0;
}

export function isNegative(value: number): boolean {
	return value < 0;
}

export function isNonPositive(value: number): boolean {
	return value <= 0;
}

export function isZero<T extends number>(value: T): value is SmartExtract<T, 0> {
	return value === 0;
}

export function isNotZero<T extends number>(value: T): value is Exclude<T, 0> {
	return !isZero(value);
}

export function isPrime(value: number): boolean {
	if (value <= 1) return false;
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) return false;
	}
	return true;
}

export function isNotPrime(value: number): boolean {
	return !isPrime(value);
}

type ExclusiveMinMax = {
	exclusiveMin?: boolean;
	exclusiveMax?: boolean;
};

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

export function isOutOfRange(
	value: number,
	range: readonly [min: number, max: number],
	exclusive: ExclusiveMinMax = {},
): boolean {
	return !isInRange(value, range, exclusive);
}
