import { createBEM } from '@zarm-design/bem';
import React, { FC, useContext } from 'react';
import { ConfigContext } from '../config-provider';
import List from '../list';
import { useControllableValue } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxGroupProps } from './interface';

export interface CheckboxGroupCssVars {
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

const getValue = (props: CheckboxGroupProps, defaultValue?: CheckboxValue[]) => {
  return props.value ?? props.defaultValue ?? defaultValue;
};

export type CheckboxGroupProps = BaseCheckboxGroupProps & HTMLProps<CheckboxGroupCssVars>;

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const [value, setValue] = useControllableValue(props, { defaultValue: [] });
  // const [value, setValue] = useState(getValue(props, []));
  const { type, block, disabled, className } = props;
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

  // useEffect(() => {
  //   setValue(getValue(props));
  // }, [props.value]);

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        disabled: props.disabled,
        check: (v) => {
          const values = [...value, v];
          setValue(values);
          // props.onChange?.(values);
        },
        uncheck: (v) => {
          const values = value.filter((item) => item !== v);
          setValue(values);
          // props.onChange?.(values);
        },
      }}
    >
      <div className={cls}>
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
};

export default CheckboxGroup;
