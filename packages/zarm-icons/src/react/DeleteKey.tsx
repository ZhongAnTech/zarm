import * as React from 'react';
import type { IconProps } from '../icon';
import Icon from '../icon';

const SvgDeleteKey = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgDeleteKey' };
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
          d="M606.557 535.541l129.246 129.246 35.956-35.956-129.246-129.246L771.76 370.34l-35.956-35.956-129.246 129.246-129.246-129.246-35.956 35.956L570.6 499.585 441.355 628.831l35.956 35.956 129.246-129.246zm217.006-341.967c61.114 0 110.863 49.027 110.863 109.29v393.443c0 60.262-49.727 109.29-110.863 109.29H409.836a112.175 112.175 0 01-79.979-33.618L72.852 515.673l-.416-.438-.415-.415a21.094 21.094 0 01-6.426-15.257c0-4.044 1.115-9.989 6.426-15.257l.415-.415.416-.437L329.857 227.17a112.131 112.131 0 0179.979-33.64h413.727v.044zm0-65.574H427.519a177.18 177.18 0 00-126.973 53.465L25.857 437.77a86.842 86.842 0 000 123.65l274.689 256.306a177.18 177.18 0 00126.973 53.465h396.044c97.442 0 176.437-78.295 176.437-174.864V302.885C1000 206.295 921.005 128 823.563 128z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgDeleteKey);
export default ForwardRef;
