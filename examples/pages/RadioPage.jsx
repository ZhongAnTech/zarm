import Markdown from '../components/Markdown';
import '../styles/pages/RadioPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/radio/demo.md'),
      className: 'radio-page',
    };
  }
}
