import * as React from 'react';
import Icon from '../icon';
import Font from '../icon/font';
import type { IconProps } from '../icon';

const SvgSuccess = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const { mode } = props;

  if (mode === 'font') {
    const rest = { ...props, name: 'SvgSuccess' };
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
          d="M119.415 524.046c-9.708-9.693-11.278-24.766-2.72-35.554l20.007-25.223c8.201-10.34 23.543-12.936 34.386-5.699l173.175 115.585c9.134 6.097 24.856 5.303 33.384-1.616l457.6-371.25c10.286-8.345 26.397-7.634 35.412 1.368l11.272 11.255c9.81 9.795 9.096 25.343-1.187 35.611l-491.14 490.414c-15.28 15.258-40.369 14.59-56.099-1.116l-214.09-213.775z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgSuccess);
export default ForwardRef;
