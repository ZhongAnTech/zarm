import { CSSProperties, AriaAttributes } from 'react';

export type Nullable<T> = T | null;

export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ZarmCSSProperties<T extends object = never> = CSSProperties & Partial<T>;

export type HTMLProps = AriaAttributes & {
  className?: string;
  style?: CSSProperties;
};
