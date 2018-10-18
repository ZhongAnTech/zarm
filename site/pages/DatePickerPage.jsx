import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/date-picker/demo.md'),
      className: 'datepicker-page',
    };
  }
}
