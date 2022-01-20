import * as React from 'react';
import Icon from '../icon';
import Font from '../icon/font';
import type { IconProps } from '../icon';

const SvgStar = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const { mode } = props;

  if (mode === 'font') {
    const rest = { ...props, name: 'SvgStar' };
    return <Font {...rest} />;
  }

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
          d="M726.275 620.749L911 413.697l-270.963-58.765L500.5 115 360.963 354.932 90 413.697 274.725 620.75 246.797 897 500.5 785.032 754.203 897l-27.928-276.251zm-226.278 231.33L222.446 974.377c-15.57 6.86-33.754-.2-40.616-15.768a30.803 30.803 0 01-2.459-15.526l30.553-301.736L7.835 415.193c-11.337-12.686-10.242-32.16 2.446-43.497a30.809 30.809 0 0114.007-7.136l296.434-64.186L473.375 38.306c8.564-14.701 27.425-19.678 42.128-11.115a30.807 30.807 0 0111.116 11.115l152.653 262.068 296.434 64.186c16.63 3.6 27.19 20 23.59 36.628a30.805 30.805 0 01-7.137 14.005l-202.09 226.154 30.554 301.736c1.714 16.927-10.62 32.039-27.548 33.753a30.81 30.81 0 01-15.527-2.46L499.997 852.08z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgStar);
export default ForwardRef;
