import Markdown from '../components/Markdown';
import '../styles/pages/ToastPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/toast/demo.md'),
      className: 'toast-page',
    };
  }
}
