function defaultTemplate({ template }, opts, { imports, componentName, jsx, exports }) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}
  import Icon from '../icon';
  import Font from '../icon/font'
  import type { IconProps } from '../icon';
  
  const ${componentName} = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
    const { mode } = props;
    if (mode === 'font') {
      const rest = {
        ...props,
        name: '${componentName.name}'
      };
      return <Font {...rest} />
    }
    return React.createElement(Icon, { ...props, component: () => ${jsx}});
  }
  
  ${exports}
    `;
}
module.exports = defaultTemplate;
