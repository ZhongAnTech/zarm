import testTemplate from '../../../templates/test';

describe('templates', () => {
  describe('test', () => {
    it('should create test template', () => {
      const template = testTemplate.indexTpl('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
  });
});
