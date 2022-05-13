import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgCloseCircle = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgCloseCircle' };
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
        <g fillRule="evenodd">
          <g>
            <path d="M500 460.716l137.493-137.493c10.848-10.848 28.436-10.848 39.284 0l.101.102c10.735 10.848 10.645 28.344-.203 39.08l-138.207 136.78 138.309 138.308c10.848 10.848 10.848 28.436 0 39.284-10.848 10.848-28.436 10.848-39.284 0L498.98 538.264 359.85 675.956c-10.41 10.303-27.188 10.26-37.545-.097-10.34-10.341-10.34-27.107 0-37.448L460.716 500 323.223 362.507c-10.848-10.848-10.848-28.436 0-39.284 10.848-10.848 28.436-10.848 39.284 0L500 460.716z" />
            <path
              d="M190.64 809.36c170.855 170.854 447.865 170.854 618.72 0 170.854-170.855 170.854-447.865 0-618.72-170.855-170.854-447.865-170.854-618.72 0-170.854 170.855-170.854 447.865 0 618.72zm-44.193 44.193C79.79 786.896 35.887 706.101 14.74 620.821c-35.264-142.21-7.253-296.892 84.033-419.288a504.148 504.148 0 0147.674-55.086c195.262-195.263 511.844-195.263 707.106 0 195.263 195.262 195.263 511.844 0 707.106-195.262 195.263-511.844 195.263-707.106 0z"
              fillRule="nonzero"
            />
          </g>
        </g>
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgCloseCircle);
export default ForwardRef;
