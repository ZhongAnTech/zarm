import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Portal from './Portal';

export interface PopupProps extends PropsType {
  prefixCls?: string;
  className?: string;
}
export default class Popup extends PureComponent<PopupProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      renderPortal: true,
    };
    this.handlePortalUnmount = this.handlePortalUnmount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (nextProps.visible !== visible && nextProps.visible === true) {
      this.setState({
        renderPortal: true,
      });
    }
  }

  handlePortalUnmount() {
    this.setState({
      renderPortal: false,
    });
  }

  render() {
    const { renderPortal } = this.state;
    return renderPortal && <Portal {...this.props} handlePortalUnmount={this.handlePortalUnmount} />;
  }
}
