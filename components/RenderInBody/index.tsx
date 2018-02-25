import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Portal from '../Portal';

const IS_REACT_16 = !!(ReactDOM as any).createPortal;

export interface PortalProps {
  prefixCls?: string;
  className?: any;
  children?: any;
}

class RenderInBody extends PureComponent<PortalProps, any> {
  private container ;

  componentDidMount() {
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    if (!IS_REACT_16) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
    document.body.removeChild(this.container);
  }

  getContainer() {
    let container = document.querySelector(`#${this.props.prefixCls}-containerhm`);
    if (!container) {
      container = document.createElement('div');
      container.classList.add(this.props.className);
      document.body.appendChild(container);
    }
    this.container = container;
    return container;
  }

  _renderLayer() {
    if (IS_REACT_16) {
      return;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.props.children,
      this.getContainer(),
    );
  }

  renderPortal() {
    if (!IS_REACT_16) {
      return null;
    }

    const portal = (
      <Portal getContainer={() => this.getContainer()}>
        {this.props.children}
      </Portal>
    );
    return portal;
  }

  render() {
    // Render a placeholder
    return (
      <div>
        {this.renderPortal()}
      </div>
    );
  }
}

export default RenderInBody;
