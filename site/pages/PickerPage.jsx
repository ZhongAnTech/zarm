import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/picker/demo.md'),
      className: 'picker-page',
    };
  }
}
