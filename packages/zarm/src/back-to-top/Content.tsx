import React, { useRef, useState } from 'react';
import type { MouseEvent, CSSProperties } from 'react';

import Scroller from '../scroller';
import { scrollTo } from '../utils/dom';

export const Content = (props) => {
  const { children, style, scrollContainer, speed, onClick, visibleDistance } = props;
  const refScroller: any = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onScroll = (scrollTop: number) => {
    setVisible(scrollTop > visibleDistance!);
  };

  const container = () => {
    return refScroller.current ? refScroller.current.scrollContainer : window;
  };

  const scrollTop = () => {
    return refScroller.current ? refScroller.current.scrollTop : 0;
  };

  const onClickScrollTopTop = (event: MouseEvent) => {
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
      <div style={containerStyle} onClick={onClickScrollTopTop}>
        {children}
      </div>
      <Scroller ref={refScroller} container={scrollContainer} onScroll={onScroll} />
    </>
  );
};

export default Content;
