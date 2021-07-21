import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { BaseModalProps } from './interface';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Alert from '../alert/Alert';
import Confirm from '../confirm/Confirm';
import { getRunTimeLocale } from '../config-provider/ConfigProvider';
import { ContainerType, getMountContainer } from '../utils/dom';

interface modalTypeProps {
  className?: string;
  mountContainer?: ContainerType;
  onCancel?: () => {};
  onOk?: () => {};
}
interface ModalTypeResult {
  hide: () => void;
  then: (resolve: any) => Promise<void>;
  catch: (_resolve: any, reject: any) => Promise<unknown>;
}

function modalType(props: modalTypeProps, type: string): ModalTypeResult {
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

  function render(visible: boolean) {
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
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
  alert: (props: modalTypeProps) => ModalTypeResult;
  confirm: (props: modalTypeProps) => ModalTypeResult;
}

export type ModalProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & BaseModalProps;

const Modal = React.forwardRef<unknown, ModalProps>((props, ref) => {
  const {
    className,
    shape,
    children,
    maskClosable,
    title,
    closable,
    footer,
    onCancel,
    ...others
  } = props;

  const modalRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-modal`;

  const cls = {
    modal: classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
    }),
    dialog: classnames(`${prefixCls}__dialog`),
  };

  const showHeader = title || closable;
  const noop = () => {};

  return (
    <Popup
      className={cls.modal}
      direction="center"
      onMaskClick={maskClosable ? onCancel : noop}
      {...others}
    >
      <div className={cls.dialog} ref={modalRef}>
        {showHeader && <ModalHeader title={title} closable={closable} onCancel={onCancel} />}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Popup>
  );
}) as CompoundedComponent;

Modal.displayName = 'Modal';
Modal.defaultProps = {
  visible: false,
  animationType: 'fade',
  animationDuration: 200,
  width: '70%',
  mask: true,
  maskType: 'normal',
  shape: 'radius',
  closable: false,
  maskClosable: false,
  destroy: true,
};

Modal.alert = function alert(props) {
  return modalType(props, 'alert');
};

Modal.confirm = function confirm(props) {
  return modalType(props, 'confirm');
};

export default Modal;
