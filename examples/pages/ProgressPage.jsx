import Markdown from '../components/Markdown';
import '../styles/pages/ProgressPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/progress/demo.md'),
      className: 'progress-page',
    };
  }
}
