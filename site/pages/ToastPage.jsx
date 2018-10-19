import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/toast/demo.md'),
      className: 'toast-page',
    };
  }
}
