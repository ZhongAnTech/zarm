import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class RenderInBody extends PureComponent {
  componentDidMount() {
    if (!window.zarmToast) {
      window.zarmToast = document.createElement('div');
      document.body.appendChild(window.zarmToast);
    }
    // this.popup = document.createElement('div');
    // document.body.appendChild(this.popup);
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(window.zarmToast);
    document.body.removeChild(this.popup);
  }

  _renderLayer() {
    ReactDOM.render(this.props.children, window.zarmToast);
  }


  render() {
    // Render a placeholder
    return null;
  }
}

export default RenderInBody;
