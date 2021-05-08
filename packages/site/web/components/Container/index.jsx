import React from 'react';
import classnames from 'classnames';
import { Icon, BackToTop } from 'zarm';
import Header from '@/web/components/Header';
import './style.scss';

const Container = ({ className, children, ...others }) => {
  const cls = classnames('app-container', className);

  return (
    <div className={cls} {...others}>
      <Header>{children}</Header>
      <BackToTop>
        <div className="scroll-to-top">
          <Icon type="arrow-top" size="sm" />
        </div>
      </BackToTop>
    </div>
  );
};

export default Container;
