import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/accordion/demo.md'),
      className: 'accordion-page',
    };
  }
}
