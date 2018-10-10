import Markdown from '../components/Markdown';
import '../styles/pages/PanelPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/panel/demo.md'),
      className: 'panel-page',
    };
  }
}
