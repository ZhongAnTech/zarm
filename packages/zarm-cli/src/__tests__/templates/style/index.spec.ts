import style from '../../../templates/style';

describe('templates', () => {
  describe('style', () => {
    it('should create index scss template', () => {
      const template = style.indexScssTemp('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create index template', () => {
      const template = style.indexTemp();
      expect(template).toMatchSnapshot();
    });
  });
});
