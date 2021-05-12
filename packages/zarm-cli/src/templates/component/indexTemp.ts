export default (compName) => `import ${compName} from './${compName}';

export default ${compName};
`;
