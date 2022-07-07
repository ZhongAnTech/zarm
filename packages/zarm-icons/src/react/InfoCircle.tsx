import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgInfoCircle = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgInfoCircle' };
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
          <path
            d="M499.938 937.383c241.594 0 437.445-195.851 437.445-437.445 0-241.595-195.851-437.446-437.445-437.446-241.595 0-437.446 195.851-437.446 437.446 0 241.594 195.851 437.445 437.446 437.445zm0 62.492C223.83 999.875 0 776.045 0 499.938 0 223.83 223.83 0 499.938 0c276.107 0 499.937 223.83 499.937 499.938 0 276.107-223.83 499.937-499.937 499.937z"
            fillRule="nonzero"
          />
          <path d="M456.326 791.343c-.144 6.462 4.445 11.7 11.18 11.7h64.633c6.318 0 11.331-4.912 11.18-11.7l-9.203-414.044c-.144-6.462-5.601-11.7-11.5-11.7H477.03c-6.207 0-11.349 4.912-11.5 11.7l-9.203 414.044zm43.736-479.066c-24.16 0-43.744-19.585-43.744-43.745 0-24.159 19.585-43.744 43.744-43.744 24.16 0 43.745 19.585 43.745 43.744 0 24.16-19.585 43.745-43.745 43.745z" />
        </g>
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgInfoCircle);
export default ForwardRef;
