import type { DictKey, Dict, Keys } from "@inzero/ts-ut/dict";
import type { LacksType, IsNever, Not } from "@inzero/ts-ut/other";

export type IsKnownKey<K extends DictKey> = LacksType<DictKey, K>;
export type IsKnownDict<T extends Dict> = Not<IsNever<Keys<T>>>;
