import React, { PureComponent } from 'react';
import Toast from '../Toast';
import Spinner from '../Spinner';
import PropsType from './PropsType';

export interface LoadingProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Loading extends PureComponent<LoadingProps, {}> {

  static defaultProps = {
    prefixCls: 'za-loading',
  };

  render() {
    const { prefixCls, ...others } = this.props;

    return (
      <Toast prefixCls={prefixCls} {...others}>
        <Spinner size="lg" className="rotate360" />
      </Toast>
    );
  }
}
