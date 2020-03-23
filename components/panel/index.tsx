import React, { HTMLAttributes, PureComponent } from 'react';
import classnames from 'classnames';
import { BasePanelProps } from './PropsType';

export type HTMLDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
>;

export interface PanelProps extends HTMLDivProps, BasePanelProps {
  prefixCls?: string;
  className?: string;
}

export default class Panel extends PureComponent<PanelProps, {}> {
  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, title, more, children } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return (
      <div className={cls}>
        <div className={`${prefixCls}__header`}>
          {title && <div className={`${prefixCls}__header__title`}>{title}</div>}
          {more && <div className={`${prefixCls}__header__more`}>{more}</div>}
        </div>
        <div className={`${prefixCls}__body`}>{children}</div>
      </div>
    );
  }
}
