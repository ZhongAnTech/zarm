import Markdown from '../components/Markdown';
import '../styles/pages/NoticeBarPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/notice-bar/demo.md'),
      className: 'noticebar-page',
    };
  }
}
