import React from 'react';
import classnames from 'classnames';
import { BackTop } from 'zarm';
import { ArrowUp as ArrowUpIcon } from '@zarm-design/icons';
import Header from '@/web/components/Header';
import './style.scss';

const Container = ({ className, children, ...others }) => {
  const cls = classnames('app-container', className);

  return (
    <div className={cls} {...others}>
      <Header>{children}</Header>
      <BackTop>
        <div className="scroll-to-top">
          <ArrowUpIcon size="sm" />
        </div>
      </BackTop>
    </div>
  );
};

export default Container;
