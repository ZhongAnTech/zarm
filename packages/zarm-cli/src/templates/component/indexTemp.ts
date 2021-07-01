export default (compName) => `import ${compName} from './${compName}';

export type { ${compName}Props } from './${compName}';

export default ${compName};
`;
