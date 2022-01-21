import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgEmpty = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgEmpty' };
  return React.createElement(Icon, {
    ...newProps,
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
