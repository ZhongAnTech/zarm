import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/file-picker/demo.md'),
      className: 'file-picker-page',
    };
  }
}
