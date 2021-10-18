import React, { useState, useContext, HTMLAttributes } from 'react';
import type { MouseEvent, CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import useBackToTop from './useBackToTop';
import type { BaseBackTopTopProps } from './interface';

export type BackTopTopProps = BaseBackTopTopProps & HTMLAttributes<HTMLElement>;

const Content: React.FC<BackTopTopProps> = (props) => {
  const { children, style, onClick, scrollContainer, speed, visibleDistance } = props;
  const [visible, setVisible] = useState(false);

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-back-to-top`;
  const cls = classnames(prefixCls);

  const { scrollTo } = useBackToTop({
    speed,
    container: scrollContainer,
    onScroll: (scrollPosTop: number) => {
      setVisible(scrollPosTop > visibleDistance!);
    },
  });

  const onScrollTopTop = (event: MouseEvent<HTMLDivElement>) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    scrollTo();
  };

  const containerStyle: CSSProperties = {
    display: !visible ? 'none' : 'inline',
    position: !scrollContainer ? 'fixed' : 'absolute',
    ...style,
  };

  return (
    <div className={cls} style={containerStyle} onClick={onScrollTopTop}>
      {children}
    </div>
  );
};

export default Content;
