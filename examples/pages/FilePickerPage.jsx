import Markdown from '../components/Markdown';
import '../styles/pages/FilePickerPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/file-picker/demo.md'),
      className: 'filepicker-page',
    };
  }
}
