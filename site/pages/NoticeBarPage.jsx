import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/notice-bar/demo.md'),
      className: 'notice-bar-page',
    };
  }
}
