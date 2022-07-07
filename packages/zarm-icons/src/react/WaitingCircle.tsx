import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgWaitingCircle = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgWaitingCircle' };
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
        <path
          d="M500.001 1000C223.855 1000 0 776.145 0 500 0 223.854 223.855 0 500.001 0 776.145 0 1000 223.854 1000 500c0 276.145-223.856 500-499.999 500zm0-936.524C258.921 63.476 63.476 258.922 63.476 500c0 241.077 195.445 436.524 436.524 436.524 241.078 0 436.526-195.447 436.526-436.524 0-241.078-195.447-436.524-436.525-436.524zm-29.297 468.75l-.572-200.73-.405-142.043h61.524v311.524l85.85 71.976 107.508 90.134-38.086 53.71-215.82-184.57z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgWaitingCircle);
export default ForwardRef;
