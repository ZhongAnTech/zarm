import { mount } from 'enzyme';
import React from 'react';
import warnIfDeprecated from '../warnIfDeprecated';

class TestComponent extends React.Component {
  static displayName = 'TestComponent';

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
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('warnIfDeprecated', () => {
    it('should print warning log if the props of the component has been deprecated', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([{ oldProp: 'a', newProp: 'b' }]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      const props = { a: '1', b: '2' } as any;
      mount(<WrappedComponent {...props} />);
      expect(warnLogSpy).toBeCalledWith(
        'Warning: a has been renamed, and is not recommended for use.\n\n* Rename a to b to suppress this warning.',
      );
      expect(warnLogSpy).toBeCalledWith('Please update the following components: TestComponent');
    });

    it('should print warning log when use the deprecated component name', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([
        { oldComponent: 'TestComponent', newComponent: 'NewTestComponent' },
      ]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      mount(<WrappedComponent />);
      expect(warnLogSpy).toBeCalledWith(
        'Warning: TestComponent has been renamed, and is not recommended for use.\n\n* Rename TestComponent to NewTestComponent to suppress this warning.',
      );
      expect(warnLogSpy).toBeCalledWith('Please update the following components: TestComponent');
    });

    it('should print warning log when use the deprecated component name and props', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([
        {
          oldProp: 'a',
          newProp: 'b',
          oldComponent: 'TestComponent',
          newComponent: 'NewTestComponent',
        },
      ]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      const props = { a: '1', b: '2' } as any;
      mount(<WrappedComponent {...props} />);
      expect(warnLogSpy).toBeCalledWith(
        'Warning: a has been renamed, and is not recommended for use.\n\n* Rename a to b to suppress this warning.',
      );
      expect(warnLogSpy).toBeCalledWith('Please update the following components: TestComponent');
      expect(warnLogSpy).toBeCalledWith(
        'Warning: TestComponent has been renamed, and is not recommended for use.\n\n* Rename TestComponent to NewTestComponent to suppress this warning.',
      );
      expect(warnLogSpy).toBeCalledWith('Please update the following components: TestComponent');
    });

    it('should not print warning log if NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([{ oldProp: 'a', newProp: 'b' }]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      const props = { a: '1', b: '2' } as any;
      mount(<WrappedComponent {...props} />);
      expect(warnLogSpy).not.toBeCalled();
    });

    it('should not print warning log if deprecations is empty', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      const props = { a: '1', b: '2' } as any;
      mount(<WrappedComponent {...props} />);
      expect(warnLogSpy).not.toBeCalled();
    });

    it('should not print warning log if wrappered component does not have old prop', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      const props = { c: '3' } as any;
      mount(<WrappedComponent {...props} />);
      expect(warnLogSpy).not.toBeCalled();
    });

    it('should not print warning log if the name of the wrappered component is not equal the old name', () => {
      process.env.NODE_ENV = 'dev';
      const warnLogSpy = jest.spyOn(console, 'warn').mockImplementation(() => 'suppress warn');
      const wrapper = warnIfDeprecated([
        { oldComponent: 'WhatEverTestComponent', newComponent: 'NewTestComponent' },
      ]);
      const WrappedComponent = wrapper(TestComponent);
      // TODO: use strict types rather than any
      mount(<WrappedComponent />);
      expect(warnLogSpy).not.toBeCalled();
    });
  });
});
