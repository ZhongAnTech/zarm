import Markdown from '../components/Markdown';
import '../styles/pages/TabsPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/tabs/demo.md'),
      className: 'tabs-page',
    };
  }
}
