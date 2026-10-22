import type {
	EnsurePrefix,
	EnsureSuffix,
	Prefix,
	Suffix,
	UnPrefix,
	UnSuffix,
} from "@inzero/ts-ut/string";

/**
 * Adds a prefix to a string.
 *
 * @example
 * prefix("key", "$"); // "$key"
 */
export function prefix<T extends string, P extends string>(
	string: string extends T ? never : T,
	prefix: string extends P ? never : P,
): Prefix<T, P>;
/**
 * Adds a prefix to a string.
 *
 * @example
 * prefix("key", "$"); // "$key"
 */
export function prefix(string: string, prefix: string): string;
export function prefix(string: string, prefix: string): string {
	return `${prefix}${string}`;
}

/**
 * Adds a prefix to a string if it doesn't already have it.
 *
 * @example
 * ensurePrefix("key", "$"); // "$key"
 * ensurePrefix("$key", "$"); // "$key"
 */
export function ensurePrefix<T extends string, P extends string>(
	string: string extends T ? never : T,
	prefix: string extends P ? never : P,
): EnsurePrefix<T, P>;
/**
 * Adds a prefix to a string if it doesn't already have it.
 *
 * @example
 * ensurePrefix("key", "$"); // "$key"
 * ensurePrefix("$key", "$"); // "$key"
 */
export function ensurePrefix(string: string, prefix: string): string;
export function ensurePrefix(string: string, prefix: string): string {
	return string.startsWith(prefix) ? string : `${prefix}${string}`;
}

/**
 * Removes a prefix from a string if it has it.
 *
 * @example
 * unPrefix("$key", "$"); // "key"
 * unPrefix("key", "$"); // "key"
 */
export function unPrefix<T extends string, P extends string>(
	string: string extends T ? never : T,
	prefix: string extends P ? never : P,
): UnPrefix<T, P>;
/**
 * Removes a prefix from a string if it has it.
 *
 * @example
 * unPrefix("$key", "$"); // "key"
 * unPrefix("key", "$"); // "key"
 */
export function unPrefix(string: string, prefix: string): string;
export function unPrefix(string: string, prefix: string): string {
	return string.startsWith(prefix) ? string.slice(prefix.length) : string;
}

/**
 * Adds a suffix to a string.
 *
 * @example
 * suffix("key", "$"); // "key$"
 */
export function suffix<T extends string, S extends string>(
	string: string extends T ? never : T,
	suffix: string extends S ? never : S,
): Suffix<T, S>;
/**
 * Adds a suffix to a string.
 *
 * @example
 * suffix("key", "$"); // "key$"
 */
export function suffix(string: string, suffix: string): string;
export function suffix(string: string, suffix: string): string {
	return `${string}${suffix}`;
}

/**
 * Adds a suffix to a string if it doesn't already have it.
 *
 * @example
 * ensureSuffix("key", "$"); // "key$"
 * ensureSuffix("key$", "$"); // "key$"
 */
export function ensureSuffix<T extends string, S extends string>(
	string: string extends T ? never : T,
	suffix: string extends S ? never : S,
): EnsureSuffix<T, S>;
/**
 * Adds a suffix to a string if it doesn't already have it.
 *
 * @example
 * ensureSuffix("key", "$"); // "key$"
 * ensureSuffix("key$", "$"); // "key$"
 */
export function ensureSuffix(string: string, suffix: string): string;
export function ensureSuffix(string: string, suffix: string): string {
	return string.endsWith(suffix) ? string : `${string}${suffix}`;
}

/**
 * Removes a suffix from a string if it has it.
 *
 * @example
 * unSuffix("key$", "$"); // "key"
 * unSuffix("key", "$"); // "key"
 */
export function unSuffix<T extends string, S extends string>(
	string: string extends T ? never : T,
	suffix: string extends S ? never : S,
): UnSuffix<T, S>;
/**
 * Removes a suffix from a string if it has it.
 *
 * @example
 * unSuffix("key$", "$"); // "key"
 * unSuffix("key", "$"); // "key"
 */
export function unSuffix(string: string, suffix: string): string;
export function unSuffix(string: string, suffix: string): string {
	return string.endsWith(suffix) ? string.slice(0, -suffix.length) : string;
}
