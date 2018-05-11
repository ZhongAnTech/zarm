import React from 'react';

const asyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) return;

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({ Component });
        })
        .catch((err) => {
          console.error('Cannot load component in <AsyncComponent />');
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return Component && <Component {...this.props} />;
    }
  }
);

export default asyncComponent;
