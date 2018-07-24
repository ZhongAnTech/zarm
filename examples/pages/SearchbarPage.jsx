import Markdown from '../components/Markdown';
import '../styles/pages/SearchBarPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/search-bar/demo.md'),
      className: 'searchbar-page',
    };
  }
}
