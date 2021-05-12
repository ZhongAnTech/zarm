import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgArrowDown = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
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
          d="M494.094 733.426a41.472 41.472 0 01-20.023-11.126L140.16 388.388c-16.272-16.271-16.272-42.653 0-58.925 16.271-16.272 42.653-16.272 58.925 0L503.66 634.037 808.186 329.51c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L533.2 722.347c-10.607 10.607-25.508 14.3-39.106 11.08z"
          fillRule="evenodd"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgArrowDown);
export default ForwardRef;
