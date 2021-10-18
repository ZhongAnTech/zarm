import React, { useRef, useState, useContext } from 'react';
import type { HTMLAttributes, MouseEvent, CSSProperties } from 'react';
import classnames from 'classnames';
import Scroller from '../scroller';
import { scrollTo } from '../utils/dom';
import { ConfigContext } from '../n-config-provider';

import BaseBackTopTopProps from './interface';

export type BackTopTopProps = BaseBackTopTopProps & HTMLAttributes<HTMLDivElement>;

export const Content: React.FC<BackTopTopProps> = (props) => {
  const { children, style, onClick, scrollContainer, speed, visibleDistance } = props;
  const refScroller: any = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-back-to-top`;
  const cls = classnames(prefixCls);

  const onScroll = (scrollTop: number) => {
    setVisible(scrollTop > visibleDistance!);
  };

  const container = () => {
    return refScroller.current ? refScroller.current.scrollContainer : window;
  };

  const scrollTop = () => {
    return refScroller.current ? refScroller.current.scrollTop : 0;
  };

  const onClickScrollTopTop = (event: MouseEvent<HTMLDivElement>) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    // 速度设置为0或者无穷大时，直接到顶
    if (speed === 0 || speed === Infinity) {
      scrollTo(container(), 0, 0, 0);
      return;
    }

    const x: number = speed!;
    scrollTo(container(), 0, 0, scrollTop() / ((x / 10) * 1000));
  };

  const containerStyle: CSSProperties = {
    display: !visible ? 'none' : 'inline',
    position: 'fixed',
    bottom: 50,
    right: 50,
    ...style,
  };

  return (
    <>
      <div className={cls} style={containerStyle} onClick={onClickScrollTopTop}>
        {children}
      </div>
      <Scroller ref={refScroller} container={scrollContainer} onScroll={onScroll} />
    </>
  );
};

export default Content;
