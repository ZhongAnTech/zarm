import Markdown from '@site/components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('@/components/checkbox/demo.md'),
      className: 'checkbox-page',
    };
  }
}
