import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgInfo = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
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
          d="M444.455 818.474c-.183 8.206 5.676 14.86 14.278 14.86h82.534c8.069 0 14.47-6.24 14.278-14.86l-11.753-525.836c-.183-8.207-7.153-14.86-14.685-14.86h-58.214c-7.927 0-14.492 6.239-14.685 14.86l-11.753 525.836zM500 111.11c-30.682 0-55.556 24.873-55.556 55.556 0 30.682 24.874 55.555 55.556 55.555s55.556-24.873 55.556-55.555c0-30.683-24.874-55.556-55.556-55.556z"
          fillRule="evenodd"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgInfo);
export default ForwardRef;
