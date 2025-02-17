import * as React from 'react';
import type { IconProps } from '../icon';
import Icon from '../icon';

const SvgStarFill = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgStarFill' };
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
          d="M500.122 852.313L222.594 974.61c-15.569 6.86-33.752-.199-40.612-15.767a30.806 30.806 0 01-2.46-15.526l30.551-301.737L8.001 415.427C-3.335 402.74-2.24 383.266 10.447 371.93a30.806 30.806 0 0114.005-7.136l296.41-64.187L473.502 38.54c8.563-14.702 27.423-19.678 42.125-11.115a30.806 30.806 0 0111.115 11.115l152.64 262.067 296.41 64.187c16.628 3.6 27.188 20 23.588 36.627a30.806 30.806 0 01-7.137 14.006L790.171 641.58l30.55 301.737c1.714 16.927-10.618 32.038-27.545 33.752-5.3.537-10.65-.31-15.526-2.459L500.122 852.313z"
          fillRule="evenodd"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgStarFill);
export default ForwardRef;
