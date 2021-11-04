import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgInfoCircleFill = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
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
          d="M500 0c275.714 0 500 224.286 500 500s-224.32 500-500 500C224.286 1000 0 775.714 0 500S224.32 0 500 0zm22.616 365.598H477.03c-6.207 0-11.349 4.913-11.5 11.7l-5.905 265.674-3.298 148.37c-.144 6.463 4.445 11.701 11.18 11.701h64.633c6.318 0 11.331-4.912 11.18-11.7l-2.82-126.91-1.6-71.918-4.783-215.216c-.144-6.462-5.601-11.7-11.5-11.7zm-22.554-140.81c-24.16 0-43.744 19.585-43.744 43.744 0 24.16 19.585 43.745 43.744 43.745 24.16 0 43.745-19.585 43.745-43.745 0-24.159-19.585-43.744-43.745-43.744z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgInfoCircleFill);
export default ForwardRef;
