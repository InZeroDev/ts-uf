import type { Func } from "@inzero/ts-ut/func";

export type RepeatData = ({ end: number } | { count: number }) & { start?: number; step?: number };

export type RepeatCbParams = [index: number];

export type RepeatCbRT = boolean | number | void;

export type RepeatCb = Func<RepeatCbParams, RepeatCbRT>;
export type RepeatAsyncCb = Func<RepeatCbParams, Promise<RepeatCbRT>>;

export type RepeatWhileCondition = Func<RepeatCbParams, boolean>;
export type RepeatWhileAsyncCondition = Func<RepeatCbParams, Promise<boolean>>;
