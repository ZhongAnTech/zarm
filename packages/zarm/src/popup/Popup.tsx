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

  static getDerivedStateFromProps(props: PopupProps, state: PopupState) {
    if (props.visible !== state.portalVisible) {
      if (props.visible) {
        return {
          renderPortal: true,
          portalVisible: true,
        };
      }
      return {
        portalVisible: false,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      renderPortal: false,
      portalVisible: false,
    };
    this.handlePortalUnmount = this.handlePortalUnmount.bind(this);
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.setState({
        renderPortal: true,
        portalVisible: true,
      });
    }
  }

  handlePortalUnmount() {
    const { destroy } = this.props;
    if (destroy) {
      this.setState({
        renderPortal: false,
      });
    } else {
      this.setState({
        renderPortal: true,
        portalVisible: false,
      });
    }
  }

  render() {
    const { renderPortal, portalVisible } = this.state;
    return (
      renderPortal && (
        <Portal
          ref={(ref) => {
            this.portalRef = ref;
          }}
          {...this.props}
          visible={portalVisible}
          handlePortalUnmount={this.handlePortalUnmount}
        />
      )
    );
  }
}
