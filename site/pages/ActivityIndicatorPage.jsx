import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/activity-indicator/demo.md'),
      className: 'activity-indicator-page',
    };
  }
}
