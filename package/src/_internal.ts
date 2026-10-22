import type { Dict, Func, HasType, IsAny, IsUnknown, ROList } from "@inzero/ts-ut";

export type _CheckT<T, Type> = IsUnknown<T> | IsAny<T> extends false
  ? HasType<T, Type> extends true ? T : Type : T;

