import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/modal/demo.md'),
      className: 'modal-page',
    };
  }
}
