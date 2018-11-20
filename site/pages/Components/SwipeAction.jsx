import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/swipe-action/demo.md'),
      className: 'swipe-action-page',
    };
  }
}
