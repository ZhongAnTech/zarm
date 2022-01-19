import * as React from 'react';
import Icon from '../icon';
import Font from '../icon/font';
import type { IconProps } from '../icon';

const SvgPlus = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const { mode } = props;

  if (mode === 'font') {
    const rest = { ...props, name: 'SvgPlus' };
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
          d="M537.5 537.5v325c0 20.71-16.79 37.5-37.5 37.5s-37.5-16.79-37.5-37.5v-325h-325c-20.71 0-37.5-16.79-37.5-37.5s16.79-37.5 37.5-37.5h325v-325c0-20.71 16.79-37.5 37.5-37.5s37.5 16.79 37.5 37.5v325h325c20.71 0 37.5 16.79 37.5 37.5s-16.79 37.5-37.5 37.5h-325z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgPlus);
export default ForwardRef;
