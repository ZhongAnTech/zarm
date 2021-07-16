import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseSwitchProps } from './interface';

export type SwitchProps = BaseSwitchProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const Switch = React.forwardRef<unknown, SwitchProps>((props, ref) => {
  const { className, style, disabled, checked, defaultChecked, onChange, ...restProps } = props;

  const switchRef = (ref as any) || React.createRef<HTMLDivElement>();
  const getChecked = checked || defaultChecked || false;
  const [currentChecked, setCurrentChecked] = React.useState(getChecked);

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-switch`;

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
    <span className={cls} style={style} ref={switchRef}>
      <input
        {...restProps}
        role="switch"
        aria-checked={currentChecked}
        type="checkbox"
        className={`${prefixCls}__input`}
        disabled={disabled}
        value={currentChecked ? 'on' : 'off'}
        checked={'checked' in props ? currentChecked : undefined}
        defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
        onChange={'onChange' in props ? onInputChange : undefined}
      />
    </span>
  );
});

Switch.displayName = 'Switch';

Switch.defaultProps = {
  disabled: false,
};

export default Switch;
