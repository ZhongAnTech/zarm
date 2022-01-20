import * as React from 'react';
import Icon from '../icon';
import Font from '../icon/font';
import type { IconProps } from '../icon';

const SvgEmpty = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const { mode } = props;

  if (mode === 'font') {
    const rest = { ...props, name: 'SvgEmpty' };
    return <Font {...rest} />;
  }

  return React.createElement(Icon, {
    ...props,
    component: () => (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 1000 1000"
        fill="currentColor"
        focusable={false}
        aria-hidden="true"
        ref={svgRef}
      />
    ),
  });
};

const ForwardRef = React.forwardRef(SvgEmpty);
export default ForwardRef;
