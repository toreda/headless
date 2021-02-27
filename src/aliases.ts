// Self commenting use of any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type AnyFunction<T = unknown> = () => T;

export type AnyObj<T = unknown> = Record<string, T>;
