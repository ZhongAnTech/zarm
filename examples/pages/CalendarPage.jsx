import Markdown from '../components/Markdown';
// import '../styles/pages/CellPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/calendar-view/demo.md'),
      className: 'calendar-page',
    };
  }
}
