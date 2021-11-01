import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgCloseCircleFill = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
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
          d="M500 0C224.32 0 0 224.286 0 500s224.286 500 500 500c275.68 0 500-224.286 500-500S775.714 0 500 0zm203.965 654c13.928 14 13.892 36.572-.072 50.5a35.644 35.644 0 01-25.213 10.429c-9.179 0-18.321-3.5-25.287-10.5L499.821 550.393l-154.07 152.43c-6.964 6.857-16.037 10.32-25.109 10.32-9.213 0-18.392-3.536-25.392-10.607-13.857-14.036-13.75-36.608.286-50.5L449.43 499.821 296.107 346c-13.93-13.965-13.893-36.572.07-50.5 13.966-13.965 36.536-13.892 50.5.07l153.536 154 154.071-152.427c14-13.892 36.643-13.75 50.5.286 13.892 14.036 13.75 36.643-.286 50.5l-153.89 152.213L703.965 654z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgCloseCircleFill);
export default ForwardRef;
