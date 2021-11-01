import style from '../../../templates/style';

describe('templates', () => {
  describe('style', () => {
    it('should create index scss template', () => {
      const template = style.indexScssTpl('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create index template', () => {
      const template = style.indexTpl();
      expect(template).toMatchSnapshot();
    });
  });
});
