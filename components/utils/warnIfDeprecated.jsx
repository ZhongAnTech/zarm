import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function (deprecations) {
  return function Wrapper(WrappedComponent) {
    class WarnIfDeprecatedComp extends WrappedComponent {
      constructor(...props) {
        super(...props);
        if (process.env.NODE_ENV !== 'production' && deprecations.length) {
          let count = 0;
          deprecations.forEach((item) => {
            // eslint-disable-next-line react/destructuring-assignment
            if (this.props[item.oldProp]) {
              console.warn(`Warning: ${item.oldProp} has been renamed, and is not recommended for use.

* Rename ${item.oldProp} to ${item.newProp} to suppress this warning.`);
              count += 1;
            }
          });
          if (count) {
            console.warn(`Please update the following components: ${getDisplayName(WrappedComponent)}`);
          }
        }
      }

      render() {
        const { forwardedRef, ...rest } = this.props;
        return <WrappedComponent ref={forwardedRef} {...rest} />;
      }
    }

    return React.forwardRef((props, ref) => {
      return <WarnIfDeprecatedComp {...props} forwardedRef={ref} />;
    });
  };
}
