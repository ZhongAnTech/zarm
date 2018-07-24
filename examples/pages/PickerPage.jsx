import Markdown from '../components/Markdown';
import '../styles/pages/PickerPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/picker/demo.md'),
      className: 'picker-page',
    };
  }
}
