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
      renderPortal: false,
    };
    this.handlePortalUnmount = this.handlePortalUnmount.bind(this);
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.setState({
        renderPortal: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible && visible === true) {
      // eslint-disable-next-line
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
