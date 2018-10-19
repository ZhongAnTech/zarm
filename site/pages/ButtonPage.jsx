import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/button/demo.md'),
      className: 'button-page',
    };
  }
}
