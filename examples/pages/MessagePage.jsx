import Markdown from '../components/Markdown';
import '../styles/pages/MessagePage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/message/demo.md'),
      className: 'message-page',
    };
  }
}
