import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/message/demo.md'),
      className: 'message-page',
    };
  }
}
