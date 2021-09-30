import { paramCase } from 'change-case';

export default (compName) => `@import '../../style/core/index';

@include b(${paramCase(compName)}) {

}
`;
