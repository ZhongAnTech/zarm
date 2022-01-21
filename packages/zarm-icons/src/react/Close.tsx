import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgClose = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgClose' };
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
          d="M560.149 501.223l255.344 255.344c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L501.223 560.149 245.88 815.493c-16.272 16.272-42.654 16.272-58.925 0-16.272-16.272-16.272-42.654 0-58.926l255.344-255.344L186.954 245.88c-16.272-16.272-16.272-42.654 0-58.925 16.271-16.272 42.653-16.272 58.925 0l255.344 255.344 255.344-255.344c16.272-16.272 42.654-16.272 58.926 0 16.272 16.271 16.272 42.653 0 58.925L560.149 501.223z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgClose);
export default ForwardRef;
