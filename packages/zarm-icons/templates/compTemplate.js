function defaultTemplate({ template }, opts, { imports, componentName, jsx, exports }) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}
import Icon from '../icon';
import type { IconProps } from '../icon';

const ${componentName} = (props: IconProps, svgRef?: React.Ref<SVGSVGElement>) => {
  const newProps = {
    ...props,
    name: '${componentName.name}'
  }
  return React.createElement(Icon, { ...newProps, component: () => ${jsx}});
}

${exports}
  `;
}
module.exports = defaultTemplate;
