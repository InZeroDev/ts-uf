import type { Dict, Func, HasType, IsAny, IsUnknown, ROList } from "@inzero/ts-ut";

export type _CheckT<T, Type, TypeName extends string> = _AdvCheckT<
	T,
	HasType<T, Type>,
	`value can never be ${TypeName}`
>;

export type _AdvCheckT<T, Check extends boolean, Message extends string> =
	IsUnknown<T> | IsAny<T> extends false
	? Check extends true
		? T
		: { __error: Message }
	: T;
