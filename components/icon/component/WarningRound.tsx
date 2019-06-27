import React from 'react';

const SvgWarningRound = props => (
  <svg
    viewBox="0 0 37 37"
    fill="currentColor"
    stroke="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <g stroke="none" fill="none" fillRule="evenodd">
      <path
        d="M35 18.5C35 27.613 27.613 35 18.5 35S2 27.613 2 18.5 9.387 2 18.5 2 35 9.387 35 18.5z"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.103 23.207c-.61 0-1.103-.494-1.103-1.104v-12a1.103 1.103 0 1 1 2.207 0v12c0 .61-.493 1.104-1.104 1.104m0 4.002c-.143 0-.286-.033-.419-.088A1.108 1.108 0 0 1 17 26.106c0-.298.12-.574.32-.784.11-.1.22-.187.364-.243a1.126 1.126 0 0 1 1.203.243c.199.21.32.486.32.784 0 .143-.033.286-.088.419a1.09 1.09 0 0 1-.232.353c-.21.21-.497.331-.784.331"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default SvgWarningRound;
