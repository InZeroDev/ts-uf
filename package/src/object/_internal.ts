import type { DictKey, Dict, IsNever, LacksType, Not, Keyof } from "@inzero/ts-ut";

export type IsKnownKey<K extends DictKey> = LacksType<DictKey, K>;
export type IsKnownDict<T extends Dict> = Not<IsNever<Keyof<T>>>;
