import Markdown from '../components/Markdown';
import '../styles/pages/SwipePage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/swipe/demo.md'),
      className: 'swipe-page',
    };
  }
}
