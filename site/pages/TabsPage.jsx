import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/tabs/demo.md'),
      className: 'tabs-page',
    };
  }
}
