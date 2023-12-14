import { createBEM } from '@zarm-design/bem';
import React, { FC, useContext } from 'react';
import { ConfigContext } from '../config-provider';
import List from '../list';
import type { HTMLProps } from '../utils/utilityTypes';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxGroupProps } from './interface';
import useSelect from '../use-select';


export interface CheckboxGroupCssVars {
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

// const getValue = (props: CheckboxGroupProps, defaultValue?: CheckboxValue[]) => {
//   return props.value ?? props.defaultValue ?? defaultValue;
// };

export type CheckboxGroupProps = BaseCheckboxGroupProps & HTMLProps<CheckboxGroupCssVars>;

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const [value, setValue] = useSelect({
    ...props,
    multiple: true,
  });
  const { type, block, disabled, iconAlign, className, style } = props;
  const { prefixCls } = useContext(ConfigContext);

  const bem = createBEM('checkbox-group', { prefixCls });
  const cls = bem([
    {
      [`${type}`]: !!type,
      block,
      disabled,
    },
    className,
  ]);

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        type,
        block,
        disabled,
        iconAlign,
        check: (v) => {
          setValue(v);
        },
        uncheck: (v) => {
          setValue(v);
        },
      }}
    >
      <div className={cls} style={style}>
        <div className={bem('inner')}>
          {type === 'list' ? <List>{props.children}</List> : props.children}
        </div>
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.defaultProps = {
  block: false,
  disabled: false,
  iconAlign: 'before',
};

export default CheckboxGroup;
