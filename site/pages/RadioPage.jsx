import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/radio/demo.md'),
      className: 'radio-page',
    };
  }
}
