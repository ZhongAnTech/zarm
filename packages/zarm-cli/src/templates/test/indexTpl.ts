export default (compName) => `import * as React from 'react';
import { render } from '@testing-library/react';
import ${compName} from '../index';

describe('${compName}', () => {
  it('should renders correctly', () => {
    const { asFragment } = render(<${compName} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
`;
