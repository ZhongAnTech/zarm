import { mount } from 'enzyme';
import React from 'react';
import warnIfDeprecated from '../warnIfDeprecated';

class TestComponent extends React.Component {
  static nonReactStaticMethod() {
    return null;
  }

  render() {
    return 'test component';
  }
}

describe('utils', () => {
  const oEnv = process.env;
  afterAll(() => {
    process.env = oEnv;
  });
  describe('warnIfDeprecated', () => {
    it('should pass', () => {
      process.env.NODE_ENV = 'dev';
      // const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation();
      const wrapper = warnIfDeprecated([{ oldProp: 'a', newProp: 'b' }]);
      const WrappedComponent = wrapper(TestComponent);
      const enzymeWrapper = mount(<WrappedComponent />);
      // expect(warnLogSpy).toBeCalledWith('')
    });
  });
});
