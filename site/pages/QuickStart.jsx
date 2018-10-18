import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../README.md'),
      className: 'quick-start-page',
    };
  }
}
