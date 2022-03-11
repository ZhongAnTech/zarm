import * as React from 'react';

export type Nullable<T> = T | null;

export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type Replace<
  S extends string,
  MatchStr extends string,
  ReplaceStr extends string
> = S extends `${infer Left}${MatchStr}${infer Right}` ? `${Left}${ReplaceStr}${Right}` : S;

export interface HTMLProps<T extends object = {}> {
  className?: string;
  style?: React.CSSProperties & Partial<T>;
};
