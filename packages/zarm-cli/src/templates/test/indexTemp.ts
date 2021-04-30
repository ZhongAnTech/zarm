export default (compName) => `import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ${compName} from '../index';

describe('${compName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <${compName} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
`;
