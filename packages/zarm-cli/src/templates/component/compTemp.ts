import { paramCase } from 'change-case';

export default (compName) => `import * as React from 'react';
import classnames from 'classnames';

export interface ${compName}Props {
  prefixCls?: string;
  className?: string;
}

const ${compName} = React.forwardRef<unknown, ${compName}Props>((props, ref) => {
  const {
    prefixCls,
    className,
    children,
    ...restProps
  } = props;

  const compRef = (ref as any) || React.createRef<HTMLElement>();
  const cls = classnames(prefixCls, className);

  return (
    <div ref={compRef} className={cls} {...restProps}>
      {children}
    </div>
  );
});

${compName}.displayName = '${compName}';

${compName}.defaultProps = {
  prefixCls: 'za-${paramCase(compName)}',
};

export default ${compName};

`;
