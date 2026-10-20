import type { Func, Params, RT } from "@inzero/ts-ut";

export function iife<const F extends Func>(func: F, ...args: Params<F>): RT<F> {
  return func(...args);
}

