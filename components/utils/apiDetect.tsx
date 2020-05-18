import React from 'react';

export default function (apiConfig: [{ deprecated: string; recommended: string }]) {
  return (WrappedComponent) => class ApiDetectComp extends React.Component {
    constructor(props) {
      super(props);
      if (process.env.NODE_ENV === 'development' && apiConfig.length) {
        apiConfig.forEach((item) => {
          // eslint-disable-next-line react/destructuring-assignment
          if (this.props[item.deprecated]) {
            console.warn('使用了过期的api ', item.deprecated);
          }
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
