import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/action-sheet/demo.md'),
      className: 'actionsheet-page',
    };
  }
}
