import React, { Component, Ref, ComponentClass, ReactNode } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent: React.ComponentClass) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

interface WarnIfDeprecatedCompProps {
  forwardedRef: Ref<any>;
}

interface Deprecation {
  oldProp: string;
  newProp: string;
  oldComponent: string;
  newComponent: string;
}

export default function warnIfDeprecated(deprecations: Array<Partial<Deprecation>>) {
  return function Wrapper<T extends ComponentClass<InstanceType<T>['props'] & { ref?: Ref<any> }>>(
    WrappedComponent: T,
  ) {
    class WarnIfDeprecatedComp extends Component<WarnIfDeprecatedCompProps> {
      constructor(props: any) {
        super(props);
        if (process.env.NODE_ENV !== 'production' && deprecations.length) {
          let count = 0;
          deprecations.forEach((item) => {
            // eslint-disable-next-line react/destructuring-assignment
            if (item.oldProp && item.newProp && this.props[item.oldProp]) {
              console.warn(
                `Warning: ${item.oldProp} has been renamed, and is not recommended for use.\n\n* Rename ${item.oldProp} to ${item.newProp} to suppress this warning.`,
              );
              count += 1;
            }

            // eslint-disable-next-line react/destructuring-assignment
            if (getDisplayName(WrappedComponent) === item.oldComponent) {
              console.warn(
                `Warning: ${item.oldComponent} has been renamed, and is not recommended for use.\n\n* Rename ${item.oldComponent} to ${item.newComponent} to suppress this warning.`,
              );
              count += 1;
            }
          });
          if (count) {
            console.warn(
              `Please update the following components: ${getDisplayName(WrappedComponent)}`,
            );
          }
        }
      }

      render() {
        const { forwardedRef, ...other } = this.props;
        const rest = other as JSX.LibraryManagedAttributes<
          T,
          Readonly<InstanceType<T>['props']> & Readonly<{ children?: ReactNode }>
        >;
        return <WrappedComponent ref={forwardedRef} {...rest} />;
      }
    }

    const forwardRefComp = (props, ref) => {
      return <WarnIfDeprecatedComp {...props} forwardedRef={ref} />;
    };

    forwardRefComp.displayName = 'ForwardedRefComp';
    hoistNonReactStatic(forwardRefComp, WrappedComponent);
    const forwardCps: unknown = React.forwardRef(forwardRefComp);
    return forwardCps as T;
  };
}
