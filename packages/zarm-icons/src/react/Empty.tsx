import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgEmpty = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgEmpty' };
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
        <text fillRule="evenodd" fontFamily="PingFangSC-Regular, PingFang SC" fontSize={300}>
          <tspan x={-4498} y={1111}>
            {'\u7EBF\u6846\u56FE\u6807 - \u6709\u5BF9\u5E94\u7684\u5B9E\u5E95\u56FE\u6807'}
          </tspan>
        </text>
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgEmpty);
export default ForwardRef;
