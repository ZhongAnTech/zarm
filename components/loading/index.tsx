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

  private static mounted: boolean = false;

  static zarmLoading: null | HTMLElement;

  static show = (children: any, stayTime?: number, mask?: boolean, onClose?: () => void) => {
    if (!Loading.mounted) {
      Loading.zarmLoading = document.createElement('div');
      document.body.appendChild(Loading.zarmLoading);
      Loading.mounted = true;
    }
    if (Loading.zarmLoading) {
      ReactDOM.render(
        <Loading visible stayTime={stayTime} mask={mask} onClose={onClose}>
          {children}
        </Loading>,
        Loading.zarmLoading,
      );
    }
  };

  static _hide: () => void;

  static hide = () => {
    if (Loading._hide) {
      Loading._hide();
    }
  };

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Loading._hide = this._hide;
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;

    if (nextProps.visible !== visible) {
      if (nextProps.visible === true) {
        this.setState({
          visible: true,
        });
      } else {
        this._hide();
      }
    }
  }

  onClose = () => {
    const { onClose } = this.props;
    if (Loading.zarmLoading) {
      Loading.mounted = false;
      document.body.removeChild(Loading.zarmLoading);
      Loading.zarmLoading = null;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { prefixCls, children, stayTime, ...others } = this.props;
    const { visible } = this.state;
    return (
      <Toast prefixCls={prefixCls} stayTime={stayTime || 0} {...others} visible={visible} onClose={this.onClose}>
        {children || <ActivityIndicator type="spinner" size="lg" />}
      </Toast>
    );
  }
}
