import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/calendar-view/demo.md'),
      className: 'calendar-page',
    };
  }
}
