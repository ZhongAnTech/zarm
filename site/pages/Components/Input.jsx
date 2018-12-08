import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/input/demo.md'),
      className: 'input-page',
    };
  }
}
