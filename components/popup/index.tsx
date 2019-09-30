import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Portal from './Portal';

export interface PopupProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Popup extends PureComponent<PopupProps, any> {
  static defaultProps = {
    destroy: true,
    disableBodyScroll: true,
  };

  portalRef: Portal | null;

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

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible) {
      if (visible) {
        // eslint-disable-next-line
        this.setState({
          renderPortal: true,
          portalVisible: true,
        });
      } else {
        // eslint-disable-next-line
        this.setState({
          portalVisible: false,
        });
      }
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
    return renderPortal && <Portal ref={(ref) => { this.portalRef = ref; }} {...this.props} visible={portalVisible} handlePortalUnmount={this.handlePortalUnmount} />;
  }
}
