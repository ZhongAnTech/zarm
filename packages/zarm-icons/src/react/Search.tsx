import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgSearch = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgSearch' };
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
          d="M987.88 936.17l.011-.01-226.8-226.8c56.11-72.027 89.545-162.583 89.545-260.959 0-234.73-190.287-425.018-425.018-425.018C190.888 23.383.603 213.67.603 448.401.603 683.132 190.89 873.42 425.62 873.42c109.721 0 209.728-41.585 285.133-109.847l224.864 224.864.032-.032c6.723 6.952 16.127 11.292 26.558 11.292 20.417 0 36.965-16.548 36.965-36.965a36.852 36.852 0 00-11.294-26.56zM424.255 796.948c-192.937 0-349.34-156.406-349.34-349.34 0-192.933 156.403-349.338 349.34-349.338 192.933 0 349.341 156.405 349.341 349.339 0 192.933-156.408 349.339-349.341 349.339z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgSearch);
export default ForwardRef;
