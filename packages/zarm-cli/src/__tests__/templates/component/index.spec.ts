import component from '../../../templates/component';

describe('templates', () => {
  describe('component', () => {
    it('should create component template', () => {
      const template = component.compTemp('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create demo template', () => {
      const template = component.demoTemp('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
    it('should create index template', () => {
      const template = component.indexTemp('MyTestComponent');
      expect(template).toMatchSnapshot();
    });
  });
});
