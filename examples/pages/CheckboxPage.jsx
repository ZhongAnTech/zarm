import Markdown from '../components/Markdown';
import '../styles/pages/CheckboxPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/checkbox/demo.md'),
      className: 'checkbox-page',
    };
  }
}
