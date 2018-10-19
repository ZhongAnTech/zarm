import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/icon/demo.md'),
      className: 'icon-page',
    };
  }
}
