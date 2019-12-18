import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Alert from '../alert/Alert';
import Confirm from '../confirm/Confirm';
import { getRunTimeLocale } from '../locale-provider/LocaleProvider';


function modalType(props, type) {
  const div = document.createElement('div');
  document.body.appendChild(div);

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
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(visible) {
    const runTimeLocale = getRunTimeLocale();
    if (type === 'alert') {
      let _props: any = props;
      if (runTimeLocale && runTimeLocale.Alert) {
        _props = { ...props, locale: runTimeLocale.Alert };
      }
      ReactDOM.render(
        <Alert {..._props} onCancel={() => { _onCancel(render); }} afterClose={_afterClose} visible={visible} />,
        div,
      );
    } else {
      let _props: any = props;
      if (runTimeLocale && runTimeLocale.Confirm) {
        _props = { ...props, locale: runTimeLocale.Confirm };
      }
      ReactDOM.render(
        <Confirm {..._props} onCancel={() => { _onCancel(render); }} onOk={() => { _onOk(render); }} afterClose={_afterClose} visible={visible} />,
        div,
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
