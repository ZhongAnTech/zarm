import { paramCase } from 'change-case';

export default (compName) => `import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
import type { Base${compName}Props } from './interface';

export interface ${compName}Props extends Base${compName}Props {
  className?: string;
}

const ${compName} = React.forwardRef<unknown, ${compName}Props>((props, ref) => {
  const { className, children, ...restProps } = props;

  const compRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = \`\${globalPrefixCls}-${paramCase(compName)}\`;
  const cls = classnames(prefixCls, className);

  return (
    <div ref={compRef} className={cls} {...restProps}>
      {children}
    </div>
  );
});

${compName}.displayName = '${compName}';

${compName}.defaultProps = {};

export default ${compName};

`;
