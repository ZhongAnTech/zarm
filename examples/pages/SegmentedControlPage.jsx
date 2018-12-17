import Markdown from '../components/Markdown';
import '../styles/pages/SegmentedControlPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/segmented-control/demo.md'),
      className: 'segmented-control-page',
    };
  }
}
