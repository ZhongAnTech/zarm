import { CSSProperties, AriaAttributes } from 'react';

export type Nullable<T> = T | null;

export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

// export type NonFunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? never : K;
// }[keyof T];

export type ZarmCSSProperties<T extends object = never> = CSSProperties & Partial<T>;

export type HTMLProps<T extends object = never> = AriaAttributes & {
  className?: string;
  style?: ZarmCSSProperties<T>;
};
