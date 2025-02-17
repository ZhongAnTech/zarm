import * as React from 'react';
import type { IconProps } from '../icon';
import Icon from '../icon';

const SvgSuccessCircle = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgSuccessCircle' };
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
        <g fillRule="nonzero">
          <path d="M768.316 310.056l8.152 7.889c7.094 6.866 6.578 17.765-.859 24.962L420.41 686.668c-11.05 10.695-29.195 10.227-40.571-.782L225.005 536.038c-7.02-6.795-8.156-17.36-1.967-24.922l14.47-17.68c5.931-7.248 17.026-9.068 24.868-3.995l125.242 81.02c6.607 4.275 17.977 3.718 24.145-1.132l330.943-260.233c7.438-5.849 19.09-5.35 25.61.96z" />
          <path d="M500 937.5c241.625 0 437.5-195.875 437.5-437.5S741.625 62.5 500 62.5 62.5 258.375 62.5 500 258.375 937.5 500 937.5zm0 62.5C223.858 1000 0 776.142 0 500S223.858 0 500 0s500 223.858 500 500-223.858 500-500 500z" />
        </g>
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgSuccessCircle);
export default ForwardRef;
