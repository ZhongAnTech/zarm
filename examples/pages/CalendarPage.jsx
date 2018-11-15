import Markdown from '../components/Markdown';
import '../styles/pages/CalendarPage';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/calendar/demo.md'),
      className: 'calendar-page',
    };
  }
}
