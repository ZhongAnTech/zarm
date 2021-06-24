import * as React from 'react';
import type { BasePopupProps } from './interface';
import Portal from './Portal';

export interface PopupProps extends BasePopupProps {
  prefixCls?: string;
  className?: string;
}

const Popup = React.forwardRef<unknown, PopupProps>((props, ref) => {
  const { prefixCls, destroy, visible, ...restProps } = props;

  const popupRef = (ref as any) || React.createRef<typeof Portal>();
  const [renderPortal, setRenderPortal] = React.useState(false);
  const [portalVisible, setPortalVisible] = React.useState(visible);

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
      {...restProps}
    />
  );

  React.useEffect(() => {
    visible && setRenderPortal(true);
    setPortalVisible(visible);
  }, [visible, destroy]);

  return renderPortal ? portalRender : null;
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  prefixCls: 'za-popup',
  destroy: true,
  visible: false,
};

export default Popup;
