import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Alert from '../alert/Alert';
import Confirm from '../confirm/Confirm';
import { getRunTimeLocale } from '../config-provider/ConfigProvider';
import { getMountContainer } from '../utils/dom';

function modalType(props, type) {
  const { className = '', mountContainer } = props;
  const container = document.createElement('div');
  container.className += `za-${type}-container ${className}`;
  const mountNode = getMountContainer(mountContainer);
  mountNode.appendChild(container);

  let resolveFn = (result: boolean) => result;
  const { onCancel, onOk } = props;

  function _onCancel(renderFn) {
    if (!onCancel) {
      renderFn(false);
      resolveFn(false);
      return;
    }
    const cancelResult = onCancel();
    if (cancelResult instanceof Promise) {
      cancelResult.then((res) => {
        if (res === false) {
          return;
        }
        renderFn(false);
        resolveFn(true);
      });
    } else {
      if (cancelResult === false) {
        return;
      }
      renderFn(false);
      resolveFn(true);
    }
  }

  function _onOk(renderFn) {
    if (!onOk) {
      renderFn(false);
      resolveFn(true);
      return;
    }
    const okResult = onOk();
    if (okResult instanceof Promise) {
      okResult.then((res) => {
        if (res === false) {
          return;
        }
        renderFn(false);
        resolveFn(true);
      });
    } else {
      if (okResult === false) {
        return;
      }
      renderFn(false);
      resolveFn(true);
    }
  }

  function _afterClose() {
    if (mountNode) {
      mountNode.removeChild(container);
      ReactDOM.unmountComponentAtNode(container);
    }
  }

  function render(visible) {
    const runTimeLocale = getRunTimeLocale();
    if (type === 'alert') {
      let _props: any = props;
      if (runTimeLocale && runTimeLocale.Alert) {
        _props = { ...props, className: '', locale: runTimeLocale.Alert };
      }
      ReactDOM.render(
        <Alert
          {..._props}
          mountContainer={false}
          onCancel={() => {
            _onCancel(render);
          }}
          afterClose={_afterClose}
          visible={visible}
        />,
        container,
      );
    } else {
      let _props: any = props;
      if (runTimeLocale && runTimeLocale.Confirm) {
        _props = { ...props, className: '', locale: runTimeLocale.Confirm };
      }
      ReactDOM.render(
        <Confirm
          {..._props}
          mountContainer={false}
          onCancel={() => {
            _onCancel(render);
          }}
          onOk={() => {
            _onOk(render);
          }}
          afterClose={_afterClose}
          visible={visible}
        />,
        container,
      );
    }
  }

  const returnResult = new Promise((resolve) => {
    resolveFn = resolve as typeof resolveFn;
    render(true);
  });

  return {
    hide: () => {
      render(false);
      resolveFn(true);
    },
    then: (resolve) => {
      return returnResult.then((res) => {
        resolve(res);
      });
    },
    catch: (_resolve, reject) => {
      return returnResult.catch((res) => {
        reject(res);
      });
    },
  };
}

Modal.alert = function alert(props) {
  return modalType(props, 'alert');
};

Modal.confirm = function confirm(props) {
  return modalType(props, 'confirm');
};

export default Modal;
