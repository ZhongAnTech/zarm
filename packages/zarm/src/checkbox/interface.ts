export type CheckboxValue = number | string;

export interface BaseCheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: CheckboxValue;
  id?: string;
  indeterminate?: boolean;
}

export interface BaseCheckboxGroupProps {
  type?: 'button' | 'list';
  disabled?: boolean;
  block?: boolean;
  iconAlign?: 'before' | 'after';
  defaultValue?: Array<CheckboxValue>;
  value?: Array<CheckboxValue>;
  onChange?: (value: Array<CheckboxValue>) => void;
  children?: React.ReactNode;
}

export interface CheckboxCssVars {
  '--icon-size'?: React.CSSProperties['height'];
  '--icon-background'?: React.CSSProperties['background'];
  '--icon-border-radius'?: React.CSSProperties['borderRadius'];
  '--icon-border-width'?: React.CSSProperties['borderWidth'];
  '--icon-border-color'?: React.CSSProperties['borderColor'];
  '--tick-font-size'?: React.CSSProperties['fontSize'];
  '--tick-color'?: React.CSSProperties['color'];
  '--tick-transition'?: React.CSSProperties['transition'];
  '--text-margin-horizontal'?: React.CSSProperties['marginLeft'];
  '--active-opacity'?: React.CSSProperties['opacity'];
  '--checked-icon-background'?: React.CSSProperties['background'];
  '--checked-icon-border-color'?: React.CSSProperties['borderColor'];
  '--checked-tick-color'?: React.CSSProperties['color'];
  '--disabled-icon-background'?: React.CSSProperties['background'];
  '--disabled-icon-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-text-color'?: React.CSSProperties['color'];
  '--disabled-tick-color'?: React.CSSProperties['color'];
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}
