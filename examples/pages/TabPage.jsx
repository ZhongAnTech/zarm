import Markdown from '../components/Markdown';
import '../styles/pages/TabPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/tab/demo.md'),
      className: 'tab-page',
    };
  }
}
