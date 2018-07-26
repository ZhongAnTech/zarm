import Markdown from '../components/Markdown';
import '../styles/pages/PullPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/pull/demo.md'),
      className: 'pull-page',
    };
  }
}
