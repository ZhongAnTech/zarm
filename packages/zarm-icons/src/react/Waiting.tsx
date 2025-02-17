import * as React from 'react';
import type { IconProps } from '../icon';
import Icon from '../icon';

const SvgWaiting = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgWaiting' };
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
          d="M470.704 532.227l-.977-342.774h61.524v311.524l193.358 162.11-38.086 53.71z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgWaiting);
export default ForwardRef;
