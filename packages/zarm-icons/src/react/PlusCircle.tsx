import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgPlusCircle = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgPlusCircle' };
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
      >
        <g fillRule="evenodd">
          <path d="M472.222 472.222V277.778C472.222 262.437 484.66 250 500 250h.143c15.262.08 27.57 12.516 27.49 27.777l-1.009 194.445h195.598C737.563 472.222 750 484.66 750 500s-12.437 27.778-27.778 27.778H526.336l-1.017 195.743C525.243 738.167 513.35 750 498.702 750c-14.624 0-26.48-11.855-26.48-26.48V527.778H277.778C262.437 527.778 250 515.34 250 500s12.437-27.778 27.778-27.778h194.444z" />
          <path
            d="M500 937.5c241.625 0 437.5-195.875 437.5-437.5S741.625 62.5 500 62.5 62.5 258.375 62.5 500 258.375 937.5 500 937.5zm0 62.5C223.858 1000 0 776.142 0 500S223.858 0 500 0s500 223.858 500 500-223.858 500-500 500z"
            fillRule="nonzero"
          />
        </g>
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgPlusCircle);
export default ForwardRef;
