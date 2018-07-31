import Markdown from '../components/Markdown';
import '../styles/pages/IconPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/icon/demo.md'),
      className: 'icon-page',
    };
  }
}
