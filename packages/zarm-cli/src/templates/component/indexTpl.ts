export default (compName) => `import ${compName} from './${compName}';

export type { ${compName}Props, ${compName}CssVars } from './${compName}';

export default ${compName};
`;
