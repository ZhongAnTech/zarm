import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';
import confirmLocale from './locale/zh_CN';

export interface ConfirmProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Confirm extends PureComponent<ConfirmProps, {}> {
  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    locale: confirmLocale,
  };

  private static confirmContainer;

  static show = (props: ConfirmProps) => {
    const { defaultProps } = Confirm;
    let _props: any;

    if (typeof props === 'object') {
      _props = { ...defaultProps, ...props };
    } else {
      _props = { ...defaultProps };
    }

    Confirm.confirmContainer = document.createElement('div');
    document.body.appendChild(Confirm.confirmContainer);
    return new Promise((resolve) => {
      ReactDOM.render(
        <Confirm
          {..._props}
          visible
          onOk={() => {
            if (typeof _props.onOk === 'function') {
              _props.onOk();
            }
            resolve(true);
          }}
          onCancel={() => {
            if (typeof _props.onCancel === 'function') {
              _props.onCancel();
            }
            resolve(false);
          }}
        />,
        Confirm.confirmContainer,
      );
    });
  };

  static hide = () => {
    if (Confirm._hide) {
      Confirm._hide();
    }
  };

  static _hide: () => void;

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Confirm._hide = this._hide;
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

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  afterClose = () => {
    const { afterClose } = this.props;
    if (Confirm.confirmContainer) {
      document.body.removeChild(Confirm.confirmContainer);
      Confirm.confirmContainer = null;
    }

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  render() {
    const { prefixCls, className, title, message, okText, cancelText, onOk, onCancel, locale, ...others } = this.props;
    const { visible } = this.state;
    const cls = classnames(prefixCls, className);
    return (
      <Modal className={cls} {...others} visible={visible} afterClose={this.afterClose}>
        <Modal.Header title={title} />
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <div className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale.cancelText}</div>
          <div className={`${prefixCls}__button ${prefixCls}__button--ok`} onClick={onOk}>
            {okText || locale.okText}
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
