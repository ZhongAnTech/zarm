import Markdown from '../components/Markdown';
import '../styles/pages/NavBarPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/nav-bar/demo.md'),
      className: 'nav-bar-page',
    };
  };
}
