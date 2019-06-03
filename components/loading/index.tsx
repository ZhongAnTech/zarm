import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropsType from './PropsType';
import Toast from '../toast';
import ActivityIndicator from '../activity-indicator';

export interface LoadingProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Loading extends PureComponent<LoadingProps, {}> {
  static defaultProps = {
    prefixCls: 'za-loading',
  };

  static zarmLoading: HTMLElement;

  static show = () => {
    // if (!Loading.zarmLoading) {
    //   Loading.zarmLoading = document.createElement('div');
    // }
    // document.body.appendChild(Loading.zarmLoading);
    // ReactDOM.render(<Loading {...props} visible />, Loading.zarmLoading);
    Toast.show(<ActivityIndicator size="lg" className="rotate360" />, 0);
  };

  static hide = () => {
    ReactDOM.render(<Loading
      visible={false}
      // onClose={Loading.unmountNode}
    />, Loading.zarmLoading);
  };

  static unmountNode = () => {
    const { zarmLoading } = Loading;
    if (zarmLoading) {
      ReactDOM.unmountComponentAtNode(zarmLoading);
      if (zarmLoading.parentNode) {
        zarmLoading.parentNode.removeChild(Loading.zarmLoading);
      }
    }
  };

  render() {
    const { prefixCls, ...others } = this.props;

    return (
      <Toast prefixCls={prefixCls} {...others} stayTime={0}>
        <ActivityIndicator type="spinner" size="lg" />
      </Toast>
    );
  }
}
