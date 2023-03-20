export default (compName) => `import * as React from 'react';
import { render } from '@testing-library/react';
import ${compName} from '../index';

describe('${compName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <${compName} />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
`;
