import { useNavigate } from 'dumi';
import type { MouseEvent } from 'react';
import * as React from 'react';

export type LinkProps = {
  to?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { to, children, ...rest } = props;
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!to.startsWith('http')) {
      if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        React.startTransition(() => {
          navigate(to);
        });
      }
    }
  };

  return (
    <a ref={ref} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});
