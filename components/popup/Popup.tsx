import React, { PureComponent } from 'react';
import type PropsType from './PropsType';
import Portal from './Portal';

export interface PopupProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface PopupState {
  renderPortal?: boolean;
  portalVisible: boolean;
}

export default class Popup extends PureComponent<PopupProps, PopupState> {
  static defaultProps: PopupProps = {
    prefixCls: 'za-popup',
    destroy: true,
    visible: false,
  };

  portalRef: Portal | null;

  constructor(props: PopupProps) {
    super(props);
    const { visible } = props;
    this.state = { renderPortal: visible, portalVisible: visible };
    this.handlePortalUnmount = this.handlePortalUnmount.bind(this);
  }

  handlePortalUnmount() {
    const { destroy } = this.props;
    if (destroy) {
      this.setState({ renderPortal: false });
    } else {
      this.setState({ renderPortal: true, portalVisible: false });
    }
  }

  render() {
    const { renderPortal, portalVisible } = this.state;
    const { visible, destroy, ...others } = this.props;
    return (
      renderPortal && (
        <Portal
          ref={(ref) => {
            this.portalRef = ref;
          }}
          {...others}
          visible={portalVisible}
          handlePortalUnmount={this.handlePortalUnmount}
        />
      )
    );
  }
}
