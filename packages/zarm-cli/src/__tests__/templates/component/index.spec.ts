import component from '../../../templates/component';

describe('templates', () => {
  describe('component', () => {
    it('should create component template', () => {
      const template = component.compTpl('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create demo template', () => {
      const template = component.demoTpl('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create index template', () => {
      const template = component.indexTpl('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
  });
});
