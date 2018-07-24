import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/collapse/demo.md'),
      className: 'collapse-page',
    };
  }
}
