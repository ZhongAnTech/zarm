import React, { Component } from 'react';

const asyncComponent = loadComponent => (
  class AsyncComponent extends Component {
    state = {
      component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) return;

      loadComponent()
          .then(module => module.default)
          .then((component) => {
            this.setState({ component });
          })
          .catch((err) => {
            console.error('Cannot load component in <AsyncComponent />');
            throw err;
          });
    }

    hasLoadedComponent() {
      return this.state.component !== null;
    }

    render() {
      const { component } = this.state;
      return component && <component {...this.props} />;
    }
  }
);

export default asyncComponent;
