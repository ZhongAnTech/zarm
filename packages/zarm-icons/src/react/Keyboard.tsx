import * as React from 'react';
import Icon from '../icon';
import Font from '../icon/font';
import type { IconProps } from '../icon';

const SvgKeyboard = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const { mode } = props;

  if (mode === 'font') {
    const rest = { ...props, name: 'SvgKeyboard' };
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
          d="M0 138h1000v600.537H0V138zm61.538 61.594v477.35h876.924v-477.35H61.538zm92.308 76.991h76.923v76.992h-76.923v-76.992zm123.077 0h76.923v76.992h-76.923v-76.992zm123.077 0h76.923v76.992H400v-76.992zm123.077 0H600v76.992h-76.923v-76.992zm123.077 0h76.923v76.992h-76.923v-76.992zm123.077 0h76.923v76.992H769.23v-76.992zM215.385 399.772h76.923v76.992h-76.923v-76.992zm123.077 0h76.923v76.992h-76.923v-76.992zm123.076 0h76.924v76.992h-76.924v-76.992zm123.077 0h76.923v76.992h-76.923v-76.992zm123.077 0h76.923v76.992h-76.923v-76.992zM153.846 522.96h76.923v76.992h-76.923V522.96zm615.385 0h76.923v76.992H769.23V522.96zm-492.308 0h446.154v76.992H276.923V522.96zm138.462 246.374H600l-92.308 92.39-92.307-92.39z"
          fillRule="nonzero"
        />
      </svg>
    ),
  });
};

const ForwardRef = React.forwardRef(SvgKeyboard);
export default ForwardRef;
