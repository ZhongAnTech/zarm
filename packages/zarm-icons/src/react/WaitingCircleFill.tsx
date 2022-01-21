import * as React from 'react';
import Icon from '../icon';
import type { IconProps } from '../icon';

const SvgWaitingCircleFill = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = { ...props, name: 'SvgWaitingCircleFill' };
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
          d="M500 0c275.714 0 500 224.286 500 500s-224.32 500-500 500C224.286 1000 0 775.714 0 500S224.32 0 500 0zm31.251 189.453h-61.524l.977 342.774 215.82 184.57 38.085-53.71-193.358-162.11V189.453z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgWaitingCircleFill);
export default ForwardRef;
