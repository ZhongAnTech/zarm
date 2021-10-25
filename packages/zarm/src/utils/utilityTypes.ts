export type Nullable<T> = T | null;

export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type ModifyReturnType<OriginalFN, ReturnType> = OriginalFN extends (...a: infer A) => any
  ? (...a: A) => ReturnType
  : never;
