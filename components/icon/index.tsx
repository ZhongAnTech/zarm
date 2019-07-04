import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconProps from './PropsType';
import SvgComponents from './component';

export function formatIconProps(props: IconProps) {
  const { prefixcls = 'za-icon', type = '', theme = 'default', size, className = '', style = {}, ...rest } = props;

  const cls = classnames(prefixcls, className, {
    [`${prefixcls}-${type}`]: !!type,
    [`${prefixcls}--theme-${theme}`]: !!theme,
    [`${prefixcls}--size-${size}`]: !!size,
  });

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

class Icon extends Component<IconProps, {}> {
  static displayName = 'Icon';

  static defaultProps = {
    type: 'add',
  };

  static propTypes = {
    type: PropTypes.string,
  };

  render() {
    const { type = '' } = this.props;
    const SvgComponent = SvgComponents[type];
    const newProps = formatIconProps(this.props);
    return generateIcon(<SvgComponent />, newProps);
  }
}

export default Icon;
