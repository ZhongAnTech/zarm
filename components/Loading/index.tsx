import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropsType from './PropsType';
import Toast from '../toast';
import Spinner from '../spinner';

export interface LoadingProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Loading extends PureComponent<LoadingProps, {}> {
  static defaultProps = {
    prefixCls: 'za-loading',
  };

  static show = (props) => {
    ReactDOM.render(<Loading {...props} visible />, window.zarmLoading);
  }

  static hide = () => {
    ReactDOM.render(<Loading visible={false} />, window.zarmLoading);
  }

  render() {
    const { prefixCls, ...others } = this.props;

    return (
      <Toast prefixCls={prefixCls} {...others} stayTime={0}>
        <Spinner size="lg" className="rotate360" />
      </Toast>
    );
  }
}

if (typeof window !== 'undefined') {
  if (!window.zarmLoading) {
    window.zarmLoading = document.createElement('div');
    document.body.appendChild(window.zarmLoading);
  }

  ReactDOM.render(<Loading visible={false} />, window.zarmLoading);
}
