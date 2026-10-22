import type { Func, SmartExtract, Valid } from "@inzero/ts-ut";
import { isOneOf } from "./validation";

/**
 * Maps a value to another value if it is not `undefined` or `null`.
 *
 * @example
 * // Instead of:
 * function getDescription(func: FunctionDeclaration) {
 *   const description = func.getJsDocs().at(-1)?.getDescription();
 *   if (description === undefined) return;
 *   return convertJsDocLinks(description);
 * }
 * // You can do:
 * function getDescription(func: FunctionDeclaration) {
 *   return mapDefined(func.getJsDocs().at(-1)?.getDescription(), convertJSDocLinks);
 * }
 */
export function mapDefined<T, const R>(value: T, fn: Func<[value: Exclude<T, undefined | null>], R>): R | Extract<T, undefined | null> {
  return isOneOf(value, [undefined, null]) ? value as Valid : fn(value as Valid);
}