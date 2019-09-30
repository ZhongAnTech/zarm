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
    mask: true,
    disableBodyScroll: false,
  };

  static zarmLoading: null | HTMLElement;

  static show = (children: any, stayTime?: number, mask?: boolean, afterClose?: () => void) => {
    Loading.unmountNode();
    if (!Loading.zarmLoading) {
      Loading.zarmLoading = document.createElement('div');
      document.body.appendChild(Loading.zarmLoading);
    }
    if (Loading.zarmLoading) {
      ReactDOM.render(
        <Loading visible stayTime={stayTime} mask={mask} afterClose={afterClose}>
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

  static unmountNode = () => {
    const { zarmLoading } = Loading;
    if (zarmLoading) {
      ReactDOM.unmountComponentAtNode(zarmLoading);
    }
  };

  private timer;

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Loading._hide = this._hide;
    this.autoClose();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      if (visible === true) {
        // eslint-disable-next-line
        this.setState({
          visible: true,
        });
        this.autoClose();
      } else {
        this._hide();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  afterClose = () => {
    const { afterClose } = this.props;
    if (Loading.zarmLoading) {
      document.body.removeChild(Loading.zarmLoading);
      Loading.zarmLoading = null;
    }

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  autoClose() {
    const { stayTime } = this.props;

    if ((stayTime as number) > 0) {
      this.timer = setTimeout(() => {
        this._hide();
        clearTimeout(this.timer);
      }, stayTime);
    }
  }

  render() {
    const { prefixCls, children, stayTime, ...others } = this.props;
    const { visible } = this.state;
    return (
      <Toast prefixCls={prefixCls} stayTime={stayTime || 0} {...others} visible={visible} afterClose={this.afterClose}>
        {children || <ActivityIndicator type="spinner" size="lg" />}
      </Toast>
    );
  }
}
