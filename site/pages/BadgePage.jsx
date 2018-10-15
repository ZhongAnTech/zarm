import Markdown from '../components/Markdown';
import '../styles/pages/BadgePage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/badge/demo.md'),
      className: 'badge-page',
    };
  }
}
