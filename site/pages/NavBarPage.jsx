import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/nav-bar/demo.md'),
      className: 'nav-bar-page',
    };
  }
}
