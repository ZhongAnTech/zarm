import * as React from 'react';
import { Icon } from 'zarm';
import type { IconProps } from 'zarm';

const SvgMinus = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
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
      >
        <path
          d="M537.5 537.5h-400c-20.71 0-37.5-16.79-37.5-37.5s16.79-37.5 37.5-37.5h725c20.71 0 37.5 16.79 37.5 37.5s-16.79 37.5-37.5 37.5h-325z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgMinus);
export default ForwardRef;
