import * as React from 'react';
import Portal from './Portal';
import { ConfigContext } from '../n-config-provider';
import type { BasePopupProps } from './interface';

export interface PopupProps extends BasePopupProps {
  className?: string;
}

const Popup = React.forwardRef<unknown, PopupProps>((props, ref) => {
  const { destroy, visible, ...restProps } = props;

  const popupRef = (ref as any) || React.createRef<typeof Portal>();
  const [renderPortal, setRenderPortal] = React.useState(false);
  const [portalVisible, setPortalVisible] = React.useState(visible);

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-popup`;

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
  destroy: true,
  visible: false,
};

export default Popup;
