import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/spinner/demo.md'),
      className: 'spinner-page',
    };
  }
}
