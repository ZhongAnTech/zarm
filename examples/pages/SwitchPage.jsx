import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/switch/demo.md'),
      className: 'switch-page',
    };
  }
}
