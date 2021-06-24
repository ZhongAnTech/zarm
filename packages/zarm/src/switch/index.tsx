import * as React from 'react';
import classnames from 'classnames';
import type { BaseSwitchProps } from './interface';

export interface SwitchProps
  extends BaseSwitchProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  prefixCls?: string;
}

const Switch = React.forwardRef<unknown, SwitchProps>((props, ref) => {
  const {
    prefixCls,
    className,
    style,
    disabled,
    checked,
    defaultChecked,
    onChange,
    ...restProps
  } = props;

  const switchRef = (ref as any) || React.createRef<HTMLElement>();
  const getChecked = checked || defaultChecked || false;
  const [currentChecked, setCurrentChecked] = React.useState(getChecked);

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--disabled`]: disabled,
  });

  const onInputChange = () => {
    const newChecked = !currentChecked;

    if (!('checked' in props)) {
      setCurrentChecked(newChecked);
    }

    if (typeof onChange === 'function') {
      onChange(newChecked);
    }
  };

  React.useEffect(() => {
    setCurrentChecked(getChecked);
  }, [getChecked]);

  return (
    <span className={cls} style={style}>
      <input
        {...restProps}
        ref={switchRef}
        role="switch"
        aria-checked={currentChecked}
        type="checkbox"
        className={`${prefixCls}__input`}
        disabled={disabled}
        value={getChecked ? 'on' : 'off'}
        checked={'checked' in props ? currentChecked : undefined}
        defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
        onChange={'onChange' in props ? onInputChange : undefined}
      />
    </span>
  );
});

Switch.displayName = 'Switch';

Switch.defaultProps = {
  prefixCls: 'za-switch',
  disabled: false,
};

export default Switch;
