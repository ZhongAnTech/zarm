import Markdown from '../components/Markdown';
import '../styles/pages/PopupPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/popup/demo.md'),
      className: 'popup-page',
    };
  }
}
