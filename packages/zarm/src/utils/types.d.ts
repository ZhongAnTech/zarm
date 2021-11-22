import * as React from 'react';

export type CSSVariables<T extends object = never> = React.CSSProperties & Partial<T>;
