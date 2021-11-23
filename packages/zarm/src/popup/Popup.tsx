import * as React from 'react';
import Portal from './Portal';
import { ConfigContext } from '../n-config-provider';
import type { BasePopupProps } from './interface';
import { useLockScroll } from '../utils/hooks';

export interface PopupProps extends BasePopupProps {
  className?: string;
  style?: React.CSSProperties;
}

const Popup = React.forwardRef<unknown, PopupProps>((props, ref) => {
  const { destroy, visible, lockScroll, ...restProps } = props;
  const popupRef = React.useRef(null);
  const [renderPortal, setRenderPortal] = React.useState(false);
  const [portalVisible, setPortalVisible] = React.useState(visible);

  const { prefixCls: globalPrefixCls, mountContainer } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-popup`;

  useLockScroll(visible! && lockScroll!);

  const handlePortalUnmount = () => {
    destroy && setPortalVisible(false);
    setRenderPortal(!destroy);
  };

  const portalRender = (
    <Portal
      ref={popupRef}
      prefixCls={prefixCls}
      visible={portalVisible}
      handlePortalUnmount={handlePortalUnmount}
      mountContainer={mountContainer}
      {...restProps}
    />
  );

  React.useImperativeHandle(ref, () => popupRef.current!);

  React.useEffect(() => {
    visible && setRenderPortal(true);
    setPortalVisible(visible);
  }, [visible, destroy]);

  return renderPortal ? portalRender : null;
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  destroy: true,
  visible: false,
  lockScroll: true,
};

export default Popup;
