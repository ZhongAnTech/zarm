export default (compName) => `import { ReactNode } from 'react';

export interface Base${compName}Props {
  children?: ReactNode;
}
`;
