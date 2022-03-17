import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseSwitchProps } from './interface';

export interface SwitchCssVars {
  '--width'?: React.CSSProperties['width'];
  '--height'?: React.CSSProperties['height'];
  '--background'?: React.CSSProperties['background'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--transition'?: React.CSSProperties['transition'];
  '--checked-background'?: React.CSSProperties['background'];
  '--knob-background'?: React.CSSProperties['background'];
  '--knob-size'?: React.CSSProperties['width' | 'height'];
  '--knob-box-shadow'?: React.CSSProperties['boxShadow'];
  '--knob-border-color'?: React.CSSProperties['borderColor'];
  '--knob-border-width'?: React.CSSProperties['width'];
  '--knob-transition'?: React.CSSProperties['transition'];
}

export type SwitchProps = BaseSwitchProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const Switch = React.forwardRef<unknown, SwitchProps>((props, ref) => {
  const { className, style, disabled, checked, defaultChecked, onChange, ...restProps } = props;

  const switchRef = (ref as any) || React.createRef<HTMLDivElement>();
  const getChecked = checked || defaultChecked || false;
  const [currentChecked, setCurrentChecked] = React.useState(getChecked);

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('switch', { prefixCls });

  const cls = bem([
    className,
    {
      disabled,
    },
  ]);

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
        className={bem('input')}
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
