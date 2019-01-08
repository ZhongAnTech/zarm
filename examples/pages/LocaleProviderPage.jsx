import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/locale-provider/demo.md'),
      className: 'locale-provider-page',
    };
  }
}
