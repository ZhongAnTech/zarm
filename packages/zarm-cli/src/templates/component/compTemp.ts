import changeCase from 'change-case';

export default (compName) => `import React, { PureComponent } from 'react';
import classnames from 'classnames';

export interface ${compName}Props {
  prefixCls?: string;
  className?: string;
}

export interface ${compName}States {

}

export default class ${compName} extends PureComponent<${compName}Props, ${compName}States> {
  static displayName = '${compName}';

  static defaultProps = {
    prefixCls: 'za-${changeCase.paramCase(compName)}',
  };

  render() {
    const {
      prefixCls,
      className,
      children,
    } = this.props;

    const cls = classnames(prefixCls, className);

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }
}
`;
