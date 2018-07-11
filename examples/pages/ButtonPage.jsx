import Markdown from '../components/Markdown';
import '../styles/pages/ButtonPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/button/demo.md'),
      className: 'button-page',
    };
  }
}
