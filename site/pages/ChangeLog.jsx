import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../CHANGELOG.md'),
      className: 'change-log-page',
    };
  }
}
