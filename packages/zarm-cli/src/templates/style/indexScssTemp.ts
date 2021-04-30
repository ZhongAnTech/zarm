import changeCase from 'change-case';

export default (compName) => `@import '../../style/core/index';

@include b(${changeCase.paramCase(compName)}) {

}
`;
