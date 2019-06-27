
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import IconProps from './PropsType';
import SvgComponents from './component';

export function formatIconProps(props: IconProps) {
  const {
    prefixcls = 'za-icon', type = '', theme = 'default', size, className = '', style = {}, ...rest
  } = props;
  const needSizeClass = typeof size !== 'number';
  const cls = classnames({
    [prefixcls]: true,
    [`${prefixcls}-${type}`]: !!type,
    [`${prefixcls}--theme-${theme}`]: !!theme,
    [`${prefixcls}--size-${size}`]: needSizeClass && !!size,
    [className]: !!className,
  });

  if (!needSizeClass && size) {
    style.fontSize = size;
  }
  return {
    className: cls,
    style,
    prefixcls,
    type,
    theme,
    size,
    ...rest,
  };
}

export function generateIcon(svgComponent: ReactNode, props: IconProps) {
  return (
    <i {...props}>
      {svgComponent}
    </i>
  );
}

function Icon(props: IconProps) {
  const { type = '' } = props;
  const SvgComponent = SvgComponents[type];
  const newProps = formatIconProps(props);
  return generateIcon(<SvgComponent />, newProps);
}

export default Icon;
