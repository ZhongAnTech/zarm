import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Popup from '../popup';
import ActivityIndicator from '../activity-indicator';

export interface LoadingProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Loading extends PureComponent<LoadingProps, {}> {
  static defaultProps = {
    prefixCls: 'za-loading',
    mask: true,
  };

  static zarmLoading: HTMLElement | null;

  static hideHelper: () => void;

  static show = (children: any, stayTime?: number, mask?: boolean, afterClose?: () => void) => {
    Loading.unmountNode();
    if (!Loading.zarmLoading) {
      Loading.zarmLoading = document.createElement('div');
      Loading.zarmLoading.classList.add('loading-container');
      document.body.appendChild(Loading.zarmLoading);
    }
    setTimeout(() => {
      if (Loading.zarmLoading) {
        ReactDOM.render(
          <Loading visible stayTime={stayTime} mask={mask} afterClose={afterClose} getContainer={Loading.zarmLoading}>
            {children}
          </Loading>,
          Loading.zarmLoading,
        );
      }
    }, 0);
  };

  static hide = () => {
    if (Loading.hideHelper) {
      Loading.hideHelper();
    }
  };

  static unmountNode = () => {
    const { zarmLoading } = Loading;
    if (zarmLoading) {
      ReactDOM.render(<></>, zarmLoading);
    }
  };

  private timer;

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Loading.hideHelper = this._hide;
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
    const { prefixCls, children, stayTime, className, ...others } = this.props;
    const { visible } = this.state;
    const cls = classnames(prefixCls, className);
    return (
      <Popup
        direction="center"
        maskType="transparent"
        width="70%"
        {...others}
        visible={visible}
        afterClose={this.afterClose}
      >
        <div className={cls}>
          <div className={`${prefixCls}__container`}>{children || <ActivityIndicator type="spinner" size="lg" />}</div>
        </div>
      </Popup>
    );
  }
}
