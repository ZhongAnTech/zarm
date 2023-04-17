import { paramCase } from 'change-case';

export default (compName) => `import React, { forwardRef, useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { Base${compName}Props } from './interface';

export interface ${compName}CssVars {
}

export type ${compName}Props = Base${compName}Props & HTMLProps<${compName}CssVars>;

const ${compName} = forwardRef<HTMLDivElement, ${compName}Props>((props, ref) => {
  const { className, children, ...restProps } = props;
  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('${paramCase(compName)}', { prefixCls });
  const cls = bem([className]);

  return (
    <div ref={ref} className={cls} {...restProps}>
      {children}
    </div>
  );
});

${compName}.displayName = '${compName}';

${compName}.defaultProps = {};

export default ${compName};
`;
